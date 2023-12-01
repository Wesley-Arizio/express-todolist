export class ListTodosUseCase {
    #todoRepository;
    constructor({ todoRepository }) {
       this.#todoRepository = todoRepository;
    }

    async execute({ offset, limit }) {
        try {
            return this.#todoRepository.readAll({ offset, limit })
        } catch (e) {
            console.error(e);
            throw new Error("internal server error");
        }
    }
}