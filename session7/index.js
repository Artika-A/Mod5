const express = require("express")
const app = express()
app.use(express.json())  //middleware //tell app that now it can accept j.son

function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next(); //continue to the route handler
}

app.use(logger);


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
app.get("/", (req, res) => {
        res.send("API OK! SERVER OK! NODEMON OK!")
})

//            request (what we ask the server) | response (what server give to us)
app.get("/test", (req, res) => {
        res.send("Test route ok!")
})

//            request (what we ask the server) | response (what server give to us)
app.get("/products", (req, res) => {  //read
        res.json(products)
})


// app.post("/products", (req, res) => {
//     const pid = req.body.id;
//     const productName = req.body.name
//     const newProduct = {
//         id: pid,
//         name: productName
//     }
//     products.push(newProduct)
//     res.json(newProduct)

// })


app.post("/products", (req, res) => {
    const lastProduct=products[products.length - 1]
    const lastId = lastProduct.id
    const pid = lastId + 1
    const productName = req.body.name
    const newProduct = {
        id: pid,
        name: productName
    }
    products.push(newProduct)
    res.json(newProduct)
})


app.post("/message", (req, res) => {
    const message = req.body.text;
    res.send(`You said: ${message}`);
});

// app.put("/products/:pid", (req, res) => {
//     const pid = req.params.pid
//     const indexOfProduct = products.findIndex(product => product.id == pid)
//     res.send(indexOfProduct)
// })

app.put("/products/:pid", (req, res) => {
    const pid = req.params.pid
    const newProductName = req.body.name
    const indexOfProduct = products.findIndex(product => product.id == pid)
    products[indexOfProduct].name = newProductName
    res.json(products[indexOfProduct])
}) //update

app.delete("/products/:pid", (req, res) => {
    const pid = req.params.pid
    const indexOfProduct = products.findIndex(product => product.id == pid)
    products.splice(indexOfProduct, 1)
    res.json(products)
})



app.listen(3000, () => console.log("server is running on http://localhost:3000"))


