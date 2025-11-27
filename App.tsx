import React, { useState } from 'react';
import HomeView from './components/HomeView';
import CategoryView from './components/CategoryView';
import QuizView from './components/QuizView';
import CultureView from './components/CultureView';
import AiGuideView from './components/AiGuideView';
import TranslatorView from './components/TranslatorView';
import { Category, ViewState, QuizQuestion } from './types';
import { categories } from './data';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  const handleNavigate = (view: ViewState, category?: Category) => {
    if (view === 'category' && category) {
      setSelectedCategory(category);
    }
    setCurrentView(view);
  };

  const handleStartQuiz = () => {
    // Flatten all items from all categories
    const allItems = categories.flatMap(cat => cat.items);
    
    // Create random quiz questions
    const shuffled = [...allItems].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5).map(item => {
      // Create wrong options from other items
      const wrongOptions = shuffled
        .filter(i => i.it !== item.it)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(i => i.kr);
      
      const options = [...wrongOptions, item.kr].sort(() => 0.5 - Math.random());
      
      return {
        question: item.it,
        answer: item.kr,
        options: options,
        pron: item.pron
      };
    });

    setQuizQuestions(selected);
    setCurrentView('quiz');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-100 text-stone-900 flex justify-center bg-stone-100">
      <div className="w-full max-w-md min-h-screen bg-stone-50 p-4 shadow-2xl relative overflow-hidden flex flex-col">
        {/* Background Decorations */}
        <div className="fixed top-0 left-1/2 -ml-[220px] w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none animate-pulse"></div>
        <div className="fixed bottom-0 left-1/2 ml-[20px] w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex-1">
            {currentView === 'home' && (
              <HomeView 
                onNavigate={handleNavigate} 
                onStartQuiz={handleStartQuiz} 
              />
            )}
            
            {currentView === 'category' && selectedCategory && (
              <CategoryView 
                category={selectedCategory} 
                onBack={() => setCurrentView('home')} 
              />
            )}
            
            {currentView === 'quiz' && (
              <QuizView 
                questions={quizQuestions} 
                onClose={() => setCurrentView('home')} 
              />
            )}
            
            {currentView === 'culture' && (
              <CultureView 
                onBack={() => setCurrentView('home')} 
              />
            )}

            {currentView === 'ai-guide' && (
              <AiGuideView 
                onBack={() => setCurrentView('home')} 
              />
            )}

            {currentView === 'translator' && (
              <TranslatorView 
                onBack={() => setCurrentView('home')} 
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default App;