import { ReadTodoUseCase } from "../usecase/readTodoUseCase.js";
import { TodoRepository } from "../repository/todoRepository.js";

export function readTodoUseCaseFactory(database) {
    return new ReadTodoUseCase({ todoRepository: new TodoRepository({ database })})
}