import { join } from "path";
import express from "express";
import socketIO from "socket.io";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));

app.use(express.static(join(__dirname, "static")));

app.get("/", (req, res) => res.render("home"));

const handleLintening = () => {
  console.log(`🥑 Server running: http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleLintening);

const io = socketIO(server);
