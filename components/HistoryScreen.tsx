import React from 'react';
import { TestResult, SelectionType } from '../types';
import { Trash2, Eye, Calendar, Trophy, ArrowRight } from 'lucide-react';

interface HistoryScreenProps {
    history: TestResult[];
    onViewDetails: (test: TestResult) => void;
    onDelete: (id: string) => void;
    onBack: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ history, onViewDetails, onDelete, onBack }) => {
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
                <h2 className="text-3xl font-bold text-white">سجل الاختبارات</h2>
            </div>

            {history.length === 0 ? (
                <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-10 text-center shadow-2xl border border-white/10 dark:border-white/5">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <Calendar size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">لا يوجد سجل للاختبارات</h3>
                    <p className="text-slate-500 dark:text-slate-400">قم بإجراء اختبار جديد ليظهر هنا</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {history.map((test) => (
                        <div
                            key={test.id}
                            className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/10 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:scale-[1.01]"
                        >
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0 ${test.score / test.totalQuestions >= 0.8
                                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                                        : test.score / test.totalQuestions >= 0.5
                                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                                            : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                    }`}>
                                    {Math.round((test.score / test.totalQuestions) * 100)}%
                                </div>

                                <div className="text-right">
                                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">
                                        {test.type === SelectionType.JUZ ? `الجزء ${test.selectionId}` : `سورة رقم ${test.selectionId}`}
                                    </h3>
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mt-1">
                                        <Calendar size={14} />
                                        <span>{formatDate(test.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mt-1">
                                        <Trophy size={14} />
                                        <span>{test.score} من {test.totalQuestions} إجابات صحيحة</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                    onClick={() => onViewDetails(test)}
                                    className="flex-1 sm:flex-none px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl font-bold text-sm hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Eye size={18} />
                                    <span>التفاصيل</span>
                                </button>
                                <button
                                    onClick={() => onDelete(test.id)}
                                    className="flex-1 sm:flex-none px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={18} />
                                    <span>حذف</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryScreen;
