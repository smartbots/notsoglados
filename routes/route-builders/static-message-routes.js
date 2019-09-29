import { DB } from '../../lib/db';
import { ProcessingRule } from '../../models/processing-rule';

import { AbstractRoutesBuilder } from '../../lib/abstract-routes-builder';

export class StaticMessageRoutes extends AbstractRoutesBuilder {
  static async getRoutes({ target }) {
    let rules = DB('static_messages')
      .orderBy('sort', 'asc');

    if (target) {
      rules = rules.where('channel', target.replace('#', ''));
    }

    rules = await rules.select();

    return (rules || []).map((rule) => {
      const pr = new ProcessingRule();
      pr.channel = rule.channel;
      pr.regex = new RegExp(rule.pattern, 'i');
      pr.handler = ({ target: localTarget, client }) => {
        client.say(localTarget, rule.responsePattern);
      };
      return pr;
    });
  }
}
