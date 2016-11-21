const db = require('../index.js');

module.exports = (learnerId, newSkillLevel) => {
  return db('levels').select().where({name: newSkillLevel})
    .then(levelsArr => {
      return db('learners').select().where({id: Number(learnerId)}) .update({level_id: levelsArr[0].id});
    });
};
