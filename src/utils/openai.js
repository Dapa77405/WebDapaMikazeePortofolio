// Fungsi untuk memanggil OpenAI API
async function callOpenAI(message) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "You are a helpful customer service assistant for a web developer's portfolio. Be professional, friendly, and knowledgeable about web development, programming, and portfolio projects. Keep responses concise and under 100 words."
        }, {
          role: "user",
          content: message
        }],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return "I apologize, but I'm having trouble connecting to my AI service right now. Please try again later.";
  }
}