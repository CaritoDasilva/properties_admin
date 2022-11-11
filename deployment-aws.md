# Deployment AWS

## EC2

-   [ ] https://console.aws.amazon.com/?nc2=h_m_mc
-   [ ] Ir a "Launch a virtual machine"
-   [ ] Seleccionar a "Ubuntu Server 18.04 LTS (HVM), SSD Volume Type"
-   [ ] Seleccionar "Free tier eligible"
-   [ ] Ir arriba al paso "6. Configure Security Group"
-   [ ] Cambiar "SSH TCP 22 My IP " (El IP se generará)
-   [ ] Añadir "HTTP TCP 80 Anywhere 0.0.0.0/0, ::/0"
-   [ ] Añadir "HTTPS TCP 443 Anywhere 0.0.0.0/0, ::/0"
-   [ ] Darle click abajo al "Review and Launch"
-   [ ] Seleccionar "Launch"
-   [ ] Seleccionar "Create a new key pair"
-   [ ] No importa lo que pongas para el nombre, pero el nombre para mi key será "mern-1"
-   [ ] Seleccionar "Download Key Pair." Lo guardé en el directorio de Desktop
-   [ ] Seleccionar "Launch Instance"
-   [ ] Ir al tabla de instancias y darle check a tu instancia, debes ver "Actions" arriba
-   [ ] Seleccionar "Actions" "Connect"
-   [ ] Darle click al "SSH client"
-   [ ] Copiar el último ejemplo a un sticky note o notepad. Debe ser algo como `ssh -i "mern-1.cer" ubuntu@ec2-35-160-97-190.us-west-2.compute.amazonaws.com`. No cierres esta ventana hasta terminar todo el examen.
-   [ ] Abrir el terminal. Recomiendo que uses zsh (Mac), bash o gitbash.
-   [ ] `ssh -i "desktop/mern-1.cer" ubuntu@ec-tu-instancia-x-x-x-x-x-x-x.amazonaws.com` debes poner el path al key tal como antes "desktop/mern-1.cer" y debes usar el "ubuntu@ec-bla-bla-bla" de tu instancia que ya copiaste. Si ves algo de WARNING UNPROTECTED PRIVATE KEY FILE, ve abajo antes de seguir.
-   [ ] `yes`
-   [ ] Para salir, podrás usar el comando `exit`. A veces tienes que hacer `exit` dos veces. Para entrar de nuevo, el comando estará disponible con la flecha de arriba en tu teclado.

### WARNING UNPROTECTED PRIVATE KEY FILE
- [ ] Si estás en Mac y tienes problemas de permiso, debes poner el comando `chmod 400 desktop/mern-1.cer`. Si tu key tiene otro nombre o path, tendràs que hacer `chmod 400 al/archivo/de/key`. También podría ser un archivo .pem.

## Instalaciones en el Servidor

-   [ ] Ejecutar los siguientes comandos

```
bash
sudo apt update
sudo apt install nginx git -y
```

-   [ ] Instalar NVM

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.1/install.sh | bash
```
-   [ ] Escribir source ~/.bashrc para actualizar cambios
-   [ ] Averiguar `nvm --version`. Si no sale bien, da un `exit` para salir del servidor y volver a entrar usando la flecha de arriba ENTER
-   [ ] Instalar node

```
nvm install v14
```
-   [ ] Averiguar `node -v`
-   [ ] Averiguar `npm -v`
-   [ ] Si npm no está `sudo apt install npm`
-   [ ] sudo apt install build-essential

# Copiar y Probar Proyecto en Servidor

-   [ ] `git clone tu-url-de-github` (Es posible que tengas que entrar a tu login)
-   [ ] `cd tu-proyecto`
-   [ ] export repoName=MERN-Deployment
-   [ ] echo $repoName (Debería dar como output nombre del proyecto)


# Para intercambiar archivo html actual de ngynx por el del build de reat:

-   [ ] cd ~/$repoName/client
-   [ ] sudo rm -rf /var/www/html
-   [ ] sudo mv build /var/www/html
-   [ ] sudo service nginx restart
-   [ ] sudo grep -rl localhost /var/www/html | xargs sed -i 's/http:\/\/localhost:8000//g'
-   [ ] Ya deberías poder ver en la url que antes veíamos NGYNX el cliente que creaste en tu proyecto

# Configuración backend

-   [ ] cd ~/$repoName
-   [ ] npm i
-   [ ] wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
-   [ ] echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
-   [ ] sudo apt update
-   [ ] sudo apt install -y mongodb-org
-   [ ] sudo service mongod start
-   [ ] service mongod status
 
# NGINX

-   [ ] Mover el default de configuación de NGINX
-   [ ] sudo rm /etc/nginx/sites-available/default
-   [ ] sudo vim /etc/nginx/sites-available/default



-   [ ] Copiar este código al archivo

```
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;
    server_name <nombre_proyecto>;
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    location / {
        try_files $uri $uri/ =404;
    }
    error_page 404 /index.html;
}
```

-   [ ] Para guardar "esc" seguido de ":wq" y "enter"
-   [ ] Probar que tu archivo de configuración esté bien

```
sudo nginx -t
```

-   [ ] Hacer un restart a NGINX

```
sudo service nginx restart
npm run start server.js
```

-   [ ] Visitar tu página en el navegador. Puedes volver a AWS seleccionar "ECS Instance Connect", copiar el "Public IP address" y pegarlo como si fuera URL 35.160.97.190.
-   [ ] Debes ver que aparecen los archivos de client, pero el api no se ha iniciado.

# PM2

-   [ ] Instalar PM2

```
npm i pm2 -g
```

Hay un cheatsheet [PM2 Cheatsheet](https://devhints.io/pm2)

-   [ ] Comenzar tu servidor con PM2

```
pm2 start server.js --name <nombre-del-proyecto>
```

-   [ ] Averiguar que esté funcionando

```
pm2 logs
```

-   [ ] Visitar tu página en el navegador. Puedes volver a AWS seleccionar "ECS Instance Connect", copiar el "Public IP address" y pegarlo como si fuera URL 35.160.97.190
