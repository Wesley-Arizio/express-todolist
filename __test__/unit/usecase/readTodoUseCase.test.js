import { NotFound } from "../../../src/error.js";
import { ReadTodoUseCase } from "../../../src/usecase/readTodoUseCase.js"

import { jest } from "@jest/globals";

describe("ReadTodoUseCase", () => {
    let usecase;
    let repository;

    beforeAll(async () => {
        // We already tested the repository, we want to know how our usecase handles the repository response and our business rules
        repository = {
            read: jest.fn(),
        };
        usecase = new ReadTodoUseCase({ todoRepository: repository });
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should be able to delete a todo item", async () => {
        repository.read.mockResolvedValueOnce({ id: 1, title: "anything", description: "lorem ipsum", isFinished: false });

        const res = await usecase.execute({ id: 1 });
        expect(repository.read).toHaveBeenCalledWith({ id: 1 });
        expect(res.id).toBe(1);
        expect(res.title).toBe("anything");
        expect(res.description).toBe("lorem ipsum");
        expect(res.isFinished).toBe(false);
    });

    it("should throw internal server error if something went wrong", async () => {
        repository.read.mockImplementationOnce(() => { throw new Error("database error") });

        await expect(usecase.execute({ id: 1 })).rejects.toThrow(Error("internal server error"));
        expect(repository.read).toHaveBeenCalledWith({ id: 1 });
    });

    it("should throw NotFound if todo item does not exist", async () => {
        repository.read.mockResolvedValueOnce(undefined);
        
        await expect(usecase.execute({ id: 1 })).rejects.toThrow(NotFound);
        expect(repository.read).toHaveBeenCalledWith({ id: 1 });
    });
})