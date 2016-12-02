'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  let spanish;
  let english;
  let beginner;
  let advanced;
  return knex('learners').del()
    .then(() => {
      return knex('languages').select('id').where({'name': 'Spanish'});
    })
    .then((response) => {
      spanish = response[0].id;
      return knex('languages').select('id').where({'name': 'English'});
    })
    .then((response) => {
      english = response[0].id;
      return knex('levels').select('id').where({'name': 'Beginner'});
    })
    .then((response) => {
      console.log('response from levels', response);
      beginner = response[0].id;
      return knex('levels').select('id').where({'name': 'Advanced'});
    })
    .then(function (response) {
      advanced = response[0].id;
      return Promise.all([
        // Inserts seed entries
        knex('learners').insert({user_id: 1, language_id: spanish, level_id: beginner}),
        knex('learners').insert({user_id: 1, language_id: english, level_id: advanced})
      ]);
    });
};
