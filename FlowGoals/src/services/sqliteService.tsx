import * as SQLite from 'expo-sqlite';
import { Goal } from '../interfaces/IGoal';

const db = SQLite.openDatabase('sqlite.db');

const CREATE_TABLE_GOAL = () => new Promise<void>((resolve, reject) => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS goals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            start INTEGER NOT NULL,
            end INTEGER NOT NULL,
            current INTEGER NOT NULL,
            interval INTEGER NOT NULL,
            end_date TEXT,
            category TEXT,
            color TEXT NOT NULL
          );`,
      [],
      () => resolve(),
      (_, error) => {
        reject(error);
        return true; // rollback transaction
      },
    );
  });
});

const DROP_TABLE_GOAL = () => new Promise<void>((resolve, reject) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DROP TABLE IF EXISTS goals;',
      [],
      () => resolve(),
      (_, error) => {
        reject(error);
        return true; // rollback transaction
      },
    );
  });
});

const MUTATION_ADD_GOAL = (goal: Goal) => new Promise<number | undefined>((resolve, reject) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO goals (name, start, end, current, interval, end_date, category, color)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        goal.name,
        goal.start,
        goal.end,
        goal.current,
        goal.interval,
        goal.end_date ?? null,
        goal.category ?? null,
        goal.color,
      ],
      (_, result) => resolve(result.insertId),
      (_, error) => { // throws error on UNIQUE constraint failure
        reject(error);
        return true; // rollback transaction
      },
    );
  });
});

const QUERY_GET_GOALS = () => new Promise<Goal[]>((resolve, reject) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM goals',
      [],
      // eslint-disable-next-line no-underscore-dangle
      (_, result) => resolve(result.rows._array),
      (_, error) => {
        reject(error);
        return true; // rollback transaction
      },
    );
  });
});

const MUTATION_DELETE_GOAL = (name: string) => new Promise<number>((resolve, reject) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM goals WHERE name = ?;',
      [name],
      (_, result) => resolve(result.rowsAffected), // returns 0 if no match
      (_, error) => {
        reject(error);
        return true; // rollback transaction
      },
    );
  });
});

export {
  CREATE_TABLE_GOAL,
  DROP_TABLE_GOAL,
  MUTATION_ADD_GOAL,
  QUERY_GET_GOALS,
  MUTATION_DELETE_GOAL,
};
