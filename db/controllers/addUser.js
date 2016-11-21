const db = require('../index.js');

module.exports = (name, email, facebook_id) => {
  return db('users').insert({
    full_name: name,
    email: email,
    facebook_id: facebook_id
  }, 'id');
};
