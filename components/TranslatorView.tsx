import React, { useState } from 'react';
import { ArrowLeft, Languages, Volume2, Loader2, Maximize2, X } from 'lucide-react';
import { translateText } from '../services/geminiService';

interface TranslatorViewProps {
  onBack: () => void;
}

const TranslatorView: React.FC<TranslatorViewProps> = ({ onBack }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ italian: string; pronunciation: string } | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    setResult(null);
    
    const translation = await translateText(inputText);
    setResult(translation);
    setIsLoading(false);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';
      utterance.rate = 0.85;
      const voices = window.speechSynthesis.getVoices();
      const itVoice = voices.find(v => v.lang.includes('it'));
      if (itVoice) utterance.voice = itVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      <div className="animate-slide-up h-full flex flex-col">
        <div className="sticky top-0 bg-stone-50/95 backdrop-blur-sm pt-4 pb-4 z-10 flex items-center gap-4 px-1 shadow-sm mb-4">
          <button onClick={onBack} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-stone-600" />
          </button>
          <h2 className="text-xl font-bold text-stone-800 font-serif flex items-center gap-2">
            <Languages className="w-5 h-5 text-emerald-600" /> Translator
          </h2>
        </div>

        <div className="flex-1 space-y-6 px-1">
          {/* Input Section */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
            <label className="block text-stone-500 text-sm font-bold mb-2">Korean Text</label>
            <textarea
              className="w-full p-4 bg-stone-50 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none font-medium"
              rows={3}
              placeholder="하고 싶은 말을 입력하세요... (예: 화장실 어디야?)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="w-full mt-3 bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-emerald-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Translating...
                </>
              ) : (
                'Translate to Italian'
              )}
            </button>
          </div>

          {/* Result Section */}
          {result && (
            <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100 animate-fade-in space-y-4">
              <div className="flex justify-between items-start">
                  <div>
                    <div className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-1">Italian</div>
                    <div className="text-2xl font-serif font-bold text-stone-900 leading-tight">{result.italian}</div>
                  </div>
                  <button onClick={() => setIsFullScreen(true)} className="p-2 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                      <Maximize2 className="w-5 h-5" />
                  </button>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                <div className="text-yellow-800 text-xs font-bold uppercase tracking-wider mb-1">Pronunciation</div>
                <div className="font-bold text-yellow-700">{result.pronunciation}</div>
              </div>

              <button
                onClick={() => speak(result.italian)}
                className="w-full py-3 border-2 border-stone-100 rounded-xl font-bold text-stone-600 hover:bg-stone-50 flex items-center justify-center gap-2 transition-all"
              >
                <Volume2 className="w-5 h-5" /> Listen
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullScreen && result && (
        <div className="fixed inset-0 z-50 bg-stone-900/95 flex flex-col items-center justify-center p-6 animate-fade-in">
          <button 
            onClick={() => setIsFullScreen(false)}
            className="absolute top-6 right-6 p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="w-full bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl space-y-8">
            <h3 className="text-stone-400 font-bold uppercase tracking-wider text-sm">Mostrare a un italiano</h3>
            <div className="text-5xl md:text-6xl font-black text-stone-900 font-serif leading-tight break-words w-full">
              {result.italian}
            </div>
            <div className="w-full h-px bg-stone-100"></div>
            <div>
              <div className="text-2xl font-medium text-stone-500 mb-2">{inputText}</div>
              <div className="text-lg text-yellow-600 font-bold">🗣️ {result.pronunciation}</div>
            </div>
            <button 
                onClick={() => speak(result.italian)}
                className="flex items-center gap-2 px-6 py-3 bg-stone-100 text-stone-900 rounded-xl font-bold hover:bg-stone-200"
            >
                <Volume2 className="w-5 h-5" /> Ascolta
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TranslatorView;