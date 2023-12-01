import { NotFound } from "../error.js";

export class DeleteTodoUseCase {
    #todoRepository;
    constructor({ todoRepository }) {
       this.#todoRepository = todoRepository;
    }

    async execute({ id }) {
        try {
            const exists = await this.#todoRepository.exists({ id });

            if (!exists) {
                throw new NotFound("todo");
            }

            await this.#todoRepository.delete({ id });

            return { deleted: true }
        } catch (e) {
            console.error(e);
            if (e instanceof NotFound) {
                throw e
            };
            throw new Error("internal server error");
        }
    }
}