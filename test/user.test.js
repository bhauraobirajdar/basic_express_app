/* eslint-disable no-undef */
const { JsonWebTokenError } = require('jsonwebtoken');
const home = require('../routes/home');
const userModel = require('../models/user');

describe('test case desc', () => {
  const user = new userModel.User();

  // let user;
  beforeEach(() => {
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('test case for home', async () => {
    // const spy = jest.spyOn(user, 'concatStr').mockImplementation(() => 'test35678');
    jest.spyOn(user, 'concatStr').mockImplementation(() => 'test35678');
    jest.spyOn(user, 'executeQuery').mockImplementation(() => 'test123');

    expect(user.addUser()).toBe('test123');
    user.concatStr('test');
  });

  it('test case for concatstr', async () => {
    // expect(spy).not.toHaveBeenCalled();
    expect(user.concatStr('test')).toBe('testsss');
  });
});
