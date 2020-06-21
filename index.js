const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');


var pool = new Pool({
  //connectionString: 'postgres://postgres:wndrspttnrd@localhost.people'
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }

});

var app = express()
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) => res.render('pages/index'))
app.get('/times', (req, res) => res.send(showTimes()))

app.get('/Database', (req,res) => {
  var getUsersQuery = `SELECT * FROM people`;
  var results;
  pool.query(getUsersQuery,(error,result)=>{
    if(error)
      res.end(error)
    results = {'rows':result.rows}
    console.log(result.rows[0]);
    rows.forEach(function(r) {

    });
    //res.send(results);
    res.render('pages/db', results);
  })

})

app.get('/users/:id', (req,res)=>{
  var uid = req.params.id;
  console.log(req.params.id);
  //search the database using the uid
  res.send("got it!");
})

  app.post('/adduser', (req,res)=>{
    console.log("post request for /adduser");
    var uname = req.body.Name;
    var usize = req.body.Size;
    var uheight = req.body.Height;
    var utype = req.body.Type;

    var addUsersQuery = `INSERT INTO PEOPLE (Name, size, height, type) VALUES ('${uname}',${usize},${uheight},'${utype}');`;
    var results;
    console.log("preparing to query");
    console.log(addUsersQuery);
    pool.query(addUsersQuery,(error,result)=>{
      if(error){
        console.log("query returned error");
        res.end(error)

      }
      else{
        console.log("inserted");
      }
      //results = {'rows':result.rows}
      //res.render('pages/db', results);
    })
    //*/
    var getUsersQuery = `SELECT * from people;`
    console.log("preparing to display");
    pool.query(getUsersQuery,(error,result)=>{
      if(error){
        res.end(error)
      }
      console.log("displaying");
      console.log(results);
      results = {'rows':result.rows}
      res.render('pages/db', results);
    })

    res.end();
  })
  app.post('/searchuser', (req,res)=>{
    var temptext = req.body.searchtext;
    var tempnum = req.body.searchnum;
    var nameQ = `SELECT * from people where Name = '${temptext}'`
    var sizeQ = `SELECT * from people where Size = ${tempnum}`
    var heightQ = `SELECT * from people where Height = ${tempnum}`
    var typeQ = `SELECT * from people where Type = '${temptext}'`

      pool.query(nameQ,(error,result)=>{
        if(error){
          res.end(error)
        }
        console.log("displaying name");
        results = {'rows':result.rows}
        res.render('pages/db', results);
        res.end()
      })


      pool.query(sizeQ,(error,result)=>{
        if(error){
          res.end(error)
        }
        console.log("displaying size");
        results = {'rows':result.rows}
        res.render('pages/db', results);
        res.end()
      })

      pool.query(heightQ,(error,result)=>{
        if(error){
          res.end(error)
        }
        console.log("displaying height");
        results = {'rows':result.rows}
        res.render('pages/db', results);
        res.end()
      })


      pool.query(typeQ,(error,result)=>{
        if(error){
          res.end(error)
        }
        console.log("displaying type");
        results = {'rows':result.rows}
        console.log(results);
        res.render('pages/db', results);
        res.end()
      })
    
  })


  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

  showTimes = () => {
    let result = '';
    const times = process.env.TIMES || 5;
    for (i = 0; i < times; i++) {
      result += i + ' ';
    }
    return result;
  }
