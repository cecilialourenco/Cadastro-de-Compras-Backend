const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cadastro_de_produtos', { useNewUrlParser: true});

mongoose.Promise = global.Promise;

module.exports = mongoose;