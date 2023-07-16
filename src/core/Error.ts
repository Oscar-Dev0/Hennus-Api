export class HennusError extends Error {
    constructor(message: errorCodes) {
        super(message);
        this.name = "HennusError"
    };
};



export enum errorCodes {

    /* Tokens */
    tokenInvalid = "Token es invalido.",
    tokenNull = "Token no proporcionado.",

    /* Conection */ 
    connectError = "No se pudo conectar.",

    /* Bits */
    bitsError = "No es una bitField valida.",

    /* ResolveColor */
    ColorRange = "El valor del color está fuera del rango válido (0 a 0xffffff).",
    ColorConvert ='El valor del color no es válido o no se puede convertir correctamente.',
}