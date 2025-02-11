import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import { UsersCollection } from '../db/models/User.js';
import { SessionsCollection } from '../db/models/Session.js';
import { ONE_DAY, THIRTY_DAYS } from '../constants/auth.js';

export const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ONE_DAY),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encrypdetPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encrypdetPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, 'User not found');

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'The password is not correct');

  await SessionsCollection.deleteOne({ userId: user._id });

  const newSession = createSession();

  const session = await SessionsCollection.create({
    userId: user._id,
    ...newSession,
  });

  return {
    ...session.toObject(),
    userId: user._id,
  };
};

export const refreshSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired = Date.now() > session.refreshTokenValidUntil;

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Refresh token expired');
  }

  await SessionsCollection.deleteOne({ _id: sessionId });

  const newSession = createSession();

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

export const getUser = async (session) => {
  return await UsersCollection.findById(session.userId);
};

export const getSession = async (refreshToken) => {
  return await SessionsCollection.findOne({ refreshToken });
};

export const updateUser = async (filter, payload, options = {}) => {
  const currentUser = await UsersCollection.findOne(filter);
  if (!currentUser) throw createHttpError(404, 'Not found user');

  if (payload.password) {
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    payload.password = encryptedPassword;
  }

  const updatedUser = await UsersCollection.findOneAndUpdate(filter, payload, {
    ...options,
    new: true,
  });

  if (!updatedUser) return null;

  return updatedUser;
};

export const updateUserLocation = async (userId, locationId) => {
  return await UsersCollection.findByIdAndUpdate(
    userId,
    { locationId },
    { new: true },
  );
};
