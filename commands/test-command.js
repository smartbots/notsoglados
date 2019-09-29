import { AbstractCommand } from '../lib/abstract-command';

export default class TestCommand extends AbstractCommand {
  canBeProcessed({ msg }) {
    if (msg === 'lol') {
      return true;
    }
    return false;
  }

  response({
    context, target, msg, client, // eslint-disable-line no-unused-vars
  }) {
    client.say(target, `lol, ${this.settings.test}`);
  }
}
