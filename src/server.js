import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));

app.use(logger("dev"));

app.use(express.static(join(__dirname, "static")));

app.get("/", (req, res) => res.render("home"));

const handleLintening = () => {
  console.log(`🥑 Server running: http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleLintening);

const io = socketIO.listen(server);

io.on("connect", (socket) => {
  // setTimeout(() => {
  //   socket.broadcast.emit("hello"); // boradcast: 접속한 클라이언트를 제외하고 이벤트를 보낸다.
  // }, 5000);

  socket.on("newMessage", ({ message }) =>
    socket.broadcast.emit("messageNotification", {
      message,
      nickname: socket.nickname || "Anon",
    })
  );

  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});
