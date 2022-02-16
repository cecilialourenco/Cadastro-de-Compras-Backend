const mongoose = require('../database/connection');

const ProdutoSchema = new mongoose.Schema({
  dataCompra: {
    type: Date,
    require: true,
  },

  nome: {
    type: String,
    require: true,
    unique: true,
  },
  
  valorCompra: {
    type: Number,
    require: true,
  },

  dataVenda: {
    type: Date,
    require: true,
  },

  valorVenda: {
    type: Number,
    require: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;