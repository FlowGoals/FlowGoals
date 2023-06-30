import { Prisma, PrismaClient } from '@prisma/client';
import * as express from 'express';
import * as functions from 'firebase-functions';

const prisma = new PrismaClient();
const app = express();

app.get('/', (req, res) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  res.send('Hello from Firebase!');
});

app.post('/auth/signup', async (req, res) => {
  const input: Prisma.UserCreateInput = req.body;

  try {
    const user = await prisma.user.create({
      data: input,
    });
    res.send(user);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') { // check if unique constraint was violated
        res.status(409).send('Username already exists');
        return;
      }
    }
    functions.logger.error('Error creating user: ', err);
    res.status(500).send(err);
  }
});

app.put('/auth/login', async (req, res) => {
  const { username, password }: Prisma.UserCreateInput = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    if (user?.password !== password) {
      res.status(401).send('Invalid password');
      return;
    }
    res.send(user);
  } catch (err) {
    functions.logger.error('Error authenticating user: ', err);
    res.status(500).send(err);
  }
});

app.get('/goals', async (req, res) => {
  const id = parseInt(req.query.id as string, 10);

  try {
    const goals = await prisma.goal.findMany({
      where: {
        userId: id,
      },
    });
    res.send(goals);
  } catch (err) {
    functions.logger.error('Error getting goals: ', err);
    res.status(500).send(err);
  }
});

app.post('/goals', async (req, res) => {
  const goal: Prisma.GoalCreateInput = req.body;

  try {
    const newGoal = await prisma.goal.create({
      data: goal,
    });
    res.send(newGoal);
  } catch (err) {
    functions.logger.error('Error creating goal: ', err);
    res.status(500).send(err);
  }
});

app.put('/goals/:id', async (req, res) => {
  const goalId = parseInt(req.params.id as string, 10);
  const updatedGoalData = req.body;

  try {
    const updatedGoal = await prisma.goal.update({
      where: { id: goalId },
      data: updatedGoalData,
    });
    res.send(updatedGoal);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') { // record to update not found
        res.status(404).send('Goal not found');
        return;
      }
    }
    functions.logger.error('Error updating goal: ', err);
    res.status(500).send(err);
  }
});

app.delete('/goals/:id', async (req, res) => {
  const goalId = parseInt(req.params.id as string, 10);

  try {
    const deletedGoal = await prisma.goal.delete({
      where: { id: goalId },
    });
    res.send(deletedGoal);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') { // record to delete not found
        res.status(404).send('Goal not found');
        return;
      }
    }
    functions.logger.error('Error deleting goal: ', err);
    res.status(500).send(err);
  }
});

export const api = functions.https.onRequest(app);
