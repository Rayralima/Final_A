const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
  });

const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
  });

  sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
  });

  app.get('/products', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
  });

  app.post('/products', async (req, res) => {
    const { name, description, quantity, photo } = req.body;
    const product = await Product.create({ name, description, quantity, photo });
    res.status(201).json(product);
  });

  app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, quantity, photo } = req.body;
    const product = await Product.findByPk(id);
    if (product) {
      await product.update({ name, description, quantity, photo });
      res.json(product);
    } else {
      res.status(404).send('Product not found');
    }
  });
  
  app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Product not found');
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });