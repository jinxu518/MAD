const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken")
const PRIVATE_KEY = "cs571-2023-10";

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//singin
const users = [
  {username: "thao", password: "123"}
]
app.post('/login', (req, res) => {
  const {username, password} = req.body;
  
  let ret = users.find(x => x.username === username && x.password === password);
  console.log(ret);
  if(ret){
    const token = jwt.sign({username}, PRIVATE_KEY);
    return res.send({success: true, data: token})
  }
  res.send({success: false, error: "User not found"})
})
function auth(req, res, next){
  if(!req.headers.authorization){
    res.send({success: false, error: "Please provide Authorization"})
  }
  const arr = req.headers.authorization.split(" ");
  if(arr.length !== 2){
    res.send({success: false, error: "Please use Bearer scheme"})
  }
  try {
    const decode = jwt.verify(arr[1], PRIVATE_KEY);
    if(decode){
      next();
    }
    else{
      res.send({success: false, error: "Wrong token"})
    }
  } catch (error) {
    res.send({success: false, error: "Wrong token"})
  }
}
//routes
app.use(auth);

app.get('', (req, res) => {
  res.send({success: true, data: "Hello World"})
})

//listening
app.listen(5001, () => console.log(5001));