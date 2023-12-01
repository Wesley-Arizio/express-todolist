--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE todos (
  id   INTEGER PRIMARY KEY,
  title VARCHAR(60) NOT NULL,
  description TEXT NOT NULL,
  isFinished BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX todos_id ON todos (id);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP INDEX todos_id;
DROP TABLE todos;