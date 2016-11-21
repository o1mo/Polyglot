'use strict';

let langsAndIds = {
  teachers: {},
  students: {}
};

const getPartner = (id, language, teacher) => {
  if (teacher === true) {
    langsAndIds.students[language] = langsAndIds.students[language] || [];
    if (langsAndIds.students[language].length > 0) {
      return langsAndIds.students[language].shift();
    } else {
      langsAndIds.teachers[language] = langsAndIds.teachers[language] || [];
      langsAndIds.teachers[language].push(id);
      return 'OK';
    }
  } else {
    langsAndIds.teachers[language] = langsAndIds.teachers[language] || [];
    if (langsAndIds.teachers[language].length > 0) {
      return langsAndIds.teachers[language].shift();
    } else {
      langsAndIds.students[language] = langsAndIds.students[language] || [];
      langsAndIds.students[language].push(id);
      return 'OK';
    }
  }
};

const resetCache = () => {
  langsAndIds = {
    teachers: {},
    students: {}
  };
};

module.exports.getPartner = getPartner;
module.exports.resetCache = resetCache;
