import React, { useState, useEffect } from 'react';
import { X, Trophy, Volume2, Check } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizViewProps {
  questions: QuizQuestion[];
  onClose: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ questions, onClose }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (selectedOption: string) => {
    if (feedback) return;

    const currentQ = questions[currentQuizIndex];
    const isCorrect = selectedOption === currentQ.answer;

    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
        setScore(prev => prev + 1);
        speak("Benissimo!");
    } else {
        speak("No");
    }

    setTimeout(() => {
      if (currentQuizIndex < questions.length - 1) {
        setCurrentQuizIndex(prev => prev + 1);
        setFeedback(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] animate-fade-in text-center px-4">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 rounded-full"></div>
          <Trophy className="w-28 h-28 text-yellow-500 drop-shadow-lg relative z-10" />
        </div>
        <h2 className="text-3xl font-black text-stone-800 mb-2 font-serif">Bravissimo!</h2>
        <p className="text-stone-500 mb-8 text-lg">Quiz Complete</p>
        
        <div className="w-full bg-white p-8 rounded-3xl shadow-lg border border-stone-100 mb-8 max-w-xs">
          <div className="text-stone-400 text-sm font-bold uppercase tracking-wider mb-2">SCORE</div>
          <div className="text-6xl font-black text-indigo-600">
              {score} <span className="text-3xl text-stone-300">/ {questions.length}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full max-w-xs px-8 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 active:scale-95 transition-all shadow-xl shadow-stone-200"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuizIndex];

  return (
    <div className="h-full flex flex-col animate-fade-in pb-10 pt-4">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-2">
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
           <div className="w-24 h-2 bg-stone-200 rounded-full overflow-hidden">
              <div 
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${((currentQuizIndex + 1) / questions.length) * 100}%` }}
              ></div>
           </div>
           <span className="text-xs font-bold text-stone-400">{currentQuizIndex + 1}/{questions.length}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center mb-10">
        <h3 className="text-4xl font-black text-stone-800 text-center mb-6 leading-tight font-serif">{currentQ.question}</h3>
        <div className="flex gap-2">
          <button 
              onClick={() => speak(currentQ.question)}
              className="flex items-center gap-2 text-stone-600 bg-white border border-stone-200 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-stone-50 active:scale-95 transition-all"
          >
              <Volume2 className="w-4 h-4" /> Listen
          </button>
          <div className="px-5 py-2.5 bg-yellow-50 text-yellow-700 rounded-xl text-sm font-bold">
              💡 {currentQ.pron}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {currentQ.options.map((option, idx) => {
          let btnClass = "p-5 rounded-xl text-lg font-bold border-2 transition-all relative overflow-hidden ";
          
          if (feedback) {
            if (option === currentQ.answer) {
              btnClass += "bg-green-500 border-green-500 text-white shadow-md scale-[1.02] z-10";
            } else if (option !== currentQ.answer && feedback === 'wrong') {
              btnClass += "bg-stone-50 border-stone-100 text-stone-300 opacity-50";
            } else {
               btnClass += "bg-stone-50 border-stone-100 text-stone-300";
            }
          } else {
            btnClass += "bg-white border-stone-200 text-stone-600 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 shadow-sm";
          }

          return (
            <button
              key={idx}
              disabled={!!feedback}
              onClick={() => handleAnswer(option)}
              className={btnClass}
            >
              <span className="relative z-10 flex justify-between items-center w-full">
                  {option}
                  {feedback && option === currentQ.answer && <Check className="w-5 h-5" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizView;
