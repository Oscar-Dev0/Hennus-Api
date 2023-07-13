export enum Permissions {
    /** @description Permite crear invitaciones instantáneas. @type (T: Texto, V: Voz, S: Servidor) */
    CREATE_INSTANT_INVITE = 0x0000000000000001,
    /** @description Permite expulsar miembros. @type (T: Texto, V: Voz, S: Servidor) */
    KICK_MEMBERS = 0x0000000000000002,
    /** @description Permite bloquear miembros. @type (T: Texto, V: Voz, S: Servidor) */
    BAN_MEMBERS = 0x0000000000000004,
    /** @description Permite todos los permisos y omite las modificaciones de permisos en el canal. @type (T: Texto, V: Voz, S: Servidor) */
    ADMINISTRATOR = 0x0000000000000008,
    /** @description Permite gestionar y editar canales. @type (T: Texto, V: Voz, S: Servidor) */
    MANAGE_CHANNELS = 0x0000000000000010,
    /** @description Permite gestionar y editar el servidor. @type (T: Texto, V: Voz, S: Servidor) */
    MANAGE_GUILD = 0x0000000000000020,
    /** @description Permite agregar reacciones a los mensajes. @type (T: Texto, V: Voz, S: Servidor) */
    ADD_REACTIONS = 0x0000000000000040,
    /** @description Permite ver los registros de auditoría. @type (T: Texto, V: Voz, S: Servidor) */
    VIEW_AUDIT_LOG = 0x0000000000000080,
    /** @description Permite usar el modo de altavoz prioritario en un canal de voz. @type (V: Voz) */
    PRIORITY_SPEAKER = 0x0000000000000100,
    /** @description Permite al usuario hacer transmisiones en vivo. @type (V: Voz, S: Servidor) */
    STREAM = 0x0000000000000200,
    /** @description Permite a los miembros del servidor ver un canal, lo que incluye leer mensajes en canales de texto y unirse a canales de voz. @type (T: Texto, V: Voz, S: Servidor) */
    VIEW_CHANNEL = 0x0000000000000400,
    /** @description Permite enviar mensajes en un canal y crear hilos en un foro (no permite enviar mensajes en hilos). @type (T: Texto, V: Voz, S: Servidor) */
    SEND_MESSAGES = 0x0000000000000800,
    /** @description Permite enviar mensajes de texto a voz. @type (T: Texto, V: Voz, S: Servidor) */
    SEND_TTS_MESSAGES = 0x0000000000001000,
    /** @description Permite eliminar los mensajes de otros usuarios. @type (T: Texto, V: Voz, S: Servidor) */
    MANAGE_MESSAGES = 0x0000000000002000,
    /** @description Los enlaces enviados por los usuarios con este permiso se insertarán automáticamente. @type (T: Texto, V: Voz, S: Servidor) */
    EMBED_LINKS = 0x0000000000004000,
    /** @description Permite subir imágenes y archivos. @type (T: Texto, V: Voz, S: Servidor) */
    ATTACH_FILES = 0x0000000000008000,
    /** @description Permite leer el historial de mensajes. @type (T: Texto, V: Voz, S: Servidor) */
    READ_MESSAGE_HISTORY = 0x0000000000010000,
    /** @description Permite utilizar la mención @everyone para notificar a todos los usuarios en un canal, y la mención @here para notificar a los usuarios en línea en un canal. @type (T: Texto, V: Voz, S: Servidor) */
    MENTION_EVERYONE = 0x0000000000020000,
    /** @description Permite utilizar emojis personalizados de otros servidores. @type (T: Texto, V: Voz, S: Servidor) */
    USE_EXTERNAL_EMOJIS = 0x0000000000040000,
    /** @description Permite ver estadísticas del servidor. @type (S: Servidor) */
    VIEW_GUILD_INSIGHTS = 0x0000000000080000,
    /** @description Permite unirse a un canal de voz. @type (V: Voz, S: Servidor) */
    CONNECT = 0x0000000000100000,
    /** @description Permite hablar en un canal de voz. @type (V: Voz) */
    SPEAK = 0x0000000000200000,
    /** @description Permite silenciar a los miembros en un canal de voz. @type (V: Voz, S: Servidor) */
    MUTE_MEMBERS = 0x0000000000400000,
    /** @description Permite ensordecer a los miembros en un canal de voz. @type (V: Voz) */
    DEAFEN_MEMBERS = 0x0000000000800000,
    /** @description Permite mover a los miembros entre canales de voz. @type (V: Voz, S: Servidor) */
    MOVE_MEMBERS = 0x0000000001000000,
    /** @description Permite utilizar la detección de actividad de voz en un canal de voz. @type (V: Voz) */
    USE_VAD = 0x0000000002000000,
    /** @description Permite modificar el propio apodo. @type (T: Texto, V: Voz, S: Servidor) */
    CHANGE_NICKNAME = 0x0000000004000000,
    /** @description Permite modificar los apodos de otros usuarios. @type (T: Texto, V: Voz, S: Servidor) */
    MANAGE_NICKNAMES = 0x0000000008000000,
    /** @description Permite gestionar y editar roles. @type (T: Texto, V: Voz, S: Servidor) */
    MANAGE_ROLES = 0x0000000010000000,
    /** @description Permite gestionar y editar webhooks. @type (T: Texto, V: Voz, S: Servidor) */
    MANAGE_WEBHOOKS = 0x0000000020000000,
    /** @description Permite gestionar y editar emojis, stickers y sonidos del tablero de sonidos. @type (S: Servidor) */
    MANAGE_GUILD_EXPRESSIONS= 0x0000000040000000,
    /** @description Permite a los miembros usar comandos de aplicaciones, incluyendo comandos de barra y comandos de menú contextual. @type (T: Texto, V: Voz, S: Servidor) */
    USE_APPLICATION_COMMANDS = 0x0000000080000000,
    /** @description Permite solicitar hablar en canales de escenario. (Este permiso está en desarrollo activo y puede cambiar o eliminarse). @type (S: Servidor) */
    REQUEST_TO_SPEAK = 0x0000000100000000,
    /** @description Permite crear, editar y eliminar eventos programados. @type (V: Voz, S: Servidor) */
    MANAGE_EVENTS = 0x0000000200000000,
    /** @description Permite eliminar y archivar hilos, y ver todos los hilos privados. @type (T: Texto) */
    MANAGE_THREADS = 0x0000000400000000,
    /** @description Permite crear hilos públicos y de anuncios. @type (T: Texto) */
    CREATE_PUBLIC_THREADS = 0x0000000800000000,
    /** @description Permite crear hilos privados. @type (T: Texto) */
    CREATE_PRIVATE_THREADS = 0x0000001000000000,
    /** @description Permite utilizar stickers personalizados de otros servidores. @type (T: Texto, V: Voz, S: Servidor) */
    USE_EXTERNAL_STICKERS = 0x0000002000000000,
    /** @description Permite enviar mensajes en hilos. @type (T: Texto) */
    SEND_MESSAGES_IN_THREADS = 0x0000004000000000,
    /** @description Permite utilizar Activities (aplicaciones con la bandera EMBEDDED) en un canal de voz. @type (V: Voz) */
    USE_EMBEDDED_ACTIVITIES = 0x0000008000000000,
    /** @description Permite silenciar a los usuarios para evitar que envíen o reaccionen a mensajes en el chat y en los hilos, y que hablen en los canales de voz y escenario. @type (T: Texto, V: Voz, S: Servidor) */
    MODERATE_MEMBERS = 0x0000010000000000,
    /** @description Permite ver información sobre suscripciones a roles. @type (T: Texto, V: Voz, S: Servidor) */
    VIEW_CREATOR_MONETIZATION_ANALYTICS = 0x0000020000000000,
    /** @description Permite utilizar el tablero de sonidos en un canal de voz. @type (V: Voz) */
    USE_SOUNDBOARD = 0x0000040000000000,
    /** @description Permite utilizar sonidos del tablero de sonidos personalizados de otros servidores. @type (V: Voz) */
    USE_EXTERNAL_SOUNDS = 0x0000200000000000,
    /** @description Permite enviar mensajes de voz. @type (T: Texto, V: Voz, S: Servidor) */
    SEND_VOICE_MESSAGES = 0x0000400000000000,
};
  