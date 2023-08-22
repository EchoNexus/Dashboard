const express = require('express');
const route = express.Router();
const {
  getUserViaEmail,
  doDiscordLogin,
  addUser,
} = require('../utils/userHelper');
route.get('/discord', async (request, response) => {
  if (request.query.email) {
    let user;
    try {
      user = await getUserViaEmail(request.query.email);
    } catch (error) {
      console.log(error);
    }

    if (user) {
      await doDiscordLogin(request.query);
      request.session.message = 'log in success';
      request.session.email = request.query.email;
      request.session.username = request.query.username;
      response.redirect('/servers');
    } else {
      await addUser(request.query);
      let status = await doDiscordLogin(request.query);
      if (status.status) {
        request.session.message = 'log in success';
        request.session.email = request.query.email;
        request.session.username = request.query.username;
        response.redirect('/servers');
      } else {
        response.redirect('/login');
      }
    }
  } else {
    return response.sendFile('loginViaDiscord.html', { root: 'public' });
  }
});

module.exports = route;
