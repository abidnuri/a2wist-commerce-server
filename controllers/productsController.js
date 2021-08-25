const Products = require("../models/productsModel");
const slugify = require("slugify");

exports.create = async (req, res, next) => {
    try {
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const newProducts = await new Products(req.body).save()
        res.json(newProducts);
    } catch (err) {
        console.log(err);
        // res.status(404).send("create product failed")
        res.status(404).json({
            err: err.message,
        })
    }
};

exports.read = async (req, res) => {
    let products = await Products.find({})
    res.json(products);
}