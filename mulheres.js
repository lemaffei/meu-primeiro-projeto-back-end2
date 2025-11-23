const express = require('express')
const router = express.Router()
const concectaBancoDeDados = require('./bancoDeDados')
const cors =require('cors')
concectaBancoDeDados()
const Mulher = require('./MulherModel')
const app = express()
app.use(express.json())
app.use(cors())
const porta = 3333



// GET todas
async function mostraMulheres(request, response) {
      try{
          const mulheresVindasDoBancoDeDados = await Mulher.find()

          response.json(mulheresVindasDoBancoDeDados)
      } catch (erro) {
          console.log(erro)
      }
  
}

// POST nova

router.post('/mulheres', (req, res) => {
  const novaMulher = {
    nome: req.body.nome,
    imagem: req.body.imagem,
    minibio: req.body.minibio
  };

  res.status(201).json(novaMulher);
});

function mostramulheres(request, response) {
    response.json(mulheres)
}

 
async function criaMulher(request, response) {
    const novaMulher = new Mulher ({
      nome: request.body.nome,
      imagem: request.body.imagem,
      minibio: request.body.minibio,
      citacao: request.body.citacao
    })

  try {
      const mulherCriada = await novaMulher.save()
      response.status(201).json(mulherCriada)
  } catch (erro) {
      console.log(erro)
  }

}

function mostraporta() {
    console.log('Servidor criado e rodando na porta ', porta)
}

async function corrigeMulher(request, response) {
    try {
      const mulherEncontrada = await Mulher.findById(request.params.id)
      if (request.body.nome) {
      mulherEncontrada.nome =  request.body.nome
    }

    if (request.body.minibio) {
      mulherEncontrada.minibio =  request.body.minibio
    }

    if (request.body.imagem) {
      mulherEncontrada.imagem =  request.body.imagem
    }

    if (request.body.citacao) {
      mulherEncontrada.citacao =  request.body.citacao
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
    response.json(mulherAtualizadaNoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
    
}

async function deletaMulher(request, response) {  
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ mensagem: 'Mulher deletada com Sucesso'})

    } catch(erro) {
        console.log(erro)
}
}


// Usa router
app.use(router.get('/mulheres', mostramulheres))
app.use(router.post('/mulheres', criaMulher))
app.use(router.patch('/mulheres/:id', corrigeMulher))
app.use(router.delete('/mulheres/:id', deletaMulher))


// Servidor
app.listen(porta, mostraporta)