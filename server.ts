import express from "express";
import rotasUsuarios from "./rotas.ts";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', rotasUsuarios);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
    