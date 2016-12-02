exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('languages').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('languages').insert({name: 'Spanish'}),
        knex('languages').insert({name: 'Mandarin'}),
        knex('languages').insert({name: 'English'}),
        knex('languages').insert({name: 'Italian'}),
        knex('languages').insert({name: 'French'}),
        knex('languages').insert({name: 'Hindi'}),
        knex('languages').insert({name: 'Arabic'}),
        knex('languages').insert({name: 'Portuguese'}),
        knex('languages').insert({name: 'Russian'}),
        knex('languages').insert({name: 'Japanese'}),
        knex('languages').insert({name: 'German'})
      ]);
    });
};
