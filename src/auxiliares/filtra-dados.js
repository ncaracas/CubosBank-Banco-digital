function filtrarTransacoesPorConta(transacoes, numero_conta, outroNumeroConta = 'numero_conta') {
    return transacoes.filter((transacao) => transacao[outroNumeroConta] === numero_conta)
};



module.exports = filtrarTransacoesPorConta