const Product = require('../models/products.model');

//Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, image, category, brand, rating, reviews } = req.body;

        //Check if the product already exists
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).send({ message: "Product already exists" });
        }

        const product = new Product({
            name,
            description,
            price,
            quantity,
            image,
            category,
            brand,
            rating,
            reviews,
        });

        await product.save();

        res.status(201).send({ message: "Product added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

//Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        res.status(200).send(products);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

//Get a product by id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

//Update a product
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, image, category, brand, rating, reviews } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name;
            product.description = description;
            product.price = price;
            product.quantity = quantity;
            product.image = image;
            product.category = category;
            product.brand = brand;
            product.rating = rating;
            product.reviews = reviews;

            await product.save();

            res.status(200).send({ message: "Product updated successfully" });
        } else {
            res.status(404).send({ message: "Product not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

//Delete a product
const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);

        if (deleted) {
            res.status(200).send({ message: "Product deleted successfully" });
        } else {
            res.status(404).send({ message: "Product not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
}