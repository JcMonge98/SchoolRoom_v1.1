# plantillav2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### pasos para git
```
git version

git init -> en la carpeta de proyecto

git status -s 

git add .

git status -s 

git commit -m "inicio de repositorio local"

git log

```

### pasos para gitHub
```
git remote add origin https://github.com/JcMonge98/SchoolRoom_v1.1.git  solo una vez

git push -u origin master   despues de hacer los commit locales 

git push para subir nuevos cambios, antes hacer commit locales
```

### pasos para heroku NO FUNCIONA
```
elimine la carpeta dist y luego ejecuto el build 

heroku login

elimine la carpeta schoolroomforeducation

heroku git:clone -a schoolroomforeducation

git add .

git commit -am "subi a heroku"

git push heroku master
```