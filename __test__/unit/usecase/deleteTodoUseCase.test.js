import { NotFound } from "../../../src/error.js";
import { DeleteTodoUseCase } from "../../../src/usecase/deleteTodoUseCase.js"

import { jest } from "@jest/globals";

describe("DeleteTodoUseCase", () => {
    let usecase;
    let repository;

    beforeAll(async () => {
        // We already tested the repository, we want to know how our usecase handles the repository response and our business rules
        repository = {
            exists: jest.fn(),
            delete: jest.fn()
        };
        usecase = new DeleteTodoUseCase({ todoRepository: repository });
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should be able to delete a todo item", async () => {
        repository.exists.mockResolvedValueOnce(true);
        repository.delete.mockResolvedValueOnce({});

        const res = await usecase.execute({ id: 1 });
        expect(repository.exists).toHaveBeenCalledWith({ id: 1 });
        expect(repository.delete).toHaveBeenCalledWith({ id: 1 });
        expect(res.deleted).toBe(true);
    });

    it("should throw internal server error if something went wrong", async () => {
        repository.exists.mockResolvedValueOnce(true);
        repository.delete.mockImplementationOnce(() => { throw new Error("database error") });

        await expect(usecase.execute({ id: 1 })).rejects.toThrow(Error("internal server error"));
        expect(repository.exists).toHaveBeenCalledWith({ id: 1 });
        expect(repository.delete).toHaveBeenCalledWith({ id: 1 });
    });

    it("should throw NotFound if todo item does not exist", async () => {
        repository.exists.mockResolvedValueOnce(false);
        

        await expect(usecase.execute({ id: 1 })).rejects.toThrow(NotFound);
        expect(repository.exists).toHaveBeenCalledWith({ id: 1 });
        expect(repository.delete).toHaveBeenCalledTimes(0);
    });
})