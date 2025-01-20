const Sequelize = require("sequelize");
const mysql = require("mysql2");
const config = require("./config.json").development;

const connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
});

async function createDatabaseIfNotExists() {
  return new Promise((resolve, reject) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`, (err, results) => {
      if (err) {
        return reject(err);
      }
      console.log(`Banco de dados '${config.database}' verificado e criado, se necessário.`);
      resolve(results);
    });
  });
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: {
      connectTimeout: 60000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    retry: {
      max: 10, 
    },
  }
);

const connectWithRetry = async () => {
  try {
    await createDatabaseIfNotExists();

    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");

    connection.end();

    await sequelize.sync({ force: false });  
    console.log("Modelos sincronizados com sucesso.");
    
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    setTimeout(connectWithRetry, 5000); 
  }
};

connectWithRetry();

module.exports = sequelize;
