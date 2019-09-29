export class AbstractCommand {
  constructor({ settings, client }) {
    this.settings = settings;
    this.client = client;

    this.canBeProcessed = this.canBeProcessed.bind(this);
    this.response = this.response.bind(this);
  }

  canBeProcessed({ context, target, msg }) { // eslint-disable-line no-unused-vars
    throw new Error('Not implemented');
  }

  response({
    context, target, msg, client, // eslint-disable-line no-unused-vars
  }) {
    throw new Error('Not implemented');
  }
}
