const express = require("express")
const app = express()
const productRoutes = require("./routes/products")
const userRoutes = require("./routes/User")
app.use(express.json())  //middleware //tell app that now it can accept j.son

const mongoose = require("mongoose");
const verifyToken = require("./middleware/auth")
 
mongoose.connect("mongodb+srv://artikaafaisal:1234@cluster0.msk6eml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
   .then(() => console.log("MongoDB connected"))
   .catch((err) => console.error("Connection error:", err));


function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next(); //continue to the route handler
}

app.use(logger);


//            request (what we ask the server) | response (what server give to us)
app.get("/", (req, res) => {
        res.send("API OK! SERVER OK! NODEMON OK!")
})

app.get("/search", (req, res) => {
    const keyword = req.query.q;
    const keyword2 = req.query.type;
    res.send(`Searching for ${keyword} and  ${keyword}`);
  });


//            request (what we ask the server) | response (what server give to us)
app.get("/test", (req, res) => {
        res.send("Test route ok!")
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


app.post("/message", (req, res) => {
    const message = req.body.text;
    res.send(`You said: ${message}`);
});

// app.put("/products/:pid", (req, res) => {
//     const pid = req.params.pid
//     const indexOfProduct = products.findIndex(product => product.id == pid)
//     res.send(indexOfProduct)
// })


app.use("/products", productRoutes)
app.use("/user", userRoutes)

app.get("/dashboard", verifyToken, (req,res) => {
    
})

app.listen(3000, () => console.log("server is running on http://localhost:3000"))


