import express from 'express';

const app = express();
const PORT: number = parseInt(process.env['PORT'] as string, 10) || 5173;
const path =__dirname + '/app/';

app.use(express.static(path));

app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, {root: path});
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});