const express = require("express")
const router = express.Router()
const logger = require("../middleware/logger")
router.use(logger)


const ProductModel= require("../models/Products")
const ProductRouter = require("../routes/products")

const products = [
    {
        id: 1,
        name: "Shampoo"
    },
    {    id: 2,
        name: "Toothbrush"
    },
    {
        id: 3,
        name: "Toothpaste"
    }
]


//            request (what we ask the server) | response (what server give to us)
router.get("/", async(req, res) => {           //read
    const productFromDB = await Products.find()   // need await because we need the database to tell us the information
        res.json(productFromDB)
})

router.get("/search", (req, res) => {  
    const query = req.query.q;
    const searchProducts = products.filter(product => product.name.includes(query));
    res.json(searchProducts);
});


router.post("/", (req, res) => {
    const lastProduct=products[products.length - 1]
    const lastId = lastProduct.id
    const pid = lastId + 1
    const productName = req.body.name  //to use re.body we need the line no 3 above => app.use(express.json())
    const newProduct = {
        id: pid,
        name: productName
    }
    products.push(newProduct)
    res.json(newProduct)
})

router.put("/", async (req, res) => {
    const newProduct = new Products(req.body)
    const saved = await newProduct.save()
    res.json(saved)
})

 router.put("/:pid", async(req, res) => {
    const updated = await Products.findByIdAndUpdate(req.params.pid, req.body, { new: true})
    res.json(updated)
 })

// router.put("/:pid", (req, res) => {
//     const pid = req.params.pid
//     const newProductName = req.body.name
//     const indexOfProduct = products.findIndex(product => product.id == pid)
//     products[indexOfProduct].name = newProductName
//     res.json(products[indexOfProduct])
// }) //update

router.delete("/:pid", (req, res) => {
    const pid = req.params.pid
    const indexOfProduct = products.findIndex(product => product.id == pid)
    products.splice(indexOfProduct, 1)
    res.json(products)
})

module.exports = router