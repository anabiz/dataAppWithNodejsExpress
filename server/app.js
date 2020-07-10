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
    const result = db.getAllData();
    result
    .then(data => response.json({data:data}))
    .catch(err => console.log(err));
    


});

//update


//delete

app.listen(process.env.PORT, ()=>{
    console.log('app is runing');
})