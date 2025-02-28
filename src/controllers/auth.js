import * as authServices from '../services/auth.js';
import { THIRTY_DAYS } from '../constants/auth.js';
import createHttpError from 'http-errors';

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
  const user = await authServices.registerUser(req.body);

  const session = await authServices.loginUser({
    email: user.email,
    password: req.body.password,
  });

  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered and logged in!',
    data: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    },
  });
};

export const loginUserController = async (req, res) => {
  const session = await authServices.loginUser(req.body);

  setupSession(res, session);

  const user = await authServices.getUser(session);

  res.status(200).json({
    status: 200,
    message: 'Seccessfuly logged in an user',
    data: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        location: user.location,
      },
    },
  });
};

export const refreshSessionController = async (req, res) => {
  const { refreshToken } = req.body;

  const session = await authServices.getSession(refreshToken);
  const user = await authServices.getUser(session);

  const newSession = await authServices.refreshSession({
    sessionId: session._id,
    refreshToken,
  });

  setupSession(res, newSession);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: newSession.accessToken,
      refreshToken: newSession.refreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        location: user.location,
      },
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await authServices.logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const updateUserController = async (req, res) => {
  const { _id } = req.user;

  const updateData = { ...req.body };
  const result = await authServices.updateUser({ _id }, updateData);

  if (!result) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated user profile!',
    data: result,
  });
};
