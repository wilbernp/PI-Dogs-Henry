
<img width="120" src="./dog.png" />
<h1>PI Dogs Henry</h1>

SPA(Single Page Aplication) que consume datos de la api externa  <a href="https://api.thedogapi.com"> https://api.thedogapi.com</a>

## Funcionalidades
 <ul>
    <li>Filtrado por: Temperamentos y por grupos de razas</li>
    <li>Ordenamiento: Alfabetico y por peso; tanto ascendente como descendente </li>
    <li>Paginado</li>
    <li>Creacion de una mascota</li>
</ul>

## Tecnologias usadas
 <ul>
    <li>CSS</li>
    <li>React</li>
    <li>Redux</li>
    <li>Node.js</li>
    <li>Express</li>
    <li>Sequelize</li>
    <li>PostgreSQL</li>
</ul>

Para correr este proyecto en local debe seguir las siguientes intrucciones:
 <ol>
    <li>Debe tener instalado PosgreSQL en su maquina</li>
 <br/>
    <li>Crear un base de datos en postgreSQL con el nombre "dogs"</li>
  <br/>
 <li>
   Crear una cuenta en <a href="https://api.thedogapi.com">https://api.thedogapi.com</a> para que obtenga su <strong><em>Api Key</em></strong>
 </li>
    <br/>
 <li>
  En la carpeta <strong><em>api</em></strong> debe crear el archivo <strong><em>.env</em></strong> en el cual debe copiar el contenido del archivo <strong><em>.env.example</em></strong> y colocar sus respectivas credenciales tanto de la <strong><em>Base de Datos</em></strong>, como su <strong><em>Api Key</em></strong> de  <a href="https://api.thedogapi.com">https://api.thedogapi.com</a>
 </li>
   <br/>
 <li>
  Abrir una terminal en la carpeta <strong><em>api</em></strong> y ejecutar el comando <strong><em>npm install</em></strong> para instalar las dependencias del backend. Una vez termine la instalcion ejecutar el comando <strong><em>npm run dev</em></strong> para inicializar el servidor del backend. si todo ha ido bien deberia ver un mensaje similar en consola: <strong><em>"listening at port 3001"</em></strong>
 </li>
 <br/>
 <li>
  Abrir una nueva terminal en la carpeta <strong><em>client</em></strong> sin cerrar la terminal donde se esta ejecutando el servidor del backend y ejecutar el comando <strong><em>npm install</em></strong> para instalar las dependencias del frontend. Una vez termine la instalcion ejecutar el comando <strong><em>npm start</em></strong> para inicializar el servidor del frontend. si todo ha ido bien deberia ver la siguiente pantalla:
  
  <img src="https://user-images.githubusercontent.com/98898262/183256169-c5fd13f3-f66e-45a5-bd57-d6723bdc33f6.jpg" width="720">
 </li>
 <li>Haga click en el boton <strong><em>Go To Home</em></strong> con lo cual deberia ver una vista como la siguiente en donde podra ver todas las funcionalidades de la pagina:
 </li>
 <img src="https://user-images.githubusercontent.com/98898262/183250835-d3323514-5634-4160-b11d-b1b837ee760d.jpg" width="720">
 
 </ol>

