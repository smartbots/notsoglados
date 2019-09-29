/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('dynamic_commands', {
    channel: { type: 'text', notNull: true },
    processor: { type: 'text', notNull: true },
    enabled: { type: 'bool', notNull: true, default: false },
    settings: { type: 'jsonb', notNull: true, default: '{}' },
  }, {
    primaryKey: ['channel', 'processor'],
  });
};

exports.down = (pgm) => {
  pgm.dropTable('dynamic_commands');
};
