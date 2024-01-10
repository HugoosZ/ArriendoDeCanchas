const express = require('express');
const controller = require('./controller');
const router = express.Router();

//CANCHAS
router.get("/canchas", controller.getCanchas);
router.get("/canchas/:id", controller.getCanchasById);
router.post("/canchas/crear", controller.addCancha);
router.delete("/canchas/eliminar/:id", controller.deleteCancha);
router.put("/canchas/actualizar/:id", controller.updateCancha);

//PROPIETARIOS
router.put("/propietarios/actualizar/:id", controller.updatePropietario);
router.get("/propietarios", controller.getPropietarios);
router.get("/propietarios/:id", controller.getPropietariosById);
router.post("/propietarios/crear", controller.addPropietario);
router.delete("/propietarios/eliminar/:id", controller.deletePropietario);

//ARRENDATARIOS
router.get("/arrendatarios/", controller.getArrendatarios);
router.get("/arrendatarios/:id", controller.getArrendatarioById);
router.post("/arrendatarios/crear", controller.addArrendatario);
router.put("/arrendatarios/actualizar/:id", controller.updateArrendatario);
router.delete("/arrendatarios/eliminar/:id", controller.deleteArrendatario);


//COMENTARIOS
router.get("/comentarios", controller.getComentarios);
router.get("/comentarios/:id", controller.getComentariosById);

//RESERVA
router.post("/reserva/crear", controller.addReserva);

module.exports = router;