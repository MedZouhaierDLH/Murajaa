
import React, { useState } from 'react';
import { QuizQuestion, QuestionResult } from '../types';
import { Check, X, Eye, AlertCircle } from 'lucide-react';

interface QuizScreenProps {
  questions: QuizQuestion[];
  onFinish: (score: number, results: QuestionResult[]) => void;
  onQuit: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onFinish, onQuit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>([]);

  const question = questions[currentIndex];

  // Reset hint when moving to next question
  React.useEffect(() => {
    setShowHint(false);
  }, [currentIndex]);

  const handleSelfEvaluate = (isCorrect: boolean) => {
    const newScore = isCorrect ? totalScore + 1 : totalScore;
    setTotalScore(newScore);

    // Add to results
    const newResults = [...results, { question, isCorrect }];
    setResults(newResults);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      onFinish(newScore, newResults);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 h-full flex flex-col justify-center">
      {/* شريط التقدم */}
      <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/10 dark:border-white/5 flex items-center gap-4 shrink-0 transition-colors duration-500">
        <div className="flex-grow h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-slate-600 dark:text-slate-400 font-bold min-w-[3rem] text-left text-sm transition-colors">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* بطاقة السؤال */}
      <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-white/10 dark:border-white/5 relative overflow-hidden flex-grow flex flex-col justify-center transition-colors duration-500">
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>

        <div className="flex justify-between items-center mb-4 shrink-0">
          <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 transition-colors">
            <AlertCircle size={14} />
            {question.type === 'NEXT' ? 'اقرأ الآية التالية:' : 'اقرأ الآية السابقة:'}
          </div>
          <button
            onClick={onQuit}
            className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 text-xs font-medium transition-colors"
          >
            إنهاء
          </button>
        </div>

        {/* آية الاختبار (المعطاة) */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl mb-4 relative border-r-4 border-emerald-500 shrink-0 transition-colors">
          <p className="quran-text text-xl sm:text-2xl leading-relaxed text-slate-800 dark:text-slate-200 text-center transition-colors">
            {question.referenceAyah.text}
          </p>
          <div className="mt-2 flex justify-center items-center gap-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest transition-colors">
            <span>سورة {question.referenceAyah.surah.name}</span>
            <span>•</span>
            <button
              onClick={() => setShowHint(true)}
              className={`transition-all ${showHint ? 'cursor-default' : 'cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 underline decoration-dotted'}`}
            >
              {showHint ? `الآية ${question.referenceAyah.numberInSurah}` : 'إظهار رقم الآية'}
            </button>
          </div>
        </div>

        {!showAnswer ? (
          <div className="space-y-4 animate-in fade-in duration-300 flex-grow flex flex-col justify-center">
            <div className="text-center py-4">
              <p className="text-slate-500 dark:text-slate-400 mb-4 font-medium text-sm transition-colors">استحضر الآية في ذهنك ثم اضغط للتحقق</p>
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full sm:w-64 mx-auto h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-emerald-100 dark:shadow-emerald-900/20 transition-all hover:scale-105 active:scale-95"
              >
                <Eye size={20} />
                <span>إظهار الإجابة</span>
              </button>
            </div>
          </div>
        ) : (
          /* عرض الإجابة والتقييم الذاتي */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in zoom-in-95 duration-300 items-center">
            <div className="space-y-2">
              <label className="block text-emerald-600 dark:text-emerald-400 text-xs font-black text-center uppercase tracking-widest transition-colors">النص الصحيح:</label>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl text-center border-2 border-emerald-100 dark:border-emerald-900/50 shadow-inner transition-colors">
                <p className="quran-text text-2xl text-emerald-900 dark:text-emerald-100 leading-relaxed font-medium transition-colors">
                  {question.targetAyah.text}
                </p>
                <div className="mt-2 text-[10px] font-bold text-emerald-600/60 dark:text-emerald-400/60 flex justify-center gap-2 transition-colors">
                  <span>سورة {question.targetAyah.surah.name}</span>
                  <span>•</span>
                  <span>الآية {question.targetAyah.numberInSurah}</span>
                </div>
              </div>
            </div>

            <div className="text-center space-y-3">
              <p className="font-bold text-slate-700 dark:text-slate-300 text-base transition-colors">كيف كان حفظك؟</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSelfEvaluate(true)}
                  className="flex flex-col items-center justify-center gap-1 p-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl transition-all group"
                >
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <span className="font-black text-sm">صحيحة</span>
                </button>

                <button
                  onClick={() => handleSelfEvaluate(false)}
                  className="flex flex-col items-center justify-center gap-1 p-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl transition-all group"
                >
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <X size={20} strokeWidth={3} />
                  </div>
                  <span className="font-black text-sm">خاطئة</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;
