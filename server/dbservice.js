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
//console.log(connection);
connection.connect((err)=>{
     if(err){
         console.log(err.message);
     }
     console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }
    async getAllData(){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM name;";
                
                connection.query(query, (err, results)=>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });
           console.log(response[0].Name);
            return response;

        }catch(error){
            console.log(error);
        }
    }

    async insertNewName(name) {
        try{
            const dateAdded = new Date();
            const insertid = await new Promise((resolve, reject)=> {
                const query ="INSERT INTO name (name, date) VALUE (?,?);";

                connection.query(query, [name, dateAdded],(err, result)=> {
                    if(err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
           //console.log(insertid);
            return {
                id: insertid,
                name: name,
                date: dateAdded
            };

        }catch(error){
            console.log(error);
        }
    }
    /*
    insertNewName(name) {
        try{
           const dateAdded = new Date();
           const query ="INSERT INTO name (name, date) VALUE (?,?);";

            connection.query(query, [name, dateAdded],(err, result)=> {
           // console.log(err);
            console.log(result);
            return result.insertId;
            })

        }catch{
            throw err;
        }    
        
     // return result;

    }
    */

    async deleteRowById(id){
        id = parseInt(id, 10);
        try{
            const response = await new Promise((resolve, reject)=> {
                const query ="DELETE FROM name WHERE id = ?";
    
                connection.query(query, [id],(err, result)=> {
                    if(err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            console.log(response);
            return response === 1 ? true : false;

        }catch(error){
            console.log(error);
            return false;
        }
    }
    
}

module.exports = DbService;
