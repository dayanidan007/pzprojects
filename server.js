const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const formSchema = new Schema({
    name: String,
    date: String,
    comments: String,
    table: Array,
}, {
    capped: { size: 1024 },
    bufferCommands: false,
    autoCreate: false 
});


const Form = mongoose.model('form', formSchema);
mongoose.connect(
    'mongodb+srv://react-project:dayanproject@cluster0.jcara.mongodb.net/react-project?retryWrites=true&w=majority'
, { useNewUrlParser: true }).then(
    Form.createCollection()        
)


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/form', async (req, res) => {
    let {name, date, comments, table} = req.body
    let newForm = await new Form({ name, date, comments, table })
    try {
        await newForm.save()
        res.send(newForm)
    } catch (error) {
        res.send(error)
    }
})

const port = 4200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})

