// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
var total = 0;
var bodyParser = require('body-parser')
app.use(
  bodyParser.json()
);

//Connect to the MongoDB atlas
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://wzf:wzf000928@cluster0.7exw3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:!!!'));
db.once('open', function() {
});

//Create the data schema
const UserSchema = new mongoose.Schema({
    user_name: String,
    player_id: String,
    XP: Number,
    Gold: Number,
});

const User = mongoose.model('Users', UserSchema);

//POST Method for Create a New Player
app.post("/api/v1/player",(req, res)=>{
    User.find({user_name : req.body.username}, (err, docs) => {
        if(err) return console.error(err);
        if(docs.length == 0){
            const newUser = new User ({// Create the data
                //username added
                user_name: req.body.username,
                player_id: total.toString(),
                XP: 9999,
                Gold: 0,
            })
            const return_result = { // Create the data to be returned
                user_name: req.body.username,
                player_id: total.toString(),
            }

            total += 1;//Increase the total number by 1

            //Return the result
            console.log(return_result);
            res.send(return_result); 
            res.status(200);

            //Save the data
            newUser.save();
        }
        else{//If the username already exists, it will return HTTP code 400, which means Bad Request
            res.send("Username already exists!");
            res.status(400);
        }
    })
})

//GET Method for Retrieve a Player's Stats
app.get("/api/player/:player_id", (req, res) => {
    User.find({player_id : req.params.player_id}, (err, docs) => {
        if(err) return console.error(err);
        res.json(docs);
        res.status(200);
    })
})

//PUT Method for Update a Player's Stats
app.put("/api/player/:player_id",(req, res) => {
    User.find({user_name : req.body.username}, (err, docs) => {
        if(docs.length == 1){
            User.findOneAndUpdate({user_name : req.body.username}, {XP:req.body.xp, Gold:req.body.Gold}, function (err, docs){
                if (err){
                    console.log(err)
                }
                else{
                    const return_result = { // Create the data to be returned
                        user_name: req.body.username,
                        player_id: req.params.player_id,
                        XP: req.body.xp,
                        Gold: req.body.Gold,
                    }
                  res.status(200);
                  res.send(return_result);
                }
            })
        }
        else{//If the username does not exists, it will return HTTP code 400, which means Bad Request
            res.send("Username does NOT exists!");
            res.status(400);
        }
    })
})

//Get Method for Get Top X Players in Leaderboard
app.get("/api/leaderboards", (req, res) => {
    var q = req.query.sortby;
    var size = req.query.size;
    if(q == "gold"){
        User.find({}).sort('Gold').exec(function(err, docs) {  
            var sz = Math.min(size, docs.length);
            let return_result = new Array(sz);
            for(let i=0; i<sz; i++){
                return_result[i] = docs[i] ;
            }
            res.status(200);
            res.send(return_result);
        });
    }
    else if(q == "xp"){
        User.find({}).sort('XP').exec(function(err, docs) {  
            var sz = Math.min(size, docs.length);
            let return_result = new Array(sz);
            for(let i=0; i<sz; i++){
                return_result[i] = docs[i] ;
            }
            res.status(200);
            res.send(return_result);
        });
    }
    else{//If the query type is neither gold nor xp, return HTTP code 400, which means Bad Request
        res.send("Incorrect type for sorting");
        res.status(400);
    }
})



// export the express app we created to make it available to other modules
module.exports = app
