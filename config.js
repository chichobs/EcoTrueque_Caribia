// config.js
const SUPABASE_URL = "https://qrktpmpitdabxvxriomp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFya3RwbXBpdGRhYnh2eHJpb21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwODU3MDUsImV4cCI6MjA5MDY2MTcwNX0.79fkqfQlNJEISPrZrjePWtmP9O-2dLzFmuk2gFQx3PE";

// Esperar a que Supabase esté disponible
let supabase = null;

function initSupabase() {
  if (window.supabase && !supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabase;
}

async function cerrarSesion() {
  const client = initSupabase();
  if (client) {
    await client.auth.signOut();
  }
  window.location.href = "index.html";
}

async function obtenerUsuarioActual() {
  const client = initSupabase();
  if (!client) return null;
  
  const { data: { user }, error: userError } = await client.auth.getUser();
  if (userError || !user) return null;
  
  const { data: perfil, error: perfilError } = await client
    .from('perfiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (perfilError) {
    console.error("Error obteniendo perfil:", perfilError);
    return { ...user, id: user.id };
  }
    
  return { ...user, ...perfil };
}

async function verificarAutenticacion(rolesPermitidos = null) {
  const client = initSupabase();
  if (!client) {
    window.location.href = "index.html";
    return null;
  }
  
  const { data: { user }, error: userError } = await client.auth.getUser();
  
  if (userError || !user) {
    window.location.href = "index.html";
    return null;
  }
  
  const { data: perfil, error: perfilError } = await client
    .from('perfiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (perfilError) {
    console.error("Error obteniendo perfil:", perfilError);
    window.location.href = "index.html";
    return null;
  }
  
  if (rolesPermitidos && !rolesPermitidos.includes(perfil.rol)) {
    window.location.href = "index.html";
    return null;
  }
  
  return { ...user, ...perfil };
}
