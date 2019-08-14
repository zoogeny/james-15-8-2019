const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./server/data/documents.sqlite3');

const getAllDocuments = () => {
    const getPromise = new Promise((resolve, reject) => {
        db.all(`
            SELECT * FROM documents;
            `, {}, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
    });
    return getPromise;
};

const searchDocuments = (term) => {
    const getDocumentPromise = new Promise((resolve, reject) => {
        db.all(`
            SELECT * FROM documents WHERE title LIKE $term;
        `, {
            "$term": `%${ term }%`
        }, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
    return getDocumentPromise;
};

const getDocumentById = (id) => {
    const getDocumentPromise = new Promise((resolve, reject) => {
        db.all(`
            SELECT * FROM documents WHERE id=$id;
        `, {
            "$id": id
        }, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0]);
            }
        });
    });
    return getDocumentPromise;
};

const removeDocument = (id) => {
    const deletePromise = new Promise((resolve, reject) => {
        db.run(`
            DELETE FROM documents
            WHERE id=$id;
        `, {
            "$id": id
        }, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
    return deletePromise;
};

const addDocument = (title, path, size) => {
    const addPromise = new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`
                INSERT INTO documents (title, path, size)
                    VALUES ($title, $path, $size);`,
                {
                    "$title": title,
                    "$path": path,
                    "$size": size
                }, err => {
                    if (err) {
                        reject(err);
                    }
                });

            db.all("SELECT last_insert_rowid()", {}, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const id = rows[0]["last_insert_rowid()"];
                    resolve(id);
                }
            });
        })

    });
    return addPromise;
}

module.exports = {
    getAllDocuments,
    getDocumentById,
    searchDocuments,
    removeDocument,
    addDocument
};
