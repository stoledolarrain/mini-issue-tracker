const axios = require("axios");


exports.getTablero = async (req, res) => {
  try {
    const { proyectoId } = req.params;
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");

    const response = await axios.get(
      `http://localhost:3000/api/tickets/tablero/${proyectoId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const { pendientes, enProgreso, completados } = response.data;

    const proyecto = { id: proyectoId, nombre: `Proyecto #${proyectoId}` };

    res.render("proyectos/tablero", {
      proyecto,
      pendientes: pendientes || [],
      enProgreso: enProgreso || [],
      completados: completados || [],
    });
  } catch (error) {
    console.error("Error al cargar el tablero:", error.message);
    res.redirect("/proyectos");
  }
};

exports.getCrearTicket = async (req, res) => {
  try {
    const { proyectoId } = req.params;
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");

    const responseUsuarios = await axios.get(
      "http://localhost:3000/api/usuarios",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const proyecto = { id: proyectoId, nombre: `Proyecto #${proyectoId}` };
    const usuarios = responseUsuarios.data;

    res.render("proyectos/crear-ticket", { proyecto, usuarios });
  } catch (error) {
    console.error("Error al cargar formulario de ticket:", error.message);
    res.redirect(`/proyectos/${req.params.proyectoId}/tablero`);
  }
};

exports.postCrearTicket = async (req, res) => {
  try {
    const { proyectoId } = req.params;
    const { titulo, descripcion, usuarioAsignadoId } = req.body;
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");

    await axios.post(
      "http://localhost:3000/api/tickets",
      {
        titulo,
        descripcion,
        proyectoId: parseInt(proyectoId, 10),
        usuarioAsignadoId: usuarioAsignadoId
          ? parseInt(usuarioAsignadoId, 10)
          : null,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    res.redirect(`/proyectos/${proyectoId}/tablero`);
  } catch (error) {
    if (error.response) {
      console.error("Motivo del rechazo (400):", error.response.data);
    } else {
      console.error("Error al crear el ticket:", error.message);
    }
    res.redirect(`/proyectos/${req.params.proyectoId}/tablero`);
  }
};


exports.getEditarTicket = async (req, res) => {
  try {
    const { proyectoId, ticketId } = req.params;
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");

    const responseTicket = await axios.get(
      `http://localhost:3000/api/tickets/${ticketId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const responseUsuarios = await axios.get(
      "http://localhost:3000/api/usuarios",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const proyecto = { id: proyectoId, nombre: `Proyecto #${proyectoId}` };
    const ticket = responseTicket.data;
    const usuarios = responseUsuarios.data;

    res.render("proyectos/editar-ticket", { proyecto, ticket, usuarios });
  } catch (error) {
    console.error("Error al cargar formulario de edición:", error.message);
    res.redirect(`/proyectos/${req.params.proyectoId}/tablero`);
  }
};

exports.postEditarTicket = async (req, res) => {
  try {
    const { proyectoId, ticketId } = req.params;
    const { titulo, descripcion, estado, usuarioAsignadoId } = req.body;
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");

    await axios.put(
      `http://localhost:3000/api/tickets/${ticketId}`,
      {
        titulo,
        descripcion,
        estado,
        usuarioAsignadoId:
          usuarioAsignadoId === "" ? null : parseInt(usuarioAsignadoId, 10),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    res.redirect(`/proyectos/${proyectoId}/tablero`);
  } catch (error) {
    if (error.response) {
      console.error("Error al actualizar (400):", error.response.data);
    } else {
      console.error("Error al actualizar el ticket:", error.message);
    }
    res.redirect(`/proyectos/${req.params.proyectoId}/tablero`);
  }
};

exports.postEliminarTicket = async (req, res) => {
  try {
    const { proyectoId, ticketId } = req.params;
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");

    await axios.delete(`http://localhost:3000/api/tickets/${ticketId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.redirect(`/proyectos/${proyectoId}/tablero`);
  } catch (error) {
    console.error("Error al eliminar el ticket:", error.message);
    res.redirect(`/proyectos/${req.params.proyectoId}/tablero`);
  }
};
