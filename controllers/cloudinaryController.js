const cloudinary = require('cloudinary');

// congig
cloudinary.config({
    cloud_name: "eswapcommerce",
    api_key: "988577248893675",
    api_secret: "F7KgyIXgroECQD6SnCJ3FT8by-o",
});

exports.upload = async (req, res) => {
    let result = await cloudinary.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: "auto", //jpg or png
    });
    res.json({
        public_id: result.public_id,
        url: result.secure_url,
    });
}

exports.remove = async (req, res) => {
    let image_id = req.body.public_id;
    cloudinary.uploader.destroy(image_id, (err, result) => {
        if(err) return res.json({ success: false, err});
        res.send("OK")
    })
}