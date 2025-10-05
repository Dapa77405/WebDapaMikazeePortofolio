import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiX, FiSend, FiBrain } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// OpenAI Configuration
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const callOpenAI = async (message) => {
  try {
    // Simpan history chat dalam array untuk konteks
    const chatHistory = [];
    
    // Tambahkan pesan baru ke history
    chatHistory.push({ role: 'user', content: message });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a friendly and knowledgeable assistant for Herli's portfolio website. 
Your name is Dapa Assistant. Use a casual and friendly tone, but stay professional.

Key information to remember:
- Owner: Herli Sherdiyanti
- Email: herlisherdiyanti4@gmail.com
- Phone: 083162178912
- Skills: HTML, CSS, JavaScript, React, Node.js
- Projects: Calculator App, Todo App, Anime Explorer

When answering:
1. Be concise but informative
2. Use emojis occasionally to be friendly
3. Vary your responses, don't be repetitive
4. If asked in Indonesian, reply in Indonesian
5. For project inquiries, give specific details
6. For contact requests, provide email/phone
7. Keep responses under 3 sentences unless detailed info is requested`
          },
          ...chatHistory // Include chat history for context
        ],
        max_tokens: 150,
        temperature: 0.8, // Slightly more creative responses
        presence_penalty: 0.6, // Encourage more varied responses
        frequency_penalty: 0.5 // Reduce repetition
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
};

// Component implementation starts here

const CsSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    type: 'bot',
    text: 'Halo! 👋 Saya Dapa Assistant, siap membantu Anda mengenal lebih jauh tentang portfolio dan project-project Herli. Ada yang bisa saya bantu?'
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!OPENAI_API_KEY) {
      console.warn('OpenAI API key is not configured. AI responses will not work.');
    }
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const aiResponse = await callOpenAI(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: aiResponse }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'I apologize, but I\'m having trouble connecting to the AI service right now. Please try again later.' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-black/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl w-80 mb-4"
          >
            <div className="flex items-center justify-between rounded-t-2xl border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 p-4">
              <div className="flex items-center gap-2">
                <FiBrain className="text-cyan-400" size={24} />
                <div>
                  <h3 className="font-semibold text-white">AI Assistant</h3>
                  <p className="text-sm text-white/70">Powered by GPT-3.5</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 hover:bg-white/10 text-white"
                aria-label="Close support chat"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-2 max-w-[80%] ${msg.type === 'user'
                        ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
                        : 'bg-white/10 text-white'}`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="rounded-2xl px-4 py-2 bg-white/10 text-white">
                    <div className="flex gap-1">
                      <span className="animate-bounce">●</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
                    </div>
                  </div>
                </motion.div>
              )}
              </div>
            </div>

            <form onSubmit={handleSend} className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none placeholder:text-white/50 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 p-2 text-white shadow-lg"
                  aria-label="Send message"
                >
                  <FiSend size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 p-3 text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Open support chat"
      >
        <FiMessageSquare size={24} />
      </button>
    </div>
  );
};

export default CsSupport;