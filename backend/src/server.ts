import express from 'express';

const app = express();

app.get('/users', async (req, res) => {
  res.json({ success: true });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
