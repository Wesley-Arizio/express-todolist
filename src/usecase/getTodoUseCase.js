import { NotFound } from "../error.js";

export class GetTodoUseCase {
    #todoRepository;
    constructor({ todoRepository }) {
       this.#todoRepository = todoRepository;
    }

    async execute({ id }) {
        try {
            const todo = await this.#todoRepository.read({ id });

            if (!todo) {
                throw new NotFound("todo")
            }

            return todo;
        } catch (e) {
            if (e instanceof NotFound) {
                throw e
            };
            throw new Error("internal server error");
        }
    }
}