# Bowling API
REST API to power a bowling alley's display.

## Dependencies
1. Node (latest)
2. MongoDB (latest)

## Setup
1. Download or fork
2. run `npm install`

## Running
1. run `npm start` to begin

### Endpoints

#### CREATE 
 * Route       |  /addUser
 * Method      |  POST
 * Body        |  `{ id: 1, name: foo }`
 * Description | Creates a new user with score of zero 

#### READ
 * Route       | /score/:userId
 * Method      | GET
 * Parameter   | userId 
 * Description | Gets the given user's current score

#### UPDATE
 * Route       | /play
 * Method      | POST 
 * Body        | `{ id: 1, score: '53x8/'}`
 * Description | Updates the given user's current score
 
#### REMOVE
 * Route       | /deleteUser
 * Method      | DELETE
 * Parameter   | userId 
 * Body        | `{ id: 1}`
 * Description | Removes user from list of users

## TODO
1. fix testing framework
