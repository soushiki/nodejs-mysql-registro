const express = require('express');
const { validationResult } = require('express-validator/check');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('asignaturas/add');
});

router.post('/add', async (req, res) => {
    const { title, profesor, description } = req.body;
    const newSubject = {
        title,
        profesor,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO subjects set ?', [newSubject]);
    req.flash('success', 'Subject Saved Successfully');
    res.redirect('/asignaturas');
});

router.get('/', isLoggedIn, async (req, res) => {
    const asignaturas = await pool.query('SELECT * FROM subjects WHERE user_id = ?', [req.user.id]);
    res.render('asignaturas/list', { asignaturas });
    
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query( 'DELETE FROM grades WHERE subject_id = ?', [id] );
    await pool.query('DELETE FROM subjects WHERE ID = ?', [id]);
    req.flash('success', 'Subject Removed Successfully');
    res.redirect('/asignaturas');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const asignaturas = await pool.query('SELECT * FROM subjects WHERE id = ?', [id]);
    res.render('asignaturas/edit', {asignatura: asignaturas[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, profesor} = req.body; 
    const newSubject = {
        title,
        description,
        profesor
    };
    await pool.query('UPDATE subjects set ? WHERE id = ?', [newSubject, id]);
    req.flash('success', 'Subject Updated Successfully');
    res.redirect('/asignaturas');
});

router.get('/notas/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const notas =  await pool.query('SELECT * FROM grades WHERE user_id = ? AND subject_id = ?', [req.user.id, id]);
    res.render( 'asignaturas/notas', { notas, id });
});


router.post('/notas/add', async (req, res) => {
    const { grade, percentage, description, subject_id} = req.body;
    const newGrade = {
        grade,
        percentage,
        description,
        subject_id,
        user_id: req.user.id
        
    };

    
  
    
    await pool.query( 'INSERT INTO grades set ?', [newGrade]);
    res.redirect( '/asignaturas/notas/' + subject_id);
    

});


router.get('/notas/delete/:subject_id/:id', async (req, res) => {
    const { subject_id, id  } = req.params;
    await pool.query('DELETE FROM grades WHERE ID = ?', [id]);
    res.redirect('/asignaturas/notas/' + subject_id);
});

router.get('/notas/nota_edit/:subject_id/:id', async (req, res) => {
    const { id } = req.params;
    const notas = await pool.query('SELECT * FROM grades WHERE id = ?', [id]);
    res.render('asignaturas/nota_edit', {nota: notas[0]});
});

router.post('/notas/nota_edit/:subject_id/:id', async (req, res) => {
    const { subject_id, id } = req.params;
    const { grade, percentage, description} = req.body; 
    const newSubject = {
        grade,
        percentage,
        description
    };
    await pool.query('UPDATE grades set ? WHERE id = ?', [newSubject, id]);
    req.flash('success', 'Grade Updated Successfully');
    res.redirect('/asignaturas/notas/' + subject_id);
   
});

module.exports = router;