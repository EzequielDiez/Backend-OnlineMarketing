# Coderhouse-backend - Ezequiel Diez

# Proyecto Final de CoderHouse BackEnd: eCommerce

Este proyecto es el resultado del curso BackEnd de CoderHouse, desarrollado con JavaScript, Node.js y MongoDB. El proyecto se centra en la creación de un sistema de eCommerce.

## Acceso al Proyecto

Puedes acceder al proyecto en línea a través del siguiente dominio: [CoderHouse BackEnd Production](https://coderhouse-backend-production.up.railway.app).

## Documentación y Pruebas

Para documentar y probar las API de este proyecto, hemos utilizado **Swagger**. Puedes encontrar la documentación detallada y realizar pruebas con Postman en el siguiente enlace: [Documentación Swagger](https://coderhouse-backend-production.up.railway.app/docs/).

## Crear un Usuario Administrador

Para crear un usuario administrador, puedes utilizar el siguiente comando en tu terminal (asegúrate de tener Node.js instalado):

Reemplaza los valores de -fn(firstName), -ln(lastName), -e(email), -p(password), y -a(age) con la información del usuario que deseas crear.

```bash
node createUserCommand.js createUser -fn "John" -ln "Doe" -e "john.doe@example.com" -p "myPassword" -a "30"
