import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/submit", async (req, res) => {
  res.json({
    status: "received"
  });
});

app.listen(process.env.PORT || 3000);
