import React, { useState } from 'react';
import { FiMessageSquare, FiX, FiSend, FiBrain } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { callOpenAI } from '../utils/openai';

export default function CsSupport() {
  // Check if API key is configured
  useEffect(() => {
    const apiKey = process.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      console.warn('OpenAI API key is not configured. AI responses will not work.');
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! 👋 I\'m an AI assistant ready to help you with any questions about my portfolio, projects, or web development skills!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await callOpenAI(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'I apologize, but I\'m having trouble connecting to my AI service right now. Please try again later.' 
      }]);
    } finally {
      setIsTyping(false);
    }

    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 p-3 text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Open support chat"
      >
        <FiMessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-lg shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between rounded-t-2xl border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 p-4">
              <div className="flex items-center gap-2">
                <FiBrain className="text-cyan-400" size={24} />
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-sm text-white/70">Powered by GPT-3.5</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 hover:bg-white/10"
                aria-label="Close support chat"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Messages */}
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
                      className={`rounded-2xl px-4 py-2 ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-indigo-500 to-pink-500'
                          : 'bg-white/10'
                      } max-w-[80%]`}
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
                    <div className="rounded-2xl px-4 py-2 bg-white/10">
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

            {/* Input */}
            <form onSubmit={handleSend} className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm outline-none placeholder:text-white/50 focus:border-indigo-500"
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
    </>
  );
}