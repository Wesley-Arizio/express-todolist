import { ListTodosUseCase } from "../../../src/usecase/listTodosUseCase.js"

import { jest } from "@jest/globals";

describe("CreateTodoUseCase", () => {
    let usecase;
    let repository;

    beforeAll(async () => {
        // We already tested the repository, we want to know how our usecase handles the repository response and our business rules
        repository = {
            readAll: jest.fn()
        };
        usecase = new ListTodosUseCase({ todoRepository: repository });
    })

    it("should be able to list all todos", async () => {
        repository.readAll.mockResolvedValueOnce([{ id: 1, title: "anything", description: "lorem ipsum", isFinished: false }]);

        const res = await usecase.execute({ offset: 0, limit: 1 });
        expect(repository.readAll).toHaveBeenCalledWith({ offset: 0, limit: 1 });
        expect(res.length).toBe(1);
    });

    it("should throw internal server error if something went wrong", async () => {
        repository.readAll.mockImplementationOnce(() => { throw new Error("database error") });

        await expect(usecase.execute({ offset: 0, limit: 1 })).rejects.toThrow(Error("internal server error"));
        expect(repository.readAll).toHaveBeenCalledWith({ offset: 0, limit: 1 });
    });
})