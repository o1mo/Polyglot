
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', table => {
      table.increments().unsigned();
      table.string('full_name').notNullable();
      table.string('email').unique();
      table.string('facebook_id').unique();
      table.string('photo_url');
      table.integer('credits').defaultTo(0);
      table.integer('stars').defaultTo(0);
      table.integer('hours_learned').defaultTo(0);
      table.integer('hours_taught').defaultTo(0);
      table.integer('cards_reviewed').defaultTo(0);
    }),
    knex.schema.createTableIfNotExists('friends', table => {
      table.increments();
      table.integer('user_id').references('id').inTable('users');
      table.integer('friend_id').references('id').inTable('users');
    }),    
    knex.schema.createTableIfNotExists('learners', table => {
      table.increments();
      table.integer('user_id')
      // .references('id').inTable('users');
      table.integer('language_id').references('id').inTable('languages');
      table.integer('level_id').references('id').inTable('levels');
    }),
    knex.schema.createTableIfNotExists('teachers', table => {
      table.increments();
      table.integer('user_id').references('id').inTable('users');
      table.integer('language_id').references('id').inTable('languages');
    }),
    knex.schema.createTableIfNotExists('languages', table => {
      table.increments();
      table.string('name');
    }),
    knex.schema.createTableIfNotExists('levels', table => {
      table.increments();
      table.string('name');
    }),    
    knex.schema.createTableIfNotExists('cards', table => {
      table.increments();
      table.string('phrase');
      table.string('translation');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.integer('user_id').references('id').inTable('users');
    }),
    knex.schema.createTableIfNotExists('sessions', table => {
      table.increments();
      table.integer('learner_id').references('id').inTable('learners');
      table.integer('teacher_id').references('id').inTable('teachers');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.integer('duration').unsigned().comment('duration of session in milliseconds');
      table.string('transcription_location');
      table.integer('learner_rating');
      table.integer('teacher_rating');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('DROP TABLE users CASCADE'),
    knex.raw('DROP TABLE friends CASCADE'),
    knex.raw('DROP TABLE learners CASCADE'),
    knex.raw('DROP TABLE teachers CASCADE'),
    knex.raw('DROP TABLE languages CASCADE'),
    knex.raw('DROP TABLE cards CASCADE'),
    knex.raw('DROP TABLE sessions CASCADE')
  ]);
};
