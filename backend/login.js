const { Router } = require('express');
const router = new Router();
const tiendas = require('../sample.json');
const key = require('../key.json');
const bcrypt = require("bcrypt");

router.get('/', (req, res) => {
    res.json(key);
});

router.post('/', (req, res) => {
    var { Email, password } = req.body;


    if (Email) {
        //mostrar cambios
        let x = null;
        _.each(tiendas, function(tienda, i) {
            bytes = cryptoAES.AES.decrypt(tienda.password.toString(), key.key);
            var laps = bytes.toString(cryptoAES.enc.Utf8);
            console.log(Email);
            console.log(laps);
            if (tienda.Email == Email && laps == password) {
                tienda.Nombre = '' + cryptoAES.AES.encrypt(tienda.Nombre, key.key) + '';
                tienda.Direccion = '' + cryptoAES.AES.encrypt(tienda.Direccion, key.key) + '';
                tienda.NumTel = '' + cryptoAES.AES.encrypt(tienda.NumTel, key.key) + '';
                tienda.Email = '' + cryptoAES.AES.encrypt(tienda.Email, key.key) + '';
                //res.json(tienda);
                x = tienda;
            } else {
                console.error("Fallo");
            }
        });
        setTimeout(() => {
            // console.log(x);

            if (x != null) {
                res.status(200).json(x)
            } else {

                res.status(500).json({ error: 'Datos incorrectos.2' });
            }
        }, 500);
    } else {
        res.status(500).json({ error: 'Datos incorrectos.1' });
    }
});

module.exports = router;