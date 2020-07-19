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
    const { name } = request.body;
    console.log(name);
    const db = dbservice.getDbServiceInstance();
    const result = db.insertNewName(name);
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));

});

//read
app.get('/getAll', (request, response) =>{
    //console.log(request);
    const db =  dbservice.getDbServiceInstance();
    const result = db.getAllData();
    //console.log(result)
    result
    .then(data => response.json({data:data}))
    .catch(err => console.log(err));
    

});

//update


//delete
app.delete('/delete/:id', (request, response)=>{
    console.log(request.params.id);
    const db =  dbservice.getDbServiceInstance();
    const result = db.deleteRowById(request.params.id);
    //console.log(result)
    result
    .then(data => response.json({success:data}))
    .catch(err => console.log(err));
    
})

app.listen(process.env.PORT, ()=>{
    console.log('app is runing');
})
