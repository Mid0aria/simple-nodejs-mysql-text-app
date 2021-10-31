const mysql = require("mysql");

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

var table = "test";
/*
//*CREATE 
db.query(
    `CREATE TABLE ${table} (id VARCHAR(255) ,üyedurum VARCHAR(255), puan VARCHAR(255))`,
    function (err, result) {
        if (err) throw err;
        console.log("Table created");
    }
); 
//*Insert 
db.query(
    `INSERT INTO ${table} (id, üyedurum, puan) VALUES ('2', 'VIP Üye', '972')`,
    function (err, result) {
        if (err) throw err;
        console.log("Successfully Inserted");
    }
);

//* Where 
db.query(
    `SELECT * FROM ${table} WHERE id IS NULL OR id = '123123'`,
    function (err, result) {
        if (err) throw err;
        var string = JSON.stringify(result);
        var result2 = JSON.parse(string);
        if (result2[0] == undefined) {
            result2 = null;
        }
        console.log(result2);
    }
);

//* Count 
db.query(`SELECT COUNT(*) FROM ${table}`, function (err, result) {
    if (err) throw err;
    console.log(result);
});


//* Last 
db.query(
    `SELECT * FROM ${table} ORDER BY id DESC LIMIT 1`,
    function (err, result) {
        if (err) throw err;
        var string = JSON.stringify(result);
        var result2 = JSON.parse(string);
        var value = Math.floor(result2[0].id / 1 + 1);

        console.log(value);

        db.query(
            `INSERT INTO ${table} (id, üyedurum, puan, hesapolusturmatarihi) VALUES ('${value}', 'VIP Üye', '0', '30.10.2021 16:48')`,
            function (err, result) {
                if (err) throw err;
                console.log();
            }
        );
    }
);
*/
