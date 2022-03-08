# dots_backend

## Backend Language and library
I implemented backend with Express.js in Javascript.  I used Postman to make HTTP requests to the web server.

## Database Chose
I choose the MongoDB atlas as the databse. I implement the databse with mongoose, which provides a simple Javascript interface.

The Data Scheme looks like: 
```bash
{
    user_name: String,
    player_id: String,
    XP: Number,
    Gold: Number,
}
```

## Docker
To run the program, use the command below

```bash
docker run -p 3000:3000 --restart unless-stopped -d zw2922/node-web-app
```

## Create a new Player
A new player will be created if the given username does not exist in the databse. If the username alreay existed, it will return HTTP error code 400, and an error message: "Username already exists!". <br>
Also the XP will be set to 9999, and gold will be set to 0 by default. To ensure that the player_id will be unique, it will be the total numebr of the users created before it + 1.

It can be test by Postman at URL: http://localhost:3000/api/v1/player

## Retrieve a Player's Stats
To access a player's stats, go to URL: http://localhost:3000/api/player/<player_id>

## Update a Player's Stats
The player's data will only be updated if the username and the player_id are matched. Otherwise, it will return HTTP error code 400, and an error message: "Incorrect Credentials!".

## Get Top X Players in Leaderboard
To see the top x players in the learderboard, go to the URL: http://localhost:3000/api/leaderboards?sortby=<gold|xp>&size=<int>. If the query type is neither gold nor xp, return HTTP code 400 and an error message "Incorrect type for sorting". 
If the size exceeds the total numebr of the players, it will only return all players. 