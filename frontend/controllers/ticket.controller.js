const axios = require("axios");

// ==========================================
// 1. Ver el Tablero Kanban del Proyecto
// ==========================================
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

    // Extraemos los tres arreglos que vienen del backend
    const { pendientes, enProgreso, completados } = response.data;

    // Como el backend no manda el nombre del proyecto en esta ruta, usamos el ID
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

// ==========================================
// 2. Mostrar Formulario de "Nuevo Ticket"
// ==========================================
exports.getCrearTicket = async (req, res) => {
  try {
    const { proyectoId } = req.params;
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");

    // Pedimos al backend la lista de usuarios para llenar el <select> de "Asignado a"
    const responseUsuarios = await axios.get(
      "http://localhost:3000/api/usuarios",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    // Simulamos el objeto proyecto para el título del formulario y el botón de cancelar
    const proyecto = { id: proyectoId, nombre: `Proyecto #${proyectoId}` };
    const usuarios = responseUsuarios.data;

    res.render("proyectos/crear-ticket", { proyecto, usuarios });
  } catch (error) {
    console.error("Error al cargar formulario de ticket:", error.message);
    res.redirect(`/proyectos/${req.params.proyectoId}/tablero`);
  }
};

// ==========================================
// 3. Procesar el Formulario y Guardar Ticket
// ==========================================
exports.postCrearTicket = async (req, res) => {
  try {
    const { proyectoId } = req.params;
    const { titulo, descripcion, usuarioAsignadoId } = req.body;
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");

    // Enviamos la petición SIN el 'estado'
    await axios.post(
      "http://localhost:3000/api/tickets",
      {
        titulo,
        descripcion,
        // Convertimos los IDs a números por si acaso Joi también los pide numéricos
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
// ==========================================
// 4. Mostrar Formulario de "Editar Ticket"
// ==========================================
exports.getEditarTicket = async (req, res) => {
  try {
    const { proyectoId, ticketId } = req.params;
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");

    // Pedimos los datos actuales del ticket
    const responseTicket = await axios.get(
      `http://localhost:3000/api/tickets/${ticketId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    // Pedimos la lista de usuarios para el <select>
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

// ==========================================
// 5. Procesar el Formulario y Actualizar Ticket
// ==========================================
exports.postEditarTicket = async (req, res) => {
  try {
    const { proyectoId, ticketId } = req.params;
    const { titulo, descripcion, estado, usuarioAsignadoId } = req.body;
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");

    // Enviamos la petición PUT a la API del backend para actualizar
    await axios.put(
      `http://localhost:3000/api/tickets/${ticketId}`,
      {
        titulo,
        descripcion,
        estado, // Aquí sí enviamos el estado
        usuarioAsignadoId:
          usuarioAsignadoId === "" ? null : parseInt(usuarioAsignadoId, 10),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    // Volvemos al tablero para ver los cambios
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
// ==========================================
// 6. Eliminar un Ticket
// ==========================================
exports.postEliminarTicket = async (req, res) => {
  try {
    const { proyectoId, ticketId } = req.params;
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");

    // Llamamos a la ruta DELETE que acabas de crear en el backend
    await axios.delete(`http://localhost:3000/api/tickets/${ticketId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Redirigimos al tablero para confirmar que ya no está
    res.redirect(`/proyectos/${proyectoId}/tablero`);
  } catch (error) {
    console.error("Error al eliminar el ticket:", error.message);
    res.redirect(`/proyectos/${req.params.proyectoId}/tablero`);
  }
};
