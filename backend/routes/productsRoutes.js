const router = require('express').Router();

const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productsController');

//Add a product
router.post('/addProduct', addProduct);

//Get all products
router.get('/getAllProducts', getAllProducts);

//Get a product by id
router.get('/getProductById/:id', getProductById);

//Update a product
router.put('/updateProduct/:id', updateProduct);

//Delete a product
router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;