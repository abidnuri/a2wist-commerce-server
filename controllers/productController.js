const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const AppError = require('../utils/AppError')

const decodeToken = require('../utils/decodeToken')

exports.addProduct = asyncHandler(async(req, res, next) => {
    const user = await decodeToken(req.cookies.token);

    if(user.role === 'SELLER'){
        const newProduct = await Product.create({...req.body, shopID: user.email});
        if(newProduct){
            res.status(201).json({status: 'success', product: newProduct})
        }else {
        res.status("401").json({ status: "fail", message: "Something went wrong" });
        }
    }
    // next(err => new AppError(err, 401))
})

exports.getAllProduct = asyncHandler(async(req,res, next) => {
    const products = await Product.find()

    if(products){
        const filtered = products.map(item => {
            return { title: item.title, regularPrice: item.regularPrice, description: item.description, image: item.image, id: item._id, inStock: item.stock > 0, category: item.category}
        })
        res.status(200).json({status: 'success', result: filtered.length, data: filtered})
    }
    // else {
    //     res.status(400).json({status: 'fail', message: 'Something went wrong..'})
    // }
    next()
})

exports.myProducts = asyncHandler(async(req, res, next) => {
    const user = await decodeToken(req.cookies.token);
    
    if(user.role === 'SELLER'){
        const products = await Product.find({shopID: user.email})

        if(products){
            res.status(200).json({
                status: 'success',
                data: products
            })
        }else{
            res.status(401).json({
                status: 'fail',
                message: `Cant't find products for your shop.`
            })
        }
    }else {
        res.status(401).json({
            status: 'fail',
            message: `Cant't find your shop!`
        })
    }
    next()
})

exports.updateProduct = asyncHandler(async(req, res, next) => {
    console.log(req.params.id)

    const user = await decodeToken(req.cookies.token);

    const product = await Product.findById(req.params.id);
    console.log(req.body)

    if(user.email === product.shopID) {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json({status: 'success', data: updated})
    }
    next()
})