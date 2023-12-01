import { DeleteTodoUseCase } from "../usecase/deleteTodoUseCase.js";
import { TodoRepository } from "../repository/todoRepository.js";

export function deleteTodoUseCaseFactory(database) {
    return new DeleteTodoUseCase({ todoRepository: new TodoRepository({ database })})
}