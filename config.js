// config.js
const SUPABASE_URL = "https://qrktpmpitdabxvxriomp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFya3RwbXBpdGRhYnh2eHJpb21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwODU3MDUsImV4cCI6MjA5MDY2MTcwNX0.79fkqfQlNJEISPrZrjePWtmP9O-2dLzFmuk2gFQx3PE";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function cerrarSesion() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}

async function verificarAutenticacion(rolesPermitidos = null) {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    window.location.href = "index.html";
    return null;
  }
  
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', user.id)
    .single();
  
  if (rolesPermitidos && !rolesPermitidos.includes(perfil?.rol)) {
    alert("No tienes permiso");
    window.location.href = "Usuario.html";
    return null;
  }
  
  return { ...user, ...perfil };
}
