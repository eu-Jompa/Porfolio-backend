// /api/projetos.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ erro: 'Método não permitido' });
    }

    const { data, error } = await supabase.from('projetos').select('*');
    if (error) {
        return res.status(500).json({ erro: error.message });
    }

    res.status(200).json(data);
}
