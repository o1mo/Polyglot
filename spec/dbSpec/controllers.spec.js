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
      controllers.addUser('Omar', 'omar@test.com', 'thisisafacebookid', 'http://facebookphoto')
        .then(response => {
          return db('users').select().where({id: Number(response)});
        })
        .then(response => {
          expect(response.length).to.equal(1);
          expect(response[0].full_name).to.equal('Omar');
          expect(response[0].email).to.equal('omar@test.com');
          expect(response[0].facebook_id).to.equal('thisisafacebookid');
          expect(response[0].photo_url).to.equal('http://facebookphoto');
          expect(response[0].credits).to.equal(0);
          expect(response[0].stars).to.equal(0);
          expect(response[0].hours_learned).to.equal(0);
          expect(response[0].hours_taught).to.equal(0);
          expect(response[0].cards_reviewed).to.equal(0);
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
          expect(languages.length).to.equal(2);

          expect(languages.map(lang => {
            return lang.languageName;
          })).to.include('Mandarin', 'Spanish');

          expect(languages.map(lang => {
            return lang.level100;
          })).to.include(16.6, 83.3);

          expect(languages.map(lang => {
            return lang.levelName;
          })).to.include('Beginner', 'Advanced');

          expect(languages.map(lang => {
            return lang.nextLevel;
          })).to.include('Elementary', 'Master');
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

    it('should add a card for a user', done => {
      controllers.addCard('test@test.com', 'I want to learn this', 'this is the translation')
        .then(response => {
          return controllers.getCards('test@test.com');
        })
        .then(cardArr => {
          let card = cardArr[0];
          expect(cardArr.length).to.equal(1);
          expect(card.user_id).to.equal(1);
          expect(card.phrase).to.equal('I want to learn this');
          expect(card.translation).to.equal('this is the translation');
          done();
        });
    });    
    
    it('should get all a user\'s cards', done => {
      controllers.addCard('test@test.com', 'I want to learn this', 'this is the translation')
        .then(response => {
          return controllers.addCard('test@test.com', 'Here\'s another phrase', 'this is the other translation');
        })
        .then(response => {
          return controllers.getCards('test@test.com');
        })
        .then(cardArr => {
          expect(cardArr.length).to.equal(2);
          let card1 = cardArr[0];
          expect(card1.user_id).to.equal(1);
          expect(card1.phrase).to.equal('I want to learn this');
          expect(card1.translation).to.equal('this is the translation');          

          let card2 = cardArr[1];
          expect(card2.user_id).to.equal(1);
          expect(card2.phrase).to.equal('Here\'s another phrase');
          expect(card2.translation).to.equal('this is the other translation');
          done();
        });
    });

    it('should update a user\'s card', done => {
      controllers.addCard('test@test.com', 'I want to learn this', 'this is the translation')
        .then(response => {
          return controllers.updateCard(1, 'this is the updated phrase', 'this is the updated translation');
        })
        .then(response => {
          return controllers.getCards('test@test.com');
        })
        .then(cardArr => {
          expect(cardArr.length).to.equal(1);
          let card = cardArr[0];
          expect(card.user_id).to.equal(1);
          expect(card.phrase).to.equal('this is the updated phrase');
          expect(card.translation).to.equal('this is the updated translation');      
          done();
        });
    });

    it('should delete a user\'s card', done => {
      controllers.addCard('test@test.com', 'I want to learn this', 'this is the translation')
        .then(response => {
          return controllers.deleteCard(1);
        })
        .then(response => {
          return controllers.getCards('test@test.com');
        })
        .then(response => {
          expect(response.length).to.equal(0);
          done();
        });
    });

    it('should update a user\'s star count', done => {
      controllers.updateStars('test@test.com', 10)
        .then(() => {
          return db('users').select('stars').where({email: 'test@test.com'});
        })
        .then(response => {
          expect(response[0].stars).to.equal(10);
          return controllers.updateStars('test@test.com', -10)
            .then(() => {
              return db('users').select('stars').where({email: 'test@test.com'});
            });
        })
        .then(response => {
          expect(response[0].stars).to.equal(0);
          done();
        })
        .catch(response => {
          console.log('there was an error in updating stars', response);
        });
    });

    it('should update a user\'s credit count', done => {
      controllers.updateCredits('test@test.com', 10)
        .then(() => {
          return db('users').select('credits').where({email: 'test@test.com'});
        })
        .then(response => {
          expect(response[0].credits).to.equal(10);
          return controllers.updateCredits('test@test.com', -10)
            .then(() => {
              return db('users').select('credits').where({email: 'test@test.com'});
            });
        })
        .then(response => {
          expect(response[0].credits).to.equal(0);
          done();
        })
        .catch(response => {
          console.log('there was an error in updating credits', response);
        });
    });       

    it('should update a user\'s hours taught count', done => {
      controllers.updateHoursTaught('test@test.com', 10)
        .then(() => {
          return db('users').select('hours_taught').where({email: 'test@test.com'});
        })
        .then(response => {
          expect(response[0].hours_taught).to.equal(10);
          return controllers.updateHoursTaught('test@test.com', -10)
            .then(() => {
              return db('users').select('hours_taught').where({email: 'test@test.com'});
            });
        })
        .then(response => {
          expect(response[0].hours_taught).to.equal(0);
          done();
        })
        .catch(response => {
          console.log('there was an error in updating hours taught', response);
        });
    }); 

    it('should update a user\'s hours learned count', done => {
      controllers.updateHoursLearned('test@test.com', 10)
        .then(() => {
          return db('users').select('hours_learned').where({email: 'test@test.com'});
        })
        .then(response => {
          expect(response[0].hours_learned).to.equal(10);
          return controllers.updateHoursLearned('test@test.com', -10)
            .then(() => {
              return db('users').select('hours_learned').where({email: 'test@test.com'});
            });
        })
        .then(response => {
          expect(response[0].hours_learned).to.equal(0);
          done();
        })
        .catch(response => {
          console.log('there was an error in updating hours learned', response);
        });
    });    

    it('should update a user\'s cards reviewed count', done => {
      controllers.updateCardsReviewed('test@test.com', 10)
        .then(() => {
          return db('users').select('cards_reviewed').where({email: 'test@test.com'});
        })
        .then(response => {
          expect(response[0].cards_reviewed).to.equal(10);
          return controllers.updateCardsReviewed('test@test.com', -10)
            .then(() => {
              return db('users').select('cards_reviewed').where({email: 'test@test.com'});
            });
        })
        .then(response => {
          expect(response[0].cards_reviewed).to.equal(0);
          done();
        })
        .catch(response => {
          console.log('there was an error in updating cards_reviewed', response);
        });
    });

    it('should add a friend', done => {
      controllers.addUser('Omar', 'omar@test.com', 'thisisafacebookid', 'http://facebookphoto')
        .then(response => {
          return controllers.addFriend('test@test.com', 'omar@test.com');
        })
        .then(response => {
          return db('friends').select().where({'id': response[0]});
        })
        .then(response => {
          expect(response.length).to.equal(1);
          let friendship = response[0];
          expect(friendship.user_id).to.equal(2);
          expect(friendship.friend_id).to.equal(1);
          done();
        });
    });

    it('should get all a user\'s friends', done => {
      controllers.addUser('Omar', 'omar@test.com', 'thisisafacebookid', 'http://facebookphoto')
        .then(response => {
          return controllers.addFriend('test@test.com', 'omar@test.com');
        })
        .then(response => {
          return controllers.getFriends('test@test.com');
        })
        .then(response => {
          expect(response.length).to.equal(1);
          let friend = response[0];
          expect(friend.friend_id).to.equal(2);
          expect(friend.full_name).to.equal('Omar');
          expect(friend.email).to.equal('omar@test.com');
          expect(friend.facebook_id).to.equal('thisisafacebookid');
          expect(friend.photo_url).to.equal('http://facebookphoto');
          expect(friend.credits).to.equal(0);
          expect(friend.stars).to.equal(0);
          done();
        })
        .catch(err =>{
          console.log(err);
          done();
        });
    });

    it('should get a user\'s achievements', done => {
      Promise.all([
        controllers.updateCardsReviewed('test@test.com', 100), 
        controllers.updateHoursLearned('test@test.com', 100), 
        controllers.updateHoursTaught('test@test.com', 100), 
        controllers.updateStars('test@test.com', 100), 
      ])
      .then(()=> {
        return controllers.getAchievements('test@test.com');
      })
      .then(response => {
        expect(response).to.include('Intergalactic Intelligence (100 stars recieved)', 'Marathon Master (100 hours learned)', 'Oracle (100 hours taught)', 'Photographic Memory (500 cards reviewed)');
        done();
      });
    });

  });
});
