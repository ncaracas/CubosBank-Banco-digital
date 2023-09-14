let numeroId = 0;

function gerarNovoId() {
    numeroId++;
    return numeroId;
}

module.exports = gerarNovoId