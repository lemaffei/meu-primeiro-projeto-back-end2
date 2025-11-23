const mongoose = require('mongoose')

require('dotenv').config()

async function concectaBancoDeDados() {
    try {

        console.log('Conexao com banco de dados Iniciou')

        await mongoose.connect(process.env.MONGO_URL)
        
        console.log('Conexao com banco de dados feita com Sucesso!')
        

        } catch(erro) {
                console.log(erro)
        }
}

module.exports = concectaBancoDeDados