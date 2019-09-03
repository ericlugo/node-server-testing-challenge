exports.up = function(knex) {
  return knex.schema.createTable('note', (notes) => {
    notes.increments('note_id');
    notes.string('name', 255).notNullable();
    notes.text('description', 'longtext');
    notes
      .integer('parent_id')
      .unsigned()
      .references('note_id')
      .inTable('note');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('note');
};
