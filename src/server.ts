import { App } from "./app";

const PORT = process.env.PORT;
const app = new App();

app.server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
