import http from "http";

const port = 3000;

// Cria um servidor HTTP - "Funções do Backend"
const server = http.createServer(
  // Função de callback que lida com as requisições
  (req, res) => {
    res.statusCode = 200; // Código de status HTTP 200 OK
    res.setHeader("Content-Type", "text/plain"); // Define o tipo de conteúdo como texto simples
    res.end("Hello, World!\n"); // Envia a resposta "Hello, World!" e finaliza a resposta
  }
);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

/* Agora, criaremos a API */
