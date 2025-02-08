import {
  getUser,
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../services/auth.js';
import { THIRTY_DAYS } from '../constants/auth.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  console.log(user);

  const session = await loginUser({
    email: user.email,
    password: req.body.password,
  });

  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered and logged in!',
    data: {
      accessToken: session.accessToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    },
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  const user = await getUser(session);

  res.status(200).json({
    status: 200,
    message: 'Seccessfuly logged in an user',
    data: {
      accessToken: session.accessToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    },
  });
};

export const refreshSessionController = async (req, res) => {
  const session = await refreshSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
