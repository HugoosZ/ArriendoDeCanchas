const pool = require('../../db');
const queries = require('./queries');

//CANCHA
const getCanchas = (req, res) => {
    pool.query(queries.getCanchas, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    }); 
}
const getCanchasById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const checkId = await pool.query(queries.checkCanchaById, [id]);

        if (checkId.rows.length === 0) {
            res.status(404).json({ message: "No existe la cancha" });
        } else {
            const results = await pool.query(queries.getCanchasById, [id]);
            res.status(200).json(results.rows);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la información de la cancha' });
    }
};
const addCancha = (req, res) => {
    const nombre = req.body.nombre;
    const deporte = req.body.deporte;
    const ubicacion = req.body.ubicacion;
    const tarifa = req.body.tarifa;
    const estado = req.body.estado;

    pool.query(queries.checkCanchaExist, [nombre], (error, results) => {
        if(results.rows.length){
            res.status(200).send('La cancha ya existe');
        }
        pool.query(queries.addCancha, [nombre, deporte, ubicacion, tarifa, estado], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).json({message: "Cancha agregada con exito!"});
        });
    });
}
const deleteCancha = async (req, res) => {
    const id = parseInt(req.params.id);
    const estado = await pool.query(queries.checkStatusCancha, [id]);
    pool.query(queries.deleteCancha, [id], (error, results) => {
        const noCanchaFound = !results.rowCount;
        if (noCanchaFound) {
            res.send('Cancha no encontrada');
        }
        
        else if (estado.rows.length === 0) {
            res.status(200).json({ message: `Cancha eliminada con exito!` });
        }
        else{
            res.send('No se puede eliminar la cancha, esta ocupada o reservada');
        }
        
    });
};
const updateCancha = async (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const deporte = req.body.deporte;
    const ubicacion = req.body.ubicacion;
    const tarifa = req.body.tarifa;
    const estado = req.body.estado;

    if (nombre === undefined || nombre === null) {
        return res.status(400).json({ error: 'El campo "nombre" es obligatorio y no puede ser nulo.' });
    }
    try {
        const canchasId = await pool.query('SELECT id FROM cancha WHERE id = $1', [id]);
        if (!canchasId.rows.length) {
            return res.json({ message: "No existe la cancha" });
        }
        const result = await pool.query(queries.updateCancha, [nombre, deporte, ubicacion, tarifa, estado, id]);
        res.json({ success: true, message: "Actualizado con exito!" });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cancha' });
    }
};

//PROPIETARIOS
const getPropietarios = async (req, res) => {
    try {
        const response = await pool.query(queries.getPropietarios);
        res.json(response.rows);
    } catch (error) {
        res.json({message: "Error al obtener los propietarios"});
    }
}

