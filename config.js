// config.js
const SUPABASE_URL = "https://qrktpmpitdabxvxriomp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFya3RwbXBpdGRhYnh2eHJpb21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwODU3MDUsImV4cCI6MjA5MDY2MTcwNX0.79fkqfQlNJEISPrZrjePWtmP9O-2dLzFmuk2gFQx3PE";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function cerrarSesion() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}

async function obtenerUsuarioActual() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return { ...user, ...perfil };
}
