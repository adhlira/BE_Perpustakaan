import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.APP_PORT || 3000;

const secretKey = process.env.SECRET_KEY;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
