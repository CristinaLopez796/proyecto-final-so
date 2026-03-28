# Proyecto Final / Grupo #4 - Flask CRUD con MySQL

Este proyecto es una aplicación web CRUD desarrollada en Flask, con persistencia en MySQL y empaquetada con Docker. Incluye API REST y vistas web para gestionar usuarios, plus deployment preparado para Render, Grupo #4 - Sistemas Operativos Sec.63 - Ceutec Q1 2026.


## 🧩 Arquitectura del proyecto

- `app.py` - servidor Flask principal y rutas web.
- `src/routes.py` - API REST (usuarios: GET, POST, PUT, DELETE).
- `src/models.py` - lógica CRUD de usuarios con la DB.
- `src/db.py` - conexión a MySQL usando `mysql-connector-python`.
- `config.py` - configuración de la DB mediante variables de entorno.
- `templates/` - vistas Jinja2: `home.html`, `user_form.html`, `users_list.html`.
- `Dockerfile` - build y runtime para contenerizar la app.
- `docker-compose.yml` - servicio MySQL + servicio Flask con health-check.
- `.env` - variables locales (no se sube, contiene credenciales para desarrollo).
- `requirements.txt` - dependencias de Python.
- `tests/` - pruebas unitarias de modelo y rutas.


## 📦 Dependencias

- Python 3.10
- Flask 3.1.3
- MySQL 8.0
- mysql-connector-python
- Gunicorn
- Jinja2
- pytest


## 🪙 Variables de entorno (`.env` local)

```env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=flaskdb
MYSQL_USER=flaskuser
MYSQL_PASSWORD=flaskpass
```

En ambientes de deploy (Render, etc.) deben existir con los valores del servicio.


## 🚀 Uso local

1. Clonar y entrar al directorio:
   ```bash

git clone https://github.com/CristinaLopez796/proyecto-final-so.git
cd proyecto-final-so
   ```
2. Crear y activar entorno virtual:
   ```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
   ```

3. Instalar dependencias:
   ```bash

pip install -r requirements.txt
   ```
4. Crear `.env` con valores de ejemplo (como arriba).
5. Ejecutar local:
   ```bash
python app.py
   ```

6. Abrir:
   - `http://localhost:5000` (Home)
   - `http://localhost:5000/web/users` (CRUD de usuarios)

7. Healthcheck:
   ```bash

curl -f http://localhost:5000/health
   ```


## 🐳 Docker / Docker Compose (recomendado)

1. Usar Docker Desktop y asegurarse de que esté en ejecución.
2. Ejecutar en la raíz del proyecto:
   ```bash
docker-compose up -d --build
   ```

1. Verificar status:
   ```bash

docker-compose ps
   ```
4. Logs de Flask:
   ```bash
docker-compose logs flask
   ```

5. Bajar contenedores:
   ```bash

docker-compose down
   ```


## 🧪 Testing

```bash
pytest -q
```


## 🔌 Endpoints API REST

- `POST /users` -> crear usuario (body JSON: `name`, `email`).
- `GET /users` -> obtener lista usuarios.
- `GET /users/<id>` -> obtener usuario por id.
- `PUT /users/<id>` -> actualizar usuario (body JSON: `name`, `email`).
- `DELETE /users/<id>` -> eliminar usuario.


## 🌐 Endpoints web

- `GET /` - página de portada.
- `GET /web/users` - lista usuarios.
- `GET /web/users/create` - formulario crear.
- `POST /web/users/create` - crear y redirigir.
- `GET /web/users/update/<id>` - formulario con datos.
- `POST /web/users/update/<id>` - actualizar y redirigir.
- `GET /web/users/delete/<id>` - eliminar.


## 💾 Healthcheck

- `GET /health` -> `{"status": "healthy"}`
- Container healthcheck en `docker-compose.yml` usa:
  - `curl -f http://127.0.0.1:5000/health`.


## 🛠️ Problemas resueltos (cambios aplicados)

1. `docker-compose` fallaba si Docker Desktop no estaba abierto (pipe invalido). Se corrigió con aviso: iniciar Docker Desktop antes.
2. Removida la línea obsoleta `version: "3.9"` en `docker-compose.yml` para evitar warning.
3. Se añadió endpoint `/health` en `app.py` y se cambió healthcheck a `curl` (127.0.0.1).
4. Se instaló correctamente Flask y dependencias (`pip install -r requirements.txt`).
5. Se ajustó la ejecución de Gunicorn para producción dentro de container.


## ☁️ Deploy en Render (recomendado)

1. Crear servicio Web y servicio MySQL via UI de Render.
2. Establecer las env vars:
   - `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DB`, `PORT`, `FLASK_ENV`.
3. `Start Command`: `gunicorn --bind 0.0.0.0:$PORT app:app`.
4. Verificar `curl https://<app>.onrender.com/health`.
5. Si hay 500, consultar logs de runtime en Render.


## 🧾 Consideraciones para Vercel

- Vercel no incluye MySQL nativo (debe apuntar a DB externa).
- Se recomienda Render, Railway, Heroku, o DB cloud externa para producción estable.

## 🧪 QA final checklist (recomendado antes de entregar)

1. Arrancar contenedores:
   ```bash
docker-compose up -d --build
   ```
2. Limpiar datos de test si hace falta:
   ```bash
docker-compose exec --user root mysql mysql -h mysql -uflaskuser -pflaskpass flaskdb -e "DELETE FROM users;"
   ```
3. Ejecutar pruebas:
   ```bash
python -m pytest -q
   ```
   - Debe responder `10 passed`.
4. Probar health endpoint:
   ```bash
curl -f http://localhost:5000/health
   ```
5. Verificar UI:
   - `http://localhost:5000/web/users`
   - `http://localhost:5000/web/users/create`
   - `http://localhost:5000/web/users/update/1`
6. Verificar workflow CI:
   - Bobot de CI (`.github/workflows/ci.yml`) pasa con test y build.
7. Verificar deploy:
   - `workflow_dispatch` de `.github/workflows/deploy.yml` funciona con secrets configurados.


## 📌 Notas de estilo

- Buenas prácticas: usar variables de entorno, no credenciales hardcodeadas.
- Si se hace PR, incluir pruebas con pytest y detalle de pasos para reproducir.


## 🧑‍💻 Contribución

1. Clonar repo.
2. Crear branch: `feature/<algo>`.
3. Añadir tests y confirmar `pytest`.
4. Abrir PR y describir cambios.


## 📞 Contacto

- Creador original del Repositorio: [Cristina Lopez](https://github.com/CristinaLopez796)
- En caso de dudas, enviar captura de errores de producción (logs) y URL del servicio.
