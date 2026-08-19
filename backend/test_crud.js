const http = require('http');

function request(method, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 4000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, body: body ? JSON.parse(body) : null });
      });
    });

    req.on('error', (err) => reject(err));
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  // wait for server
  let ok = false;
  for (let i = 0; i < 10; i++) {
    try {
      const res = await request('GET', '/api/items');
      if (res.status === 200) { ok = true; break; }
    } catch (e) {}
    await sleep(500);
  }
  if (!ok) {
    console.error('Server did not start on http://127.0.0.1:4000');
    process.exit(2);
  }

  try {
    console.log('GET /api/items');
    let r = await request('GET', '/api/items');
    console.log(r.status, r.body);

    console.log('POST /api/items');
    r = await request('POST', '/api/items', { name: 'test-item' });
    console.log(r.status, r.body);
    if (r.status !== 201) throw new Error('POST failed');
    const id = r.body.id;

    console.log('GET /api/items/' + id);
    r = await request('GET', `/api/items/${id}`);
    console.log(r.status, r.body);
    if (r.status !== 200) throw new Error('GET by id failed');

    console.log('PUT /api/items/' + id);
    r = await request('PUT', `/api/items/${id}`, { name: 'updated' });
    console.log(r.status, r.body);
    if (r.status !== 200) throw new Error('PUT failed');

    console.log('DELETE /api/items/' + id);
    r = await request('DELETE', `/api/items/${id}`);
    console.log(r.status);
    if (r.status !== 204) throw new Error('DELETE failed');

    console.log('All CRUD tests passed');
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err.message || err);
    process.exit(1);
  }
})();
