# EcoTrueque

Plataforma de gestión de reciclaje y trueque de puntos ecológicos.

## Descripción

EcoTrueque es una aplicación web que permite a los usuarios registrar sus entregas de materiales reciclables, acumular puntos y canjearlos por productos sostenibles.

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
- `config.js` - Configuración de Supabase

## Tecnologías

- HTML5
- TailwindCSS
- Supabase (Backend y Autenticación)
- Google Fonts (Manrope, Inter)
- Material Icons

## Configuración de Supabase

### Tablas necesarias

Ejecuta este SQL en el editor de Supabase:

```sql
CREATE TABLE IF NOT EXISTS perfiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  nombre_completo TEXT,
  cedula TEXT UNIQUE,
  puntos INTEGER DEFAULT 0,
  co2_ahorrado FLOAT DEFAULT 0,
  rol TEXT DEFAULT 'user',
  punto_asignado TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS entregas (
  id SERIAL PRIMARY KEY,
  usuario_id UUID REFERENCES auth.users(id),
  material TEXT,
  peso_kg FLOAT,
  puntos_ganados INTEGER,
  punto_recoleccion TEXT,
  fecha TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  nombre TEXT,
  puntos_requeridos INTEGER,
  stock INTEGER DEFAULT 0,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO productos (nombre, puntos_requeridos, stock) VALUES
('Botella Reutilizable', 500, 50),
('Bolsa de Tela', 200, 100),
('Cuaderno Reciclado', 300, 30);