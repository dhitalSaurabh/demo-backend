const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require('./models/product.model.js')
const productRoute = require('./routes/product_route.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routes
app.use("/api/products", productRoute);

app.get('/', (req, res) => {
  res.send("Hello form node backend...!!!")
});

app.get('/api/products', async (req, res) => {
  
});

app.get('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
    // console.log(error);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
    res.send(error);
  }
})

app.post('/api/products', async (req, res) => {
  try {
    // console.log(req.body);
    // res.send(req.body);
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
})
// update product

app.put('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DElete Product 

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted succcessfully." });
  } catch (err) {
  }
});
mongoose.connect("mongodb+srv://admin:1Saurabh8@backenddb.tzxdgm9.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backendDB")
  .then(() => {
    console.log("Connected to database!!!");
    app.listen(8080, () => {
      console.log("Hello from node port 8080.");
    });
  })
  .catch((err) => {
    console.log("COnnection failed");
  });


