const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Rota para receber formulário
app.post("/submit", (req, res) => {
  const { nome, email, celular } = req.body;
  const data = `Nome: ${nome} | Email: ${email} | Celular: ${celular || "Não informado"}\n`;

  // Salva em leads.txt
  fs.appendFileSync("leads.txt", data);

  // Redireciona para download do PDF
  res.redirect("/obrigado.html");
});

// Rota de login para acessar os dados
app.post("/login", (req, res) => {
  const { user, pass } = req.body;

  // Usuário fixo
  const USER = "admin";
  const PASS = "1234";

  if (user === USER && pass === PASS) {
    const filePath = path.join(__dirname, "leads.txt");
    res.download(filePath, "dados-leads.txt");
  } else {
    res.send("Usuário ou senha inválidos!");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
