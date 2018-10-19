var express = require("express"),
    app = express(),
		http     = require("http"),
    server   = http.createServer(app),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
		Mysql = require('sync-mysql');

function print(msg){console.log(msg)}
function println(msg){console.log(msg+"\n")}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

const dbConn = new Mysql({
  host     : 'localhost',
	port		 : 3306,
  user     : 'root',
  password : 'passroot',
	database : 'login'
});

var router = express.Router();


router.post('/login', function(req, res) {
	print("Request "+JSON.stringify(req.body));
	var user = req.body.user
	var password = req.body.password
	if(user == null){
		res.send(false);
		console.log("Usuario es null");
		return;
	}
	
	var query = "SELECT l.* FROM login l WHERE l.user = '"+user+"' ORDER BY l.user;"
	print(query);
	var result = dbConn.query(query); //mysqlQuery(query);
	if(result == null){
		res.send(false);
		print("Error en consulta");
		return;
	}
	var value = result[0]
	if(value == null){
		res.send(false);
		print("No encontro al usuario");
		return;
	}
	print("Result "+JSON.stringify(value));
	if(value.password == password){
		res.send(true);
		print("Login OK");
	}else{
		res.send(false);
		print("Contraseña incorrecta");
	}
});

app.use(router);

app.listen(8090, function() {
  print("Node server running on http://localhost:8090");
});



