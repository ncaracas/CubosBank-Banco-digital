function verificarCPF(cpf, lista) {
    const existeCpf = lista.find((conta) => {
        return conta.usuario.cpf === String(cpf);
    });
    if (existeCpf) {
        return existeCpf;
    }
    return false;
}


function verificarEmail(email, lista) {
    const existeEmail = lista.some((conta) => {
        return conta.usuario.email === String(email);
    });
    if (existeEmail) {
        return existeEmail;
    }
    return false;
}


function verificarCPFouEmailNaConta(cpf, email, lista) {
    const existeCpfouEmail = lista.find((conta) => {
        return conta.usuario.cpf === String(cpf) || conta.usuario.email === String(email);
    });

    if (existeCpfouEmail) {
        return existeCpfouEmail;
    }
    return false;
}


function verificarConta(numero_conta, lista) {
    const existeConta = lista.find((conta) => {
        return conta.numero === String(numero_conta);
    });
    if (existeConta) {
        return existeConta;
    }
    return false;
}


function verificarSenha(senha, lista) {
    const existeSenha = lista.find((conta) => {
        return conta.usuario.senha === String(senha)
    });
    if (existeSenha) {
        return true;
    }
    return false;
}


module.exports = {
    verificarCPF,
    verificarEmail,
    verificarCPFouEmailNaConta,
    verificarConta,
    verificarSenha
}