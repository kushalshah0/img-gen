import { Hono } from 'hono';

const app = new Hono();

app.get('/', async (c) => {
  const prompt = c.req.query('prompt') || 'superbike'; // Default prompt
 
  const inputs = {
    prompt: prompt,
  };
  
  try {
    // Call the AI model
    const response = await c.env.AI.run(
      '@cf/stabilityai/stable-diffusion-xl-base-1.0',
      inputs,
    );

    // Return the generated image
    return c.body(response, 200, {
      'content-type': 'image/png',
    });
  } catch (error) {
    return c.text('Error generating image: ' + error.message, 500);
  }
});

// Export the Hono app as a Cloudflare Worker
export default {
  fetch: app.fetch,
};