const express = require("express");
const app = express();
const port = 3000;
const attendanceRouter = require("./routes/attendance");
const userRouter = require("./routes/user");
const absensiRouter = require("./routes/absensi");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/attendance", attendanceRouter);
app.use("/user", userRouter);
app.use("/absensi", absensiRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
