'use strict';
process.env.NODE_ENV = 'test';

const db = require('../../db/index.js');
const controllers = require('../../db/controllers/controllers.js');
const expect = require('chai').expect;

describe('Database Tests', () => {
  beforeEach(done => {
    db.migrate.rollback()
      .then(() => {
        return db.migrate.latest();
      })
      .then(() => {
        return db.seed.run();
      })
      .then(() => {
        done();
      });
  });

  afterEach(done => {
    db.migrate.rollback()
      .then(() => {
        done();
      });
  });

  describe('controllers', () => {

    it('should add one user', done => {
      controllers.addUser('Omar', 'omar@test.com', 'thisisafacebookid')
        .then(response => {
          return db('users').select().where({id: Number(response)});
        })
        .then(response => {
          expect(response.length).to.equal(1);
          expect(response[0].full_name).to.equal('Omar');
          expect(response[0].email).to.equal('omar@test.com');
          expect(response[0].facebook_id).to.equal('thisisafacebookid');
          done();
        });
    });

    it('should find a user by email', done => {
      controllers.findUserByEmail('test@test.com')
        .then(user => {
          expect(user.full_name).to.equal('Test McTesterson');
          expect(user.email).to.equal('test@test.com');
          expect(user.facebook_id).to.equal('Test\'s facebook_id');
          done();
        });
    });

    it('should find all languages', done => {
      controllers.findAllLanguages()
        .then(languages => {
          expect(Array.isArray(languages)).to.equal(true);
          expect(languages[0]).to.be.a('string');
          done();
        });
    });

    it('should add a learner', done => {
      let learner;
      controllers.addLearner('test@test.com', 'English', 'Beginner')
        .then(response => {
          return db('learners').select().where({id: Number(response[0])});
        })
        .then(learnerArr => {
          expect(learnerArr.length).to.equal(1);
          learner = learnerArr[0];
          expect(learner.user_id).to.equal(1);
          return db('languages').select().where({id: learner.language_id});
        })
        .then(languageArr => {
          expect(languageArr[0].name).to.equal('English');
          return db('levels').select().where({id: learner.level_id});
        })
        .then(levelArr => {
          expect(levelArr[0].name).to.equal('Beginner');
          done();
        });
    });

    it('should add a teacher', done => {
      let teacher;
      controllers.addTeacher('test@test.com', 'Spanish')
        .then(response => {
          return db('teachers').select().where({id: Number(response[0])});
        })
        .then(teacherArr => {
          expect(teacherArr.length).to.equal(1);
          teacher = teacherArr[0];
          expect(teacher.user_id).to.equal(1);
          return db('languages').select().where({id: teacher.language_id});
        })
        .then(languageArr => {
          expect(languageArr[0].name).to.equal('Spanish');
          done();
        })
        .catch(err => {
          console.log('error adding teacher',err);
        });
    });

    it('should update a learner', done => {
      let learnerId;
      controllers.addLearner('test@test.com', 'English', 'Beginner')
        .then(response => {
          learnerId = response[0];
          return controllers.updateLearner(learnerId, 'Intermediate');
        })
        .then(emptyResponse => {
          return db('learners').select().where({id: learnerId});
        })
        .then(learnerArr => {
          return db('levels').select().where({id: learnerArr[0].level_id});
        })
        .then(levelArr => {
          expect(levelArr[0].name).to.equal('Intermediate');
          done();
        });
    });

    it('should return all languages a user wants to learn', done => {
      let learnerId;
      controllers.addLearner('test@test.com', 'Mandarin', 'Beginner')
        .then(response => {
          return controllers.addLearner('test@test.com', 'Spanish', 'Advanced');
        })
        .then(response => {
          learnerId = response[0];
          return controllers.getLearningLanguages('test@test.com');
        })
        .then(languages => {
          expect(languages).to.include('Spanish');
          expect(languages).to.include('Mandarin');
          done();
        });
    });

    it('should return all languages a user can teach', done => {
      let teacherId;
      controllers.addTeacher('test@test.com', 'German')
        .then(response => {
          return controllers.addTeacher('test@test.com', 'Italian');
        })
        .then(response => {
          teacherId = response[0];
          return controllers.getTeachingLanguages('test@test.com');
        })
        .then(languages => {
          expect(languages).to.include('German');
          expect(languages).to.include('Italian');
          done();
        });
    });



  });
});
