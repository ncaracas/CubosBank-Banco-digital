# CubosBank Banco digital
CubosBank Banco digital é uma API padrão REST construída com Node.js e Express 4 que demonstra de modo simples, sem persistência, os principais recursos de operações e transações bancárias.

Características
--------
- Criar, visualizar, atualizar e excluir contas do banco.
- Realizar operações de depósito, saque e transferências.
- Listar as contas cadastradas, saldos e extratos.

Preparação
---------------
1. Caso ainda não possua, você vai precisar do [Node.js](http://nodejs.org/) instalado na sua máquina.  
2. Clonar o repositório:

		git clone https://github.com/ncaracas/CubosBank-Banco-digital

3. Instalar os pacotes:

		npm -y install,
		nodemom -D install		

5. Executar o servidor (http://localhost:3000/):

		npm run start

Uso
-----
Você pode executar o servidor localmente, escolha um navegador ou uma ferramenta de teste de API como o [Insomnia](http://www.[insomnia.rest]).

Comece com ```GET http://localhost:3000/Contas?senha_banco=Cubos123Bank```, e o retorno deverá ser:

```
[]
```
