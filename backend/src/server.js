import app from "./app.js";

const port = process.env.PORT || 3939;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});