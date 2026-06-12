import express from "express";
import type { Request, Response, NextFunction } from "express";
import rotasUsuarios from "./routes/user.routes.ts";
import { AppError } from "./errors/AppError.ts";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toLocaleTimeString("pt-BR"),
        datestamp: new Date().toLocaleDateString("pt-BR")
    });
});

app.use('/users', rotasUsuarios);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
     res.status(err.statusCode).json({ erro: err.message });
     return;
  }
  
  console.error(err);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
