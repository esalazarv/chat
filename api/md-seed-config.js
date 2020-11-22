import mongoose from 'mongoose';
import Chats from "./src/seeders/chats.seeder";

const mongoURL = 'mongodb://admin:secret@mongo:27017/chat';

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
    Chats,
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
