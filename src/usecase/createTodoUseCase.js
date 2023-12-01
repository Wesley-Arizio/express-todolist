export class CreateTodoUseCase {
    #todoRepository;
    constructor({ todoRepository }) {
       this.#todoRepository = todoRepository;
    }

    async execute({ title, description }) {
        try {
            return this.#todoRepository.create({ title, description })
        } catch (e) {
            throw new Error("internal server error");
        }
    }
}