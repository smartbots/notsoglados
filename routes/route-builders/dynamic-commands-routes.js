import path from 'path';
import fs from 'fs';

import { DB } from '../../lib/db';
import { ProcessingRule } from '../../models/processing-rule';

import { AbstractRoutesBuilder } from '../../lib/abstract-routes-builder';

const rulesRegistry = new Map();

export class DynamicCommandsRoutes extends AbstractRoutesBuilder {
  static async getRoutes({ target }) {
    let commands = DB('dynamic_commands')
      .where('enabled', true);

    if (target) {
      commands = commands.where('channel', target.replace('#', ''));
    }

    commands = await commands.select();

    return commands.map((command) => {
      if (!command.processor.trim()) {
        return null;
      }

      const sanitizesdCommandName = command.processor.trim();
      if (rulesRegistry.has(sanitizesdCommandName)) {
        return rulesRegistry.get(sanitizesdCommandName);
      }

      const processorPath = path.resolve(__dirname, '..', '..', 'commands', `${command.processor}.js`);
      const exists = fs.existsSync(processorPath);
      if (!exists) {
        return null;
      }

      // eslint-disable-next-line import/no-dynamic-require, global-require
      const CommandCode = require(processorPath).default;
      const commandInstance = new CommandCode({
        settings: command.settings,
        client: null,
      });

      const pr = new ProcessingRule();
      pr.channel = command.channel;
      pr.canBeProcessed = commandInstance.canBeProcessed;
      pr.handler = commandInstance.response;

      rulesRegistry.set(sanitizesdCommandName, pr);
      return pr;
    }).filter(Boolean);
  }
}
