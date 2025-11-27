import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Sparkles, Bot, ExternalLink } from 'lucide-react';
import { getTravelAdvice, ChatMessage } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface AiGuideViewProps {
  onBack: () => void;
}

const AiGuideView: React.FC<AiGuideViewProps> = ({ onBack }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Ciao! I am your Amore AI Guide. Ask me anything about your honeymoon in Italy. \n\n*Examples:*\n- Best romantic dinner in Rome?\n- How do I validate train tickets?\n- Phrase for 'Where is the beach?'"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    const response = await getTravelAdvice(userMsg.text);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response.text,
      links: response.links
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] animate-slide-up">
      <div className="sticky top-0 bg-stone-50/95 backdrop-blur-sm pt-2 pb-3 z-10 flex items-center gap-4 px-1 shadow-sm border-b border-stone-200">
        <button onClick={onBack} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-stone-600" />
        </button>
        <div>
           <h2 className="text-lg font-bold text-stone-800 font-serif flex items-center gap-2">
             <Sparkles className="w-4 h-4 text-indigo-500" /> Amore AI Guide
           </h2>
           <p className="text-xs text-stone-500">Powered by Gemini</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-white border border-stone-100 text-stone-800 rounded-tl-none'
              }`}
            >
              {msg.role === 'model' && (
                <div className="flex items-center gap-2 mb-2 text-indigo-500 font-bold text-xs uppercase tracking-wider">
                  <Bot className="w-3 h-3" /> Amore AI
                </div>
              )}
              <div className="prose prose-sm prose-stone">
                 <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
              
              {/* Grounding Links */}
              {msg.links && msg.links.length > 0 && (
                <div className="mt-3 pt-3 border-t border-stone-100 flex flex-col gap-1">
                  <span className="text-xs font-bold text-stone-400">Sources:</span>
                  {msg.links.map((link, idx) => (
                    <a 
                      key={idx} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-500 hover:underline flex items-center gap-1 truncate"
                    >
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      {link.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white border border-stone-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 pb-4 bg-stone-50">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Italy..."
            className="flex-1 p-4 pr-12 rounded-full border border-stone-300 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
          />
          <button
            onClick={handleSend}
            disabled={!query.trim() || isLoading}
            className="absolute right-2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiGuideView;
