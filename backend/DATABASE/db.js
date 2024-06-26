import mysql from "mysql2/promise"

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Ajisyah.123",
    database: "ikan"
})

async function connection (){
    try {
        await db.getConnection();
        console.log("database connected");
    } catch (error) {
        console.log("database not connected");
    }
}

async function query(command, values) {
    try {
        const[value]= await db.query (command, values ?? [ ]);
        return value;
    } catch (error) {
        console.log(error);
    }
}

export { connection, query};