import { CreateTodoUseCase } from "../usecase/createTodoUseCase.js";
import { TodoRepository } from "../repository/todoRepository.js";

export function createTodoUseCaseFactory(database) {
    return new CreateTodoUseCase({ todoRepository: new TodoRepository({ database })})
}