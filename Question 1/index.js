import express from "express";
import axios from "axios";

const app = express();
const PORT = 8008;

app.get('/numbers', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'No URLs provided in the query parameters.' });
    }
    const urls = Array.isArray(url) ? url : [url];

    const result = [];
    for (const u of urls) {
      try {
        const response = await axios.get(u);
        const numbers = response.data.numbers;
        result.push(...numbers);
      } catch (error) {
        console.error(error.message);
      }
    }

    res.json({ numbers: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
