const express = require('express');
const sqlite = require('sqlite3');
const cors = require('cors');
const path = require('path');

app = express();
app.use(cors());
app.use(express.json());
const port = 8080;
const dbPath = path.join(__dirname, 'sqlite.db');


// Criando o Banco
const db = new sqlite.Database(dbPath, (err) => {
    if (err) {

        console.error('ERRO NO BANCO - ', err.message);

    } else {

        try{
            db.run(`CREATE TABLE IF NOT EXISTS favoritos (
            uuid INTEGER PRIMARY KEY AUTOINCREMENT,
            id INTEGER UNIQUE NOT NULL,
            nota TEXT
            )`
        )}catch(err) {
            console.log("ERRO NA TABELA - ", err)
        }
    }
});


app.post('/createFav', (req, res) => {

    if (!req.body) {
        return res.status(400).json({error: "ERRO - A requisição não tem parâmetros"});
    }

    if(req.body.id && req.body.notes) {

        const id = req.body.id;
        const notes = req.body.notes;

        const sql = "Insert INTO favoritos (id, nota) VALUES (?, ?)"
        db.run(sql, [id, notes], (err) => {
            if(err) {

                console.error("ERRO AO INSERIR - ", err);
                return res.status(400).json({status: 400, error: "Dados inconsistentes"});
            }
            else {
                return res.status(200).json({status: 200});
            }
        });                
    }
    else {
        return res.status(400).json({error: "ERRO - A requisição não tem parâmetros suficientes"});
    }
});

app.delete('/deleteFav', (req, res) => {

    if (!req.body) {
        return res.status(400).json({error: "ERRO - A requisição não tem parâmetros"});
    }

    if(req.body.id) {
        
        const id = req.body.id;

        const sql = "DELETE FROM favoritos WHERE id = ?";
        db.run(sql, [id], function (err) {
            if(err) {

                console.error("ERRO AO DELETAR - ", err);
                return res.status(400).json({status: 400, error: "Dados inconsistentes"});
            }
            else {

                if (this.changes > 0) {
                    return res.status(200).json({status: 200, message: "Pokemon apagado"});
                }
                else {
                    return res.status(200).json({status: 200, message: "Nenhum pokemon com esse id"});
                }
            }
        });
    }
});

app.patch('/updateFav', (req, res) => {
    
    if (!req.body) {
        return res.status(400).json({error: "ERRO - A requisição não tem parâmetros"});
    }
    
    if (req.body.id && req.body.notes){

        const sql = "UPDATE favoritos SET nota = ? WHERE id = ?";
        const params = [req.body.notes, req.body.id];

        db.run(sql, params, function(err) {
            if (err) {
                console.error("ERRO AO EDITAR - ", err);
                return res.status(400).json({status: 400, error: "ERRO AO ATUALIZAR - "});
            }

            if (this.changes === 0) {
                return res.status(404).json({status: 404, error: "ERRO - NÃO ENCONTRADO"});
            }

            return res.status(200).json({status: 200});
        });
    } else {
        return res.status(400).json({error: "ERRO - ID e notes são obrigatórios"});
    }
    }
);

app.get('/listFav', (req, res) => {

    const sql = "SELECT * FROM favoritos";

    db.all(sql, function(err, rows) {
        if (err) {
            console.error("ERRO AO BUSCAR - ", err);
            return res.status(400).json({status: 400, error: "ERRO AO ATUALIZAR - "});
        }

        if (this.changes === 0) {
            return res.status(404).json({status: 404, error: "ERRO - NÃO ENCONTRADO"});
        }

        return res.status(200).json({status: 200, data:rows});
    });
});


// Escutador do servidor
const server = app.listen(port, () => {
    console.log("Rodando em ", port);
});