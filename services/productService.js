const product = require("../models/Product");

const create = async (sellerId, data) =>{
    Product.create({...data, seller: sellerId})
};

const browse = async (search, category, page = 1) =>{
    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1);
    const filter = {status: "active"};

    if(category) filter.category = category;

    if(search){
        filter.$text = {$search: search};
    }

    return Prodcut.find({filter})
        .sort(search ? {score: {$meta: "textscore"}} : {createdAt: -1})
        .skip( (safePage - 1) * 20)
        .limit(20)
        .populate("seller", "name profilePicture")
        
}

const getById = async (productId) => {
    Product.findOne({_id: productId, status: "active"})
        .populate("seller", "name profilePicture")
};

const updateOwn = async (productId, sellerId, updates) => {
    Product.findOneAndUpdate(
        {_is: productId, seller: sellerId},
        updates,
        {new: true, runValidators: true}
    )
}

const deleteOwn = async (productId, sellerId) => {
    Product.findOneAndDelete({_id: productId, seller: sellerId})
};

module.exports = {create, browse, getById, updateOwn, deleteOwn}