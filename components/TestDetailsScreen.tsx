import React from 'react';
import { TestResult, SelectionType } from '../types';
import { ArrowRight, Check, X, AlertCircle } from 'lucide-react';

interface TestDetailsScreenProps {
    test: TestResult;
    onBack: () => void;
}

const TestDetailsScreen: React.FC<TestDetailsScreenProps> = ({ test, onBack }) => {
    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={onBack}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                    <ArrowRight size={24} />
                </button>
                <div>
                    <h2 className="text-3xl font-bold text-white">تفاصيل الاختبار</h2>
                    <p className="text-emerald-100/80 text-sm mt-1">{formatDate(test.date)}</p>
                </div>
            </div>

            <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 dark:border-white/5 mb-8">
                <div className="flex flex-wrap gap-6 justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-6 mb-6">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">النطاق</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-white">
                            {test.type === SelectionType.JUZ ? `الجزء ${test.selectionId}` : `سورة رقم ${test.selectionId}`}
                        </p>
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">النتيجة</p>
                        <p className={`text-xl font-bold ${test.score / test.totalQuestions >= 0.8
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-amber-600 dark:text-amber-400'
                            }`}>
                            {Math.round((test.score / test.totalQuestions) * 100)}%
                        </p>
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">الإجابات الصحيحة</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-white">
                            {test.score} <span className="text-sm text-slate-400 font-normal">من {test.totalQuestions}</span>
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {test.results.map((result, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl p-5 border-2 ${result.isCorrect
                                    ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30'
                                    : 'bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${result.isCorrect
                                        ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400'
                                        : 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400'
                                    }`}>
                                    {result.isCorrect ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}
                                </div>
                                <span className={`font-bold text-sm ${result.isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'
                                    }`}>
                                    السؤال {index + 1}: {result.isCorrect ? 'إجابة صحيحة' : 'إجابة خاطئة'}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                                        <AlertCircle size={12} />
                                        <span>{result.question.type === 'NEXT' ? 'أكمل الآية التالية لـ:' : 'أكمل الآية السابقة لـ:'}</span>
                                    </div>
                                    <p className="quran-text text-lg text-slate-800 dark:text-slate-200 text-center leading-relaxed">
                                        {result.question.referenceAyah.text}
                                    </p>
                                    <p className="text-[10px] text-center text-slate-400 mt-2">
                                        سورة {result.question.referenceAyah.surah.name} - الآية {result.question.referenceAyah.numberInSurah}
                                    </p>
                                </div>

                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2 text-center">الإجابة الصحيحة:</p>
                                    <p className="quran-text text-lg text-emerald-900 dark:text-emerald-100 text-center leading-relaxed">
                                        {result.question.targetAyah.text}
                                    </p>
                                    <p className="text-[10px] text-center text-emerald-600/60 dark:text-emerald-400/60 mt-2">
                                        سورة {result.question.targetAyah.surah.name} - الآية {result.question.targetAyah.numberInSurah}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestDetailsScreen;
