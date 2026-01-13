import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(express.json());
app.use(express.static("src"));

app.post("/ask", async (req, res) => {
  const userInput = req.body.input;

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "user", content: userInput }
      ]
    });

    res.json({
      output: completion.choices[0]?.message?.content || ""
    });
  } catch (err) {
    res.status(500).json({ output: "Error occurred" });
  }
});

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
