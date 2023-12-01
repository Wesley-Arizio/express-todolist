import { NotFound } from "../error.js";

export class UpdateTodoUseCase {
    #todoRepository;
    constructor({ todoRepository }) {
       this.#todoRepository = todoRepository;
    }

    async execute({ id, title, description, isFinished }) {
        try {
            const todo = await this.#todoRepository.exists({ id });

            if (!todo) {
                throw new NotFound("todo")
            }

            return this.#todoRepository.update({ id, title, description, isFinished });
        } catch (e) {
            console.error(e);
            if (e instanceof NotFound) {
                throw e
            };
            throw new Error("internal server error");
        }
    }
}