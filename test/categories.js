const expect = require('chai').expect;
const nock = require('nock');

const getAllCategories = require('../controllers/categories').getAllCategories;
const response = require('./response');

describe('Get Categories tests', () => {
  beforeEach(() => {
    nock('https://osf-digital-backend-academy.herokuapp.com/api')
      .get('/categories?secretKey=$2a$08$67c8Xo1GV7wlATbssHFwcOqe57KQBghh/8P5KL.0zWmocnwG19itC')
      .reply(200, response);
  });

  it('Get categories', () => {
    return getAllCategories('categories')
      .then(response => {
        //expect an object back
        expect(typeof response).to.equal('object');

        //Test result of name, company and location for the response
        expect(response.name).to.equal('The Octocat')
        expect(response.company).to.equal('GitHub')
        expect(response.location).to.equal('San Francisco')
      });
  });
});