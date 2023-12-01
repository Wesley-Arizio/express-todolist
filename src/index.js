import { setupDB } from './database/database.js';
import { TodoRepository } from './repository/todoRepository.js';



;(async () => {
    const filename = process.env.SQLITE_FILE_NAME || ":memory:";
    const db = await setupDB(filename);

    const repo = new TodoRepository({ database: db });
    const { id } = await repo.create({ title: "finish task", description: "Testetstsetet", isFinished: true });

    const inserted = await repo.read({ id });
    console.log({ inserted });

    // const result = await db.run("CREATE TABLE todo (id INTEGER PRIMARY KEY, title VARCHAR(60), description TEXT, isFinished BOOLEAN);");
    // console.log("result: ", result);
})()