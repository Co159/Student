const express = require("express");
const {createClass} = require('../api/classapi')
const {getClass} = require('../api/classapi')
const {updateClass} = require('../api/classapi')
const {deleteClass} = require('../api/classapi')


const classRoutes = express.Router();

classRoutes.post('/create', createClass);
classRoutes.get('/list', getClass);
classRoutes.put('/update', updateClass);
classRoutes.delete('/delete/:_id', deleteClass);

module.exports = {classRoutes}