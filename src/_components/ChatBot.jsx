"use client"
import React from 'react'
import { useState } from 'react';
import { marked } from 'marked';
import { Button } from '@/components/ui/button';

function ChatBot() {
        const [input, setInput] = useState('');
        const [response, setResponse] = useState('');
        const [loading, setLoading] = useState(false);
      
        const handleInputChange = (e) => {
          setInput(e.target.value);
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
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
            console.log(data);
      
            setResponse(data.text || 'No response text available');
          } catch (error) {
            setResponse('Error fetching response');
          } finally {
            setLoading(false);
          }
        };
  return (
    <div className="flex flex-col w-auto bg-cover bg-center bg-fixed">
    <div className="bg-inherit bg-opacity-60 text-black p-1 rounded-md overflow-y-scroll" style={{ maxHeight: 'calc(100vh - 150px)' }}>
      {loading ? (
        <p className="text-center text-xl animate-blink">Analyzing...</p>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: marked(response) }}
          style={{ whiteSpace: 'pre-wrap' }}
        />
      )}
    </div>

      <form onSubmit={handleSubmit} className="flex my-2" >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="input input-bordered input-error w-full max-w-xs text-black"
          placeholder="Enter your prompt..."
        />
        <Button
          onClick={handleSubmit()}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </Button>
      </form>
  </div>
  )
}

export default ChatBot