import express from "express";
import type { Request, Response } from "express";
import rotasUsuarios from "./routes/user.routes.ts";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.use('/users', rotasUsuarios);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
