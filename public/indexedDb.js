let db;
// Create a new db request for a "budget" database.
const request = indexedDB.open("budget", 1);

// When database is created or db version updated
request.onupgradeneeded = function (event) {
    // Create object store called "pending" and set autoIncrement to true
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true });
};


request.onerror = function (event) {
    console.log("Whoops! " + event.target.errorCode);
};

// When indexedDB is successfully connected,
request.onsuccess = function (event) {
    db = event.target.result;

     if (navigator.onLine) {
        checkDatabase();
    }
};

function checkDatabase() {

    const transaction = db.transaction(["pending"], "readwrite");

    const store = transaction.objectStore("pending");

    const getAll = store.getAll();

    getAll.onsuccess = function () {

        // Then if there are any pending results, and POST to the MongoDB
        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(() => {
                    // If successful, open a transaction on your pending db
                    const transaction = db.transaction(["pending"], "readwrite");

                    // Access your "pending" object store
                    const store = transaction.objectStore("pending");

                    // And clear all items in your "pending" store
                    store.clear();
                });
        }
    };
}

// saveRecord() is called in index.js if POST to MongoDB fails 
function saveRecord(record) {
    // Create a transaction on the "pending" IndexedDB with readwrite access
    const transaction = db.transaction(["pending"], "readwrite");

    // Access your "pending" object store
    const store = transaction.objectStore("pending");

    // And add the transaction record (name, value, date) to your store
    store.add(record);
}

module.exports = {
    checkDatabase,
    saveRecord
};
