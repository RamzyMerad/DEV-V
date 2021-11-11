const express = require('express');

const app = express();

const pg = require('knex')({
  client: 'pg',
  version: '14',      
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://admin:basic123@localhost:5432/animes'
});

const users = [];


app.use(express.json());


