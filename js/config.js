/* =========================================================
   CONFIGURACIÓN DE LA INVITACIÓN
   Cambia aquí todos los datos. No necesitas tocar nada más.
   ========================================================= */
window.INVITACION = {
  nombre: "Fernanda",
  titulo: "Mis XV Años",

  // Fecha y hora del evento (formato AAAA-MM-DDTHH:MM:SS)
  fecha: "2026-11-21T17:00:00", // 21 de noviembre de 2026 (ajusta la hora)

  // Canción de fondo (pon tu archivo .mp3 en assets/music/)
  musica: "assets/music/cancion.mp3",

  // Textos del libro de la portada (el cuento)
  cuento: {
    portada: "Érase una vez...",
    pagina1: "En un reino lleno de rosas y encanto, nació una princesa de corazón noble y mirada soñadora.",
    pagina2: "Tres hadas madrinas le regalaron sus dones: belleza, alegría y un corazón lleno de sueños.",
    pagina3: "Hoy, quince primaveras después, la princesa te invita a ser parte de su cuento."
  },

  frase: "Hay momentos en la vida que se esperan con el corazón. Hoy mi cuento de hadas se hace realidad y quiero compartirlo contigo.",

  padres: {
    texto: "Con todo mi amor y gratitud a mis padres",
    papa: "Nombre del Papá",
    mama: "Nombre de la Mamá",
    dedicatoria: "por su amor incondicional, su guía y su apoyo en el camino que me ha traído hasta este día tan especial."
  },

  padrinos: [
    { rol: "Mis padrinos", nombres: "Nombre del Padrino & Nombre de la Madrina" }
  ],

  // Itinerario. Íconos disponibles:
  // iglesia, recepcion, cena, vals, baile, fin, pastel, foto
  // También puedes poner tu propia imagen en cada evento: imagen: "assets/img/plato.png"
  eventos: [
    { icono: "iglesia",   titulo: "Misa",       hora: "17:00 hrs", lugar: "Nombre de la Iglesia", direccion: "Calle, número, colonia, ciudad", mapa: "https://maps.google.com" },
    { icono: "recepcion", titulo: "Recepción",  hora: "19:00 hrs", lugar: "Nombre del Salón",     direccion: "Calle, número, colonia, ciudad", mapa: "https://maps.google.com" },
    { icono: "cena",      titulo: "Cena",       hora: "20:00 hrs" },
    { icono: "vals",      titulo: "Vals",       hora: "21:00 hrs" },
    { icono: "baile",     titulo: "¡A bailar!", hora: "21:30 hrs" },
    { icono: "fin",       titulo: "Fin del cuento", hora: "02:00 hrs" }
  ],

  vestimenta: {
    tipo: "Formal",
    nota: "El color fiusha está reservado exclusivamente para la quinceañera."
  },

  regalos: {
    titulo: "Tu presencia es el mejor regalo",
    texto: "Pero si deseas honrarme con un obsequio, te lo agradeceré de corazón.",
    sobres: true,              // muestra "Lluvia de sobres"
    mesa: { tienda: "", numero: "" } // Ej: { tienda: "Liverpool", numero: "51234567" }
  },

  rsvp: {
    fechaLimite: "7 de noviembre de 2026",
    // Número de WhatsApp con lada de país, sin + ni espacios. Ej: 5215512345678
    whatsapp: "",
    mensaje: "¡Hola! Confirmo mi asistencia a los XV años de Fernanda 👑",
    // Si prefieres un Google Form u otro enlace, ponlo aquí (tiene prioridad)
    enlace: ""
  },

  despedida: "...y vivieron felices para siempre."
};
