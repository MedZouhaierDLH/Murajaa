import React, { useState, useEffect, useCallback } from 'react';
import { QuranService } from './services/quranService';
import { HistoryService } from './services/historyService';
import { Ayah, QuizQuestion, QuizStatus, SelectionType, TestResult, QuestionResult } from './types';
import SelectionScreen from './components/SelectionScreen';
import QuizScreen from './components/QuizScreen';
import ResultsSummary from './components/ResultsSummary';
import LandingPage from './components/LandingPage';
import HistoryScreen from './components/HistoryScreen';
import TestDetailsScreen from './components/TestDetailsScreen';
import { BookOpen, GraduationCap, Github, Moon, Sun, History } from 'lucide-react';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [status, setStatus] = useState<QuizStatus>('IDLE');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // History state
  const [history, setHistory] = useState<TestResult[]>([]);
  const [selectedTest, setSelectedTest] = useState<TestResult | null>(null);

  // Current test info for saving
  const [currentSelection, setCurrentSelection] = useState<{ type: SelectionType, id: number } | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Load history on mount
  useEffect(() => {
    setHistory(HistoryService.getHistory());
  }, []);

  const startQuiz = async (type: SelectionType, id: number, count: number, range?: { from: number; to: number }) => {
    setLoading(true);
    setCurrentSelection({ type, id });
    try {
      let ayahs: Ayah[] = [];
      if (type === SelectionType.JUZ) {
        ayahs = await QuranService.getJuz(id);
      } else {
        ayahs = await QuranService.getSurah(id);
        // تصفية الآيات بناءً على النطاق المختار إذا كان متوفراً
        if (range) {
          ayahs = ayahs.filter(a => a.numberInSurah >= range.from && a.numberInSurah <= range.to);
        }
      }

      const generated: QuizQuestion[] = [];
      const usedIndices = new Set<number>();

      // نحتاج لآيتين على الأقل لإنشاء سؤال واحد (قبل/بعد)
      if (ayahs.length < 2) {
        alert("النطاق المختار صغير جداً، يرجى اختيار آيتين على الأقل.");
        setLoading(false);
        return;
      }

      // توليد أسئلة عشوائية فريدة
      const maxPossibleQuestions = ayahs.length - 1;
      const finalCount = Math.min(count, maxPossibleQuestions);

      let attempts = 0;
      while (generated.length < finalCount && attempts < 100) {
        attempts++;
        const randomIndex = Math.floor(Math.random() * ayahs.length);
        if (usedIndices.has(randomIndex)) continue;

        const quizType = Math.random() > 0.5 ? 'NEXT' : 'PREVIOUS';

        if (quizType === 'NEXT' && randomIndex < ayahs.length - 1) {
          generated.push({
            type: 'NEXT',
            referenceAyah: ayahs[randomIndex],
            targetAyah: ayahs[randomIndex + 1]
          });
          usedIndices.add(randomIndex);
        } else if (quizType === 'PREVIOUS' && randomIndex > 0) {
          generated.push({
            type: 'PREVIOUS',
            referenceAyah: ayahs[randomIndex],
            targetAyah: ayahs[randomIndex - 1]
          });
          usedIndices.add(randomIndex);
        }
      }

      setQuestions(generated);
      setScore(0);
      setStatus('ACTIVE');
    } catch (error) {
      alert("حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const finishQuiz = (finalScore: number, results: QuestionResult[]) => {
    setScore(finalScore);
    setStatus('FINISHED');

    // Save to history
    if (currentSelection) {
      const newResult: TestResult = {
        id: crypto.randomUUID(),
        date: Date.now(),
        type: currentSelection.type,
        selectionId: currentSelection.id,
        score: finalScore,
        totalQuestions: questions.length,
        results: results
      };
      HistoryService.saveTest(newResult);
      setHistory(HistoryService.getHistory()); // Refresh history
    }
  };

  const reset = () => {
    setStatus('IDLE');
    setQuestions([]);
    setScore(0);
    setCurrentSelection(null);
  };

  const showHistory = () => {
    setHistory(HistoryService.getHistory());
    setStatus('HISTORY');
  };

  const showTestDetails = (test: TestResult) => {
    setSelectedTest(test);
    setStatus('DETAILS');
  };

  const deleteTest = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الاختبار من السجل؟')) {
      HistoryService.deleteTest(id);
      setHistory(HistoryService.getHistory());
    }
  };

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-black'
        : 'bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900'
      }`} dir="rtl">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl transition-colors duration-500 ${isDarkMode ? 'bg-blue-500/5' : 'bg-emerald-500/10'
          }`}></div>
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl transition-colors duration-500 ${isDarkMode ? 'bg-purple-500/5' : 'bg-teal-500/10'
          }`}></div>
      </div>

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={reset}>
            <div className="bg-white/10 p-2 rounded-xl text-emerald-300 shadow-lg border border-white/10 group-hover:bg-white/20 transition-colors">
              <BookOpen size={24} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              مُرَاجَعَة
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={showHistory}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
              title="سجل الاختبارات"
            >
              <History size={20} />
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
              title={isDarkMode ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="flex items-center gap-2 text-emerald-100/80 hidden sm:flex">
              <GraduationCap size={20} />
              <span className="font-medium text-sm">تطبيق مراجعة الحفظ</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin"></div>
            <p className="text-emerald-100 font-medium">جاري تحضير أسئلة الاختبار...</p>
          </div>
        ) : status === 'IDLE' ? (
          <SelectionScreen onStart={startQuiz} />
        ) : status === 'ACTIVE' ? (
          <QuizScreen questions={questions} onFinish={finishQuiz} onQuit={reset} />
        ) : status === 'FINISHED' ? (
          <ResultsSummary score={score} total={questions.length} onReset={reset} />
        ) : status === 'HISTORY' ? (
          <HistoryScreen
            history={history}
            onViewDetails={showTestDetails}
            onDelete={deleteTest}
            onBack={reset}
          />
        ) : status === 'DETAILS' && selectedTest ? (
          <TestDetailsScreen test={selectedTest} onBack={showHistory} />
        ) : null}
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/5 py-6 text-center relative z-10">
        <p className="text-emerald-200/60 text-sm">
          تم التصميم لمساعدة المسلمين على تثبيت حفظ كتاب الله.
        </p>
      </footer>
    </div>
  );
};

export default App;
