# CubosBank Banco digital
CubosBank Banco digital é uma API REST desenvolvida com Node.js e Express 4 que através de operações CRUD, sem persistência, responde requisições de transações bancárias.

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

3. Instalar os pacotes:

		npm -y install,
		npm install express --save
		nodemom -D install		

5. Executar o servidor (http://localhost:3000/):

		npm run start

Uso
-----
Você pode executar o servidor localmente, escolha um navegador ou uma ferramenta de teste de API como o [Insomnia](http://www.[insomnia.rest]).

## Endpoints

### Listar Contas Bancárias

- **Endpoint:** ```GET /contas?senha_banco=Cubos123Bank```
- **Descrição:** O endpoint lista todas as contas bancárias.
- **Resposta com sucesso:**
  - Status code: 200
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
	"nome": "Foo Bar 3",
	"cpf": "99911122234",
	"data_nascimento": "2021-03-15",
	"telefone": "71999998888",
	"email": "foo@bar3.com",
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

