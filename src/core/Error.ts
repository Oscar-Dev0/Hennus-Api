export class HennusError extends Error {
    constructor(message: errorCodes | string) {
        super(message);
        this.name = "HennusError";
    }
}

export enum errorCodes {
    /* Tokens */
    TokenInvalid = "El token proporcionado no es válido.",
    TokenNull = "No se proporcionó un token.",

    /* Connection */
    ConnectionError = "No se pudo establecer la conexión.",

    /* Bits */
    BitsError = "La bitField proporcionada no es válida.",

    /* ResolveColor */
    ColorRange = "El valor del color está fuera del rango válido (0 a 0xffffff).",
    ColorConvert = "El valor del color no es válido o no se puede convertir correctamente.",

    /* Commands */
    CommandNameUpperCase = "El nombre del comando no debe contener letras mayúsculas.",
    InvalidCommandNameLength = "El nombre del comando debe tener entre 1 y 32 caracteres.",

    /* Channels */
    ChannelNameLength = "El nombre del canal debe tener entre 1 y 100 caracteres.",
    ChannelTopicLength = "El topic del canal debe tener entre 0 y 1024 caracteres.",

}
