## API Todo List

Uma API feita em express e sqlite para simular um gerenciador de tarefas onde você pode:
 - Criar uma nova tarefa
 - Marcar como concluída
 - Apagar uma tarefa
 - Atualizar título ou descrição
 - Listagem de tarefas
 - Requisitar dados específicos de um item

## Rodando o projeto

Basta clonar este repositório

```sh
git clone https://github.com/Wesley-Arizio/express-todolist.git
```

Navegar até o diretório do projeto

```sh
cd <diretório_do_projeto>
```

Instalar as dependências
```sh
npm ci
```

Rodar o projeto

```sh
npm run start
```

O servidor irá rodar na porta `3000` mas caso queria mudar a porta basta criar um arquivo `.env` com base no `.env.example`

## Tests
Foram feitos testes unitários, para rodar basta utilizar o comando:

```sh
npm test
```

### Endpoints
`GET /todo/<TODO_ID>` -> Para retornar dados específicos de um item. <br />
`GET /todos?offset=<começo_listagem>&limit=<limite_resultados>` -> Para listagem de items, contêm paginação de items utilizando os campos offset e limit.<br />
`POST /todo` -> Criação de um novo item. Necessário envio de dois campos `title` e `description`. <br />
`DELETE /todo/<TODO_ID>` -> Deleta um item.
`PUT /todo/<TODO_ID>` -> Atualiza os dados de um item. Necessário o envio de todos os dados do item como `title`, `description`, `isFinished`

A estrutura de retorno de um item segue esse padrão:
```json
{
    "id": 1,
	"title": "todo1",
	"description": "todo1",
	"isFinished": true
}
```
