import { useState } from 'react';
import { FileText, Baby, School, BookOpen, GraduationCap, Download, ArrowRight, ArrowLeft, Sparkles, Clock, FileCheck } from 'lucide-react';
import { generateWorksheet, generateElementaryWorksheet, generateGenericWorksheet } from '@/lib/worksheet';
import { ELEMENTARY_SUBJECTS } from '@/lib/elementaryQuestions';
import type { ElementarySubject } from '@/lib/elementaryQuestions';
import { JUNIOR_HIGH_SUBJECTS } from '@/lib/juniorHighQuestions';
import { SENIOR_HIGH_SUBJECTS } from '@/lib/seniorHighQuestions';
import { SPECIALIZED_TRACKS } from '@/lib/specializedQuestions';
import { getAppLogo, lsGet, lsSet } from '@/lib/storage';
import { t } from '@/lib/i18n';

type Level = 'preschool' | 'elementary' | 'juniorhigh' | 'seniorhigh' | 'specialized';

const LEVEL_CONFIGS: { id: Level; label: string; icon: React.ReactNode; color: string; desc: string }[] = [
  { id: 'preschool', label: t('quiz.preschool'), icon: <Baby size={28} className="text-white" />, color: 'from-candy-yellow to-candy-green', desc: 'Letters, Numbers, Colors, Shapes, Animals' },
  { id: 'elementary', label: t('quiz.elementary'), icon: <School size={28} className="text-white" />, color: 'from-candy-blue to-candy-purple', desc: 'Filipino, English, Math, Science, AP' },
  { id: 'juniorhigh', label: t('quiz.juniorhigh'), icon: <BookOpen size={28} className="text-white" />, color: 'from-green-500 to-teal-600', desc: 'Filipino, English, Math, Science, AP, TLE, MAPEH' },
  { id: 'seniorhigh', label: t('quiz.seniorhigh'), icon: <GraduationCap size={28} className="text-white" />, color: 'from-indigo-500 to-purple-600', desc: 'Core senior high subjects' },
  { id: 'specialized', label: t('quiz.specialized'), icon: <FileText size={28} className="text-white" />, color: 'from-rose-500 to-red-600', desc: 'STEM, HUMSS, ABM, GAS, TVL, Arts' },
];

const PRESCHOOL_CATEGORIES = ['Letters', 'Numbers', 'Colors', 'Shapes', 'Animals'] as const;

const SUBJECT_EMOJIS: Record<string, string> = {
  Filipino: '📖', English: '🔤', Math: '🔢', Science: '🔬', 'Aralin Panlipunan': '🗺️',
  TLE: '🔧', MAPEH: '🎨', 'Oral Communication': '🗣️', 'Komunikasyon at Pananaliksik': '📝',
  'General Mathematics': '📊', 'Statistics and Probability': '📈', 'Earth and Life Science': '🌍',
  'Physical Science': '⚗️', '21st Century Literature': '📚', 'Contemporary Philippine Arts': '🎭',
  STEM: '🔬', HUMSS: '🏛️', ABM: '💼', GAS: '📋', TVL: '🛠️', 'Arts and Design': '🎨',
};

