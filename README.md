# Code Challenge

<div style="display:flex;align-items:flex-end;">
<p style="font-size: 20px">Desarollo de dos microservicios&nbsp;<b>User</b>&nbsp;y&nbsp;<b>Task</b>&nbsp;usando Nestjs como monorepo</p>

<p align="right" style="margin-left:auto;">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="80" alt="Nest Logo" /></a>
</p>
</div>

## Como correr la aplicacion

Cada microservicio tiene un dockerfile y se generara una imagen por cada uno.
para correr la aplicacion usa docker compose con el siguiente comando:

```bash
# npm script
$ npm run docker:compose
```

esto generara las imagenes para cada uno de los microservicios y iniciara el docker-compose despues de eso

## Como correr la aplicacion en Local

de igual modo puedes correr la aplicacion en local normalmente

```bash
# Install dependencies
$ npm install

# Start the microservice user
$ npm start user

# Start the microservice task
$ npm start task
```

## Test

```bash
# unit tests
$ npm run test
```

![test](https://github.com/akadoshin/backend-tech-test/assets/23127169/50c3bbca-0fea-49b5-a378-46b49dd7ec25)

```bash
# test coverage
$ npm run test:cov
```

Todos los services y controller tienen su prueba

![cov](https://github.com/akadoshin/backend-tech-test/assets/23127169/57d29b71-2fd7-4098-aeb0-c9cf7f40ff52)

## Probando la aplicacion con Postman

Dejo la siguiente coleccion en PostMan para que puedas rapidamente probar los servicios

## [<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/3968266-8c95f753-5973-4c1d-9bc4-4114ffddccaf?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D3968266-8c95f753-5973-4c1d-9bc4-4114ffddccaf%26entityType%3Dcollection%26workspaceId%3D953d08df-9a33-4dd0-a219-09d80eec3642)

### La coleccion

tiene una carpeta por microservicio.

![folders](https://github.com/akadoshin/backend-tech-test/assets/23127169/adb6de4a-002f-4dc5-8475-f5150627c8d3)

### La carpeta de user

tiene dos servicios. cuando ejecutes cualquiera de ellos automaticamente se copiara el **access_token** al Authorization.

![user](https://github.com/akadoshin/backend-tech-test/assets/23127169/59c20795-5ec4-4683-962d-b1e36183b6b8)

<mark>_no es necesario que lo copies manualmente_</mark>

### La carpeta de task

tiene la estructura basica para probar el _CRUD_

![task](https://github.com/akadoshin/backend-tech-test/assets/23127169/4c6e2492-3ba9-4697-9c77-903a9d985866)

