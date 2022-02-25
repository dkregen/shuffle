const ADODB = require('node-adodb');
const conn = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=db.mdb;');

const fs = require('fs');
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
        res.send(text);
    });
})

app.get('/adans', async (req, res) => {
    try {
        const data = await conn.query('SELECT * FROM adane ORDER BY maan DESC');
        res.json(data)
    } catch(e) {
        console.error(error);
        res.json('[]');
    }
})

app.put('/silur', async (req, res) => {
    try {
        const nomer = parseInt(req.query.nomer); 
        const pinanggal = parseInt((new Date()).getTime()/1000);
        const data = await conn.execute(`UPDATE adane SET maan = ${pinanggal} WHERE nomer = ${nomer}`);
        res.json({'pabesen':'Rahajeng!'})
    } catch(e) {
        console.error(e);
        res.json({'pabesen':'Error!'})
    }
})

app.listen(port, () => {
  console.log(`Applikasi ningeh ring port ${port}`)
})
