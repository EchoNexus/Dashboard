const express = require('express');
const userHelper = require('../utils/userHelper');

const route = express.Router();

route.get('/', async (req, res) => {
  if (req.session.adminName && req.session.email) {
    const data = await userHelper
      .showUsers()
      .then((data) => data)
      .catch((e) => console.error(err));

    res.render('adminHome', { data });
  } else {
    res.redirect('admin');
  }
});

module.exports = route;
