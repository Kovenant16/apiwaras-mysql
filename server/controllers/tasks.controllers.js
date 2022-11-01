import { pool } from "../db.js";

export const getProductos = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM producto"
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getLocales = async (req, res) => {
    try {
        const [result] = await pool.query(
            "select * from  tienda"
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getLocal = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM tienda WHERE nombreTienda=?;",[
                req.params.nombreTienda
            ]
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const productosPorTienda = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM producto P LEFT JOIN tienda T ON P.idTienda = T.idTienda WHERE T.nombreTienda = ?", [
            req.params.nombreTienda,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Tienda sin productos" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCategoriesPorTienda = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT p.idTipoProducto, tp.nombreTipoProducto FROM producto p, tipoproducto tp, tienda t WHERE t.nombreTienda = ? AND  tp.idTipoProducto = p.idTipoProducto AND p.idTienda = t.idTienda GROUP BY idTipoProducto", [
            req.params.nombreTienda,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Tipos de producto no existentes" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getHorariosPorTienda = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT  diaSemanaHorario, horaAperturaHorario, horaCierreHorario FROM horario h LEFT JOIN tienda t ON h.idTienda = t.idTienda WHERE nombreTienda=? ORDER BY diaSemanaHorario;", [
            req.params.nombreTienda,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Horario inexistente" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTipoUsuario = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM tipoUsuario;");

        if (result.length === 0)
            return res.status(404).json({ message: "No hay tipos de usuario" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUsuarioPorTipo = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT u.idUsuario, u.nombreUsuario FROM usuario u, tipousuario tu WHERE u.idTipoUsuario = tu.idTipoUsuario AND nombreTipoUsuario = ?;", [
            req.params.nombreTipoUsuario,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Usuarios inexistentes" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getLocalesAbiertosAhora = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT nombreTienda, horaAperturaHorario, horaCierreHorario FROM horario h, tienda t WHERE TIME(now()) < horaCierreHorario AND TIME(now()) > horaAperturaHorario AND (dayofweek(NOW())+5) mod 7 = diaSemanaHorario AND h.idTienda = t.idTienda;");

        if (result.length === 0)
            return res.status(404).json({ message: "Ninguna tienda abierta" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getDescuentos = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM descuento;");

        if (result.length === 0)
            return res.status(404).json({ message: "Ningún descuento creado" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getDescuentosVigentes = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT codigoDescuento, fechaCreacionDescuento, fechaInicioDescuento, fechaFinDescuento, montoDescuento, descripcionDescuento FROM descuento WHERE DATE(NOW()) > fechaInicioDescuento AND DATE(NOW()) < fechaFinDescuento;");

        if (result.length === 0)
            return res.status(404).json({ message: "Ningún descuento vigente" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUbicacionPorUsuario = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT idUbicacion, ub.idUsuario, telefonoUbicacion, direccionUbicacion, latLongUbicacion, referenciaUbicacion, asuntoUbicacion FROM ubicacion ub, usuario us WHERE ub.idUsuario = us.idUsuario AND us.nombreUsuario = ?;", [
            req.params.nombreUsuario,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Usuario sin ubicación" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPedidosPorEstado = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM pedido WHERE estadoPedido = ? ORDER BY fechaPedido, horaPedido LIMIT 50;", [
            req.params.estado,
            req.params.limit
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "No hay pedidos con este estado" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPedidosPorMotorizado = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM pedido p, usuario u WHERE idUsuario = idMotorizado AND nombreUsuario = ? ORDER BY fechaPedido, horaPedido LIMIT 50;", [
            req.params.motorizado,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Motorizado sin Pedidos" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPedidosPorCliente = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM pedido p, usuario u WHERE idUsuario = idCliente AND nombreUsuario = ? ORDER BY fechaPedido, horaPedido LIMIT 50;", [
            req.params.cliente,
            req.params.limit
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Cliente sin Pedidos" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Quién generó el pedido
export const getPedidosPorGenerado = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM pedido p, usuario u WHERE idUsuario = idGenerado AND nombreUsuario = ? ORDER BY fechaPedido, horaPedido LIMIT 50;", [
            req.params.usuario,
            req.params.limit
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Usuario aún no genera pedidos" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPedidosPorFecha = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM pedido WHERE ? <= fechaPedido AND fechaPedido <= ?", [
            req.params.fechaIni,
            req.params.fechaFin,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "No hay pedidos entre estas fechas" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getDetallePedido = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT d.idPedido, p.nombreProducto,p.precioProducto, d.cantidadDetalle Cantidad, p.precioProducto * d.cantidadDetalle Subtotal FROM detallepedido d, producto p WHERE d.idProducto = p.idProducto AND d.idPedido = ?", [
            req.params.id,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Pedido sin productos" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message + 'asdasd'});
    }
};


// CONTADORES:

export const getCountTipoProducto = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT COUNT(*) FROM tipoProducto;");

        if (result.length === 0)
            return res.status(404).json({ message: "No hay tipos de producto" });

            res.json(result[0]["COUNT(*)"]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCountUsuarioPorTipo = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT COUNT(*) FROM usuario u, tipousuario t WHERE u.idTipoUsuario = t.idTipoUsuario AND t.nombreTipoUsuario=?;",[
            req.params.nombreTipoUsuario
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "No hay usuarios de este tipo" });

            res.json(result[0]["COUNT(*)"]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCountPedidosPorTienda = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT COUNT(DISTINCT(p.idPedido)) FROM pedido p, detallepedido d, producto pr, tienda t WHERE p.idPedido=d.idPedido AND d.idProducto=pr.idProducto AND t.idTienda=pr.idTienda AND t.nombreTienda=? AND ? <= fechaPedido AND fechaPedido <= ?;",[
            req.params.nombreTienda,
            req.params.fechaIni,
            req.params.fechaFin
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "No hay pedidos de esta tienda" });

        res.json(result[0]["COUNT(DISTINCT(p.idPedido))"]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCountPedidosPorMotorizado = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT COUNT(*) FROM pedido p, usuario u WHERE u.idUsuario=p.idMotorizado AND u.nombreUsuario=? AND ? <= fechaPedido AND fechaPedido <= ?;",[
            req.params.nombreMotorizado,
            req.params.fechaIni,
            req.params.fechaFin
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "No hay pedidos de esta tienda" });

        res.json(result[0]["COUNT(*)"]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};






export const createTipoLocal = async (req, res) => {
    try {
        const { nombre, description } = req.body;
        const [result] = await pool.query(
            "INSERT INTO tipoLocal (nombreTipoLocal, descripcionTipoLocal) VALUES (?, ?)",
            [nombre, description]
        );
        res.json({
            id: result.insertId,
            nombre,
            description,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const result = await pool.query("UPDATE tasks SET ? WHERE id = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Task not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
