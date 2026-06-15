# O Servidor

Para a criação do sistema, imaginei uma API básica de clientes com uma quantia de dinheiro.


## Sumário 

* [Descrição](https://github.com/Leo-alt-f4/api/tree/Ajustes-novos/src#descri%C3%A7%C3%A3o)

* [Atualizações](https://github.com/Leo-alt-f4/api/tree/Ajustes-novos/src#atualiza%C3%A7%C3%B5es)
    * controllers
    * dtos
    * entities
    * errors
    * repositories

* [Seu-Sistema](https://github.com/Leo-alt-f4/api/tree/Ajustes-novos/src#como-rodar)
    * [`usuarios.json`](https://github.com/Leo-alt-f4/api/tree/Ajustes-novos/src#usuariosjson)

    * [`user.entity.ts`](https://github.com/Leo-alt-f4/api/tree/Ajustes-novos/src#userentityts)

    * [`create-user.dto.ts`](https://github.com/Leo-alt-f4/api/tree/Ajustes-novos/src#createuserdtots)

    * [`update-user.dto.ts`](https://github.com/Leo-alt-f4/api/tree/Ajustes-novos/src#updateuserdtots)

    * [`AppError.ts`](https://github.com/Leo-alt-f4/api/tree/Ajustes-novos/src#apperrorts)

    * [`users.repository.ts`](https://github.com/Leo-alt-f4/api/tree/Ajustes-novos/src#usersrepositoryts)

    * [`users.service.ts`](https://github.com/Leo-alt-f4/api/tree/Ajustes-novos/src#usersservicets)

    * [`users.controller.ts`](https://github.com/Leo-alt-f4/api/tree/Ajustes-novos/src#userscontrollerts)

    * [`user.routes.ts`](https://github.com/Leo-alt-f4/api/tree/Ajustes-novos/src#userroutests)

    * [`server.ts`](https://github.com/Leo-alt-f4/api/tree/Ajustes-novos/src#serverts)

* Rotas

* Uso de POO

* Principais dúvidas

* [Como Rodar](https://github.com/Leo-alt-f4/api/tree/Ajustes-novos/src#como-rodar)

## Descrição
O código em si utiliza-se de bibliotecas como:

* Node.js
    * Crypto
    * Path
    * fs
* Express
    * Request
    * Response
    * Router 
    * NextFunction


## Atualizações

#### Controller
Onde antes o sistema de rotas tratava de checar se um método, como a `getUserById` e o status do servidor, estavam ativos, na `users.controller` ela realiza estas buscas e checagens, deixando o sistema de rotas somente com os 'links' de cada função (get, post, patch e delete).  
    
#### Dtos
Tem como a funcionalidade de exportar os valores de criação e atualização, assim, não sendo necessário em cada arquivo, gerar uma base do `usuários.json` para funcionar o sistema.

#### Entities
Está armazenando tanto o arquivo com os dados de usuário, quanto quem trata de transformar os dados do usuário, para serem lidos em todo o sistema (o `users.entity`).

#### Errors
Possui uma função simples de tratamento de erros, retornando ao usuário as falhas ocorridas durante o código

#### Repositories
Faz o sistema de CRUD que gera e joga os dados para serem armazenados na `usuarios.json` realizados no servidor.

## Seu Sistema
Os arquivos estão separados entre:

#### `usuarios.json`
Está todo o sistema de usuários, onde cada um possui um id (numérico), nome (string), sobrenome (string), quantidade (numérico) e tipo (string, podendo ser 'positivo', 'negativo' e 'neutro').
usuarios.json

-----------------------------------------------------------------------------------------------

#### `user.entity.ts`
É onde possui as ações de alteração dos usuários (provindos da `usuario.json`), servindo para ler, criar, atualizar e deletar.

O sistema primeiramente busca separar os sistemas de id, nome, quantidade, sobrenome e tipo, dentro de um constructor, o que torna mais fácil a busca por usuário.
A partir da constructor, é realizada a criação de métodos para a atualização das propriedades, que irão servir tanto para funções de criar e atualizar usuários, trazendo uma eficácia e legibilidade para o código.

-----------------------------------------------------------------------------------------------

#### `create-user.dto.ts`
Serve para exportar os valores base de um usuário, sendo o nome, sobrenome, quantity, tipo e email. Todos, exceto pela quantidade, são do tipo _string_ (texto), a quantidade é do tipo númerico(_Number_), por se tratar de valores no qual o usuário possui.

-----------------------------------------------------------------------------------------------

#### `update-user.dto.ts`
A `update-user` possui a funcionalidade parecida com a `create-user`, exceto pelo fato de que os valores não precisam existir (ou serem alterados). Com isso, os dados possuem uma interrogação ao lado, ditando ao sistema que aquele valor pode ou não existir.

```
export interface UpdateUserDto {
  /*
    (property) UpdateUserDto.name?: string | undefined
  */
  name?: string;
  // resto do código...
```

-----------------------------------------------------------------------------------------------

#### `AppError.ts`
Tem uma base simples, no qual serve somente para retornar os erros ocorridos durante o código, seja na criação de um usuário, a atualização ou na busca pelo mesmo.


**Exemplo:**
```
/* 
    Código da users.repository.ts
    essa função abaixo, trata de atualizar o usuário,
    checado dado por dado.
*/
public updateUser(id: string, data: UpdateUserDto): User {
    const user = this.usersRepository.findById(id);

    // Caso o sistema perceba que o id do usuário está errado, 
    // ele joga este erro para a AppError mostrar ao usuário
    if (!user) throw new AppError("usuario não encontrado", 404);

    // O mesmo ocorre aqui, com a diferença de que é checado tanto se 
    // o usuário está indefinido, quanto se, retirando os espaços vazios, 
    // ela ainda se encontra nula. Em caso verdadeiro, o sistema retorna o erro.
    if (data.name !== undefined) {
      if (data.name.trim() === "")
        throw new AppError("nome não pode ficar vazio", 400);
      user.updateName(data.name);
    }
```

O `throw new`, joga a informação de erro para a `AppError`, no qual puxa a mensagem e código de status, e aplica isso dentro da API, podendo ser visualizado então o erro ocorrido.

-----------------------------------------------------------------------------------------------

#### `users.repository.ts` 
Aqui, o sistema puxa os métodos criados na `user.entity` e junta com os dados armazenados na `usuários.json`, assim, gerando métodos privados nos quais vão servir como criação e armazenamento do CRUD (_create_, _read_, _update_, _delete_) dos usuários no qual, cada mudança no software (por meio de método `POST`, `PATCH` e `DELETE`, por exemplo), o código atualiza a .json e retorna em visualização, por meio de um `GET`. 

-----------------------------------------------------------------------------------------------

#### `users.service.ts`
A `users.service`, tem o propósito de fazer a checagem dos métodos e parâmetros utilizados na `users.repository`, como um meio de interceptar possíveis falhas na geração do fluxo, vendo se os dados estão corretos, se estão definidos e se são de acordo com o esperado - como exemplo, a quantidade de usuários devendo ser numérica e o email uma string.
Caso o usuário tenha um valor importante para função sem estar definida, ele retorna o erro para a AppError, trazendo de forma específica, o que o usuário não colocou.

-----------------------------------------------------------------------------------------------

#### `users.controller.ts`
O sistema funciona como um controlador dos CRUDs que foram ajustados na `users.service`, sendo o último ponto antes do sistema buscar as rotas.

Ele tem como prioridade, fazer os requerimentos dos métodos, desde a busca de um único usuário, até deletar o mesmo. No qual, por meio do modelo de _try, catch_ (tenta uma função específica e caso não funcione, 'cai' em outro resultado), ele determina que a resposta do sistema deve ser positiva para retornar a função desejada, mas caso não consiga realizar isso, ele retorna um erro (no qual foi especificado na users.service, baseado na falha ocorrida).

**Exemplo:**
```
/*
    Método de busca por todos os usuários
*/
public getAll = (req: Request, res: Response, next: NextFunction) => {
    // O sistema tenta retornar todos os usuários, contanto que o status do servidor
    // também esteja ativo.
    try {
        const users = this.usersService.getAllUsers();
        res.status(200).json(users);
    } 
    // caso não ocorra, o sistema então retorna a falha ocorrida para não rodar o método.
    catch (error) {
        next(error);
    }
};
```

-----------------------------------------------------------------------------------------------

#### `user.routes.ts`
Por fim, o sistema de rotas junta as funções geradas nos sistemas de `users.repository`, `users.controller` e `users.service` e aplica um sobre o outro, para atualizar cada parte do sistema, deixando o fluxo coerente com o esperado

```
// Cria a constante com os dados da users.repository
const usersRepository = new UsersRepository();

// Cria a constante com os dados recém criados e aplicados na users.service
const usersService = new UsersService(usersRepository);

// Cria uma última constante, no qual possui os valores atualizados dos 
// dados anteriores e aplica na users.controller
const userController = new UsersController(usersService);
```

Com isso, é utilizada a última variável criada (`userController`) e ajusta o sistema de rotas com a get (tanto para todos, quanto para um Id), post, patch e delete - no qual se refere à ler, criar, atualizar e deletar os usuários.

-----------------------------------------------------------------------------------------------

#### `server.ts`
O sistema do servidor é simples, ele acaba por importar o express para "subir" o código para a localhost, onde tem como funções a `health`, que checa os status e traz a data atual. Além disso, ele puxa a `users`, com as rotas de usuários criadas no `rotas.ts`.

-----------------------------------------------------------------------------------------------

## Como Rodar

Para fazer o sistema funcionar, basta utilizar dentro da `src`, os seguintes códigos abaixo:

```
npm install
npm run dev
```
Com isso, só entrar na página web com a URL http://localhost:3000 e colocar 
a [/health](http://localhost:3000/health) para checar o server, ou [/users](http://localhost:3000/users) para visualizar os usuários. 
