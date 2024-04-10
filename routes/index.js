const express = require('express');
const { studentRoutes } = require('./studentRoutes')
const { classRoutes } = require('./classRoutes')
const { subjectRoutes } = require('./subjectRoutes');
const { examRoutes } = require('./examRoutes');

const router = express.Router();

router.use('/user',studentRoutes);
router.use('/data',classRoutes);
router.use('/sub',subjectRoutes);
router.use('/exam',examRoutes);

module.exports = {
    router    
}