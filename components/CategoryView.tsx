import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Mic, MicOff, Star, Maximize2, X } from 'lucide-react';
import { Category, SpeechFeedback, PhraseItem } from '../types';

interface CategoryViewProps {
  category: Category;
  onBack: () => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ category, onBack }) => {
  const [isListening, setIsListening] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<SpeechFeedback>({ status: 'idle', message: '' });
  const [expandedPhrase, setExpandedPhrase] = useState<PhraseItem | null>(null);
  const recognitionRef = useRef<any>(null);

  // Clean up speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

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
    } else {
      alert("Text-to-speech not supported in this browser.");
    }
  };

  const startListening = (targetText: string) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Try Chrome or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setSpeechFeedback({ status: 'idle', message: '' });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'it-IT';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechFeedback({ status: 'listening', message: 'Listening...' });
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const cleanTarget = targetText.toLowerCase().replace(/[?!.,]/g, '').trim();
      const cleanTranscript = transcript.toLowerCase().replace(/[?!.,]/g, '').trim();

      // Check if the transcript contains the key phrase or vice versa
      if (cleanTranscript.includes(cleanTarget) || cleanTarget.includes(cleanTranscript) || (cleanTranscript.length > 2 && cleanTarget.includes(cleanTranscript))) {
        setSpeechFeedback({ status: 'success', message: `Bravo! You said: "${transcript}"` });
        speak("Bravo!");
      } else {
        setSpeechFeedback({ status: 'fail', message: `Try again. Heard: "${transcript}"` });
      }
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      setIsListening(false);
      setSpeechFeedback({ status: 'fail', message: 'Could not hear you. Try again.' });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <>
      <div className="animate-slide-up pb-32">
        <div className="sticky top-0 bg-stone-50/95 backdrop-blur-sm pt-4 pb-4 z-20 flex items-center gap-4 px-1 shadow-sm mb-4">
          <button onClick={onBack} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-stone-600" />
          </button>
          <h2 className="text-xl font-bold text-stone-800 font-serif">{category.title}</h2>
        </div>

        {speechFeedback.status !== 'idle' && (
          <div className={`fixed bottom-6 left-4 right-4 z-50 p-4 rounded-xl shadow-xl flex items-center justify-center gap-3 animate-bounce-in 
              ${speechFeedback.status === 'listening' ? 'bg-stone-800 text-white' : 
                speechFeedback.status === 'success' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
              {speechFeedback.status === 'listening' && <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>}
              {speechFeedback.status === 'success' && <Star className="w-5 h-5 fill-current" />}
              <span className="font-bold text-sm">{speechFeedback.message}</span>
          </div>
        )}

        <div className="space-y-4">
          {category.items.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex flex-col gap-3 transition-colors hover:border-indigo-100">
              <div className="flex justify-between items-start">
                  <div className="flex-1 cursor-pointer group" onClick={() => setExpandedPhrase(item)}>
                      <div className="flex items-start gap-2">
                        <div className="text-2xl font-bold text-stone-800 mb-1 tracking-tight font-serif group-hover:text-indigo-600 transition-colors">{item.it}</div>
                        <Maximize2 className="w-4 h-4 text-stone-300 mt-2 flex-shrink-0 group-hover:text-indigo-300" />
                      </div>
                      <div className="text-stone-500 font-medium">{item.kr}</div>
                  </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-stone-50 mt-1">
                  <div className="inline-flex items-center px-3 py-1.5 bg-yellow-50 rounded-lg text-yellow-700 text-sm font-bold">
                      🗣️ {item.pron}
                  </div>
                  
                  <div className="flex gap-2">
                      <button
                          onClick={() => speak(item.it)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 active:scale-95 transition-all text-sm font-bold"
                      >
                          <Volume2 className="w-4 h-4" /> Listen
                      </button>
                      <button
                          onClick={() => startListening(item.it)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg active:scale-95 transition-all text-sm font-bold border
                              ${isListening ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100'}`}
                      >
                          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          {isListening ? 'Stop' : 'Speak'}
                      </button>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {expandedPhrase && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-fade-in">
          <button 
            onClick={() => setExpandedPhrase(null)}
            className="absolute top-6 right-6 p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="w-full max-w-sm bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl space-y-8 animate-slide-up">
            <h3 className="text-stone-400 font-bold uppercase tracking-wider text-sm">Mostrare a un italiano</h3>
            <div className="text-5xl md:text-6xl font-black text-stone-900 font-serif leading-tight break-words w-full">
              {expandedPhrase.it}
            </div>
            <div className="w-full h-px bg-stone-100"></div>
            <div>
              <div className="text-2xl font-medium text-stone-500 mb-2">{expandedPhrase.kr}</div>
              <div className="text-lg text-yellow-600 font-bold">🗣️ {expandedPhrase.pron}</div>
            </div>
            <button 
                onClick={() => speak(expandedPhrase.it)}
                className="flex items-center gap-2 px-6 py-3 bg-stone-100 text-stone-900 rounded-xl font-bold hover:bg-stone-200"
            >
                <Volume2 className="w-5 h-5" /> Ascolta (Listen)
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryView;