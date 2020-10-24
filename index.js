if(process.env.NODE_ENV!=='prod'){
    require('dotenv').config();
}




const express = require('express');
const cors = require('cors');
const routes = require('./router');

const app = express();
    
require('./src/database');

app.disable('x-powered-by');
app.use(express.json());
app.use(cors());
app.use(routes);


app.listen(process.env.PORT);