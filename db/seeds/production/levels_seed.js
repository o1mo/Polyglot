exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('levels').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('levels').insert({name: 'Beginner'}),
        knex('levels').insert({name: 'Elementary'}),
        knex('levels').insert({name: 'Intermediate'}),
        knex('levels').insert({name: 'Upper Intermediate'}),
        knex('levels').insert({name: 'Advanced'}),
        knex('levels').insert({name: 'Master'})
      ]);
    });
};
