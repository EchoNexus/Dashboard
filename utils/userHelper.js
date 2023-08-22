const bcrypt = require('bcrypt');
const { ObjectId } = require('mongoose');
let { User } = require('./mongodb');
module.exports = {
  addUser: (obj) => {
    return new Promise(async (resolve, rej) => {
      let response = {};
      let newUser = new User(obj);
      try {
        const res = await newUser.save();

        if (res) {
          response.status = true;
          resolve(response);
        } else {
          response.status = false;
          resolve(response);
        }
      } catch (error) {
        console.error(error);
        response.status = false;
        resolve(response);
      }
    });
  },
  doLogin: (body) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await User.findOne({ email: body.email }).exec();
      if (user) {
        await bcrypt
          .compare(body.password, user.password)
          .then((data) => {
            response.user = data;
            response.username = user.username;
            response.status = true;
            resolve(response);
          })
          .catch((e) => console.log(e));
      } else {
        response.user = false;
        response.status = false;
        resolve(response);
      }
    });
  },
  doDiscordLogin: (body) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await User.findOne({ email: body.email }).exec();
      if (user) {
        response.user = body;
        response.username = user.username;
        response.status = true;
        resolve(response);
      } else {
        response.user = false;
        response.status = false;
        resolve(response);
      }
    });
  },
  adminLogin: (body) => {
    return new Promise(async (resolve, reject) => {
      let response = {};

      let user = await User.findOne({
        email: body.email,
        isAdmin: true,
      }).exec();
      if (user) {
        if (user.password && user.password.length) {
          let result = await bcrypt.compare(body.password, user.password);
          if (!result) {
            response.user = false;
            response.status = false;
            resolve(response);
          }
          response.user = user;
          response.username = user.username;
          response.email = user.email;
          response.status = true;
          resolve(response);
        } else {
          response.user = user;
          response.username = user.username;
          response.email = user.email;
          response.status = true;
          resolve(response);
        }
      } else {
        response.user = false;
        response.status = false;
        resolve(response);
      }
    });
  },
  showUsers: () => {
    return new Promise(async (resolve, reject) => {
      const data = await User.find({}).exec();
      if (data) {
        resolve(data);
      } else {
        reject('No users found');
      }
    });
  },
  deleteUser: (id) => {
    return new Promise(async (resolve, reject) => {
      const data = await User.deleteOne({ _id: ObjectId(id) });
      if (data) {
        resolve(data);
      } else {
        reject('User not found');
      }
    });
  },
  getUserViaEmail: (email) => {
    return new Promise(async (resolve, reject) => {
      const data = await User.findOne({ email: email }).exec();
      if (data) {
        resolve(data);
      } else {
        reject('user not found via email');
      }
    });
  },
  getUserViaId: (id) => {
    return new Promise(async (resolve, reject) => {
      const data = await User.findOne({ _id: ObjectId(id) }).exec();
      if (data) {
        resolve(data);
      } else {
        reject('data not found');
      }
    });
  },
  updateUser: (body, id) => {
    return new Promise(async (resolve, reject) => {
      const hashpass = await bcrypt.hash(body.password, 10);
      const data = await User.updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            username: body.username,
            email: body.email,
            password: hashpass,
          },
        }
      ).then((response) => {
        resolve(response);
      });
    });
  },
};
