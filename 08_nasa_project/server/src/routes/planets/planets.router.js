const express = require('express')
const planetRouter = express.Router()

const { httpGetAllPlanets } = require('./planets.controller')

planetRouter.get('/planets', httpGetAllPlanets)

module.exports = planetRouter
