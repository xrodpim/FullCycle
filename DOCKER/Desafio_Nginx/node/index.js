const express = require('express')
const app = express()
const port = 3000
const config = {
	host: 'db',
	user: 'root',
	password: 'root',
	database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql =`INSERT INTO people(name) values('Rodrigo')`
connection.query(sql)



//Inserir aqui uma query de select no banco de dados e buscar o nome que foi inserido.
//guardar esse nome numa variável


connection.end()

app.get('/', (req,res) => {
	//res.send('<h1>Full Cycle Rocks!! Desafio com Nginx, Node e MySQL.</h1>')  

        res.send('</p><p>&lt;h1&gt;Full Cycle Rocks!&lt;/h1&gt;</p><p></p><p>- Lista de nomes cadastrada no banco de dados.</p><p>');
})

app.listen(port, () => {
	console.log ('Rodando na porta ' + port)
})
