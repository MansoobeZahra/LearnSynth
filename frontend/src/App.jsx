import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ChatInterface from './components/ChatInterface';
import { Sparkles } from 'lucide-react';
import { sendChatMessage } from './api';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setMessages([]); // Clear chat on new file
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setMessages([]);
  };

  const handleSendMessage = async (text) => {
    // Add user message
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const data = await sendChatMessage(text, selectedFile);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        model: data.model
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-purple-500/10 mb-4">
            <div className="bg-gradient-to-tr from-purple-600 to-pink-600 p-2 rounded-xl mr-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              LearnSynth AI
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Your intelligent study companion. Upload any material and start learning interactively.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar / File Upload */}
          <div className="lg:col-span-1 space-y-6">
            <FileUpload
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onClearFile={handleClearFile}
            />

            {/* Features / Tips */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Capabilities</h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Analyze Images & Diagrams
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Summarize Video Content
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Transcribe & Query Audio
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                  Interactive Q&A
                </li>
              </ul>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <ChatInterface
              messages={messages}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
