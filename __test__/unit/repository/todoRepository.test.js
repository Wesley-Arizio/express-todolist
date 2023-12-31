import { setupDB } from "../../../src/database/database.js";
import { TodoRepository } from "../../../src/repository/todoRepository.js";

describe("todoRepository", () => {
    let repo;
    let db;

    beforeAll(async () => {
        db = await setupDB(":memory:");
        repo = new TodoRepository({ database: db });
    })

    afterAll(async () => {
        await db.close();
    })

   it("should be able to create a new todo item", async () => {
      const response = await repo.create({ title: "write unit tests", description: "use jest to test todoRepository", isFinished: false });
      expect(response.id).toBe(1);
      expect(response.title).toBe("write unit tests");
      expect(response.description).toBe("use jest to test todoRepository");
      expect(response.isFinished).toBe(false);
   });

   it("should verify if a todo exists", async () => {
    const exists = await repo.exists({ id: 1 });
    expect(exists).toBe(true);

    const notExists = await repo.exists({ id: 500 });
    expect(notExists).toBe(false);
   })

   it("should be able to read a todo item", async () => {
      const inserted = await repo.read({ id: 1 });
      expect(inserted.id).toBe(1);
      expect(inserted.title).toBe("write unit tests");
      expect(inserted.description).toBe("use jest to test todoRepository");
      expect(inserted.isFinished).toBe(false);
   });
   it("should be able to update a todo item", async () => {
    const response = await repo.update({ id: 1, title: "write unit tests", description: "use jest to test todoRepository with sqlite", isFinished: true });
    expect(response.id).toBe(1);
    expect(response.title).toBe("write unit tests");
    expect(response.description).toBe("use jest to test todoRepository with sqlite");
    expect(response.isFinished).toBe(true);
   });

   it("should be able to delete a new todo item", async () => {
    await repo.delete({ id: 1 });

    const inserted = await repo.read({ id: 1 });
    expect(inserted).toBeUndefined();
   });

   it("should be able to list todo items", async () => {
       const todo1 = await repo.create({ title: "todo1", description: "todo1", isFinished: false });
       const todo2 = await repo.create({ title: "todo2", description: "todo2", isFinished: false });
       const todo3 = await repo.create({ title: "todo3", description: "todo3", isFinished: true });
       const todo4 = await repo.create({ title: "todo4", description: "todo4", isFinished: true });
   
       const expectedResult1 = [todo1, todo2];
       const expectedResult2 = [todo3, todo4];
   
       const result1 = await repo.readAll({ offset: 0, limit: 2 });
       expect(result1).toStrictEqual(expectedResult1);
   
       const result2 = await repo.readAll({ offset: 2, limit: 2 });
       expect(result2).toStrictEqual(expectedResult2);
   })
});