const express = require('express');
const cors = require('cors')

const app = express();

app.listen(5050, () => {
    console.log('Server is running on localhost:5050')
});

app.use(cors())

app.use(express.json())

let data = [
    {
        id: 1,
        product: "Livro de programação",
        price: 30,
        stock: 10
    }
]

app.get('/live-test', (request, response) => {
    response.json({
        "message": "projeto groww online"
    }).send();
});

app.get('/products', (req, res) => res.json({
    data
}))

app.get('/products/:id', (req, res) => {
    const productId = Number(req.params.id)

    const product = data.find(data => data.id === productId)

    if (!product) {
        return res.json({
            "message": "Product not found"
        }).status(400).send();
    }

    return res.json({
        product
    }).status(200).send();
});

app.post('/products', (req, res) => {
    const id = data.length + 1
    const newProduct = {
        id: id,
        product: req.body.product,
        price: req.body.price,
        stock: req.body.stock
    }
    data.push(newProduct)
    return res.json({
        newProduct
    }).status(201).send();
})

app.post('/order/:id/:total', (req, res) => {
    const productId = Number(req.params.id)
    const purchasedTotal = Number(req.params.total)
    const product = data.findIndex(data => data.id === productId)

    if (!product) {
        return res.json({
            "message": "Product not found"
        }).status(400).send();
    }

    const totalAvaiable = product.stock - purchasedTotal

    if (totalAvaiable < 0) {
        return res.json({
            "message": "Not stock enougth"
        }).status(404).send();
    }

    data[findIndex].stock = totalAvaiable;

    return res.json({
        "product": data[findIndex],
        "message": "Order Placed"
    }).status(201).send();
})

app.route('/product/:id').put((req, res) => {
    const productId = Number(req.params.id)

    const product = data.find(data => data.id === productId)

    if (!user) {
        return res.json('Product nor found!')
    }

    const updatedProduct = {
        ...product,
        product: req.body.product,
        price: req.body.price,
        stock: req.body.stock
    }

    data = data.map(data => {
        if (data.id === productId) {
            data = updatedProduct
        }
        return data
    })

    return res.json({
        "product": updatedProduct,
        "message": "Product Updated"
    }).status(202).send();
})

app.route('/product/:id').delete((req, res) => {
    const productId = Number(req.params.id)

    data = data.filter(data => data.id !== productId)

    return res.json({
        "message": "Product deleted"
    }).status(201).send();
})

