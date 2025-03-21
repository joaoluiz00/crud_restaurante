const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const pratoRoutes = require('./routes/pratosRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const mesaRoutes = require('./routes/mesaRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

const port = 3000;
const app = express();


app.use(cors());
app.use(bodyParser.json());

app.use('/api/pratos', pratoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/mesas', mesaRoutes);
app.use('/api/pedidos', pedidoRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});