import router from "./router";
import express from "express";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json";

const app = express();

const PORT = 5009;

app.use(router);

app.use(bodyParser.json());

app.use("/swagger", swaggerUI.serve);
app.get("/swagger", swaggerUI.setup(swaggerDocument, { isExplorer: false }));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
