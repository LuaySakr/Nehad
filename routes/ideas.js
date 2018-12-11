const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth.js')

//Load IdeaModel
require('../models/Idea');
const Idea = mongoose.model('ideas');

//IdeasIndex Routes
router.get('/', ensureAuthenticated, (req, res) => {
    Idea.find({ user: req.user.id })
        .sort({ date: 'desc' })
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        })

});

//EditIdea Form Routes
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
        .then(idea => {
            if (idea.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/ideas');
            } else {
                res.render('ideas/edit', {
                    idea: idea
                });
            }
        });

});

//AddIdea Form Routes
router.get('/Add', ensureAuthenticated, (req, res) => {
    res.render('ideas/add');
});

//Process Add Form
router.post('/', ensureAuthenticated, (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({ text: 'Please enter a title' });
    }
    if (!req.body.details) {
        errors.push({ text: 'Please enter some details' });
    }

    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const newuser = {
            title: req.body.title,
            details: req.body.details,
            user: req.user.id,
            Photo:req.body.Photo
        }
        new Idea(newuser)
            .save()
            .then(() => {
                req.flash('success_msg', 'Idea Added');
                res.redirect('./Ideas');
            });
    }

});

//Process Edit Form
router.put('/:id', ensureAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
        .then(idea => {
            idea.title = req.body.title;
            idea.details = req.body.details;

            idea.save()
                .then(idea => {
                    req.flash('success_msg', 'Idea updated');
                    res.redirect('/ideas');
                });
        });
});

//Process Delete Form
router.delete('/:id', ensureAuthenticated, (req, res) => {
    Idea.remove({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Idea removed');
            res.redirect('/ideas');
        });
});


module.exports = router;