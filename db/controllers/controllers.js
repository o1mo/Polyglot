const addUser = require('./addUser.js');
const addLearner = require('./addLearner.js');
const addTeacher = require('./addTeacher.js');
const updateLearner = require('./updateLearner.js');
const findUserByEmail = require('./findUserByEmail.js');
const getLearningLanguages = require('./getLearningLanguages.js');
const getTeachingLanguages = require('./getTeachingLanguages.js');

module.exports = {
  addUser: addUser,
  addLearner: addLearner,
  addTeacher: addTeacher,
  updateLearner: updateLearner,
  findUserByEmail: findUserByEmail,
  getLearningLanguages: getLearningLanguages,
  getTeachingLanguages: getTeachingLanguages
};
