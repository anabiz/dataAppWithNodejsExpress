const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
let instance =null;

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err)=>{
     if(err){
         console.log(err.message);
     }
     console.log('db ' + connection.state);
});

class Dbservice {
    static getDbServiceInstance(){
        return instance ? instance : new Dbservice();
    }
    async getAllData(){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM names;";

                connection.query(query, (err, result)=>{
                    if(err) reject(new Error(err.message));
                    resolve (results);
                })
            });
            console.log(response);

        }catch(error){
            console.log(error);
        }
    }
}

module.exports.Dbservice;