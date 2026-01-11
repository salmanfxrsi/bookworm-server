import app from "./app";
const PORT = 5000;

const startServer = async () => {
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
};

startServer();
