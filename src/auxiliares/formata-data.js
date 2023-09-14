const { format } = require('date-fns');


function formatarDatatransacao() {
    const dataAtual = new Date();
    const dataTransacao = format(dataAtual, 'yyyy-MM-dd HH:mm:ss');
    return dataTransacao;
}



module.exports = formatarDatatransacao