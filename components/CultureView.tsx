import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { cultureTips } from '../data';

interface CultureViewProps {
  onBack: () => void;
}

const CultureView: React.FC<CultureViewProps> = ({ onBack }) => {
  return (
    <div className="animate-slide-up pb-20">
      <div className="sticky top-0 bg-stone-50/95 backdrop-blur-sm pt-4 pb-4 z-10 flex items-center gap-4 px-1 shadow-sm mb-6">
        <button onClick={onBack} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-stone-600" />
        </button>
        <h2 className="text-xl font-bold text-stone-800 font-serif">Travel & Culture Tips</h2>
      </div>
      
      <div className="space-y-4">
        {cultureTips.map((tip, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border-l-[6px] border-orange-400 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-stone-800 flex items-center gap-2 font-serif">
              <span className="text-2xl">🇮🇹</span>
              {tip.title}
            </h3>
            <p className="text-stone-600 leading-relaxed text-sm pl-9">
              {tip.content}
            </p>
          </div>
        ))}
        
        <div className="p-6 bg-stone-800 rounded-2xl text-center text-white mt-8 shadow-xl shadow-stone-300">
            <div className="text-2xl font-black mb-1 font-serif text-orange-200">Buon viaggio!</div>
            <div className="text-stone-400 text-sm">Have a wonderful honeymoon</div>
        </div>
      </div>
    </div>
  );
};

export default CultureView;
