//CANCHAS
const getCanchas = "SELECT * FROM cancha";
const getCanchasById = "SELECT * FROM cancha WHERE id = $1";
const addCancha = "INSERT INTO cancha (nombre, deporte, ubicacion, tarifa, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const updateCancha = "UPDATE cancha SET nombre=$1, deporte=$2, ubicacion=$3, tarifa=$4, estado=$5 WHERE id=$6";
const deleteCancha = "DELETE FROM cancha WHERE id = $1";
const checkStatusCancha = "SELECT estado FROM cancha WHERE id = $1";

//PROPIETARIOS
const getPropietarios = "SELECT * FROM propietario";
const getPropietarioById = "SELECT * FROM propietario WHERE id = $1";
const addPropietario = "INSERT INTO propietario (rut, digito_verificador, id_cancha, telefono) VALUES ($1, $2, $3, $4)";
const updatePropietario = "UPDATE propietario SET rut=$1, digito_verificador=$2, id_cancha=$3, telefono=$4 WHERE id=$5";
const deletePropietario = "DELETE FROM propietario WHERE id = $1";

//ARENDATARIOS
const getArrendatarios = "SELECT * FROM arrendatario";
const getArrendatarioById = "SELECT * FROM arrendatario WHERE id = $1";
const addArrendatario = "INSERT INTO arrendatario (rut, digito_verificador, nombre, correo, telefono) VALUES ($1, $2, $3, $4, $5)";
const updateArrendatario = "UPDATE arrendatario SET rut=$1, digito_verificador=$2, nombre=$3, correo=$4, telefono=$5 WHERE id=$6";
const deleteArrendatario = "DELETE FROM arrendatario WHERE id = $1";

//RESERVA y CHECKEOS
const addReserva = "INSERT INTO reserva (id_cancha, id_arrendatario, fecha, hora_inicio, hora_fin) VALUES ($1, $2, $3, $4, $5)";
const checkCanchaById = "SELECT id FROM cancha WHERE id = $1";
const checkCanchaExist = "SELECT s FROM cancha s WHERE s.id = $1";
const checkArrendatarioById = "SELECT id FROM arrendatario WHERE id = $1";
const checkPropietarioById = "SELECT id FROM propietario WHERE id = $1";
const checkCanchaPropietario = ` SELECT id FROM propietario  WHERE id_cancha = $1 LIMIT 1`;
const checkArrendatarioReserva = "SELECT reserva.id_arrendatario FROM reserva JOIN arrendatario ON arrendatario.id = reserva.id_arrendatario WHERE arrendatario.id = $1";

//COMENTARIOS 
const getComentarios = "SELECT * FROM comentario";
const getComentariosById = "SELECT * FROM comentario WHERE id = $1";
const checkComentariosById = "SELECT id FROM comentario WHERE id = $1";

module.exports = {
    getCanchas,
    getCanchasById,
    checkCanchaExist,
    addCancha,
    updateCancha,
    deleteCancha,
    getPropietarios,
    getPropietarioById,
    addPropietario,
    checkPropietarioById,
    updatePropietario,
    deletePropietario,
    getArrendatarios,
    getArrendatarioById,
    addArrendatario,
    checkArrendatarioById,
    updateArrendatario,
    deleteArrendatario,
    checkCanchaById,
    addReserva,
    getComentarios,
    getComentariosById,
    checkComentariosById,
    checkStatusCancha,
    checkArrendatarioReserva,
    checkCanchaPropietario
};