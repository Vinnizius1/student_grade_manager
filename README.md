# Gerenciador de Notas de Alunos

Este é um projeto introdutório de uma API RESTful simples criada com Node.js puro (sem frameworks como Express). O objetivo é gerenciar as notas de alunos, permitindo criar, listar e atualizar registros.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução do código JavaScript no lado do servidor.
- **Módulo `http` nativo**: Para criar o servidor HTTP e lidar com as requisições.
- **UUID**: Para gerar identificadores únicos para cada nota cadastrada.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente instalado junto com o Node.js)

## Como Executar

1. Clone este repositório (ou tenha os arquivos em uma pasta local).
2. Abra o terminal na pasta do projeto.
3. Instale as dependências necessárias:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   node index.js
   ```
5. O servidor estará rodando em `http://localhost:3000`.

## Endpoints da API

A seguir estão os endpoints disponíveis para interagir com a API.

---

### Listar todas as notas

Retorna uma lista com todas as notas cadastradas.

- **Método**: `GET`
- **URL**: `/grades`
- **Resposta de Sucesso (200 OK)**:
  ```json
  [
    {
      "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "studentName": "Vinicius",
      "subject": "Math",
      "grade": 9.5
    }
  ]
  ```

---

### Criar uma nova nota

Adiciona uma nova nota ao sistema.

- **Método**: `POST`
- **URL**: `/grades`
- **Corpo da Requisição (Body)**:
  ```json
  {
    "studentName": "Maria",
    "subject": "Português",
    "grade": 8.0
  }
  ```
- **Resposta de Sucesso (201 Created)**: Retorna o objeto da nota recém-criada.
  ```json
  {
    "id": "b2c3d4e5-f6a7-8901-2345-67890abcdef1",
    "studentName": "Maria",
    "subject": "Português",
    "grade": 8.0
  }
  ```

---

### Atualizar uma nota existente

Atualiza as informações de uma nota específica, identificada pelo seu `id`.

- **Método**: `PUT`
- **URL**: `/grades/:id` (Ex: `/grades/a1b2c3d4-e5f6-7890-1234-567890abcdef`)
- **Corpo da Requisição (Body)**:
  ```json
  {
    "studentName": "Vinicius Martins",
    "subject": "Math",
    "grade": 10.0
  }
  ```
- **Resposta de Sucesso (200 OK)**: Retorna o objeto da nota atualizada.
- **Resposta de Erro (404 Not Found)**: Se o `id` da nota não for encontrado.
