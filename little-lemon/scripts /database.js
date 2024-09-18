import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('little_lemon.db');

export const createTable = () => {
    const db = SQLite.openDatabase('little_lemon.db');
    db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price REAL,
        image TEXT,
        category TEXT
      );`
    );
  });
};

export const fetchMenuFromDB = (callback) => {
    const db = SQLite.openDatabase('little_lemon.db');
    db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM menu',
      [],
      (txObj, resultSet) => {
        callback(resultSet.rows._array);
      },
      (txObj, error) => {
        console.error('Failed to fetch menu from DB:', error);
      }
    );
  });
};

export const insertMenuItems = (menuItems) => {
    const db = SQLite.openDatabase('little_lemon.db');
    db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM menu' // Clear the table before inserting new data
    );
    menuItems.forEach(item => {
      tx.executeSql(
        'INSERT INTO menu (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)',
        [item.name, item.description, item.price, item.image, item.category]
      );
    });
  });
};