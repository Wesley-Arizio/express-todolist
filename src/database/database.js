import sqlite3 from'sqlite3';
import { open } from 'sqlite'
import dotenv from "dotenv";

sqlite3.verbose()
dotenv.config();

export async function setupDB(filename) {
    const db = await open({
        filename,
        driver: sqlite3.Database
    });
    
    await db.migrate({ migrationsPath: './src/database/migrations/' });

    return db
}