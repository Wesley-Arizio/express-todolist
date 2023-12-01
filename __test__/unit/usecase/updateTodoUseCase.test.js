import { NotFound } from "../../../src/error.js";
import { UpdateTodoUseCase } from "../../../src/usecase/updateTodoUseCase.js"

import { jest } from "@jest/globals";

describe("UpdateTodoUseCase", () => {
    let usecase;
    let repository;

    beforeAll(async () => {
        // We already tested the repository, we want to know how our usecase handles the repository response and our business rules
        repository = {
            exists: jest.fn(),
            update: jest.fn()
        };
        usecase = new UpdateTodoUseCase({ todoRepository: repository });
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should be able to update a todo item", async () => {
        const params = {
            id: 1,
            title: "udpated title",
            description: "updated description",
            isFinished: true
        }
        repository.exists.mockResolvedValueOnce(true);
        repository.update.mockResolvedValueOnce(params);

        const res = await usecase.execute(params);
        expect(repository.exists).toHaveBeenCalledWith({ id: 1 });
        expect(repository.update).toHaveBeenCalledWith(params);
        expect(res).toStrictEqual(params);
    });

    it("should throw internal server error if something went wrong", async () => {
        const params = {
            id: 1,
            title: "udpated title",
            description: "updated description",
            isFinished: true
        }
        repository.exists.mockResolvedValueOnce(true);
        repository.update.mockImplementationOnce(() => { throw new Error("database error") });

        await expect(usecase.execute(params)).rejects.toThrow(Error("internal server error"));
        expect(repository.exists).toHaveBeenCalledWith({ id: 1 });
        expect(repository.update).toHaveBeenCalledWith(params);
    });

    it("should throw NotFound if todo item does not exist", async () => {
        const params = {
            id: 1,
            title: "udpated title",
            description: "updated description",
            isFinished: true
        }
        repository.exists.mockResolvedValueOnce(false);
        

        await expect(usecase.execute(params)).rejects.toThrow(NotFound);
        expect(repository.exists).toHaveBeenCalledWith({ id: 1 });
        expect(repository.update).toHaveBeenCalledTimes(0);
    });
})