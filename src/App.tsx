import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Dumbbell, 
  BarChart2, 
  ChevronRight, 
  Play, 
  ArrowLeft, 
  CheckCircle2, 
  Timer,
  Flame,
  Zap,
  Clock
} from 'lucide-react';
import { Gender, MuscleGroup, WORKOUT_PLANS, Exercise } from './types';

// --- Components ---

const GenderSelection = ({ onSelect }: { onSelect: (g: Gender) => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex flex-col items-center justify-center min-h-screen p-6 bg-stone-50"
  >
    <h1 className="text-4xl font-bold mb-2 text-stone-900">Selamat Datang</h1>
    <p className="text-stone-500 mb-12 text-center">Pilih jenis kelamin Anda untuk memulai perjalanan kebugaran</p>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
      <button 
        onClick={() => onSelect('male')}
        className="group relative flex flex-col items-center p-8 bg-white rounded-3xl shadow-sm border border-stone-200 hover:border-emerald-500 transition-all active:scale-95"
      >
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
          <User className="w-10 h-10 text-blue-600" />
        </div>
        <span className="text-xl font-semibold text-stone-800">Laki-laki</span>
      </button>
      
      <button 
        onClick={() => onSelect('female')}
        className="group relative flex flex-col items-center p-8 bg-white rounded-3xl shadow-sm border border-stone-200 hover:border-pink-500 transition-all active:scale-95"
      >
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-pink-100 transition-colors">
          <User className="w-10 h-10 text-pink-600" />
        </div>
        <span className="text-xl font-semibold text-stone-800">Perempuan</span>
      </button>
    </div>
  </motion.div>
);

const MuscleGroupSelection = ({ onSelect, onBack }: { onSelect: (m: MuscleGroup) => void, onBack: () => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="flex flex-col min-h-screen p-6 bg-stone-50"
  >
    <button onClick={onBack} className="mb-8 p-2 w-fit rounded-full hover:bg-stone-200 transition-colors">
      <ArrowLeft className="w-6 h-6 text-stone-600" />
    </button>
    
    <h2 className="text-3xl font-bold mb-2 text-stone-900">Target Otot</h2>
    <p className="text-stone-500 mb-8">Pilih bagian tubuh yang ingin Anda latih hari ini</p>
    
    <div className="space-y-4">
      {(['arms', 'abs', 'legs'] as MuscleGroup[]).map((group) => (
        <button 
          key={group}
          onClick={() => onSelect(group)}
          className="w-full flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-stone-200 hover:border-emerald-500 transition-all group active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <Dumbbell className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-left">
              <span className="block text-lg font-bold text-stone-800 capitalize">
                {group === 'arms' ? 'Lengan' : group === 'abs' ? 'Perut' : 'Kaki'}
              </span>
              <span className="text-sm text-stone-500">{WORKOUT_PLANS[group].exercises.length} Latihan</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-emerald-500 transition-colors" />
        </button>
      ))}
    </div>
  </motion.div>
);

const DurationSelection = ({ onSelect, onBack }: { onSelect: (d: number) => void, onBack: () => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="flex flex-col items-center justify-center min-h-screen p-6 bg-stone-50"
  >
    <button onClick={onBack} className="absolute top-6 left-6 p-2 rounded-full hover:bg-stone-200 transition-colors">
      <ArrowLeft className="w-6 h-6 text-stone-600" />
    </button>
    
    <h2 className="text-3xl font-bold mb-2 text-stone-900">Pilih Durasi</h2>
    <p className="text-stone-500 mb-12 text-center">Berapa lama Anda ingin melakukan setiap gerakan?</p>
    
    <div className="grid grid-cols-1 gap-4 w-full max-w-xs">
      {[60, 120, 180].map((duration) => (
        <button 
          key={duration}
          onClick={() => onSelect(duration)}
          className="group flex items-center justify-between p-6 bg-white rounded-3xl shadow-sm border border-stone-200 hover:border-emerald-500 transition-all active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <Timer className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xl font-bold text-stone-800">{duration / 60} Menit</span>
          </div>
          <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-emerald-500 transition-colors" />
        </button>
      ))}
    </div>
  </motion.div>
);

const WorkoutExecution = ({ group, duration, onComplete, onBack }: { group: MuscleGroup, duration: number, onComplete: () => void, onBack: () => void, key?: string }) => {
  const plan = WORKOUT_PLANS[group];
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentExercise = plan.exercises[currentExerciseIndex];

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Speak exercise name and description on start
    speak(`Gerakan selanjutnya: ${currentExercise.name}. ${currentExercise.description}`);
  }, [currentExerciseIndex]);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleNext();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleNext = () => {
    if (currentExerciseIndex < plan.exercises.length - 1) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      setTimeLeft(duration);
      setIsActive(false);
    } else {
      setIsFinished(true);
      setIsActive(false);
      speak('Latihan selesai. Kerja bagus!');
    }
  };

  if (isFinished) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen p-6 bg-emerald-600 text-white text-center"
      >
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-2">Latihan Selesai!</h2>
        <p className="text-emerald-100 mb-12">Kerja bagus! Anda selangkah lebih dekat ke tujuan Anda.</p>
        
        <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-12">
          <div className="bg-white/10 p-4 rounded-2xl">
            <span className="block text-2xl font-bold">15</span>
            <span className="text-xs text-emerald-200 uppercase tracking-wider">Menit</span>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl">
            <span className="block text-2xl font-bold">120</span>
            <span className="text-xs text-emerald-200 uppercase tracking-wider">Kkal</span>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl">
            <span className="block text-2xl font-bold">3</span>
            <span className="text-xs text-emerald-200 uppercase tracking-wider">Latihan</span>
          </div>
        </div>
        
        <button 
          onClick={onComplete}
          className="w-full max-w-xs py-4 bg-white text-emerald-600 font-bold rounded-2xl shadow-lg active:scale-95 transition-transform"
        >
          Kembali ke Beranda
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="relative h-[55vh] overflow-hidden bg-stone-100">
        <motion.img 
          key={currentExercise.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={currentExercise.image} 
          alt={currentExercise.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
        
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 p-3 bg-white/90 backdrop-blur-md rounded-full text-stone-800 shadow-lg hover:bg-white transition-all active:scale-90 z-10"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        {isSpeaking && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-6 right-6 flex items-center gap-3 bg-emerald-500 text-white px-5 py-2.5 rounded-full shadow-xl z-10"
          >
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-white animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1 h-3 bg-white animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1 h-3 bg-white animate-bounce" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Instruksi Suara</span>
          </motion.div>
        )}
      </div>

      <div className="relative -mt-20 flex-1 flex flex-col bg-white rounded-t-[40px] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] p-8 z-20">
        <div className="mb-8">
          <h3 className="text-4xl font-black text-stone-900 mb-3 tracking-tight">{currentExercise.name}</h3>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 w-fit px-3 py-1 rounded-lg mb-4">
            <Zap className="w-4 h-4 fill-current" />
            <span>Teknik Profesional</span>
          </div>
          <p className="text-stone-500 text-base leading-relaxed font-medium">
            {currentExercise.description}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-44 h-44 flex items-center justify-center mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="82"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-stone-100"
              />
              <circle
                cx="88"
                cy="88"
                r="82"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 82}
                strokeDashoffset={2 * Math.PI * 82 * (1 - timeLeft / duration)}
                className="text-emerald-500 transition-all duration-1000 stroke-round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-6xl font-black text-stone-900 tabular-nums">{timeLeft}</span>
              <span className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[10px]">Detik</span>
            </div>
          </div>

          <div className="flex gap-4 w-full max-w-sm">
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`flex-1 py-5 rounded-3xl font-black text-lg text-white shadow-2xl transition-all active:scale-95 ${isActive ? 'bg-stone-900 shadow-stone-200' : 'bg-emerald-500 shadow-emerald-200'}`}
            >
              {isActive ? 'Jeda Latihan' : 'Mulai Sekarang'}
            </button>
            <button 
              onClick={handleNext}
              className="px-8 py-5 bg-stone-100 text-stone-600 rounded-3xl font-black hover:bg-stone-200 transition-all active:scale-95"
            >
              Lewati
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-1">Progres Latihan</span>
              <span className="text-lg font-black text-stone-900">{currentExerciseIndex + 1} <span className="text-stone-300">/</span> {plan.exercises.length}</span>
            </div>
            <div className="flex gap-2">
              {plan.exercises.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2 rounded-full transition-all duration-500 ${idx === currentExerciseIndex ? 'w-12 bg-emerald-500' : idx < currentExerciseIndex ? 'w-3 bg-emerald-200' : 'w-3 bg-stone-100'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportView = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col min-h-screen p-6 bg-stone-50 pb-24"
  >
    <h2 className="text-3xl font-bold mb-6 text-stone-900">Laporan Saya</h2>
    
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
          <Flame className="w-5 h-5 text-orange-500" />
        </div>
        <span className="block text-2xl font-bold text-stone-900">1,240</span>
        <span className="text-sm text-stone-500">Kalori Terbakar</span>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
          <Clock className="w-5 h-5 text-blue-500" />
        </div>
        <span className="block text-2xl font-bold text-stone-900">4.5</span>
        <span className="text-sm text-stone-500">Jam Latihan</span>
      </div>
    </div>

    <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-stone-800">Aktivitas Mingguan</h3>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
      </div>
      <div className="flex items-end justify-between h-32 gap-2">
        {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className={`w-full rounded-t-lg transition-all duration-500 ${i === 3 ? 'bg-emerald-500' : 'bg-stone-200'}`} 
              style={{ height: `${height}%` }} 
            />
            <span className="text-[10px] text-stone-400 font-bold uppercase">{['S', 'S', 'R', 'K', 'J', 'S', 'M'][i]}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="font-bold text-stone-800">Pencapaian</h3>
      <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-stone-100">
        <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
          <Zap className="w-6 h-6 text-yellow-500" />
        </div>
        <div>
          <span className="block font-bold text-stone-800">7 Hari Beruntun</span>
          <span className="text-xs text-stone-500">Anda telah berlatih selama seminggu penuh!</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const BottomNav = ({ activeTab, onTabChange }: { activeTab: 'workout' | 'report', onTabChange: (t: 'workout' | 'report') => void }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-stone-100 px-6 py-4 flex justify-around items-center z-50">
    <button 
      onClick={() => onTabChange('workout')}
      className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'workout' ? 'text-emerald-600' : 'text-stone-400'}`}
    >
      <Dumbbell className="w-6 h-6" />
      <span className="text-[10px] font-bold uppercase tracking-wider">Latihan</span>
    </button>
    <button 
      onClick={() => onTabChange('report')}
      className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'report' ? 'text-emerald-600' : 'text-stone-400'}`}
    >
      <BarChart2 className="w-6 h-6" />
      <span className="text-[10px] font-bold uppercase tracking-wider">Laporan</span>
    </button>
  </div>
);

// --- Main App ---

export default function App() {
  const [step, setStep] = useState<'onboarding' | 'selection' | 'duration' | 'workout' | 'main'>('onboarding');
  const [gender, setGender] = useState<Gender | null>(null);
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup | null>(null);
  const [duration, setDuration] = useState<number>(60);
  const [activeTab, setActiveTab] = useState<'workout' | 'report'>('workout');

  const handleGenderSelect = (g: Gender) => {
    setGender(g);
    setStep('selection');
  };

  const handleMuscleSelect = (m: MuscleGroup) => {
    setMuscleGroup(m);
    setStep('duration');
  };

  const handleDurationSelect = (d: number) => {
    setDuration(d);
    setStep('workout');
  };

  const handleWorkoutComplete = () => {
    setStep('main');
    setActiveTab('report');
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      <AnimatePresence mode="wait">
        {step === 'onboarding' && (
          <GenderSelection key="onboarding" onSelect={handleGenderSelect} />
        )}
        
        {step === 'selection' && (
          <MuscleGroupSelection 
            key="selection" 
            onSelect={handleMuscleSelect} 
            onBack={() => setStep('onboarding')} 
          />
        )}

        {step === 'duration' && (
          <DurationSelection 
            key="duration"
            onSelect={handleDurationSelect}
            onBack={() => setStep('selection')}
          />
        )}
        
        {step === 'workout' && muscleGroup && (
          <WorkoutExecution 
            key="workout" 
            group={muscleGroup} 
            duration={duration}
            onComplete={handleWorkoutComplete}
            onBack={() => setStep('duration')}
          />
        )}
        
        {step === 'main' && (
          <div key="main" className="min-h-screen">
            {activeTab === 'workout' ? (
              <MuscleGroupSelection 
                onSelect={handleMuscleSelect} 
                onBack={() => setStep('onboarding')} 
              />
            ) : (
              <ReportView />
            )}
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
