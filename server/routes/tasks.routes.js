import { Router } from "express";
import {
  getProductos,
  getLocales,
  deleteTask,
  updateTask,
  getCategoriesPorTienda,
  createTipoLocal,
  productosPorTienda,
  getHorariosPorTienda,
  getTipoUsuario,
  getUsuarioPorTipo,
  getLocalesAbiertosAhora,
  getDescuentos,
  getDescuentosVigentes,
  getUbicacionPorUsuario,
  getPedidosPorEstado,
  getPedidosPorMotorizado,
  getPedidosPorCliente,
  getPedidosPorGenerado,
  getPedidosPorFecha,
  getDetallePedido,
  getLocal,
  getCountTipoProducto,
  getCountUsuarioPorTipo,
  getCountPedidosPorTienda,
  getCountPedidosPorMotorizado
} from "../controllers/tasks.controllers.js";

const router = Router();

router.get("/productos", getProductos);

router.get("/locales", getLocales);

router.get("/local/:nombreTienda", getLocal);

router.get('/productos/:nombreTienda', productosPorTienda);

router.get("/categorias/:nombreTienda", getCategoriesPorTienda);

router.get("/horarios/:nombreTienda", getHorariosPorTienda);

router.get("/tiposUsuario", getTipoUsuario);

router.get("/usuarioPorTipo/:nombreTipoUsuario", getUsuarioPorTipo);

router.get("/tiendasAbiertas", getLocalesAbiertosAhora);

router.get("/descuentos", getDescuentos);

router.get("/descuentosVigentes", getDescuentosVigentes);

router.get("/ubicacionUsuario/:nombreUsuario", getUbicacionPorUsuario);

router.get("/pedidosPorEstado/:estado", getPedidosPorEstado);

router.get("/pedidosPorMotorizado/:motorizado", getPedidosPorMotorizado);

router.get("/pedidosPorCliente/:cliente", getPedidosPorCliente);

router.get("/pedidosPorUsuario/:usuario", getPedidosPorGenerado);

router.get("/pedidosPorFecha/:fechaIni/:fechaFin", getPedidosPorFecha);

router.get("/detallePedido/:id", getDetallePedido);

router.get("/cantidadTipoProducto", getCountTipoProducto);

router.get("/countUsuarioPorTipo/:nombreTipoUsuario", getCountUsuarioPorTipo);

router.get("/countPedidosPorTienda/:nombreTienda/:fechaIni/:fechaFin", getCountPedidosPorTienda);

router.get("/countPedidosPorMotorizado/:nombreMotorizado/:fechaIni/:fechaFin", getCountPedidosPorMotorizado);





router.post("/crearTipoLocal", createTipoLocal);



router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);

export default router;
