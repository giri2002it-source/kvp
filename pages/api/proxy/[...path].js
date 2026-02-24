import { HOST } from "@/services/api-urls";

export default async function handler(req, res) {
  const { path = [] } = req.query;

  // Build target URL dynamically
  const targetUrl =
    `${HOST}` + path.join('/');
console.log(targetUrl,"tarff")
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        // Forward important headers
        'Content-Type': req.headers['content-type'] || 'application/json',
        Authorization: req.headers.authorization || '',
      },
      body:
        req.method === 'GET' || req.method === 'HEAD'
          ? undefined
          : typeof req.body === 'string'
          ? req.body
          : JSON.stringify(req.body),
    });

    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();

    res.status(response.status).send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ message: 'Proxy request failed' });
  }
}
