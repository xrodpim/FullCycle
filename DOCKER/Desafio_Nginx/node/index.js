const express = require('express')
const app = express()
const port = 3000
const config = {
	host: 'db', //nome do container do banco de dados.
	user: 'root',
	password: 'root',
	database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql =`INSERT INTO people(name) values('Rodrigo')`
connection.query(sql)
const sqlSelect = `SELECT * from people`

connection.end()

app.get('/', (req,res) => {
	//res.send('<h1>Full Cycle Rocks!! Desafio com Nginx, Node e MySQL.</h1>')  


        const connectionForQuery = mysql.createConnection(config)
	connectionForQuery.query(sqlSelect,(err,results)=> {
		if (err) {
	           throw err;
		}
                res.send(`</p><p>&lt;h1&gt;Full Cycle Rocks!&lt;/h1&gt;</p><p></p><p>- Lista de nomes cadastrada no banco de dados(Existe somente 1):</p><p>${results[0].name}</p>`);
	}); 

        connectionForQuery.end();
        


});

app.listen(port, () => {
	console.log ('Rodando na porta ' + port)
})
