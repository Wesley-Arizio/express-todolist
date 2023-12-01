import express from 'express';
import bodyParser from "body-parser";

import { setupDB } from './database/database.js';
import { NotFound } from "./error.js";
import { readTodoUseCaseFactory } from "./factory/readTodoUseCaseFactory.js";
import { createTodoUseCaseFactory } from "./factory/createTodoUseCaseFactory.js";
import { deleteTodoUseCaseFactory } from "./factory/deleteTodoUseCaseFactory.js";
import { updateTodoUseCaseFactory } from "./factory/updateTodoUseCaseFactory.js";
import { listTodoUseCaseFactory } from "./factory/listTodoUseCaseFactory.js";

function handleError(e) {
    if (e instanceof NotFound) {
        return { status: 404, message: e.message }
    } else {
        return { status: 400, message: "internal server error" }
    }
}

;(async () => {
    const filename = process.env.SQLITE_FILE_NAME || ":memory:";
    const apiPort = process.env.PORT || 3000;
    const db = await setupDB(filename);

    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    const readTodoUseCase = readTodoUseCaseFactory(db);
    const createTodoUseCase = createTodoUseCaseFactory(db);
    const deleteTodoUseCase = deleteTodoUseCaseFactory(db);
    const updateTodoUseCase = updateTodoUseCaseFactory(db);
    const listTodosUseCase = listTodoUseCaseFactory(db);

    app.get("/todo/:id", async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).send({ message: "must provide todo id" });
            }
            const response = await readTodoUseCase.execute({ id: req.params.id });
            return res.status(200).send(response);
        } catch (e) {
            const { status, message } = handleError(e);
            return res.status(status).send({ message });
        }
    });

    app.post("/todo", async (req, res) => {
        try {
            if (!req.body.title || !req.body.description) {
                return res.status(400).send({ message: "must provide title and a description" });
            }

            const response = await createTodoUseCase.execute({ title: req.body.title, description: req.body.description });
            return res.status(200).send(response);
        } catch (e) {
            console.log(e);
            const { status, message } = handleError(e);
            return res.status(status).send({ message });
        }
    });

    app.delete("/todo/:id", async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).send({ message: "must provide todo id" });
            }

            const response = await deleteTodoUseCase.execute({ id: req.params.id });
            return res.status(200).send(response);
        } catch (e) {
            console.log(e);
            const { status, message } = handleError(e);
            return res.status(status).send({ message });
        }
    });

    app.put("/todo/:id", async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).send({ message: "must provide todo id" });
            }

            if (!req.body.title || !req.body.description) {
                return res.status(400).send({ message: "must provide title and a description" });
            }

            const response = await updateTodoUseCase.execute({ id: req.params.id, title: req.body.title, description: req.body.description, isFinished: req.body.isFinished || false });
            return res.status(200).send(response);
        } catch (e) {
            console.log(e);
            const { status, message } = handleError(e);
            return res.status(status).send({ message });
        }
    });

    app.get("/todos", async (req, res) => {
        try {
            const offset = req.query.offset || 0;
            const limit = req.query.limit || 10;
            const response = await listTodosUseCase.execute({ offset, limit });
            return res.status(200).send(response);
        } catch (e) {
            const { status, message } = handleError(e);
            return res.status(status).send({ message });
        }
    });

    app.listen(apiPort, () => {
        console.log("Server started successfuly!");
    });
})()