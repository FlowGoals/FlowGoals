import { Prisma } from '@prisma/client';
import axios from 'axios';
import { encryptPassword } from '../utils/utils';

const signupUser = async (user: Prisma.UserCreateInput) => {
  const { username, password } = user;
  const res = await axios.post(
    `${process.env.API_URL}/users`,
    { username, password: await encryptPassword(password) },
  );
  return res.data;
};

const loginUser = async (user: Prisma.UserCreateInput) => {
  const { username, password } = user;
  const res = await axios.put(
    `${process.env.API_URL}/users`,
    { username, password: await encryptPassword(password) },
  );
  return res.data;
};

const getGoals = async (id: number) => {
  const res = await axios.get(
    `${process.env.API_URL}/goals`,
    { params: { id } },
  );
  return res.data;
};

const createGoal = async (goal: Prisma.GoalCreateInput) => {
  const res = await axios.post(
    `${process.env.API_URL}/goals`,
    goal,
  );
  return res.data;
};

const updateGoal = async (id: number, goal: Prisma.GoalUpdateInput) => {
  const res = await axios.put(
    `${process.env.API_URL}/goals/${id}`,
    goal,
  );
  return res.data;
};

const deleteGoal = async (id: number) => {
  const res = await
  axios.delete(
    `${process.env.API_URL}/goals/${id}`,
  );
  return res.data;
};

export {
  signupUser,
  loginUser,
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
