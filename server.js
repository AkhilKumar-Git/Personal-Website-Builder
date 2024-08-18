import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import process from "process";
import cors from "cors";

const app = express();
const PORT = 5002;

app.use(cors());
app.use(bodyParser.json());

app.post("/update-portfolio", (req, res) => {
  const portfolioData = req.body;
  const filePath = path.join(process.cwd(), "src", "data", "portfolio.json");

  fs.writeFile(filePath, JSON.stringify(portfolioData, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return res.status(500).send("Error writing file");
    }
    res.send("File updated successfully");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
