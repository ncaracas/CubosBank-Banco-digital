const express = require('express');

const {
    listarContas,
    criarContas,
    atualizarUsuarios,
    excluirContas,
    efetuarDepositos,
    efetuarSaques,
    efetuarTransferencias,
    consultarSaldoDaConta,
    consultarExtratos
} = require('./controladores/banco-digital');

const rotas = express();

rotas.get("/contas", listarContas)
rotas.post("/contas", criarContas)
rotas.put("/contas/:numeroConta/usuario", atualizarUsuarios)
rotas.delete("/contas/:numeroConta", excluirContas)
rotas.post("/transacoes/depositar", efetuarDepositos)
rotas.post("/transacoes/sacar", efetuarSaques)
rotas.post("/transacoes/transferir", efetuarTransferencias)
rotas.get("/contas/saldo", consultarSaldoDaConta)
rotas.get("/contas/extrato", consultarExtratos)

module.exports = rotas