const { Router } = require('express');
const router = new Router();
const fs = require('fs');
const tiendas = require('../sample.json');
const key = require('../key.json');
const bcrypt = require("bcrypt");
let mongo = require('../mongodb.js');

router.get('/', (req, res) => {
    res.json(tiendas);
});

router.post('/', async(req, res) => {

    const idUsuario = "" + (tiendas.length + 1) + "";
    var { Nombre, Direccion, NumTel, Email, password, Foto } = req.body;
    const newTienda = { idUsuario, Nombre, Direccion, NumTel, Email, password, Foto };
    if (idUsuario) {
        //mostrar cambios
        let ins = new mongo({ email: Email, Nombre: Nombre, Direccion: Direccion, Telefono: NumTel, contraseña: password });
        const res = await ins.save();
        res.status(200).json({ success: 'Se registro con exito' });
    } else {
        res.status(500).json({ error: 'Huvo un error al insertar.' });
    }
});