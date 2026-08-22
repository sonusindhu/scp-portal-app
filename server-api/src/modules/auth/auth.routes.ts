import { Router } from 'express';

export const authRouter = Router();

authRouter.post('/login', (_req, res) => {
  res.status(200).json({
    status: true,
    message: 'Auth module scaffold ready',
    result: {
      token: 'placeholder-token',
      fullName: 'Example User',
    },
  });
});

authRouter.post('/signup', (_req, res) => {
  res.status(200).json({
    status: true,
    message: 'Signup scaffold ready',
  });
});
