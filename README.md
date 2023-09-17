# CubosBank Banco digital
CubosBank Banco digital é uma API REST desenvolvida com Node.js e Express 4 que através de operações CRUD, com persistência em memória, responde requisições exemplos de transações bancárias. O projeto é um exercício desafio do curso DESENVOLVIMENTO DE SOFTWARE - FOCO EM BACKEND - IFOOD da [Cubos Academy](http://cubos.academy).



Características
--------
- Criar, visualizar, atualizar e excluir contas dos clientes do banco.
- Realizar operações de depósito, saque e transferências.
- Listar as contas cadastradas, os saldos e extratos.

Preparação
---------------
1. Caso ainda não possua, você vai precisar do [Node.js](http://nodejs.org/) instalado na sua máquina.  
2. Clonar o repositório:

		git clone https://github.com/ncaracas/cubosbank-banco-digital

3. Instalar os pacotes e dependências:

		npm install express;
		npm install date-fns --save;
		npm install -D nodemom.		

5. Executar o servidor:

		npm run start

Uso
-----
- Você pode executar o servidor localmente com a url: [http://localhost:3000/](http://localhost:3000/). 
- Para isso, escolha um navegador, ou uma ferramenta de teste de API como o [Insomnia](http://www.[insomnia.rest]).
- Todo valor (dinheiro) deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000).
  
## Endpoints

### Listar Contas Bancárias

- **Endpoint:** ```GET /contas?senha_banco=Cubos123Bank```
- **Descrição:** O endpoint lista todas as contas bancárias.
- **Resposta com sucesso:**
  - Status code: 200 OK
  - Conteúdo:
    ```json
    [
	  {
		"numero": "1",
		"saldo": 0,
		"usuario": {
			"nome": "Foo Bart 1",
			"cpf": "000111222321",
			"data_nascimento": "2021-03-15",
			"telefone": "71999998888",
			"email": "foo@bar1.org",
			"senha": "12345"
		}
	  },
	  {
		"numero": "2",
		"saldo": 0,
		"usuario": {
			"nome": "Foo Bart 2",
			"cpf": "000111222322",
			"data_nascimento": "2021-03-15",
			"telefone": "71999998888",
			"email": "foo@bar2.org",
			"senha": "12345"
		}
	  }
    ]
    ```

### Criar Conta

- **Endpoint:** ```[POST] /contas```
- **Descrição:** O endpoint cria uma conta bancária.
  - Corpo da Solicitação:
    ```json
    {
	"nome": "Foo Bar 1",
	"cpf": "000111222321",
	"data_nascimento": "2021-03-15",
  	"telefone": "71999998888",
	"email": "foo@bar1.org",
  	"senha": "12345"
    }
    ```
 - **Resposta com sucesso:**
   - Status code: 201 Created


### Atualizar Usuário da Conta Bancária

- **Endpoint:** ```[PUT] /contas/:numeroConta/usuario```
- **Descrição:** O endpoint atualiza todos os dados da conta bancária.
  - **Corpo da Solicitação:**
  ```json
  {
	"nome": "Foo Bar 2",
	"cpf": "99911122232",
	"data_nascimento": "2021-03-15",
	"telefone": "71999998888",
	"email": "foo@bar2.com",
	"senha": "12345"
  }  
  ```
- **Resposta com sucesso:**
  - Status code: 204 No Content
  

### Excluir Conta

- **Endpoint:** ```[DELETE] /contas/:numeroConta```
- **Descrição:** O endpoint exclui uma conta bancária.
- **Resposta com sucesso:**
  - Status code: 204 No Content


### Depositar
- **Endpoint:** ```[POST] /transacoes/depositar```
- **Descrição:** O endpoint registra operações de depósitos numa conta bancária.
  - Corpo da Solicitação:
    ```json
    {
 	"numero_conta": "1",
  	"valor": 6000
    }
    ```
 - **Resposta com sucesso:**
   - Status code: 204 No Content


### Sacar
- **Endpoint:** ```[POST] /transacoes/sacar```
- **Descrição:** O endpoint registra operações de saques numa conta bancária.
  - Corpo da Solicitação:
    ```json
    {
	"numero_conta": "1",
  	"valor": 2000,
	"senha": "12345"
    }
    ```
 - **Resposta com sucesso:**
   - Status code: 204 No Content


### Transferir
- **Endpoint:** ```[POST] /transacoes/transferir```
- **Descrição:** O endpoint registra transações de transferências entre contas bancárias.
  - Corpo da Solicitação:
    ```json
    {
	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
  	"valor": 4000,
	"senha": "12345"
    }
    ```
 - **Resposta com sucesso:**
   - Status code: 204 No Content


### Consultar Saldo

- **Endpoint:** ```GET /contas/saldo?numero_conta=1&senha=12345```
- **Descrição:** O endpoint retorna o saldo de uma conta bancária.
- **Resposta com sucesso:**
  - Status code: 200 OK
  - Conteúdo:
    ```json
    {
	"saldo": 0
    }


### Consultar Extrato

- **Endpoint:** ```GET /contas/extrato?numero_conta=3&senha=12345```
- **Descrição:** O endpoint retorna o extrato de uma conta bancária.
- **Resposta com sucesso:**
  - Status code: 200 OK
  - Conteúdo:
    ```json
    {
	"deposito": [
		{
			"data": "2023-09-13 22:58:43",
			"numero_conta": "3",
			"valor": 6000
		}
	],
	"saque": [
		{
			"data": "2023-09-13 22:58:53",
			"numero_conta": "3",
			"valor": 400
		},
		{
			"data": "2023-09-13 22:58:56",
			"numero_conta": "3",
			"valor": 50
		}
	],
	"transferenciasEnviadas": [
		{
			"data": "2023-09-13 22:59:45",
			"numero_conta_origem": "3",
			"numero_conta_destino": "1",
			"valor": 200
		},
		{
			"data": "2023-09-13 22:59:51",
			"numero_conta_origem": "3",
			"numero_conta_destino": "2",
			"valor": 400
		}
	],
	"transferenciasRecebidas": [
		{
			"data": "2023-09-13 22:59:23",
			"numero_conta_origem": "1",
			"numero_conta_destino": "3",
			"valor": 500
		},
		{
			"data": "2023-09-13 22:59:30",
			"numero_conta_origem": "2",
			"numero_conta_destino": "3",
			"valor": 500
		},
		{
			"data": "2023-09-13 23:02:29",
			"numero_conta_origem": "1",
			"numero_conta_destino": "3",
			"valor": 4000
		}
	]
    }


Desenvolvedor:
---------------
**Francisco Nelson Caracas Neto** 


Notas:
---------------
Concluído em SET/2023.

