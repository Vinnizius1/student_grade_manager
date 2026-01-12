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

    // If the request is a GET to /grades, return the grades
    if (method === "GET" && url === "/grades") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(grades));
    } else if (method === "POST" && url === "/grades") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const { studentName, subject, grade } = JSON.parse(body);
        const newGrade = { id: v4(), studentName, subject, grade };
        grades.push(newGrade);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newGrade));
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  }
);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

/* Agora, criaremos a API */
