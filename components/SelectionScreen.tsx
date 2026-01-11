
import React, { useState, useEffect } from 'react';
import { SelectionType } from '../types';
import { QuranService } from '../services/quranService';
import { Hash, List, Play, CheckCircle2, ChevronDown, ArrowLeft } from 'lucide-react';

interface SelectionScreenProps {
  onStart: (type: SelectionType, id: number, count: number, range?: { from: number; to: number }) => void;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({ onStart }) => {
  const [selectionType, setSelectionType] = useState<SelectionType>(SelectionType.JUZ);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [surahs, setSurahs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Range state
  const [range, setRange] = useState<{ from: number; to: number } | undefined>(undefined);

  useEffect(() => {
    const loadSurahs = async () => {
      const list = await QuranService.getSurahList();
      setSurahs(list);
    };
    loadSurahs();
  }, []);

  // Derived values
  const items = selectionType === SelectionType.JUZ
    ? Array.from({ length: 30 }, (_, i) => ({ id: i + 1, label: `الجزء ${i + 1}` }))
    : surahs.map(s => ({ id: s.number, label: `${s.number}. سورة ${s.name}` }));

  const currentSurah = surahs.find(s => s.number === selectedId);
  const surahAyahCount = currentSurah ? currentSurah.numberOfAyahs : 0;

  // Reset range when selection changes
  useEffect(() => {
    if (selectionType === SelectionType.SURAH) {
      setRange({ from: 1, to: surahAyahCount });
    } else {
      setRange(undefined);
    }
  }, [selectedId, selectionType, surahAyahCount]);

  const handleRangeChange = (field: 'from' | 'to', value: string) => {
    const numVal = parseInt(value) || 0;
    setRange(prev => {
      if (!prev) return { from: 1, to: surahAyahCount };
      return { ...prev, [field]: numVal };
    });
  };

  const handleStart = () => {
    setIsLoading(true);
    let finalRange = range;

    if (selectionType === SelectionType.JUZ) {
      finalRange = undefined;
    }

    onStart(selectionType, selectedId, questionCount, finalRange);

    // Reset loading state if onStart doesn't unmount the component immediately
    // In this app, onStart changes the parent state which hides this component, so this might not be strictly necessary but good practice
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/20 border border-white/10 dark:border-white/5 max-w-2xl mx-auto transition-colors duration-500">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3 transition-colors">ابدأ رحلة المراجعة</h2>
          <p className="text-slate-500 dark:text-slate-400 transition-colors">اختر النطاق الذي تريد مراجعته بدقة</p>
        </div>

        <div className="space-y-8">
          {/* نوع الاختيار */}
          <div className="grid grid-cols-2 gap-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl transition-colors">
            <button
              onClick={() => setSelectionType(SelectionType.JUZ)}
              className={`py-3 px-6 rounded-xl text-sm font-bold transition-all duration-300 ${selectionType === SelectionType.JUZ
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
            >
              الأجزاء
            </button>
            <button
              onClick={() => setSelectionType(SelectionType.SURAH)}
              className={`py-3 px-6 rounded-xl text-sm font-bold transition-all duration-300 ${selectionType === SelectionType.SURAH
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
            >
              السور
            </button>
          </div>

          {/* القوائم المنسدلة */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-1 block transition-colors">
                {selectionType === SelectionType.JUZ ? 'اختر الجزء' : 'اختر السورة'}
              </label>
              <div className="relative group">
                <select
                  value={selectedId}
                  onChange={(e) => {
                    setSelectedId(Number(e.target.value));
                    setRange(undefined); // Reset range when selection changes
                  }}
                  className="w-full appearance-none bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-2xl py-4 px-5 pr-12 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium"
                >
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none group-hover:text-emerald-500 transition-colors" size={20} />
              </div>
            </div>

            {/* تحديد النطاق (يظهر فقط عند اختيار سورة) */}
            {selectionType === SelectionType.SURAH && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors">نطاق الآيات (اختياري)</label>
                  <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md transition-colors">
                    عدد آيات السورة: {surahAyahCount}
                  </span>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="relative flex-1 group">
                    <input
                      type="number"
                      min="1"
                      max={surahAyahCount}
                      placeholder="من"
                      value={range?.from || ''}
                      onChange={(e) => handleRangeChange('from', e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-2xl py-4 px-5 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-center placeholder:text-slate-300 dark:placeholder:text-slate-600"
                    />
                  </div>
                  <span className="text-slate-300 dark:text-slate-600 font-bold">-</span>
                  <div className="relative flex-1 group">
                    <input
                      type="number"
                      min="1"
                      max={surahAyahCount}
                      placeholder="إلى"
                      value={range?.to || ''}
                      onChange={(e) => handleRangeChange('to', e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-2xl py-4 px-5 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-center placeholder:text-slate-300 dark:placeholder:text-slate-600"
                    />
                  </div>
                </div>
                {range && (range.from > range.to || range.to > surahAyahCount) && (
                  <p className="text-red-500 text-xs px-1 animate-in slide-in-from-top-1">
                    يرجى التأكد من صحة النطاق المدخل
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-1 block transition-colors">عدد الأسئلة</label>
              <div className="grid grid-cols-4 gap-3">
                {[5, 10, 15, 20].map((count) => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`py-3 rounded-xl font-bold text-sm border-2 transition-all duration-200 ${questionCount === count
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-200 dark:hover:border-emerald-800'
                      }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-200/50 dark:shadow-emerald-900/20 hover:shadow-2xl hover:shadow-emerald-200/50 dark:hover:shadow-emerald-900/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>ابدأ الاختبار</span>
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={24} />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-12 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 dark:border-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition-colors">
          <div className="bg-blue-500/20 text-blue-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={24} />
          </div>
          <h4 className="font-bold mb-1 text-white">تخصيص كامل</h4>
          <p className="text-sm text-emerald-100/60 dark:text-slate-400">اختر أي نطاق من الآيات ترغب في مراجعته</p>
        </div>
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 dark:border-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition-colors">
          <div className="bg-purple-500/20 text-purple-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={24} />
          </div>
          <h4 className="font-bold mb-1 text-white">تقييم ذاتي</h4>
          <p className="text-sm text-emerald-100/60 dark:text-slate-400">مقارنة حفظك بالنص القرآني الموثوق</p>
        </div>
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 dark:border-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition-colors">
          <div className="bg-amber-500/20 text-amber-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={24} />
          </div>
          <h4 className="font-bold mb-1 text-white">تغذية فورية</h4>
          <p className="text-sm text-emerald-100/60 dark:text-slate-400">معرفة الإجابة الصحيحة فوراً بعد كل سؤال</p>
        </div>
      </div>
    </div>
  );
};

export default SelectionScreen;
