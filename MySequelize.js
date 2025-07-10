const {Sequelize} = require('sequelize');
let sequelize
const dotenv = require('dotenv');
dotenv.config();


sequelize = new Sequelize(process.env.SQL_DB, process.env.SQL_USER, process.env.SQL_PW , {
    host: (process.env.NODE_ENV == 'production') ? process.env.SQL_HOST : "localhost",
    port: process.env.SQL_PORT,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

// sequelize = new Sequelize(process.env.PSQL_DB, process.env.PSQL_USER, process.env.PSQL_PW , {
//     host: (process.env.NODE_ENV == 'production') ? process.env.PSQL_HOST : "localhost",
//     port: process.env.PSQL_PORT,
//     dialect: 'postgres',
//     pool: {
//         max: 10,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
// });


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        sequelize.sync({alter: false}).then(() => {
            console.log("Tables Created if not exists!")
        });
    })
    .catch(async err => {
        console.error('Unable to connect to the database:', err);
    });

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//         sequelize.sync({alter: false}).then(() => {
//             console.log("Tables Created if not exists!")
//         });
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

module.exports = sequelize;





