import { ListTodosUseCase } from "../usecase/listTodosUseCase.js";
import { TodoRepository } from "../repository/todoRepository.js";

export function listTodoUseCaseFactory(database) {
    return new ListTodosUseCase({ todoRepository: new TodoRepository({ database })})
}