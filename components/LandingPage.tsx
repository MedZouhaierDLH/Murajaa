import React from 'react';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';

interface LandingPageProps {
    onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden" dir="rtl">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-10 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-4xl w-full text-center space-y-12">

                {/* Logo / Icon */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-400 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-3xl shadow-2xl border border-emerald-400/30 transform hover:scale-105 transition-transform duration-500">
                            <BookOpen size={64} className="text-white" />
                        </div>
                    </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-6">
                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-teal-200 tracking-tight drop-shadow-sm">
                        مُرَاجَعَة
                    </h1>
                    <p className="text-xl md:text-2xl text-emerald-100/80 font-light max-w-2xl mx-auto leading-relaxed">
                        رفيقك الذكي لتثبيت حفظ القرآن الكريم
                        <br />
                        <span className="text-base md:text-lg opacity-75 mt-2 block">
                            اختبر حفظك، راجع الآيات، وثبّت وردك اليومي
                        </span>
                    </p>
                </div>

                {/* Features Grid (Small) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-12 opacity-90">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="text-emerald-300 mb-2 flex justify-center"><Sparkles size={24} /></div>
                        <h3 className="text-white font-bold mb-1">اختبار ذكي</h3>
                        <p className="text-emerald-100/60 text-sm">أسئلة متنوعة لربط الآيات</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="text-emerald-300 mb-2 flex justify-center"><BookOpen size={24} /></div>
                        <h3 className="text-white font-bold mb-1">تحديد النطاق</h3>
                        <p className="text-emerald-100/60 text-sm">اختر السورة أو الجزء</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="text-emerald-300 mb-2 flex justify-center"><Sparkles size={24} /></div>
                        <h3 className="text-white font-bold mb-1">واجهة عصرية</h3>
                        <p className="text-emerald-100/60 text-sm">تصميم مريح للعين</p>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                    <button
                        onClick={onStart}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-emerald-900 transition-all duration-200 bg-white font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 hover:bg-emerald-50 transform hover:-translate-y-1 hover:shadow-xl shadow-lg shadow-emerald-900/20"
                    >
                        <span className="ml-2">ابدأ المراجعة الآن</span>
                        <ArrowRight className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                        <div className="absolute -inset-3 rounded-full bg-emerald-400 opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-200" />
                    </button>
                </div>

            </div>

            {/* Footer */}
            <div className="absolute bottom-6 text-emerald-200/40 text-sm">
                تم التطوير لخدمة حفاظ كتاب الله
            </div>
        </div>
    );
};

export default LandingPage;
