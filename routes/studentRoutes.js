const express = require("express");
const {createUSer} = require('../api/studentapi')
const {getUser} = require('../api/studentapi')
const {updateUser} = require('../api/studentapi')
const {deleteUser} = require('../api/studentapi')

const studentRoutes = express.Router();

studentRoutes.post('/create',createUSer);
studentRoutes.get('/list',getUser);
studentRoutes.put('/update',updateUser);
studentRoutes.delete('/delete/:_id',deleteUser);


module.exports = {studentRoutes}