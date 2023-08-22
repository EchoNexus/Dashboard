const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
  if (req.session.email) {
    res.redirect('/servers');
  } else {
    res.render('index');
  }
});

module.exports = route;
