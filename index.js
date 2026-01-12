import http from "http";
import { v4 } from "uuid";

const port = 3000;
const grades = [];

// Cria um servidor HTTP - "Funções do Backend"
const server = http.createServer(
  // Função de callback que lida com as requisições
  (req, res) => {
    // Extrai o método e a URL da requisição
    const { method, url } = req;

    // body global para todas as requisições
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // Tudo que vem depois do /grades/ é o id
    const id = url.split("/")[2];

    // If the request is a GET to /grades, return the grades
    if (method === "GET" && url === "/grades") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(grades));
    } else if (method === "POST" && url === "/grades") {
      // O evento 'end' é disparado somente após todo o corpo da requisição (body) ser recebido.
      // Toda a lógica que depende do 'body' (como o JSON.parse) deve ficar aqui dentro.
      req.on("end", () => {
        try {
          if (!body) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Bad Request: Body is empty");
            return;
          }
          const { studentName, subject, grade } = JSON.parse(body);
          const newGrade = { id: v4(), studentName, subject, grade };
          grades.push(newGrade);
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newGrade));
        } catch (error) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Bad Request: Invalid JSON");
        }
      });
    } else if (method === "PUT" && url.startsWith("/grades/")) {
      // O evento 'end' é disparado somente após todo o corpo da requisição (body) ser recebido.
      // Toda a lógica que depende do 'body' (como o JSON.parse) deve ficar aqui dentro.
      req.on("end", () => {
        try {
          if (!body) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Bad Request: Body is empty");
            return;
          }

          const { studentName, subject, grade } = JSON.parse(body);
          const gradeToUpdate = grades.find((g) => g.id === id);

          if (gradeToUpdate) {
            // Se encontrou, atualiza campo por campo
            gradeToUpdate.studentName = studentName;
            gradeToUpdate.subject = subject;
            gradeToUpdate.grade = grade;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(gradeToUpdate));
          } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Grade not found");
          }
        } catch (error) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Bad Request: Invalid JSON");
        }
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Route not Found");
    }
  }
);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

/* Agora, criaremos a API */
