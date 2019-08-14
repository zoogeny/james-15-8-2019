const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./server/data/documents.sqlite3');

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS documents;", err => {
        if (err) {
            console.error(err);
        }
    });

    db.run(`
        CREATE TABLE documents (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            path TEXT NOT NULL,
            size INTEGER NOT NULL,
            mimetype TEXT NOT NULL
        );
        `, err => {
            if (err) {
                console.error(err);
            } else {
                console.log("Database initialization success");
            }
        });
});
