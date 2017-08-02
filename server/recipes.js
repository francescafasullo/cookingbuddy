'use strict'
const bodyParser = require('body-parser')
const keys = require('./twilioKeys')

const db = require('APP/db')
const Recipe = db.model('recipes')
const RecipeStep = db.model('recipe_steps')
const Resource = db.model('resources')

var accountSid = 'AC25966969a6820e738c4abaddc724f69e'
var authToken = '6a4ff35c9dfe7e6f76e6b13274b92afe'
var twilioNum = '+18327938818'
var number = '+12816221084'

var twilio = require('twilio')
var client = twilio(accountSid, authToken)

function sendText(to, from, msg) {
  client.messages.create({
    to: to,
    from: from,
    body: msg
  }, function(error, message) {
    if (!error) {
      console.log('Success! The SID for this SMS message is:')
      console.log(message.sid)
      console.log('Message sent on:')
      console.log(message.dateCreated)
    } else {
      console.log('Oops! There was an error.', error)
    }
  })
}

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Recipe.findAll({})
    .then(recipes => res.send(recipes))
    .catch(next)
  })
  .get('/:recipeId', (req, res, next) => {
    Recipe.findOne({
      where: {
        id: req.params.recipeId
      }
    })
    .then(recipe => res.send(recipe))
    .catch(next)
  })
  .get('/:recipeId/:step', (req, res, next) => {
    RecipeStep.findOne({
      where: {
        recipe_id: req.params.recipeId,
        step: req.params.step
      },
      include: [{
        model: Resource
      }]
    })
    .then(step => res.send(step))
    .catch(next)
  })
  .post('/sendsms', bodyParser.json(), (req, res) => {
    console.log('body', req.body.message)
    const message = 'Here\'s your shopping list: \n' + req.body.message.join('\n')
    sendText(number, twilioNum, message)
  })
