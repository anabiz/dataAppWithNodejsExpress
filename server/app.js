const express = require('./node_modules/express');
const app = express();
const cors = require('./node_modules/cors');
const dotenev = require('./node_modules/dotenv');
dotenev.config();

const dbservice = require('./dbservice');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//create
app.post('/insert', (request, response) =>{

});

//read
app.get('/getAll', (request, response) =>{
    console.log('test');
    const db =  dbservice.getDbServiceInstance();
    response.json({
        success: true
    });

});

//update


//delete

app.listen(process.env.PORT, ()=>{
    console.log('app is runing');
})