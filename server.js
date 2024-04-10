const express = require("express");
const {router} = require('./routes')
const server = express();

require('./config')
// require('./api/classapi')
server.use(express.json());

server.use(router)
// const routers = express.Router()

// const {createUSer} = require('./api/studentapi')
// const data = routers.post('/create',createUSer)
// server.use(data)

// const {getUser} = require('./api/studentapi')
// const getdata = routers.get('/list',getUser)
// server.use(getdata);

// const {updateUser} = require('./api/studentapi')
// const updatedata = routers.get('/update',updateUser)
// server.use(updatedata);


// const {deleteUser} = require('./api/studentapi')
// const deletedata = routers.get('/delete/:id', deleteUser)
// server.use(deletedata);



// const student = require('./model/studentmodel')

server.listen(7000,()=>{
    console.log("server is calling on 7000 port")
})


//create class create,get method