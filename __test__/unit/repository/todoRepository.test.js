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
      const expectedId = 1;
      const { id } = await repo.create({ title: "write unit tests", description: "use jest to test todoRepository", isFinished: false });
      expect(id).toBe(expectedId);
   });

   it("should be able to read a todo item", async () => {
      const inserted = await repo.read({ id: 1 });
      expect(inserted.id).toBe(1);
      expect(inserted.title).toBe("write unit tests");
      expect(inserted.description).toBe("use jest to test todoRepository");
      // Sqlite stores boolan values as 0 or 1
      expect(inserted.isFinished).toBe(0);
   });
   it("should be able to update a todo item", async () => {
    await repo.update({ id: 1, title: "write unit tests", description: "use jest to test todoRepository with sqlite", isFinished: true });

    const inserted = await repo.read({ id: 1 });
    expect(inserted.id).toBe(1);
    expect(inserted.title).toBe("write unit tests");
    expect(inserted.description).toBe("use jest to test todoRepository with sqlite");
    // Sqlite stores boolan values as 0 or 1
    expect(inserted.isFinished).toBe(1);
   });

   it("should be able to delete a new todo item", async () => {
    await repo.delete({ id: 1 });

    const inserted = await repo.read({ id: 1 });
    expect(inserted).toBeUndefined();
   });
});