const express = require('express');
const userHelper = require('../utils/userHelper');

const route = express.Router();

route.get('/', async (req, res) => {
  if (req.session.email) {
    const data = await userHelper
      .showUsers()
      .then((data) => data)
      .catch((e) => console.error(err));

    //const collection = await data.toArray();
    res.render('servers', {
      data: [{ name: 'test1' }, { name: 'test3' }, { name: 'test2' }],
    });
  } else {
    res.redirect('login');
  }
});

//delete ping

route.get('/deletePing/:id', (req, res) => {
  let proId = req.params.id;
  userHelper.deletePing(proId).then((response) => {
    res.redirect('/');
  });
});

route.get('/createPing', (req, res) => {
  if (req.session.email) {
    //const message = req.session.message;
    req.session.message = '';
    res.render('pingCreate', { message: req.session.message });
  } else {
    res.redirect('/servers');
  }
});

route.post('/createPing', async (req, res) => {
  const currentPing = await userHelper
    .getPing(req.body.address)
    .then((data) => data.user);

  if (!currentPing) {
    const obj = {
      username: req.session.username,
      email: req.session.email,
      address: req.body.address,
      lastPinged: new Date(),
    };

    await userHelper.addPing(obj);

    res.redirect('/servers');
  } else {
    req.session.message = 'no duplicates allowed.';
    res.redirect('/servers');
  }
});

module.exports = route;
