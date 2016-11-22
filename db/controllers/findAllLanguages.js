const db = require('../index.js');

module.exports = () => {
  return new Promise((resolve, reject) => {
    resolve(db('languages').select('name')); 
  })
  .then((resp) => {
    return resp.map((item) => {
      return item.name;
    });
  }); 
};