export function Worksheets() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [childName, setChildName] = useState(localStorage.getItem('childName') ?? '');
  const [downloaded, setDownloaded] = useState<string | null>(null);
  const appLogo = getAppLogo();

  const handleDownload = (level: Level, subject: string) => {
    localStorage.setItem('childName', childName);
    if (level === 'preschool') {
      generateWorksheet(subject as any, childName);
    } else if (level === 'elementary') {
      generateElementaryWorksheet(subject as ElementarySubject, childName);
    } else {
      generateGenericWorksheet(subject, childName);
    }
    setDownloaded(subject);
    const wsList = lsGet<string[]>('worksheetsDownloaded', []);
    if (!wsList.includes(subject)) {
      wsList.push(subject);
      lsSet('worksheetsDownloaded', wsList);
    }
    setTimeout(() => setDownloaded(null), 2000);
  };

  const getSubjects = (level: Level): readonly string[] => {
    switch (level) {
      case 'preschool': return PRESCHOOL_CATEGORIES;
      case 'elementary': return ELEMENTARY_SUBJECTS;
      case 'juniorhigh': return JUNIOR_HIGH_SUBJECTS;
      case 'seniorhigh': return SENIOR_HIGH_SUBJECTS;
      case 'specialized': return SPECIALIZED_TRACKS;
    }
  };

  const getSubjectCount = (level: Level): number => getSubjects(level).length;

  return (
    <div className="min-h-screen pb-28">
      {/* Header with logo */}
      <div className="bg-gradient-to-br from-candy-green via-teal-500 to-candy-mint px-5 pt-10 pb-8 rounded-b-[2.5rem] shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 shrink-0 rounded-2xl bg-white shadow-lg overflow-hidden flex items-center justify-center">
            {appLogo
              ? <img src={appLogo} alt="Ready PH logo" className="block w-full h-full object-contain" />
              : <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] font-bold text-center px-1 leading-tight">Ready PH</div>}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2"><FileText size={24} /> {t('worksheets.title')}</h1>
            <p className="text-white/80 text-sm">{t('worksheets.subtitle')}</p>
          </div>
        </div>

        {/* Name input — wider */}
        <div className="bg-white/25 backdrop-blur rounded-2xl px-4 py-3">
          <label className="text-white/90 text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
            <FileCheck size={12} /> {t('worksheets.name_label')}
          </label>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder={t('worksheets.name_placeholder')}
            className="w-full bg-white/90 rounded-xl px-4 py-2.5 text-base text-gray-700 font-bold outline-none placeholder:text-gray-300 placeholder:font-normal"
          />
        </div>
      </div>

      <div className="px-4 mt-4 max-w-4xl mx-auto">
        {/* Level selection */}
        {!selectedLevel && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2 px-1">
              <Sparkles size={16} className="text-candy-green" />
              <p className="text-sm font-bold text-gray-600">{t('worksheets.choose_level')}</p>
            </div>
            {LEVEL_CONFIGS.map((cfg, i) => (
              <button
                key={cfg.id}
                onClick={() => setSelectedLevel(cfg.id)}
                className={`w-full bg-gradient-to-br ${cfg.color} rounded-3xl p-5 shadow-lg active:scale-95 transition text-left animate-slide-up hover:shadow-xl`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/30 backdrop-blur rounded-2xl p-3">{cfg.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-lg">{cfg.label}</p>
                    <p className="text-white/70 text-xs truncate">{cfg.desc}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="bg-white/25 rounded-full px-2 py-0.5 text-white/90 text-[10px] font-bold">{getSubjectCount(cfg.id)} {t('worksheets.subjects_count')}</span>
                    </div>
                  </div>
                  <ArrowRight size={24} className="text-white/70 flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Subject selection */}
        {selectedLevel && (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedLevel(null)}
              className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 font-bold text-gray-600 text-sm shadow active:scale-95 transition"
            >
              <ArrowLeft size={16} /> {t('quiz.back')}
            </button>

            <div className="flex items-center gap-2 px-1">
              <span className="text-2xl">{LEVEL_CONFIGS.find(c => c.id === selectedLevel)?.icon}</span>
              <div>
                <h2 className="font-bold text-base text-gray-700">{LEVEL_CONFIGS.find(c => c.id === selectedLevel)?.label}</h2>
                <p className="text-xs text-gray-400">{t('worksheets.choose_subject')}</p>
              </div>
            </div>

            {/* Subject cards — responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {getSubjects(selectedLevel).map((subj, i) => (
                <button
                  key={subj}
                  onClick={() => handleDownload(selectedLevel, subj)}
                  className={`group bg-white rounded-2xl p-4 shadow-lg active:scale-95 transition text-left flex items-center gap-3 animate-slide-up hover:shadow-xl border-2 ${downloaded === subj ? 'border-candy-green' : 'border-transparent'}`}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-candy-green/10 to-candy-mint/20 flex items-center justify-center text-2xl flex-shrink-0">
                    {SUBJECT_EMOJIS[subj] ?? '📄'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-700 text-sm">{subj}</p>
                    <p className="text-gray-400 text-xs flex items-center gap-1">
                      {downloaded === subj ? (
                        <><FileCheck size={10} className="text-candy-green" /> <span className="text-candy-green font-bold">{t('worksheets.downloaded')}</span></>
                      ) : (
                        <><Download size={10} /> {t('worksheets.download')}</>
                      )}
                    </p>
                  </div>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition flex-shrink-0 ${downloaded === subj ? 'bg-candy-green' : 'bg-candy-green/10 group-hover:bg-candy-green/20'}`}>
                    {downloaded === subj
                      ? <FileCheck size={16} className="text-white" />
                      : <Download size={16} className="text-candy-green" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Info card */}
            <div className="bg-gradient-to-br from-candy-green/10 to-candy-mint/10 rounded-2xl p-4 mt-4 flex items-start gap-3">
              <Clock size={18} className="text-candy-green flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-gray-600">{t('worksheets.info_title')}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t('worksheets.info_desc')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
