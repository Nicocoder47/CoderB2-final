# Entrega Final Backend - Sindicato Beneficios

Backend Node.js + Express + MongoDB para gestión de beneficios sindicales, con patrón DAO + Repository, autenticación JWT (estrategia `current`), autorización por roles, recuperación de contraseña por email y lógica de compra con tickets completos/parciales.

## Requisitos

- Node.js 18+
- MongoDB en ejecución

## Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno:

- Copiar `.env.example` a `.env` y completar valores reales.

3. Ejecutar seed inicial de beneficios:

```bash
npm run seed
```

4. Levantar servidor en desarrollo:

```bash
npm run dev
```

Servidor por defecto: `http://localhost:8080`

## Variables de entorno

Ver `.env.example`:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `FRONT_URL`
- `MAIL_HOST`
- `MAIL_PORT`
- `MAIL_USER`
- `MAIL_PASS`
- `MAIL_FROM`

## Estructura

```txt
/src
  /config
  /dao/mongo
  /repositories
  /dtos
  /services
  /controllers
  /routes
  /middlewares
  /utils
  /models
  app.js
  server.js
/seed
  benefits.seed.js
```

## Roles y autorización

- `admin`: puede crear/editar/eliminar beneficios.
- `user`: puede operar su carrito y comprar.
- Respuestas:
  - `401` si no autenticado.
  - `403` si autenticado pero sin permisos.

## Endpoints principales

### Sessions/Auth

- `POST /api/sessions/register`
- `POST /api/sessions/login`
- `GET /api/sessions/current` (JWT Bearer + estrategia `current` + DTO)
- `POST /api/sessions/forgot-password`
- `POST /api/sessions/reset-password`

### Benefits

- `GET /api/benefits`
- `GET /api/benefits/:bid`
- `POST /api/benefits` (admin)
- `PUT /api/benefits/:bid` (admin)
- `DELETE /api/benefits/:bid` (admin)

### Carts

- `POST /api/carts`
- `GET /api/carts/:cid` (dueño o admin)
- `POST /api/carts/:cid/benefits/:bid` (user)
- `DELETE /api/carts/:cid/benefits/:bid` (user)
- `POST /api/carts/:cid/purchase` (user)

## Flujo recomendado (Postman)

1. `register` usuario (`role: user`).
2. `login` para obtener JWT.
3. Configurar header: `Authorization: Bearer <token>`.
4. `current` para ver DTO sin datos sensibles.
5. `GET /api/benefits`.
6. `POST /api/carts/:cid/benefits/:bid` para agregar beneficios.
7. `POST /api/carts/:cid/purchase` para confirmar solicitud.
8. Revisar ticket generado (`status: complete|partial`, `notProcessed` si aplica).

## Recuperación de contraseña

- `forgot-password` siempre responde mensaje genérico (seguridad).
- Se envía email con link: `FRONT_URL/reset-password?token=...`.
- El token expira en 1 hora.
- `reset-password` invalida token y bloquea reutilizar la contraseña anterior.

## Respuestas API

Formato de éxito:

```json
{
  "status": "success",
  "payload": {}
}
```

Formato de error:

```json
{
  "status": "error",
  "error": {
    "message": "..."
  }
}
```
