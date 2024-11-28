const express = require('express');
const { sequelize } = require('./models');
const  { seedDatabase } = require('./database/seeds/seedData');
const {router} = require('./routes/index')



const app = express();
app.use(express.json());
app.use(router);



app.listen(3000, async () => {
  try {
    await sequelize.sync(); 
    console.log('API rodando na porta 3000!');

    await seedDatabase();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  }
});
