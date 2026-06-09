# O Servidor

Para a criação do sistema, imaginei uma API básica de clientes com uma quantia de dinheiro.

### Descrição
O código em si utiliza-se de bibliotecas como:

* Node.js
* Express
    * Request
    * Response
    * Router 

## Seu Sistema
Os arquivos estão separados entre:

#### `usuarios.ts`
Está todo o sistema de usuários, onde cada um possui um id (numérico), nome (string), sobrenome (string), quantidade (numérico) e tipo (string, podendo ser 'positivo', 'negativo' e 'neutro').


#### `funcoes.ts`
É onde possui as ações de alteração dos usuários (provindos da `usuario.ts`), servindo para ler, criar, atualizar e deletar.

O sistema primeiramente busca separar os sistemas de id, nome, quantidade, sobrenome e tipo, entre as funções de Usuário, Novo usuário e Atualizar Usuário, para que assim seja mais eficaz realizar as funções de CRUD do sistema.

Após isso, o código entra nas funções de CRUD, que servem para testar as rotas e checar se o fluxo está em conformidade.


#### `rotas.ts`
O sistema de rotas importa os valores de usuários e as suas funções. Com base nisso, é gerado o `get` para usuários e para seus IDs. 

Depois disso, ele tem a `post` no qual checa se possui o nome, sobrenome, quantidade e tipo igual ao do usuário criado - este podendo ter sido gerado no _Thunder Client_, _Postman_ e dentre outros locais. Com isso, o sistema cria o usuário e retorna o mesmo.

O sistema de atualizar possui uma similaridade com o sistema de busca por ID, pelo fato de que ambos necessitam dos parâmetros de ID para atualizar o usuário, no qual, caso os dados do usuário (podendo ser de nome até tipo) e ID estejam corretos, ele atualiza o usuário e retorna na página.

Por fim, o sistema de deletar procura pelo ID do usuário e com isso, deleta ele da API, retornando para como sucesso.

Todas rotas possuem uma checagem para ter certeza de que o usuário correto está sendo alterado.


#### `server.ts`
O sistema do servidor é simples, ele acaba por importar o express para "subir" o código para a localhost, onde tem como funções a `health`, que checa os status e traz a data atual. Além disso, ele puxa a `users`, com as rotas de usuários criadas no `rotas.ts`.


## Como Rodar

Para fazer o sistema funcionar, basta utilizar dentro da `src`, os seguintes códigos abaixo:

```
npm install
npx tsc --init
npm run dev
```
Com isso, só entrar na página web com a URL http://localhost:3000 e colocar 
a [/health](http://localhost:3000/health) para checar o server, ou [/users](http://localhost:3000/users) para visualizar os usuários. 
