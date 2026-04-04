// config.js - Configuración de Supabase
const SUPABASE_URL = "https://qrktpmpitdabxvxriomp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_3d_8LCaFvtP9Dlergn3LRQ_27ZI1N8w";

// Inicializar cliente Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para obtener usuario actual y su perfil
async function obtenerUsuarioActual() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return { ...user, ...perfil };
}

// Función para obtener el rol del usuario actual
async function obtenerRolActual() {
  const usuario = await obtenerUsuarioActual();
  return usuario?.rol || null;
}

// Función para cerrar sesión
async function cerrarSesion() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}

// Verificar autenticación (proteger páginas)
async function verificarAutenticacion(rolesPermitidos = null) {
  const usuario = await obtenerUsuarioActual();
  
  if (!usuario) {
    window.location.href = "index.html";
    return null;
  }
  
  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    alert("No tienes permiso para acceder a esta página");
    if (usuario.rol === 'admin') window.location.href = "panel_admin.html";
    else if (usuario.rol === 'subadmin') window.location.href = "sub_admin.html";
    else window.location.href = "Usuario.html";
    return null;
  }
  
  return usuario;
}
