const express = require('express');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser');




const db = mysql.createConnection({


host : 'localhost',
user : 'root',
password:  '',
database : 'nodemysql'



});

//db baðlanma hatasý 
db.connect((error) => {

if(error) {

	throw error;
	console.log("Mysql baðlanýtýnýzý kontrol ediniz")

}
console.log("Mysql baðlandý");


});


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.get('/api',(req,res)=>{
	
	
	res.send("Hos geldiniz dokumantasyondan yararlanarak islemleri gerceklestirebilirisiniz. ");
	
	
	
})



// Create DB
app.get('/api/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Create table
app.get('/api/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});



// Insert post 
app.get('/api/ekle/:title/:body', (req, res) => {
	
	
    let post = {title: req.params.title, body: req.params.body};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Eklendi');
    });
});



app.post('/api/demo', (req, res) => {

  const {id, name, surname} = req.body;
  console.log(id, name, surname);
  res.send(name);

  


});

app.post('/api/demo2', (req, res) => {

  var params  = req.body;
   console.log(params);
   res.send(params.id);
  


});


app.post('/api/insertdemo', (req, res) => {

var params  = req.body;
   console.log(params);
   
   let post = {title: params.title, body: params.body};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Eklendi');
    });
   

});



// goruntule postlarý 
app.get('/api/goruntule', (req, res) => {
   

		db.query('SELECT * FROM posts',(err,rows,fields) => {
		
		
		if(!err)
			res.send(rows);
		else
			res.send(err);
		
		
		});



});

// goruntule postlarý 
app.get('/api/goruntule/:id', (req, res) => {
   

		db.query('SELECT * FROM posts where id = ?', [req.params.id], (err,rows,fields) => {
		
		
		if(!err)
			res.send(rows);
		else
			res.send(err);
		
		
		});



});


app.delete('/api/sil/:id',(req,res) =>{
	
	db.query('delete from posts where id= ?',[req.params.id],(err,rows,fields)=>{
		
		if(!err)
			res.send("Silme islemi basarili");
		else
			res.send(err);
		
		
		
		
		
	});
	
	
	
	
	
});


app.put('/api/guncelle',(req,res) =>{
	
	db.query('UPDATE posts SET title=?,body=? where id=?', [req.body.title,req.body.body, req.body.id], function (error, results, fields) {
	  
	  if(!error)
			res.send("Guncelleme islemi basarili");
		else
			res.send(error);
		
	
	
	
	
});
});






app.listen('3000', () => {

console.log("server started port :  3000 ");
 

})