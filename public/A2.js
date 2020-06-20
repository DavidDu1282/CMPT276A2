//const common = require('./common');
//const other = require('./other');

document.getElementById("adduser").addEventListener('click',(evt)=>{
  var uname = document.getElementById(Name).values;
  var usize = document.getElementById(Size).values;
  var uheight = document.getElementById(Height).values;
  var utype = document.getElementById(Type).values;
  common.pool.query(`insert into people values (uname,usize,uheight,utype)`);
  console.log("inserted");
});
