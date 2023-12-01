import { UpdateTodoUseCase } from "../usecase/updateTodoUseCase.js";
import { TodoRepository } from "../repository/todoRepository.js";

export function updateTodoUseCaseFactory(database) {
    return new UpdateTodoUseCase({ todoRepository: new TodoRepository({ database })})
}