const db = require('../index.js');

module.exports = (email) => {
  return new Promise((resolve, reject) => {
    db('users').select().where({email: email})
      .then(response => {
        return db('teachers').join('languages', 'teachers.language_id', '=', 'languages.id')
        .select('languages.name').where({'teachers.user_id': response[0].id});
      })
      .then(response => {
        resolve(response.map(lang => {
          return lang.name;
        }));
      });
  });
};
