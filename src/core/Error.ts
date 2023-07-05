export class HennusError extends Error {
    constructor(message: errorCodes) {
        super(message);
        this.name = "HennusError"
    };
};



export enum errorCodes {

    tokenInvalid = "Token es invalido.",
    tokenNull = "Token no proporcionado.",

    connectError = "No se pudo conectar."
}