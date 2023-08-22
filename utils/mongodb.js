const { Schema, connect, model } = require('mongoose');
require('dotenv').config();

const userSchema = new Schema({
  isAdmin: { type: Boolean, default: false },
  password: { type: String },
  email: { type: String },
  discordId: { type: String },
  createdAt: { type: String, default: Date.now() },
  discordId: { type: String },
});

const User = model('users', userSchema);

const blockedSchema = new Schema({
  id: { type: String, required: true },
  mod: { type: String, required: true },
  date: { type: String, default: Date.now() },
});

const BlockedUser = model('blockedUsers', blockedSchema);

const guildSchema = new Schema({
  guildId: String,
  config: {
    prefix: String,
    backupCode: String,
    mainRole: String,
  },
  moderation: {
    enabled: Boolean,
    modRole: String,
    adminRole: String,
    managerRole: String,
    modLog: String,
    autoMod: Boolean,
    autoModRules: {
      invite: Boolean,
      spam: Boolean,
      links: Boolean,
      mention: Boolean,
      mentions: Array,
      everyone: Boolean,
      whiteList: {
        invite: Boolean,
        spam: Boolean,
        links: Boolean,
        mention: Boolean,
        everyone: Boolean,
      },
    },
  },
  utility: {
    sticky: {
      enabled: Boolean,
      channel: String,
      message: String,
    },
    antiNuke: {
      enabled: Boolean,
      quarantineRole: String,
    },
  },
  levelling: {
    enabled: Boolean,
    msg: String,
    xpPerMsg: Number,
  },
  economy: {
    enabled: Boolean,
    credit: String,
  },
  roblox: {
    enabled: Boolean,
    api: String,
  },
  logging: {
    enabled: Boolean,
    channel: String,
  },
  logs: [
    {
      logType: { type: String, required: true }, // one of ['moderation', 'error']
      username: { type: String, required: true }, // username of the person responsible for this log.
      action: { type: String, required: true }, // what did they do? changed prefix..etc
      date: { type: String, default: Date.now() },
    },
  ],
});

const Guild = model('guilds', guildSchema);

connect(process.env.MONGODBCONNECTIONSTRING);

module.exports = {
  User,
  BlockedUser,
  Guild,
};
