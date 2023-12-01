import { CreateTodoUseCase } from "../../../src/usecase/createTodoUseCase.js"

import { jest } from "@jest/globals";

describe("CreateTodoUseCase", () => {
    let usecase;
    let repository;

    beforeAll(async () => {
        // We already tested the repository, we want to know how our usecase handles the repository response and our business rules
        repository = {
            create: jest.fn()
        };
        usecase = new CreateTodoUseCase({ todoRepository: repository });
    })

    it("should be able to create a new todo item", async () => {
        repository.create.mockImplementationOnce(() => ({ id: 1, title: "anything", description: "lorem ipsum", isFinished: false }));

        const res = await usecase.execute({ title: "anything", description: "lorem ipsum" });
        expect(repository.create).toHaveBeenCalledWith({ title: "anything", description: "lorem ipsum"  });
        expect(res.id).toBe(1);
        expect(res.title).toBe("anything");
        expect(res.description).toBe("lorem ipsum");
        expect(res.isFinished).toBe(false);

    });

    it("should throw internal server error if something went wrong", async () => {
        repository.create.mockImplementationOnce(() => { throw new Error("database error") });

        await expect(usecase.execute({ title: "anything", description: "lorem ipsum" })).rejects.toThrow(Error("internal server error"));
        expect(repository.create).toHaveBeenCalledWith({ title: "anything", description: "lorem ipsum"  });
    });
})