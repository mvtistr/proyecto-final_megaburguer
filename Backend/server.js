const routes = require('./src/routes/routes.js');
const express = require('express');
const json = require('express').json;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use("/api", routes);

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

export default app;