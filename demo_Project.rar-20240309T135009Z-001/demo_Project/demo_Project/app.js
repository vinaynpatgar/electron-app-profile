const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./DB/db.js');
const cors=require('cors');
const recordRoutes = require('./router/route.js'); 
const path=require('path')

connectDb();
const app = express();
const port = 2000;
app.use(cors());
app.use(bodyParser.json());
app.use('/records', recordRoutes);
app.use(express.static(__dirname + '/'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



