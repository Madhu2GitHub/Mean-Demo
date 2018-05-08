//importing modules
var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var cors=require('cors');
var path=require('path');

var app = express();

//port no
const port = 3000;
app.use(cors());
//add routes
const route = require('./routes/route');
app.use("/api",route);
//testing server
app.get("/",(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send('server');
})
//static files
app.use(express.static(path.join(__dirname,'public')));

//add middleware -cors



// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');
mongoose.connection.on('connected',()=>{
    console.log("connected to mongodb at port @ 27017");
});
mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log("***Error in database connection***");
        console.log(err);
    }
});





//bind ports to server
app.listen(port,()=>{
    console.log("Server started at port:"+port);
})

