import { Hono } from 'hono'

const app = new Hono()

// API routes
app.get('/api/metrics', async (c) => {
  try {
    const { results } = await c.env.DB.prepare('SELECT * FROM metrics ORDER BY created_at DESC').all()
    return c.json({ success: true, data: results })
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

app.post('/api/metrics', async (c) => {
  try {
    const body = await c.req.json()
    const { prompt_or_code, character_count, model, temperature, provider, test_mode } = body
    
    // Extract edge location from cf-ray header if available
    const cfRay = c.req.header('cf-ray') || ''
    const edgeLocation = cfRay.includes('-') ? cfRay.split('-')[1] : 'IST' // Default IST if local

    // SMART SIMULATION LOGIC based on user parameters
    let cache_status = false;
    let execution_time_ms = 0;
    
    // Temperature logic
    const temp = parseFloat(temperature);
    if (temp < 0.3) {
        // Low temperature: high chance of cache hit, fast
        cache_status = Math.random() > 0.2; // 80% hit rate
        execution_time_ms = cache_status ? Math.floor(Math.random() * 10) + 2 : Math.floor(Math.random() * 200) + 50;
    } else if (temp > 0.7) {
        // High temperature: low chance of cache hit, slow
        cache_status = Math.random() > 0.9; // 10% hit rate
        execution_time_ms = cache_status ? Math.floor(Math.random() * 15) + 5 : Math.floor(Math.random() * 3000) + 500;
    } else {
        // Medium temperature
        cache_status = Math.random() > 0.5; // 50% hit rate
        execution_time_ms = cache_status ? Math.floor(Math.random() * 10) + 5 : Math.floor(Math.random() * 800) + 100;
    }

    // Provider logic
    if (provider === 'Edge Runtime') {
        execution_time_ms = Math.floor(execution_time_ms * 0.7); // 30% faster on Edge
    } else {
        execution_time_ms = Math.floor(execution_time_ms * 1.2); // Slightly slower on standard Workers
    }

    // Status logic based on execution time
    const status = execution_time_ms > 800 ? 'Costly / Not Optimized' : 'Optimized';

    // COST CALCULATION LOGIC
    const tokens = character_count / 4;
    let multiplier = 0.005; // Default for GPT-4o
    if (model === 'Claude 3.5 Sonnet') multiplier = 0.003;
    if (model === 'Llama 3') multiplier = 0.001;
    const cost = (tokens / 1000) * multiplier;

    const stmt = c.env.DB.prepare(`
      INSERT INTO metrics (prompt_or_code, execution_time_ms, character_count, status, edge_location, cache_status, model, temperature, test_mode, cost)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    await stmt.bind(
      prompt_or_code,
      execution_time_ms,
      character_count,
      status,
      edgeLocation,
      cache_status ? 1 : 0,
      model,
      temp,
      test_mode || 'Single',
      cost
    ).run()

    return c.json({ 
      success: true, 
      message: 'Metric added successfully',
      data: {
        execution_time_ms,
        cache_status,
        status,
        edge_location: edgeLocation,
        cost,
        tokens
      }
    }, 201)
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

export default app
