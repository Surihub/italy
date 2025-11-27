import React from 'react';
import { BookOpen, Coffee, ShoppingBag, Map, Trophy, Info, Bot, Languages } from 'lucide-react';
import { categories } from '../data';
import { Category, ViewState } from '../types';

interface HomeViewProps {
  onNavigate: (view: ViewState, category?: Category) => void;
  onStartQuiz: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onStartQuiz }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'greeting': return <BookOpen className="w-6 h-6" />;
      case 'dining': return <Coffee className="w-6 h-6" />;
      case 'shopping': return <ShoppingBag className="w-6 h-6" />;
      case 'transport': return <Map className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      <div className="text-center py-8 bg-white rounded-3xl shadow-sm border border-stone-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-white to-red-500 opacity-80"></div>
        <h2 className="text-3xl font-serif font-bold text-stone-800 tracking-tight">Buon Viaggio!</h2>
        <p className="text-stone-500 mt-2 font-medium font-sans">For your perfect Italian Trip</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onNavigate('category', cat)}
            className={`${cat.color} border p-5 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all text-left flex flex-col items-start gap-4 h-36 justify-between`}
          >
            <div className="p-2.5 bg-white rounded-xl bg-opacity-80 backdrop-blur-sm shadow-sm text-current">
              {getIcon(cat.id)}
            </div>
            <span className="font-bold text-lg leading-tight">{cat.title}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
         {/* Translator Button */}
         <button
          onClick={() => onNavigate('translator')}
          className="bg-white border-2 border-emerald-100 text-stone-800 p-5 rounded-2xl shadow-sm hover:border-emerald-300 active:scale-95 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl group-hover:rotate-12 transition-transform">
              <Languages className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">AI Translator</div>
              <div className="text-stone-400 text-sm">Translate & Show to locals</div>
            </div>
          </div>
        </button>

         {/* AI Guide Button */}
         <button
          onClick={() => onNavigate('ai-guide')}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl active:scale-95 transition-all flex items-center justify-between group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">Amore AI Guide</div>
              <div className="text-indigo-100 text-sm">Ask anything about Italy!</div>
            </div>
          </div>
        </button>

        <button
          onClick={onStartQuiz}
          className="bg-white border-2 border-indigo-100 text-stone-800 p-5 rounded-2xl shadow-sm hover:border-indigo-300 active:scale-95 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl group-hover:rotate-12 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">Daily Quiz</div>
              <div className="text-stone-400 text-sm">Test your knowledge</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('culture')}
          className="bg-white border-2 border-orange-100 text-stone-800 p-5 rounded-2xl shadow-sm hover:border-orange-300 active:scale-95 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
              <Info className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">Culture Tips</div>
              <div className="text-stone-400 text-sm">Travel like a local</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default HomeView;