/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('static_messages', {
    channel: { type: 'text', notNull: true },
    pattern: { type: 'text', notNull: true },
    responsePattern: { type: 'text', notNull: true },
  }, {
    primaryKey: ['channel', 'pattern'],
  });
};

exports.down = (pgm) => {
  pgm.dropTable('static_messages');
};
