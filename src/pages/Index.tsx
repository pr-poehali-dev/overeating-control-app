import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: Array<{
    emoji: string;
    label: string;
    description?: string;
  }>;
}

const questions: Question[] = [
  {
    id: 2,
    title: 'Питание и пищевые привычки',
    subtitle: 'Как часто ваш рацион включает в себя: много фруктов, много овощей, цельнозерновых продуктов, нежирных белков?',
    options: [
      { emoji: '📊', label: 'Редко или никогда' },
      { emoji: '📊', label: 'Иногда', description: '1-2 дня в неделю' },
      { emoji: '📊', label: 'Часто', description: '3-4 дня в неделю' },
      { emoji: '📊', label: 'Почти всегда', description: '5-7 дней в неделю' },
    ],
  },
  {
    id: 3,
    title: 'Физическая активность',
    subtitle: 'Как можно описать вашу физическую активность в течение недели?',
    options: [
      { emoji: '🛏️', label: 'Пассивная', description: 'Минимальный уровень физической активности' },
      { emoji: '🚶', label: 'Минимальная', description: 'Несколько тренировок в неделю' },
      { emoji: '🏃', label: 'Умеренно активная', description: 'Полноценный тренировочный процесс' },
      { emoji: '🏋️', label: 'Активная', description: 'Постоянный тренировочный процесс' },
    ],
  },
  {
    id: 4,
    title: 'Энергия, самочувствие и сон',
    subtitle: 'Как бы вы оценили свой уровень энергии, общее самочувствие и качество сна за последнюю неделю?',
    options: [
      { emoji: '😔', label: 'Плохо', description: 'Постоянная усталость, плохой сон, очень мало энергии каждый день' },
      { emoji: '😐', label: 'Удовлетворительно', description: 'Часто устаю, сон прерывистый, энергия снижена' },
      { emoji: '🙂', label: 'Хорошо', description: 'В основном бодр, сон удовлетворительный, энергия достаточна' },
      { emoji: '🤩', label: 'Отлично', description: 'Чувствую себя бодрым, хорошо сплю, полон энергии' },
    ],
  },
  {
    id: 5,
    title: 'Вес и его влияние на повседневную жизнь',
    subtitle: 'Как вы воспринимаете свой вес и насколько он влияет на ваш повседневный комфорт?',
    options: [
      { emoji: '😰', label: 'Серьёзная проблема', description: 'Вес сильно ограничивает мою жизнь и влияет на самочувствие' },
      { emoji: '😟', label: 'Значительный избыток', description: 'Часто вызывает дискомфорт и ограничения' },
      { emoji: '😊', label: 'Небольшой избыток', description: 'Иногда ощущается дискомфорт' },
      { emoji: '😌', label: 'Норма', description: 'Мой вес не мешает мне жить полноценно' },
    ],
  },
  {
    id: 6,
    title: 'Общая удовлетворенность жизнью',
    subtitle: 'Насколько вы в целом удовлетворены своей жизнью в настоящее время?',
    options: [
      { emoji: '😔', label: 'Неудовлетворённость' },
      { emoji: '😐', label: 'Нейтральное отношение' },
      { emoji: '🙂', label: 'Удовлетворённость' },
      { emoji: '🤩', label: 'Высокая удовлетворённость' },
    ],
  },
];

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [processingProgress, setProcessingProgress] = useState(0);

  const totalScreens = 8;
  const progressPercentage = (currentScreen / totalScreens) * 100;

  const handleStart = () => {
    setCurrentScreen(1);
  };

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
    
    if (currentScreen < 6) {
      setTimeout(() => {
        setCurrentScreen(currentScreen + 1);
      }, 300);
    } else {
      setCurrentScreen(7);
      simulateProcessing();
    }
  };

  const simulateProcessing = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setProcessingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentScreen(8);
        }, 500);
      }
    }, 100);
  };

  const calculateScore = () => {
    let total = 0;
    Object.values(answers).forEach(value => {
      total += value;
    });
    return total;
  };

  const handleViewResult = () => {
    setCurrentScreen(9);
  };

  if (currentScreen === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="180 220"
                  transform="rotate(-90 50 50)"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B6B" />
                    <stop offset="50%" stopColor="#FFD93D" />
                    <stop offset="100%" stopColor="#6BCB77" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold leading-tight">
              Проведём небольшой скрининг, чтобы понять{' '}
              <span className="text-primary">ваше текущее состояние</span>
            </h1>
          </div>

          <Button
            onClick={handleStart}
            className="w-full h-14 text-lg font-semibold rounded-full bg-primary hover:bg-primary/90"
          >
            Начнём!
          </Button>
        </div>
      </div>
    );
  }

  if (currentScreen === 7) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="flex justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(processingProgress / 100) * 377} 377`}
                  className="transition-all duration-300"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5B7FFF" />
                    <stop offset="100%" stopColor="#9B87F5" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{processingProgress}%</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Обрабатываем результат</h2>
          </div>

          <Card className="p-4 bg-primary/10 border-primary/20">
            <div className="flex gap-3">
              <span className="text-2xl">👆</span>
              <p className="text-sm leading-relaxed">
                <span className="font-semibold">Важно отметить, что этот инструмент не является диагностическим.</span>{' '}
                Его функция заключается в предварительной оценке, которая стимулирует самосознание и поощряет обращение к медицинским работникам
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (currentScreen === 8) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center animate-scale-in">
              <Icon name="Check" className="text-white" size={64} strokeWidth={3} />
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Готово</h2>
          </div>

          <Card className="p-4 bg-primary/10 border-primary/20">
            <div className="flex gap-3">
              <span className="text-2xl">👆</span>
              <p className="text-sm leading-relaxed">
                <span className="font-semibold">Важно отметить, что этот инструмент не является диагностическим.</span>{' '}
                Его функция заключается в предварительной оценке, которая стимулирует самосознание и поощряет обращение к медицинским работникам
              </p>
            </div>
          </Card>

          <Button
            onClick={handleViewResult}
            className="w-full h-14 text-lg font-semibold rounded-full bg-primary hover:bg-primary/90"
          >
            Узнать результат
          </Button>
        </div>
      </div>
    );
  }

  if (currentScreen === 9) {
    const score = calculateScore();
    const maxScore = questions.length * 3;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-500 flex flex-col items-center justify-between p-6">
        <div className="w-full max-w-md pt-12 pb-24 space-y-6 animate-fade-in">
          <Card className="p-6 bg-white shadow-xl rounded-3xl space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Ваш результат: <span className="text-red-600 font-bold text-lg">{score} баллов</span>
              </p>
              <div className="inline-block px-4 py-1.5 bg-red-600 text-white font-bold rounded-full text-sm">
                Высокий риск
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold leading-tight">
                Необходима комплексная оценка и поддержка
              </h2>

              <div className="space-y-2">
                <h3 className="font-bold text-base">Рекомендации:</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Ваши ответы указывают на значительные проблемы, которые могут существенно влиять на ваше здоровье и качество жизни.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Помните, что комплексные проблемы со здоровьем, такие как ожирение, являются заболеваниями, требующими профессионального медицинского подхода и напрямую влияют на продолжительность вашей жизни.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="w-full max-w-md pb-8">
          <Button
            onClick={() => setCurrentScreen(0)}
            className="w-full h-14 text-lg font-semibold rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          >
            Продолжить
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentScreen - 1];

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => currentScreen > 1 && setCurrentScreen(currentScreen - 1)}
              className="shrink-0"
            >
              <Icon name="ChevronLeft" size={24} />
            </Button>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>

      <div className="pt-20 pb-8 px-6">
        <div className="max-w-md mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">{currentQuestion.title}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {currentQuestion.subtitle}
            </p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Card
                key={index}
                className="p-4 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => handleAnswer(currentQuestion.id, index)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0">{option.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}