const express = require('express')
const router = express.Router()
const conectaBancoDeDados = require('./bancoDeDados')
const cors = require('cors')
const Mulher = require('./MulherModel')

conectaBancoDeDados()

const app = express()
app.use(express.json())
app.use(cors())

const porta = 3333

// GET – listar todas
async function mostraMulheres(request, response) {
  try {
    const mulheres = await Mulher.find()
    response.json(mulheres)
  } catch (erro) {
    console.log(erro)
    response.status(500).json({ erro: 'Erro ao buscar mulheres' })
  }
}

// POST – criar
async function criaMulher(request, response) {
  try {
    const novaMulher = new Mulher({
      nome: request.body.nome,
      imagem: request.body.imagem,
      minibio: request.body.minibio,
      citacao: request.body.citacao
    })

    const mulherCriada = await novaMulher.save()
    response.status(201).json(mulherCriada)
  } catch (erro) {
    console.log(erro)
    response.status(400).json({ erro: 'Erro ao criar mulher' })
  }
}

// PATCH – atualizar
async function corrigeMulher(request, response) {
  try {
    const mulher = await Mulher.findById(request.params.id)

    if (!mulher) {
      return response.status(404).json({ erro: 'Mulher não encontrada' })
    }

    if (request.body.nome) mulher.nome = request.body.nome
    if (request.body.imagem) mulher.imagem = request.body.imagem
    if (request.body.minibio) mulher.minibio = request.body.minibio
    if (request.body.citacao) mulher.citacao = request.body.citacao

    const mulherAtualizada = await mulher.save()
    response.json(mulherAtualizada)
  } catch (erro) {
    console.log(erro)
    response.status(400).json({ erro: 'Erro ao atualizar mulher' })
  }
}

// DELETE – deletar
async function deletaMulher(request, response) {
  try {
    await Mulher.findByIdAndDelete(request.params.id)
    response.json({ mensagem: 'Mulher deletada com sucesso' })
  } catch (erro) {
    console.log(erro)
    response.status(400).json({ erro: 'Erro ao deletar mulher' })
  }
}

// Rotas
router.get('/mulheres', mostraMulheres)
router.post('/mulheres', criaMulher)
router.patch('/mulheres/:id', corrigeMulher)
router.delete('/mulheres/:id', deletaMulher)

// Servidor
app.use(router)

app.listen(porta, () => {
  console.log('Servidor rodando na porta', porta)
})
