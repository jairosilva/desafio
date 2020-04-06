const path = require('path');
const rootDir = require('./util/path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const cepRoutes = require('./routes/cep');
const palindromosRoutes = require('./routes/palindromos');
const trocoRoutes = require('./routes/troco');
const veiculoRoutes = require('./routes/veiculo');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cepRoutes);
app.use(palindromosRoutes);
app.use(trocoRoutes);
app.use(veiculoRoutes);

app.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'palindromos.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000);

