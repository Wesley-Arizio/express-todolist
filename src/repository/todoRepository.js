export class TodoRepository {
    // Campo privado em javascript
    #database;
    constructor({ database }) {
        this.#database = database;
    }

    async create({ title, description, isFinished = false }) {
       const res = await this.#database.get('INSERT INTO todos (title, description, isFinished) VALUES (:title, :description, :isFinished) RETURNING *;', {
        ":title": title, 
        ":description": description, 
        ":isFinished": isFinished
       });

       if (res) {
        return {
            ...res,
            isFinished: !!res.isFinished
           }
       }

       return res
    }

    delete({ id }) {
        return this.#database.run('DELETE FROM todos WHERE id = :id', { ":id": id });
    }

    async update({ id, title, description, isFinished }) {
        const res = await this.#database.get("UPDATE todos SET title = :title, description = :description, isFinished = :isFinished WHERE id = :id RETURNING *;", {
            ":id": id, 
            ":title": title, 
            ":description": description,
            ":isFinished": isFinished
        });

        if (res) {
            return {
                ...res,
                isFinished: !!res.isFinished
            }
        }

        res
    }

    async read({ id }) {
        const res = await this.#database.get("SELECT id, title, description, isFinished FROM todos WHERE id = :id;", {
            ":id": id
        });

        if (res) {
            return {
                ...res,
                isFinished: !!res.isFinished
            }
        }

        return res;
    }

    async exists({ id }) {
        const result = await this.#database.get("SELECT EXISTS(SELECT 1 FROM todos WHERE id = :id) AS record_exists;", {
            ":id": id
        });

        return !!result.record_exists
    }

    async readAll({ offset, limit }) {
        const res = await this.#database.all("SELECT id, title, description, isFinished FROM todos ORDER BY id ASC LIMIT :limit OFFSET :offset", {
            ":offset": offset,
            ":limit": limit
        })

        return res.map((todo) => ({
            ...todo,
            isFinished: !!todo.isFinished
        }))
    }
}