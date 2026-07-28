const SYSTEM_PROMPT = `You are a helpful assistant on Dzhemile Ahmed's portfolio website.
Answer ONLY using the CV context provided. Speak in third person about her (she/her).
Be concise, professional, and confident. If asked whether she knows a skill she has, answer clearly yes and mention relevant experience.
If something is not in the CV, say you do not have that detail instead of inventing it.`;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(501).json({ error: 'AI provider not configured' });
    return;
  }

  const { question, context } = req.body ?? {};
  if (typeof question !== 'string' || question.trim() === '' || typeof context !== 'string') {
    res.status(400).json({ error: 'Invalid payload' });
    return;
  }

  try {
    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
        temperature: 0.3,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `CV CONTEXT:\n${context}\n\nQUESTION:\n${question}`,
          },
        ],
      }),
    });

    if (!upstream.ok) {
      res.status(502).json({ error: 'Upstream AI request failed' });
      return;
    }

    const payload = await upstream.json();
    const answer = payload?.choices?.[0]?.message?.content ?? '';
    res.status(200).json({ answer });
  } catch {
    res.status(500).json({ error: 'Chat failed' });
  }
};
