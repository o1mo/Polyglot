'use strict';
const db = require('../index.js');

module.exports = (email) => {
  return new Promise((resolve, reject) => {
    db('users').select('stars', 'credits', 'hours_learned', 'hours_taught', 'cards_reviewed').where({email: email})
      .then(response => {
        let user = response[0];

        let stars = user.stars;
        let hoursLearned = user.hours_learned;
        let hoursTaught = user.hours_taught;
        let cardsReviewed = user.cards_reviewed;

        let starMedals = ['Star Student (1 star recieved)', 'Shining Star (5 stars recieved)', 'Betelgeuse Bright (25 stars recieved)', 'Intergalactic Intelligence (100 stars recieved)'];
        let hoursLearnedMedals = ['Jump Starter (1 hour learned)', 'Relay Racer (5 hours learned)', 'Distance Runner (25 hours learned)', 'Marathon Master (100 hours learned)'];
        let hoursTaughtMedals = ['Kind soul (1 hour taught)', 'Mentor (5 hours taught)', 'Sage (25 hours taught)', 'Oracle (100 hours taught)'];
        let cardsReviewedMedals = ['Librarygoer (10 cards reviewed)', 'Bookwork (50 cards reviewed)', 'Serial Vocabber (100 cards reviewed)', 'Photographic Memory (500 cards reviewed)'];

        let achievements = [];

        if (stars >= 100) {
          achievements.push(starMedals[3]);
        } else if (stars >= 20) {
          achievements.push(starMedals[2]);
        } else if (stars >= 5) {
          achievements.push(starMedals[1]);
        } else if (stars >= 1) {
          achievements.push(starMedals[0]);
        }

        if (hoursLearned >= 100) {
          achievements.push(hoursLearnedMedals[3]);
        } else if (hoursLearned >= 20) {
          achievements.push(hoursLearnedMedals[2]);
        } else if (hoursLearned >= 5) {
          achievements.push(hoursLearnedMedals[1]);
        } else if (hoursLearned >= 1) {
          achievements.push(hoursLearnedMedals[0]);
        }

        if (hoursTaught >= 100) {
          achievements.push(hoursTaughtMedals[3]);
        } else if (hoursTaught >= 20) {
          achievements.push(hoursTaughtMedals[2]);
        } else if (hoursTaught >= 5) {
          achievements.push(hoursTaughtMedals[1]);
        } else if (hoursTaught >= 1) {
          achievements.push(hoursTaughtMedals[0]);
        }

        if (cardsReviewed >= 500) {
          achievements.push(cardsReviewedMedals[3]);
        } else if (cardsReviewed >= 100) {
          achievements.push(cardsReviewedMedals[2]);
        } else if (cardsReviewed >= 50) {
          achievements.push(cardsReviewedMedals[1]);
        } else if (cardsReviewed >= 10) {
          achievements.push(cardsReviewedMedals[0]);
        }
        resolve(achievements);
      })
      .catch(err => {
        reject(err);
      });
  });
};
