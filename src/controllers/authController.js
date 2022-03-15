const express = require('express');

const Produto = require('../models/produto');

const router = express.Router();

router.post('/product', async(req, res) => {
  const { nome } = req.body;

  try {
    if (!nome)
      return res.status(400).send({  error: 'Dados faltando' });
    if (await Produto.findOne({ nome }))
      return res.status(400).send({  error: 'Produto já cadastrado' });

    const produto = await Produto.create(req.body);
    
    return res.send({ produto });
    
  }catch (error) {
    res.status(400).send({ error });
  }
});

router.get('/product', async(req, res) => {
  try {
    const produtos = await Produto.find();

    return res.status(200).json(produtos);
     
  }catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/product/:id', async(req, res) => {
  const id = req.params.id;

  try {
    const produto = await Produto.findOne({ _id: id });

    if (!produto) {
      return res.status(422).json({ message: 'Produto não encontrado'});
    }

    return res.status(200).json(produto);
     
  }catch (error) {
    res.status(500).json({ error: error });
  }
})

router.patch('/product/:id', async(req, res) => {
  const id = req.params.id;

  const { dataCompra, nome, valorCompra, dataVenda, valorVenda} = req.body;

  const produto = {
    dataCompra, 
    nome, 
    valorCompra,
    dataVenda,
    valorVenda
  }

  try {
    const updatedProduto = await Produto.updateOne({ _id: id }, produto);

    if(updatedProduto.matchedCount === 0) {
      return res.status(422).json({ message: 'Produto não encontrado'});
    }
    return res.status(200).json(produto);
     
  }catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete('/product/:id', async (req, res) => {
  const id = req.params.id;

  const produto = await Produto.findOne({ _id: id });


  if (!produto) {

    return res.status(422).json({ message: 'Produto não encontrado' });
    }

  try {

    await Produto.deleteOne({ _id: id });

    return res.status(200).json({ message: 'Produto removido com sucesso' });

  }catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = app => app.use('/', router);