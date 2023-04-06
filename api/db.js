import mysql from "mysql";

export const db= mysql.createConnection({
    host:"localhost",
    user:"ochula",
    password:"W#tness333",
    database: "Blogdb", 
    
})
