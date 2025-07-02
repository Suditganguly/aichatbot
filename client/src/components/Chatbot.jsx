import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your health assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    setLoading(true);
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY || ""; // Use environment variable or leave blank
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful health assistant. Answer health questions, but do not give medical diagnoses.' },
            ...messages.map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text
            })),
            { role: 'user', content: input }
          ]
        })
      });
      const data = await response.json();
      console.log('OpenAI API response:', data);
      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        setMessages(msgs => [...msgs, { sender: 'bot', text: data.choices[0].message.content }]);
      } else if (data.error && data.error.message) {
        setMessages(msgs => [...msgs, { sender: 'bot', text: 'API Error: ' + data.error.message }]);
      } else {
        setMessages(msgs => [...msgs, { sender: 'bot', text: 'Sorry, I could not answer that.' }]);
      }
    } catch (err) {
      setMessages(msgs => [...msgs, { sender: 'bot', text: 'Error contacting AI service.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ width: '100%', minHeight: 'calc(100vh - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div className="card" style={{ maxWidth: 500, width: '100%', marginTop: 32 }}>
        <h2>AI Health Chatbot</h2>
        <div style={{ minHeight: 200, maxHeight: 300, overflowY: 'auto', marginBottom: 16, background: '#f9f9f9', borderRadius: 4, padding: 12 }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '8px 0' }}>
              <span style={{
                background: msg.sender === 'user' ? '#1976d2' : '#e2e3e5',
                color: msg.sender === 'user' ? '#fff' : '#222',
                padding: '8px 12px',
                borderRadius: 16,
                display: 'inline-block',
                maxWidth: '80%',
                wordBreak: 'break-word',
              }}>
                {msg.text}
              </span>
            </div>
          ))}
          {loading && (
            <div style={{ textAlign: 'left', margin: '8px 0' }}>
              <span style={{ background: '#e2e3e5', color: '#222', padding: '8px 12px', borderRadius: 16, display: 'inline-block' }}>
                <span className="dot-flashing" style={{ display: 'inline-block', width: 24 }}>
                  <span style={{ animation: 'dotFlashing 1s infinite linear alternate', fontSize: 20 }}>...</span>
                </span>
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask a health question..."
            className="input input-dark"
            style={{ flex: 1 }}
            disabled={loading}
          />
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
        <style>{`
          @keyframes dotFlashing {
            0% { opacity: 0.2; }
            50% { opacity: 1; }
            100% { opacity: 0.2; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Chatbot;