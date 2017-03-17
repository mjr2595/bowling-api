# Bowling API
REST API to power a bowling alley's display

## Dependencies
* Node (latest)
* MongoDB (latest)

## Setup
1. Download or fork
2. run `npm install`

## Running
1. run `npm start` to begin
2. use a REST client for messages; I used both Postman and RestEasy

### Notes about game play:
* user's name must me unique
* current roll must be a numerical value 0 - 10, "X" or "/" are not valid
* player can roll past the tenth frames, but only ten frames are counted in the score

### Endpoints

#### CREATE
 * Route       |  /addUser
 * Method      |  POST
 * Body        |  `{ name: foo }`
 * Description | Creates a new user with score of zero

#### READ
 * Route       | /score/:name
 * Method      | GET
 * Parameter   | name
 * Description | Gets the given user's current score
 * Returns     | User's current score

#### UPDATE
 * Route       | /play/:name
 * Method      | POST
 * Parameter   | name
 * Body        | `{ currentRoll: 10}`
 * Description | Simulates a user's roll

#### REMOVE
 * Route       | /deleteUser/:name
 * Method      | DELETE
 * Parameter   | name
 * Description | Removes user from list of users

## Potential Future Development
* create automated testing framework
* create front-end for game play (possibly Angular)
