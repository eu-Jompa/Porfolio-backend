require('dotenv').config()
const{createClient} = require('@supabase/supabase-js');// importa a funcao CreateClient do pacote oficial da SupaBase
//cria conexão com banco de dados do meu projeto
const supabaseUrl = process.env.SUPABASE_URL;
const supabasekKey= process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl,supabasekKey); 

module.exports = supabase;// exporta para usar em qualquer arquivo do backend
