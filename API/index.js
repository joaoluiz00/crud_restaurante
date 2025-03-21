const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const pratoRoutes = require('./routes/pratoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const mesaRoutes = require('./routes/mesaRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/pratos', pratoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/mesas', mesaRoutes);
app.use('/api/pedidos', pedidoRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});