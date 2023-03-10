const express = require('express');
const router = express.Router();
var mysql = require('../../mysql').pool;

//CREATE
router.post('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send ({error: error }) }
       conn.query(
           'INSERT INTO persons (FirstName, Family, ActorBirth, Died ) VALUES (?,?,?,?)',
           [req.body.FirstName, req.body.Family, req.body.ActorBirth, req.body.Died],
           (error, resultado, field) => {
               conn.release();
               if(error) { return res.status(500).send ({error: error }) }
                res.status(201).send({
                    mensagem: 'Personagem inserido com sucesso',
                    PersonId: resultado.insertId
                })
            }
            ) 
      
    })
});

//READ
router.get('/', (req, res) => {
    mysql.getConnection((error, conn) => {
     conn.query(
         'SELECT * FROM persons;',
         (error, resultado, field) => {
          if(error) { return res.status(500).send ({error: error }) }
          return res.status(200).send({response: resultado})
         }
     )
    })
 });

 //READ
 router.get('/:PersonID', (req, res) => {
    mysql.getConnection((error, conn) => {
     conn.query(
         'SELECT * FROM persons WHERE PersonID = ?;',
         (req.params.PersonID),
         (error, resultado, field) => {
          if(error) { return res.status(500).send ({error: error }) }
          return res.status(200).send({response: resultado})
         }
     )
    })
 });


 //UPDATE
 router.patch('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send ({error: error }) }
       conn.query(
            `UPDATE persons
                SET FirstName = ?,
                Family = ?,
                ActorBirth = ?, 
                Died = ?
            WHERE PersonID = ?`,
          [req.body.FirstName, req.body.Family, req.body.ActorBirth, req.body.Died, req.body.PersonID],
           (error, resultado, field) => {
               conn.release();
               if(error) { return res.status(500).send({error: error }) }
                res.status(202).send({
                    mensagem: 'Personagem atualizado com sucesso',
                })
            }
            ) 
      
    })
});

//DELETE 
router.delete('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send ({error: error }) }
       conn.query(
            'DELETE FROM persons WHERE PersonID = ?',
           [req.body.PersonID],
           (error, resultado, field) => {
               conn.release();
               if(error) { return res.status(500).send({error: error }) }
                res.status(202).send({
                    mensagem: 'Personagem removido com sucesso',
                })
            }
            ) 
      
    })
});

module.exports = router ;