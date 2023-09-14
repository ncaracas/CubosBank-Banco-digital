const { contas, depositos, saques, transferencias } = require('../dados/bancodedados')
const mensagensDeErro = require('../errors/mensagensDeErro')
const filtrarTransacoesPorConta = require('../auxiliares/filtra-dados')
const formatarDatatransacao = require('../auxiliares/formata-data')
const gerarNovoId = require('../auxiliares/incrementaId');
const {
    verificarCPF,
    verificarEmail,
    verificarCPFouEmailNaConta,
    verificarConta,
    verificarSenha
} = require('../auxiliares/valida-dados')



const listarContas = (req, res) => {
    const { senha_banco } = req.query;

    if (senha_banco !== 'Cubos123Bank') {
        const mensagem = mensagensDeErro.senhaInvalida;
        return res.status(401).json({ mensagem })
    }
    return res.status(200).json(contas);
}



const criarContas = (req, res) => {
    const {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        const mensagem = mensagensdeerro.dadosObrigatorios;
        return res.status(400).json({ mensagem });
    }

    const existeCPFouEmail = verificarCPFouEmailNaConta(cpf, email, contas);

    if (existeCPFouEmail) {
        const mensagem = mensagensDeErro.duplicidadeDeCpfouEmail;
        return res.status(403).json({ mensagem })
    }

    const usuario = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    }

    const novoId = gerarNovoId();

    const novaConta = {
        "numero": String(novoId),
        "saldo": 0,
        "usuario": usuario
    }

    contas.push(novaConta);
    return res.status(201).json();
}



const atualizarUsuarios = (req, res) => {
    const { numeroConta } = req.params;

    const {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        const mensagem = mensagensDeErro.dadosObrigatorios
        return res.status(400).json({ mensagem });
    }

    if (isNaN(numeroConta)) {
        const mensagem = mensagensDeErro.parametroInvalido
        return res.status(400).json({ mensagem })
    }

    const conta = verificarConta(numeroConta, contas);

    if (!conta) {
        const mensagem = mensagensDeErro.contaInexistente;
        return res.status(404).json({ mensagem })
    }

    if (conta.usuario.cpf !== cpf) {
        const existeCPF = verificarCPF(cpf, contas);

        if (existeCPF) {
            const mensagem = mensagensDeErro.duplicidadeDeCpf;
            return res.status(403).json({ mensagem })
        }
    }

    if (conta.usuario.email !== email) {
        const existeEmail = verificarEmail(email, contas);

        if (existeEmail) {
            const mensagem = mensagensDeErro.duplicidadeDeEmail;
            return res.status(403).json({ mensagem })
        }
    }

    conta.usuario.nome = nome;
    conta.usuario.cpf = cpf;
    conta.usuario.data_nascimento = data_nascimento;
    conta.usuario.telefone = telefone;
    conta.usuario.email = email;
    conta.usuario.senha = senha;

    return res.status(204).json();
}



const excluirContas = (req, res) => {
    const { numeroConta } = req.params;

    if (isNaN(numeroConta)) {
        const mensagem = mensagensDeErro.parametroInvalido
        return res.status(400).json({ mensagem })
    }

    const conta = verificarConta(numeroConta, contas);

    if (!conta) {
        const mensagem = mensagensDeErro.contaInexistente;
        return res.status(404).json({ mensagem })
    }

    if (conta.saldo !== 0) {
        const mensagem = mensagensDeErro.excluirConta;
        return res.status(401).json({ mensagem });
    }

    contas.splice(contas.indexOf(conta), 1);

    return res.status(204).json();
}



const efetuarDepositos = (req, res) => {
    const {
        numero_conta,
        valor
    } = req.body;

    if (valor <= 0) {
        const mensagem = mensagensDeErro.depositoNegativo;
        return res.status(403).json({ mensagem });
    }

    if (!numero_conta || !valor) {
        const mensagem = mensagensDeErro.dadosContaEValorObrigatorios;
        return res.status(400).json({ mensagem });
    }

    const conta = verificarConta(numero_conta, contas);

    if (!conta) {
        const mensagem = mensagensDeErro.contaInexistente;
        return res.status(404).json({ mensagem })
    }

    const dataTransacao = formatarDatatransacao();

    const deposito = {
        "data": dataTransacao,
        "numero_conta": numero_conta,
        "valor": valor
    }

    conta.saldo += valor;
    depositos.push(deposito);
    return res.status(204).json();
}



