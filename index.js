const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Tienda', { useNewUrlParser: true })
    .then(() => {
        console.log('Conectado');
    })
    .catch(err => {
        console.log('Error: ', err);
    });


app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});

    }
    next();
});


// settings
app.set('port', process.env.PORT || 4000);


app.listen(app.get('port'), async() => {

    // const usuario = await m.findByIdAndDelete({ _id: '5cd3836acd96342a64e5f36c' });
    // console.log(usuario);

    console.log(`Server on port ${app.get('port')}`);
});