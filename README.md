Proyecto NodeJS API Spotify

### Instalación

Ejecutar los siguientes comandos adentro del directorio donde se clono el repositorio, esto descargara todos los recursos que vienen incluidos en el package.json

```sh
npm install
```

Abrir el archivo **.env** ( en este caso no lo mande al .gitignore por que es un desafío, ya en vida real se omite) y modificar el valor de la variable **TOKEN_SPOTIFY_USER** por el token que te da API Spotify aquí  (https://developer.spotify.com/console/get-current-user/).  y solicitar los permisos user-read-private y user-read-email

### Ejecución

Para ejecutar node solo basta con ejecutar esto:

```sh
node index.js
```

### Estructura del proyecto

| Directorio |  |
| ------ | ------ |
| /database | Se encuentra el database.js y es la configuración del mongoose para conectarse al MongoDB |
| /spotify | Aquí vienen las credenciales del spotify |
| /models | Se encuentran los modelos Users.js y Search.js para crear, actualizar, borrar collections en MongoDB |
| /routes | Se encuentran las rutas de los artistas de sus albumes y toptracks, usuarios perfil, update y los criterios mas buscados |
| index.js | Archivo de ejecución para el node |

Lo separo de esta manera para tener más organización de conocer donde esta cada cosa, si quiero modificar una ruta simplemente voy a donde tengo que modificarlo, si tengo que modificar algun modelo de alguna propiedad de igual manera.


#### Explicación de rutas

##### Reto #1: *Consulta la API de Spotify y habilita un endpoint que permita desplegar los álbumes del artista indicado como parámetro. Ej. ?q=beatles*

#### Ruta: http://localhost:5000/artist?q=[ARTISTA]

| Explicación |  |
| ------ | ------ |
| Tipo de petición | GET |
| Campos query params | ?q=[ARTISTA]|
| Como lo solucione |Me conecte al API de spotify usando primero la busqueda por artista y despues obtengo el id el artista para pasarselo al otro metodo de get albums by artist y al final rendereo la información|

------
------
------
------


##### Reto #2: *Crea un endpoint que permita consultar el perfil del usuario actual y guarde en una colección de datos de Mongo los atributos country, display name, número de followers y el tipo de usuario.*

#### Ruta: http://localhost:5000/me

| Explicación |  |
| ------ | ------ |
| Tipo de petición | GET |
| Como lo solucione | Me conecto al api spotify para obtener el correo electronico, después construyo mi objeto con los campos y se los paso a mi modelo Users.js y al final ejecute save() para que se guarde en la colección |


------
------
------
------


##### Reto #3: *Crea un endpoint que admita la actualización de los atributos display name y country.*

#### Ruta: http://localhost:5000/meupdate

| Explicación |  |
| ------ | ------ |
| Tipo de petición | POST |
| Campos por x-www-form-urlencoded | display_name: String , country: String|
| Como lo solucione | Me conecto al api spotify para obtener el correo electronico, después hago un find del modelo Users.js y reviso si existe, en caso de que sí, le mando los campos display_name y country y ejecuto update |

##### Reto #4: *Crea un endpoint que permita desplegar el “top tracks” de un artista, únicamente mostrar el nombre, fecha de lanzamiento y total de los temas.*

#### Ruta: http://localhost:5000/artist/toptracks

| Explicación |  |
| ------ | ------ |
| Tipo de petición | GET |
| Campos query params | ?q=[ARTISTA]|
| Como lo solucione | Me conecte al API de spotify usando primero la busqueda por artista y despues obtengo el id el artista para pasarselo al otro metodo de get top tracks by artist y al final rendereo la información  |

##### Reto #5: *Crea una colección de datos donde se guarden los criterios de búsqueda y cuántas veces se ha consultado ese criterio.*

--
--

| Explicación |  |
| ------ | ------ |
| Como lo solucione | En la ruta donde se busca al artista por albumes, ahi agregue mi modelo de Search.js y agregue lo que se busca, aparte si ya existe el artista le sumo al contador |

##### Reto #6: *Crea un endpoint donde pueda consultar los 5 criterios de búsqueda más solicitados.*

--
--

| Explicación |  |
| ------ | ------ |
| Tipo de petición | GET |
| Como lo solucione | Uso mi modelo de Search.js y aplico un order by desc del count y al final rendereo mi información |

