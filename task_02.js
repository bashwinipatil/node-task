const mysql = require('mysql')
const config = require('./config.json')

var port = config.server.port
var hostname = config.server.hostname

//creating mysql connection
var conn = mysql.createConnection({
	"host" : config.mysql.host,
	"user" : config.mysql.user,
	"password" : config.mysql.password,
	"database" : config.mysql.database
})

var server = http.createServer(function(req, res){
	statusCode = 200,
	setHeader('Context/Type','plain/text'),


	//mysql database connection
	conn.connect(function(err){
		if(err){
			console.log("error :: ", err)
		}
		console.log("database connected successfully......")

		//query	to execute
		var stmt1 = "delete from products_table where category_id = '1' and product_id = '2' ";
		conn.query(stmt1, function(err, data){
			if(!err){
				//sending deteled record response
				res.end("data :: " , data)
				//printing deleted record information
				console.log("data :: " , data)
			} else {
				console.log("err :: ", err)
			}
		})

		//database connection close
		conn.end(function(err){
			if(err){
				console.log("error :: ", err)
			}
			console.log("database connection closed.....")
		})
	})
})

server.listen(port, hostname, function(){
	console.log(`server running @ http://${hostname}:${port}`)
})
