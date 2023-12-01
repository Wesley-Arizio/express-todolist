export class TodoRepository {
    // Campo privado em javascript
    #database;
    constructor({ database }) {
        this.#database = database;
    }

    async create({ title, description, isFinished = false }) {
       return this.#database.get('INSERT INTO todos (title, description, isFinished) VALUES (:title, :description, :isFinished) RETURNING *;', {
        ":title": title, 
        ":description": description, 
        ":isFinished": isFinished
       });
    }

    delete({ id }) {
        return this.#database.run('DELETE FROM todos WHERE id = :id', { ":id": id });
    }

    update({ id, title, description, isFinished }) {
        return this.#database.get("UPDATE todos SET title = :title, description = :description, isFinished = :isFinished WHERE id = :id RETURNING *;", {
            ":id": id, 
            ":title": title, 
            ":description": description,
            ":isFinished": isFinished
        });
    }

    read({ id }) {
        return this.#database.get("SELECT id, title, description, isFinished FROM todos WHERE id = :id;", {
            ":id": id
        });
    }

    async exists({ id }) {
        const result = await this.#database.get("SELECT EXISTS(SELECT 1 FROM todos WHERE id = :id) AS record_exists;", {
            ":id": id
        });

        return !!result.record_exists
    }

    readAll({ offset, limit }) {
        return this.#database.all("SELECT id, title, description, isFinished FROM todos ORDER BY id ASC LIMIT :limit OFFSET :offset", {
            ":offset": offset,
            ":limit": limit
        })
    }
}