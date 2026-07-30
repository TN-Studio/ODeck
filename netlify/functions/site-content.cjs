const { createClient } = require('@supabase/supabase-js');

const siteKey = 'odeck';

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  },
  body: JSON.stringify(body),
});

const getClient = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key) : null;
};

const checkPassword = (event) => {
  const expected = process.env.ODECK_ADMIN_PASSWORD || process.env.SITE_ADMIN_PASSWORD;
  const received = event.headers['x-admin-password'] || event.headers['X-Admin-Password'];
  const normalize = (value) => String(value).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '');
  return Boolean(expected && received && expected.split(',').some((value) => normalize(value) === normalize(received)));
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return json(200, { ok: true });

  const supabase = getClient();
  if (!supabase) return json(503, { ok: false, message: 'Supabase is not configured.' });

  const url = new URL(event.rawUrl || `https://local${event.path}`);
  const contentKey = url.searchParams.get('key') || 'menu';

  if (event.httpMethod === 'GET') {
    const { data, error } = await supabase
      .from('tn_site_content')
      .select('data')
      .eq('site_key', siteKey)
      .eq('content_key', contentKey)
      .maybeSingle();

    if (error) return json(500, { ok: false, message: error.message });
    return json(200, { ok: true, data: data?.data ?? null });
  }

  let body = {};
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch {
    return json(400, { ok: false, message: 'Invalid JSON body.' });
  }

  if (event.httpMethod === 'POST' && body.action === 'verify') {
    return checkPassword(event) ? json(200, { ok: true }) : json(401, { ok: false, message: 'Invalid password.' });
  }

  if (event.httpMethod === 'PUT' || event.httpMethod === 'POST') {
    if (!checkPassword(event)) return json(401, { ok: false, message: 'Invalid password.' });

    const key = String(body.key || contentKey);
    const { error } = await supabase
      .from('tn_site_content')
      .upsert({
        site_key: siteKey,
        content_key: key,
        data: body.data,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'site_key,content_key' });

    if (error) return json(500, { ok: false, message: error.message });
    return json(200, { ok: true });
  }

  return json(405, { ok: false, message: 'Method not allowed.' });
};
