# Repocenter

Este é um projeto simples feito em [GRANDstack](https://grandstack.io) (GraphQL, React, Apollo, Neo4j Database).

A única alteração feita na Stack original foi o uso da framework [Next.js](https://nextjs.org/) para o Frontend.


## Como subir

O projeto tem incluso arquivos [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) para facilitar as instalações dos requisitos não funcionais.

 
```
$ cd repocenter
$ npm install
$ cd repocenter/api
$ npm install
$ cd repocenter/ui
$ npm install
$ docker-compose up
```

Este comando irá construir através do docker todas as imagens necessárias para rodar o projeto. Infraestruturas como Neo4j e Node.js.

Com isso você terá o projeto rodando em:

- Frontend: [http://localhost:3000](http://0.0.0.0:3000)
- API (Graphql Playground): [http://localhost:4001/graphql](http://0.0.0.0:4001/graphql)
- Neo4j (Banco de dados): [http://localhost:7474](http://0.0.0.0:7474)

## Como subir os componentes separadamente
### Neo4j
Você pode obter o Neo4j através do Dockerfile em ``./neo4j/Dockerfile`` ou utilizar o seu próprio banco, desde que o mesmo esteja
apontado para as portas 7474 e 7687 como o padrão.

*Utilizando o Dockerfile*
1. ```
      $ cd neo4j 
      ```
2. ```
      $ docker build -t neo4j . && docker run --name repocenter-neo4j -p 7474:7474 -p 7687:7687 neo4j
      ```
   
### API
Utilize o Node.js para rodar a api.
```
$ cd repocenter/api
$ npm install
$ npm run start:dev //apenas start para produção
```

### Frontend
Utilize o Node.js para rodar o frontend.
```
$ cd repocenter/ui
$ npm install
$ npm run dev
```



## Outras referências

- Serviço de autenticação: [Auth0](https://auth0.com)
- Componentes visuais: [Bulma](https://bulma.io)
- Stack do projeto: [GRANDstack](https://grandstack.io) ([GraphQL](https://graphql.org/), [React](https://pt-br.reactjs.org/), [Apollo](https://www.apollographql.com/docs/apollo-server/), [Neo4j Database](https://neo4j.com/)).