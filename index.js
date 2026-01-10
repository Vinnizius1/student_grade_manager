import http from "http";

const port = 3000;
const grades = [{ studentName: "Vinicius", subject: "Math", grade: 9.5 }];

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
