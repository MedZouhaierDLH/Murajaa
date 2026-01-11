
import React from 'react';
import { Trophy, RotateCcw, Home, Star, Share2 } from 'lucide-react';

interface ResultsSummaryProps {
  score: number;
  total: number;
  onReset: () => void;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ score, total, onReset }) => {
  const percentage = Math.round((score / total) * 100);

  const getFeedback = () => {
    if (percentage === 100) return "ما شاء الله! حفظ متقن ومثالي.";
    if (percentage >= 80) return "أحسنت! مستوى رائع جداً، استمر.";
    if (percentage >= 50) return "جيد جداً، الحفظ يحتاج لمزيد من التكرار.";
    return "لا بأس، المراجعة هي مفتاح التثبيت. جرب مرة أخرى.";
  };

  const getEmoji = () => {
    if (percentage === 100) return "👑";
    if (percentage >= 80) return "🌟";
    if (percentage >= 50) return "👍";
    return "📖";
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
      <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl shadow-black/20 border border-white/10 dark:border-white/5 text-center overflow-hidden relative transition-colors duration-500">
        {/* Background Decorative Elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-50 transition-colors"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 transition-colors"></div>

        <div className="relative z-10">
          <div className="mb-8 inline-block">
            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner transition-colors">
              <Trophy size={48} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 transition-colors">اكتمل الاختبار!</h2>
            <p className="text-slate-500 dark:text-slate-400 transition-colors">بارك الله في جهودك</p>
          </div>

          <div className="mb-10">
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 mb-2 transition-colors">
              {percentage}%
            </div>
            <p className="text-slate-400 dark:text-slate-500 font-medium transition-colors">
              أجبت بشكل صحيح على {score} من {total}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onReset}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-8 rounded-2xl font-bold shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              <span>اختبار جديد</span>
            </button>

            <button
              onClick={onReset}
              className="flex-1 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-200 dark:hover:border-slate-600 py-4 px-8 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Home size={20} />
              <span>الرئيسية</span>
            </button>
          </div>
        </div>
      </div>

      <button className="mt-8 flex items-center justify-center gap-2 mx-auto text-slate-400 hover:text-emerald-600 transition-colors">
        <Share2 size={18} />
        <span className="text-sm font-bold">شارك نتيجتك مع أصدقائك</span>
      </button>

      <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
        <div className="bg-white p-2 rounded-lg text-blue-600 shadow-sm shrink-0">
          <Star size={20} />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 mb-1">نصيحة للمراجعة</h4>
          <p className="text-blue-800 text-sm opacity-80">
            أثبتت الدراسات أن ربط الآيات بما قبلها وما بعدها (المراجعة التسلسلية) يساعد بشكل كبير في تثبيت الحفظ طويل المدى. استمر في تكرار هذا الاختبار يومياً.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;
