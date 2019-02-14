const express = require('express'); 
const app = express(); 
const fs = require('fs');
const bodyParser = require('body-parser')//adding body-parser middleware

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended:true
}))
app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/index.html')
})
app.get('/poll', (req, res)=>{
  fs.readFile(__dirname + '/poll.json', (err, data)=>{
    if(err) throw err;
    res.send(data);
  })
})

app.post('/vote/new',(req, res)=>{
  console.log("****** " + JSON.stringify(req.body));
  if(req.body.linux === 'on'){
    choosePollOption(req,res, 'linux');
  }else if(req.body.macos === 'on'){
    choosePollOption(req,res,'macos')
  }else if(req.body.windows === 'on'){
    choosePollOption(req,res,'windows'); 
  }else{
    res.redirect('/?incorrect+input')
  }
})

const choosePollOption = (req, res,topic)=>{
  let poll ={}; 
  fs. readFile(__dirname +'/poll.json', 'utf8', (err, data)=>{
    poll= JSON.parse(data); 
    console.log("this is poll1" + JSON.stringify(poll)); 
    poll[topic] +=1; 
    console.log("poll 2 " + JSON.stringify(poll))
    fs.writeFile(__dirname + '/poll.json', JSON.stringify(poll), (err)=>{
      if(err) throw err;
      res.status(200).send('want to <a href="/">vote</a> again')
    })
  })
}


app.listen(3001, ()=>{
  console.log('listening on port 3001'); 
})