/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('static_messages', {
    sort: { type: 'int', notNull: true, default: 0 },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('static_messages', ['sort']);
};
