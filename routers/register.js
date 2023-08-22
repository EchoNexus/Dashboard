const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const userHelper = require('../utils/userHelper');
const { User } = require('../utils/mongodb');

route.get('/', (req, res) => {
  const message = req.session.message;
  req.session.message = '';
  res.render('register', { message: message });
});

route.post('/', async (req, res) => {
  const user = await userHelper
    .getUserViaEmail(req.body.email)
    .then((data) => data.user);

  if (!user) {
    const hashpass = await bcrypt.hash(req.body.password, 10);
    let newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashpass,
    });

    try {
      await newUser.save();
      req.session.message = 'user data inserted';
      res.redirect('login');
    } catch (error) {
      console.error(`Error while creating new user`, error);
      req.session.message = 'Failed to create user';
      res.redirect('register');
    }
    //userHelper.addUser(obj);
  } else {
    req.session.message = 'user already exists';
    res.redirect('register');
  }
});

module.exports = route;
