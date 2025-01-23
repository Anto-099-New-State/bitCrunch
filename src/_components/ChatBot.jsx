'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, User, Bot } from 'lucide-react';
import { marked } from 'marked';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage = { 
      id: Date.now(), 
      text: input, 
      sender: 'user' 
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInput('');
    setLoading(true);

    try {
      const result = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await result.json();
      const newBotMessage = { 
        id: Date.now() + 1, 
        text: data.text || 'No response text available', 
        sender: 'bot' 
      };

      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    } catch (error) {
      const errorMessage = { 
        id: Date.now() + 2, 
        text: 'Error fetching response', 
        sender: 'bot' 
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-2xl mx-auto bg-gray-900 text-gray-100">
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
  <div 
    key={message.id} 
    className={`flex items-start space-x-3 ${
      message.sender === 'user' ? 'justify-end' : 'justify-start'
    }`}
  >
    {message.sender === 'bot' && (
      <Bot className="w-8 h-8 text-blue-400 shrink-0" />
    )}
    <div 
      className={`
        max-w-[80%] p-3 rounded-lg 
        ${message.sender === 'user' 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-700 text-gray-200'}
      `}
      {...(message.sender === 'bot'
        ? { dangerouslySetInnerHTML: { __html: marked(message.text) } }
        : { children: message.text })}
    ></div>
    {message.sender === 'user' && (
      <User className="w-8 h-8 text-green-400 shrink-0" />
    )}
  </div>
))}

        {loading && (
          <div className="flex justify-start items-center space-x-3">
            <Bot className="w-8 h-8 text-blue-400" />
            <div className="bg-gray-700 p-3 rounded-lg flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="p-4 bg-gray-800 flex items-center space-x-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          disabled={loading}
        />
        <button 
          type="submit" 
          className="
            p-3 bg-blue-600 text-white rounded-lg 
            hover:bg-blue-700 transition duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          disabled={loading || !input.trim()}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatBot;