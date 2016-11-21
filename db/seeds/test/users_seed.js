
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({full_name: 'Test McTesterson', email: 'test@test.com', facebook_id: 'Test\'s facebook_id'})
      ]);
    });
};
