// server.js
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {checkSchema} = require('express-validator')
const ConfigureDB = require('./config/db');
const port = process.env.PORT || 3062
const app = express();

app.use(express.json())
app.use(cors());
// app.use(bodyParser.json());

// app.use((req, res, next)=>{
//   console.log(`${req.id} - ${req.method} - ${req.url} - ${new Date()}`)
//   next()
// })

const {userRegisterSchema, userLoginSchema} = require('./app/validators/user-validator')
const {authenticateUser, authorizeUser} = require('./app/middlewares/auth')
const userCltr = require('./app/controllers/usersCltr')
const serviceProviderCltr = require('./app/controllers/serviceProviderCltr')
const role = require('./app/utils/role');
const serviceProviderSchema = require('./app/validators/serviceProvider-validator');
ConfigureDB()

app.post('/api/users/register', checkSchema(userRegisterSchema), userCltr.register)
// app.post('/api/users/register-serviceProvider', checkSchema(userRegisterSchema),authenticateUser, authorizeUser([role.admin]), userCltr.serviceProvider)
app.post('/api/users/login', checkSchema(userLoginSchema), userCltr.login)
app.get('/api/users/account', authenticateUser, userCltr.account)

app.post('/api/serviceProvider', checkSchema(serviceProviderSchema),authenticateUser, authorizeUser([role.serviceProvider]), serviceProviderCltr.create)
app.put('/api/serviceProvider/:id', checkSchema(serviceProviderSchema),authenticateUser, authorizeUser([role.serviceProvider]), serviceProviderCltr.update)
app.delete('/api/serviceProvider/:id', checkSchema(serviceProviderSchema),authenticateUser, authorizeUser([role.serviceProvider]), serviceProviderCltr.delete)

app.listen(port, () => {
  console.log("Server is running on port", port);
});