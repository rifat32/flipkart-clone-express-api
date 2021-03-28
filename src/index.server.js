const express = require('express');
const env = require('dotenv');
 const mongoose = require('mongoose')
 const path = require('path');
// routes

  const authRoutes = require('./routes/authRoutes')
 const adminAuthRoutes = require('./routes/Admin/authRoutes');
  const categoriesRoutes = require('./routes/categoriesRoutes');
  const productsRoutes = require('./routes/productsRoutes');
  const cartsRoutes = require('./routes/cartsRoutes');



const app = express();

env.config();

 mongoose.connect(
     `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.oaome.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
      {
          useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true
     }
 )
      .then(() => {
          console.log('db connected')
      });

app.use(express.json())
app.use('/public',express.static(path.join(__dirname,'uploads')))
   app.use('/api', authRoutes)
   app.use('/api', adminAuthRoutes)
   app.use('/api', categoriesRoutes)
    app.use('/api',productsRoutes);
    app.use('/api',cartsRoutes);



app.listen(process.env.PORT, () => {
    console.log(`port number ${process.env.PORT}`)
});
