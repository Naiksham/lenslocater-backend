// server.js
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {checkSchema, check} = require('express-validator')
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
const serviceProviderSchema = require('./app/validators/serviceProvider-validator');
const gallerySchema = require('./app/validators/gallery-validator')
const enquirySchema = require('./app/validators/enquiry-validator')
const invoiceSchema = require('./app/validators/invoice-validator')
const paymentSchema = require('./app/validators/payment-validator')
const reviewsSchema = require('./app/validators/reviews-validator')
const upload = require('./app/middlewares/galleryUpload')
const userCltr = require('./app/controllers/usersCltr')
const serviceProviderCltr = require('./app/controllers/serviceProviderCltr')
const galleryCltr = require('./app/controllers/galleryCltr')
const enquiryCltr = require('./app/controllers/enquiryCltr')
const invoiceCltr = require('./app/controllers/invoiceCltr')
const paymentsCltr = require('./app/controllers/paymentCltr')
const {reviewsCltr, ratingCltr} = require('./app/controllers/reviewCltr')
const role = require('./app/utils/role');
ConfigureDB()

app.post('/api/users/register', checkSchema(userRegisterSchema), userCltr.register)
// app.post('/api/users/register-serviceProvider', checkSchema(userRegisterSchema),authenticateUser, authorizeUser([role.admin]), userCltr.serviceProvider)
app.post('/api/users/login', checkSchema(userLoginSchema), userCltr.login)
app.get('/api/users/account', authenticateUser, userCltr.account)

app.post('/api/serviceProvider', checkSchema(serviceProviderSchema),authenticateUser, authorizeUser([role.serviceProvider]), serviceProviderCltr.create)
app.put('/api/serviceProvider/:id', checkSchema(serviceProviderSchema),authenticateUser, authorizeUser([role.serviceProvider]), serviceProviderCltr.update)
app.delete('/api/serviceProvider/:id', checkSchema(serviceProviderSchema),authenticateUser, authorizeUser([role.serviceProvider]), serviceProviderCltr.delete)

app.post('/api/galleries/:id' , authenticateUser , authorizeUser([role.serviceProvider]),upload.fields([{name:'galleryImg'}, {name: 'galleryVideo'}]) , checkSchema(gallerySchema) ,  galleryCltr.create)
app.get('/api/galleries', galleryCltr.list)
app.get('/api/galleries/:id', galleryCltr.listOne)
app.put('/api/galleries/:id' , authenticateUser , authorizeUser([role.serviceProvider]),upload.fields([{name:'galleryImg'}, {name: 'galleryVideo'}]) , checkSchema(gallerySchema) ,  galleryCltr.update)
app.put('/api/galleries/:id',authenticateUser, authorizeUser([role.serviceProvider]), galleryCltr.delete)

app.post('/api/enquiries/:id', checkSchema(enquirySchema), authenticateUser, authorizeUser([role.customer]),body('message'), enquiryCltr.create)
app.put('/api/enquiries/:id', checkSchema(enquirySchema), authenticateUser, authorizeUser([role.serviceProvider]), body('response'), enquiryCltr.update)

app.post('/api/invioices/:id', checkSchema(invoiceSchema), authenticateUser, authorizeUser([role.serviceProvider]), invoiceCltr.create)
app.get('/api/invoices', invoiceCltr.list)

app.post('/api/create-checkout-session',checkSchema(paymentSchema), authenticateUser, authorizeUser([role.customer]), paymentsCltr.pay)
app.put('/api/payments/:id/success',paymentsCltr.successUpdate)
app.put('/api/payments/:id/failed',paymentsCltr.failedUpdate)

app.post('/api/reviews:id', checkSchema(reviewsSchema), authenticateUser, authorizeUser([role.customer], reviewsCltr.create))
app.get('/api/reviews', reviewsCltr.list)
app.post('/api/ratings:id', checkSchema(reviewsSchema), authenticateUser, authorizeUser([role.customer]), ratingCltr.create)
app.get('/api/ratings', ratingCltr.list)

app.listen(port, () => {
  console.log("Server is running on port", port);
});