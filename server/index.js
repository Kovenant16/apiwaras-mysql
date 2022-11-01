import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();
// const __dirnanme = dirname(fileURLToPath(import.meta.url));
// console.log(__dirnanme)

app.use(cors());
app.use(express.json());

app.use(indexRoutes);
app.use(taskRoutes);

// app.use(express.static(join(__dirnanme, '../client/dist')))

app.listen(PORT);