const efetuarSaques = (req, res) => {
    const {
        numero_conta,
        valor,
        senha
    } = req.body;

    if (valor <= 0) {
        const mensagem = mensagensDeErro.depositoNegativo;
        return res.status(403).json({ mensagem });
    }

    if (!numero_conta || !valor || !senha) {
        const mensagem = mensagensDeErro.dadosObrigatorios
        return res.status(400).json({ mensagem });
    }

    const conta = verificarConta(numero_conta, contas);

    if (!conta) {
        const mensagem = mensagensDeErro.contaInexistente;
        return res.status(404).json({ mensagem })
    }

    const confereSenha = verificarSenha(senha, contas);

    if (!confereSenha) {
        const mensagem = mensagensDeErro.senhaInvalida;
        return res.status(401).json({ mensagem });
    }

    if (conta.saldo < valor) {
        const mensagem = mensagensDeErro.saldoInsuficiente;
        return res.status(403).json({ mensagem });
    }

    const dataTransacao = formatarDatatransacao();

    const saque = {
        "data": dataTransacao,
        "numero_conta": numero_conta,
        "valor": valor
    }

    conta.saldo -= valor;
    saques.push(saque);
    return res.status(204).json();
}



const efetuarTransferencias = (req, res) => {
    const {
        numero_conta_origem,
        numero_conta_destino,
        valor,
        senha
    } = req.body;

    if (valor <= 0) {
        const mensagem = mensagensDeErro.depositoNegativo
        return res.status(403).json({ mensagem });
    }

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        const mensagem = mensagensDeErro.dadosObrigatorios
        return res.status(400).json({ mensagem });
    }

    const contaOrigem = verificarConta(numero_conta_origem, contas);

    if (!contaOrigem) {
        const mensagem = mensagensDeErro.contaOrigemInexistente;
        return res.status(404).json({ mensagem });
    }

    const contaDestino = verificarConta(numero_conta_destino, contas);

    if (!contaDestino) {
        const mensagem = mensagensDeErro.contaDestinoInexistente;
        return res.status(404).json({ mensagem });
    }

    const confereSenha = verificarSenha(senha, contas);

    if (!confereSenha) {
        const mensagem = mensagensDeErro.senhaInvalida;
        return res.status(401).json({ mensagem });
    }

    if (contaOrigem.saldo < valor) {
        const mensagem = mensagensDeErro.saldoInsuficiente;
        return res.status(403).json({ mensagem });
    }

    const dataTransacao = formatarDatatransacao();

    const transferencia = {
        "data": dataTransacao,
        "numero_conta_origem": numero_conta_origem,
        "numero_conta_destino": numero_conta_destino,
        "valor": valor
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;
    transferencias.push(transferencia);
    return res.status(204).json();
}



const consultarSaldoDaConta = (req, res) => {
    const { numero_conta, senha } = req.query;

    const conta = verificarConta(numero_conta, contas)

    if (!conta) {
        const mensagem = mensagensDeErro.contaInexistente
        return res.status(404).json({ mensagem });
    }

    const confereSenha = verificarSenha(senha, contas)

    if (!confereSenha) {
        const mensagem = mensagensDeErro.senhaInvalida;
        return res.status(401).json({ mensagem });
    }

    return res.status(200).json({ "saldo": conta.saldo });
}



const consultarExtratos = (req, res) => {
    const { numero_conta, senha } = req.query;

    const conta = verificarConta(numero_conta, contas);

    if (!conta) {
        const mensagem = mensagensDeErro.contaInexistente;
        return res.status(404).json({ mensagem });
    }

    const confereSenha = verificarSenha(senha, contas);

    if (!confereSenha) {
        const mensagem = mensagensDeErro.senhaInvalida;
        return res.status(401).json({ mensagem });
    }

    const deposito = filtrarTransacoesPorConta(depositos, numero_conta);
    const saque = filtrarTransacoesPorConta(saques, numero_conta);
    const transferenciasEnviadas = filtrarTransacoesPorConta(transferencias, numero_conta, 'numero_conta_origem');
    const transferenciasRecebidas = filtrarTransacoesPorConta(transferencias, numero_conta, 'numero_conta_destino');

    return res.status(200).json({ deposito, saque, transferenciasEnviadas, transferenciasRecebidas });
}



module.exports = {
    listarContas,
    criarContas,
    atualizarUsuarios,
    excluirContas,
    efetuarDepositos,
    efetuarSaques,
    efetuarTransferencias,
    consultarSaldoDaConta,
    consultarExtratos
}