const getPropietariosById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPropietarioById, [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}
const addPropietario = async (req, res) => {
    const rut = req.body.rut;
    const digito_verificador = req.body.digito_verificador;
    const id_cancha = req.body.id_cancha;
    const telefono = req.body.telefono;

    const checkCancha = await pool.query(queries.checkCanchaPropietario, [id_cancha]);
    if (checkCancha.rows.length > 0) {
        return res.status(400).json({ message: 'La cancha ya tiene un propietario' });
    }

    const canchaId = await pool.query(queries.checkCanchaExist, [id_cancha]);
    if (!canchaId.rows.length) {
        return res.status(404).json({ message: 'No existe la cancha' });
    }
    pool.query(queries.addPropietario, [rut, digito_verificador, id_cancha, telefono], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Propietario agregado`);
    });
}
const updatePropietario = async (req, res) => {
    const id = req.params.id;
    const rut = req.body.rut;
    const digito_verificador = req.body.digito_verificador;
    const id_cancha = req.body.id_cancha;
    const telefono = req.body.telefono;
    try {
        const propietarioId = await pool.query ('SELECT id FROM propietario WHERE id = $1', [id]);
        if (!propietarioId.rows.length) {
            res.json({ message: "No existe el propietario" });
        } else {
            const result = await pool.query(queries.updatePropietario, [rut, digito_verificador, id_cancha, telefono, id]);
            console.log(result);
            res.json({ message: "Propietario actualizado con exito!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el Propietario" });
    }
};
const deletePropietario = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.deletePropietario, [id], (error, results) => {
        const noPropietarioFound = !results.rowCount;
        if (noPropietarioFound) {
            res.send('Propietario no encontrado');
        }
        res.status(200).json({ message: `Propietario eliminado con éxito` });
    });
};

//ARRENDATARIOS
const getArrendatarios = (req, res) => {
    pool.query(queries.getArrendatarios, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    }); 
}
const getArrendatarioById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getArrendatarioById, [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}
const addArrendatario = (req, res) => {
    const rut = req.body.rut;
    const digito_verificador = req.body.digito_verificador;
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    pool.query(queries.addArrendatario, [rut, digito_verificador, nombre, correo, telefono], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).json({message: "Arrendatario agregado con exito!"});
    });
}
const updateArrendatario = async (req, res) => {
    const id = req.params.id;
    const rut = req.body.rut;
    const digito_verificador = req.body.digito_verificador;
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const telefono = req.body.telefono;

    if (nombre === undefined || nombre === null) {
        return res.status(400).json({ error: 'El campo "nombre" es obligatorio y no puede ser nulo.'});
    }
    try {
        const arrendatarioId = await pool.query('SELECT id FROM arrendatario WHERE id = $1', [id]);
        if (!arrendatarioId.rows.length) {
            res.json({ message: "No existe el arrendatario" });
        } else {
            const result = await pool.query(queries.updateArrendatario, [rut, digito_verificador, nombre, correo, telefono, id]);
            console.log(result);
            res.json({ message: "Arrendatario actualizado con exito!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el arrendatario" });
    }
};

const deleteArrendatario = async (req, res) => {
    const id = parseInt(req.params.id);
    const checkArrendatario = pool.query(queries.checkArrendatarioReserva, [id]);
    if(!checkArrendatario.rows.length){
        res.json({message: "No es posible eliminar el arr"})
    }
    pool.query(queries.deleteArrendatario, [id], (error, results) => {
        const noArrendatarioFound = !results.rowCount;
        if (noArrendatarioFound) {
            res.send('Arrendatario no encontrado');
        }
        res.status(200).json({ message: `Arrendatario eliminado con exito` });
    });
};

const addReserva = (req, res) => {
    const id_cancha = req.body.id_cancha;
    const id_propietario = req.body.id_propietario;
    const id_arrendatario = req.body.id_arrendatario;
    const fecha = req.body.fecha;
    const hora_inicio = req.body.hora_inicio;
    const hora_fin = req.body.hora_fin;

    pool.query(queries.checkCanchaById, [id_cancha], (error, results) => {
        if (error) {
            throw error;
        }

        if (!results.rows.length) {
            return res.status(400).json({ message: 'La cancha no existe' });
        }

        pool.query(queries.checkPropietarioById, [id_propietario], (error, results) => {
            if (error) {
                throw error;
            }

            if (!results.rows.length) {
                return res.status(400).json({ message: 'El propietario no existe' });
            }

            pool.query(queries.checkArrendatarioById, [id_arrendatario], (error, results) => {
                if (error) {
                    throw error;
                }

                if (!results.rows.length) {
                    return res.status(400).json({ message: 'El arrendatario no existe' });
                }

                pool.query(queries.addReserva, [id_cancha, id_propietario, id_arrendatario, fecha, hora_inicio, hora_fin], (error, results) => {
                    if (error) {
                        throw error;
                    }

                    res.status(201).json({ message: 'Reserva agregada con exito!' });
                });
            });
        });
    });
};



//COMENTARIOS

const getComentarios = (req, res) => {
    pool.query(queries.getComentarios, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    }); 
}

const getComentariosById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const checkId = await pool.query(queries.checkComentariosById, [id]);

        if (checkId.rows.length === 0) {
            res.status(404).json({ message: "No existe comentario" });
        } else {
            const results = await pool.query(queries.getComentariosById, [id]);
            res.status(200).json(results.rows);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el comentario' });
    }
};


module.exports = {
    getCanchas,
    getCanchasById,
    addCancha,
    deleteCancha,
    updateCancha,
    updatePropietario,
    getPropietarios,
    getPropietariosById,
    addPropietario,
    deletePropietario,
    getArrendatarios,
    getArrendatarioById,
    addArrendatario,
    updateArrendatario,
    deleteArrendatario,
    getComentarios,
    getComentariosById,
    addReserva
}