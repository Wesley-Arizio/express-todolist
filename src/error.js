export class NotFound extends Error {
    constructor(entity) {
        super(`${entity} not found`)
    }
}