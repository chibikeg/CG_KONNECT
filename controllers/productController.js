const asyncHandler = require("../helpers/asyncHandler");
const productService = require("../services/productService");

const requireSeller = (req, res) => {
    if (req.user.role === "seller" || req.seller.role === "admin") return false;

    res.status(403).json([
        success: false,
        message: "Seller access is required"
    ]);

    return true;
}

const createProduct = asyncHandler(async (req, res) => {
    if (requireSeller(req, res)) return;

    const product = await productService.create(req.user._id, req.body);
    return res.status(201).json({ success: true, data: {product}});
})


const browseproduct = asyncHandler(async (req, res) => {

    const products = await productService.create({
        search: req.query.search, 
        category: req.query.category, 
        page: req.query.page
    });
    return res.status(200).json({ success: true, data: {products}});
})



const getProduct = asyncHandler(async (req, res) => {
    const product = await productService.getById(req.params.productId);

    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found"})
    }

    return res.status(201).json({ success: true, data: {product}});
})


const updateProduct = asyncHandler(async (req, res) => {
    if (requireSeller(req, res)) return;

    const product = await productService.updateOwn(req.params.productId, req.user._id, req.body);

    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found or you do not own it"})
    }

    return res.status(200).json({ success: true, data: {product}});
})


const deleteProduct = asyncHandler(async (req, res) => {
    if (requireSeller(req, res)) return;

    const product = await productService.deleteOwn(req.params.productId, req.user._id);

    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found or you do not own it"})
    }

    return res.status(200).json({ success: true, message: "Product deleted"});
})

models.exports = {
    createProduct,
    browseproduct,
    getProduct,
    updateProduct,
    deleteProduct
}