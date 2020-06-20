const common = require('./common');
const other = require('./other');

document.getElementById("adduser").addEventListener('click',(evt)=>{
  var uname = document.getElementById(Name).body.Name;
  var usize = document.getElementById(Size).body.Size;
  var uheight = document.getElementById(Height).body.Height;
  var utype = document.getElementById(Type).body.Type;
  common.pool.query(`insert into people values (uname,usize,uheight,utype)`);
  console.log("inserted");
});
