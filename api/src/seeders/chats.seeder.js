import { Seeder } from 'mongoose-data-seed';
import Chat from "../models/chat.model";

const data = [
  {
    name: 'room:general',
    alias: 'General',
    public: true,
  }
];

class ChatsSeeder extends Seeder {

  async shouldRun() {
    return true;
  }

  async run() {
    try {
      return await Chat.create(data);
    } catch (e) {
      return null;
    }
  }
}

export default ChatsSeeder;
