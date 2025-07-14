import { app } from "./app";
import { sequelize } from "#sequelize";

const port = process.env.PORT ?? 3333;

app.listen(port, async () => {
  await sequelize.sync();
  console.log("[+] Banco de Dados sincronizado.");
  
  console.log(`[+] Servidor rodando em http://localhost:${port}`);
});