import * as SQLite from 'expo-sqlite';
import { Goal } from '../interfaces/IGoal';

const localdb = SQLite.openDatabase('localStorage.db');

const CREATE_GOAL_TABLE = () => new Promise<void>((resolve, reject) => {
  localdb.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS goals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            start INTEGER NOT NULL,
            end INTEGER NOT NULL,
            current INTEGER NOT NULL,
            interval INTEGER NOT NULL,
            end_date TEXT,
            category TEXT,
            color TEXT NOT NULL
          );`,
      [],
      () => {
        console.log('goal table created');
        resolve();
      },
      (_, error) => {
        reject(error);
        return true; // rollback transaction
      },
    );
  });
});

const MUTATION_ADD_GOAL = (goal: Goal) => new Promise<number | undefined>((resolve, reject) => {
  localdb.transaction((tx) => {
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
      (_, result) => {
        console.log('goal added: success');
        resolve(result.insertId);
      },
      (_, error) => {
        reject(error);
        return true; // rollback transaction
      },
    );
  });
});

const QUERY_GET_ALL_GOALS = () => new Promise<Goal[]>((resolve, reject) => {
  localdb.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM goals',
      [],
      (_, result) => {
        console.log('goal query: success');
        // eslint-disable-next-line no-underscore-dangle
        resolve(result.rows._array);
      },
      (_, error) => {
        reject(error);
        return true; // rollback transaction
      },
    );
  });
});

export {
  CREATE_GOAL_TABLE,
  MUTATION_ADD_GOAL,
  QUERY_GET_ALL_GOALS,
};
