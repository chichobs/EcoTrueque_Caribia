# EcoCanje

Plataforma de gestión de reciclaje y canje de puntos ecológicos.

## Descripción

EcoCanje es una aplicación web que permite a los usuarios registrar sus entregas de materiales reciclables, acumular puntos y canjearlos por productos sostenibles.

## Estructura del Proyecto

- `index.html` - Página de inicio de sesión
- `registro.html` - Registro de nuevos usuarios
- `Usuario.html` - Panel de usuario normal
- `panel_admin.html` - Panel de administrador
- `gestion_usuarios.html` - Gestión de usuarios (admin)
- `gestion_catalogo.html` - Gestión de catálogo de premios (admin)
- `gestion_entrega.html` - Registro de entregas (admin)
- `sub_admin.html` - Panel de sub-administrador
- `sub_admin_entrega.html` - Registro de entregas (sub-admin)
- `sub_admin_catalogo.html` - Visualización de catálogo (sub-admin)
- `catalogo_usuario.html` - Catálogo para usuarios

## Tecnologías

- HTML5
- TailwindCSS
- Google Fonts (Manrope, Inter)
- Material Icons

## Demo

El proyecto actualmente utiliza datos de ejemplo estáticos. Para conectarlo a un backend real, se debe implementar:

1. Sistema de autenticación
2. Base de datos para usuarios, entregas y recompensas
3. API endpoints para las operaciones CRUD