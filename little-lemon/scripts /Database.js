import * as SQLite from 'expo-sqlite';

// Open or create the SQLite database
const db = SQLite.openDatabase('little_lemon.db');

// Create the menu table if it does not exist
const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        description TEXT,
        image TEXT,
        category TEXT
      );`
    );
  });
};

// Fetch menu data from the server
const fetchMenuFromServer = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data.menu; // Return the menu items array
  } catch (error) {
    console.error('Failed to fetch menu:', error);
    return [];
  }
};

// Store menu data in the database
const storeMenuInDatabase = (menu) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM menu', [], (_, result) => {
        menu.forEach(item => {
          tx.executeSql(
            'INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)',
            [item.name, item.price, item.description, item.image, item.category],
            (_, result) => {
              if (result.rowsAffected === 0) {
                console.error('Failed to insert menu item:', item);
              }
            }
          );
        });
        resolve();
      }, (_, error) => {
        reject(error);
      });
    });
  });
};

// Get menu data from the database
const getMenuFromDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM menu',
        [],
        (_, { rows }) => {
          resolve(rows._array); // Pass the data to the callback
        },
        (_, error) => {
          console.error('Failed to fetch data from database:', error);
          reject(error);
        }
      );
    });
  });
};

export { setupDatabase, fetchMenuFromServer, storeMenuInDatabase, getMenuFromDatabase };