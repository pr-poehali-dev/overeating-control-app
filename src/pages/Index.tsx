import { useState } from 'react'

function Index() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const questions = [
    {
      id: 'nutrition',
      title: 'Питание и пищевые привычки',
      description: 'Как часто ваш рацион включает в себя: много фруктов, много овощей, цельнозерновых продуктов, нежирных белков?',
      icon: '🍌',
      options: [
        { value: 'rare', label: 'Редко или никогда', subtitle: '', bars: 1 },
        { value: 'sometimes', label: 'Иногда', subtitle: '1-2 дня в неделю', bars: 2 },
        { value: 'often', label: 'Часто', subtitle: '3-4 дня в неделю', bars: 3 },
        { value: 'always', label: 'Почти всегда', subtitle: '5-7 дней в неделю', bars: 4 }
      ]
    },
    {
      id: 'activity',
      title: 'Физическая активность',
      description: 'Как можно описать вашу физическую активность в течение недели?',
      icon: '🏃',
      options: [
        { value: 'passive', label: 'Пассивная', subtitle: 'Минимальный уровень физической активности', bars: 1 },
        { value: 'minimal', label: 'Минимальная', subtitle: 'Несколько тренировок в неделю', bars: 2 },
        { value: 'moderate', label: 'Умеренно активная', subtitle: 'Полноценный тренировочный процесс', bars: 3 },
        { value: 'active', label: 'Активная', subtitle: 'Постоянный тренировочный процесс', bars: 4 }
      ]
    },
    {
      id: 'sleep',
      title: 'Качество сна',
      description: 'Сколько часов в среднем вы спите каждую ночь?',
      icon: '😴',
      options: [
        { value: 'less5', label: 'Менее 5 часов', subtitle: '', bars: 1 },
        { value: '5-6', label: '5-6 часов', subtitle: '', bars: 2 },
        { value: '7-8', label: '7-8 часов', subtitle: '', bars: 3 },
        { value: 'more8', label: 'Более 8 часов', subtitle: '', bars: 4 }
      ]
    },
    {
      id: 'weight',
      title: 'Контроль веса',
      description: 'Как вы оцениваете свой текущий вес?',
      icon: '🧍',
      options: [
        { value: 'underweight', label: 'Недостаточный вес', subtitle: '', bars: 1 },
        { value: 'normal', label: 'Нормальный вес', subtitle: '', bars: 3 },
        { value: 'overweight', label: 'Избыточный вес', subtitle: '', bars: 2 },
        { value: 'obese', label: 'Ожирение', subtitle: '', bars: 1 }
      ]
    }
  ]

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentScreen === 0) {
      setCurrentScreen(1)
    } else if (currentScreen === 1) {
      setCurrentScreen(2)
    } else if (currentScreen === 2) {
      setCurrentScreen(3)
    } else if (currentScreen >= 3 && currentScreen < 3 + questions.length) {
      const questionIndex = currentScreen - 3
      if (questionIndex < questions.length - 1) {
        setCurrentScreen(currentScreen + 1)
      } else {
        setCurrentScreen(3 + questions.length)
      }
    }
  }

  const handleBack = () => {
    if (currentScreen > 3) {
      setCurrentScreen(currentScreen - 1)
    }
  }

  const getProgress = () => {
    if (currentScreen < 3) return 0
    const questionIndex = currentScreen - 3
    return ((questionIndex + 1) / questions.length) * 100
  }

  const calculateScore = () => {
    let totalScore = 0
    let maxScore = 0

    questions.forEach(q => {
      const answer = answers[q.id]
      const option = q.options.find(opt => opt.value === answer)
      if (option) {
        totalScore += option.bars
      }
      maxScore += 4
    })

    return Math.round((totalScore / maxScore) * 100)
  }

  if (currentScreen === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-between px-6 py-12 text-white">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-[80px] font-bold tracking-wider mb-8">PLAN</h1>
          <p className="text-xl text-center text-white/90 max-w-xs">
            Измени свою жизнь — построй свой план
          </p>
        </div>
        
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={handleNext}
            className="w-full bg-white text-black font-semibold py-4 rounded-full text-lg hover:bg-gray-100 transition-colors"
          >
            Продолжить
          </button>
          <button className="w-full text-white font-medium py-4 text-lg">
            Авторизоваться
          </button>
        </div>
      </div>
    )
  }

  if (currentScreen === 1) {
    return (
      <div className="min-h-screen bg-white flex flex-col px-6 py-12">
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-8 leading-tight">
            На продолжительность вашей жизни каскадно влияют{' '}
            <span className="text-blue-500">4 элемента</span>:
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-2xl p-5 flex items-center gap-4">
              <span className="text-3xl">🏃</span>
              <span className="text-lg font-semibold">Ваша активность</span>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 flex items-center gap-4">
              <span className="text-3xl">🍌</span>
              <span className="text-lg font-semibold">Питание</span>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 flex items-center gap-4">
              <span className="text-3xl">😴</span>
              <span className="text-lg font-semibold">Сон</span>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 flex items-center gap-4">
              <span className="text-3xl">🧍</span>
              <span className="text-lg font-semibold">Умеренный вес</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-blue-500 text-white font-semibold py-4 rounded-full text-lg hover:bg-blue-600 transition-colors mt-8"
        >
          Как улучшить свою жизнь?
        </button>
      </div>
    )
  }

  if (currentScreen === 2) {
    return (
      <div className="min-h-screen bg-white flex flex-col px-6 py-12">
        <div className="flex-1 flex flex-col justify-center items-start">
          <div className="mb-12">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="20" stroke="url(#gradient)" strokeWidth="8" strokeLinecap="round" strokeDasharray="100 100" transform="rotate(-90 30 30)">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 30 30"
                  to="360 30 30"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFA500" />
                  <stop offset="50%" stopColor="#FF69B4" />
                  <stop offset="100%" stopColor="#FF6347" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h2 className="text-3xl font-bold mb-4 leading-tight">
            Проведём небольшой скрининг, чтобы понять{' '}
            <span className="text-blue-500">ваше текущее состояние</span>
          </h2>
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-blue-500 text-white font-semibold py-4 rounded-full text-lg hover:bg-blue-600 transition-colors"
        >
          Начнём!
        </button>
      </div>
    )
  }

  if (currentScreen >= 3 && currentScreen < 3 + questions.length) {
    const questionIndex = currentScreen - 3
    const currentQuestion = questions[questionIndex]
    const currentAnswer = answers[currentQuestion.id]

    return (
      <div className="min-h-screen bg-white flex flex-col px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={handleBack} className="text-gray-600 hover:text-gray-800">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-3">{currentQuestion.title}</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            {currentQuestion.description}
          </p>
        </div>

        <div className="flex-1 space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQuestion.id, option.value)}
              className={`w-full bg-gray-50 rounded-2xl p-5 flex items-start gap-4 text-left transition-all hover:bg-gray-100 ${
                currentAnswer === option.value ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
            >
              <div className="flex flex-col gap-0.5 mt-1">
                {Array.from({ length: option.bars }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-2 rounded-full ${
                      currentAnswer === option.value ? 'bg-blue-500' : 'bg-blue-400'
                    }`}
                  />
                ))}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg mb-0.5">{option.label}</div>
                {option.subtitle && (
                  <div className="text-sm text-gray-500">{option.subtitle}</div>
                )}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!currentAnswer}
          className="w-full bg-blue-500 text-white font-semibold py-4 rounded-full text-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-8"
        >
          Далее
        </button>
      </div>
    )
  }

  if (currentScreen === 3 + questions.length) {
    const score = calculateScore()
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-center px-6 py-12 text-white">
        <div className="text-center">
          <div className="text-8xl font-bold mb-4">{score}%</div>
          <h2 className="text-2xl font-semibold mb-2">Ваш результат</h2>
          <p className="text-lg text-white/90 mb-12">
            {score >= 75 ? 'Отличный результат! Продолжайте в том же духе.' :
             score >= 50 ? 'Хороший результат, но есть над чем поработать.' :
             score >= 25 ? 'Есть возможности для улучшения вашего образа жизни.' :
             'Рекомендуем уделить больше внимания своему здоровью.'}
          </p>

          <div className="space-y-4 mb-12">
            {questions.map((q) => {
              const answer = answers[q.id]
              const option = q.options.find(opt => opt.value === answer)
              return (
                <div key={q.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{q.icon}</span>
                    <span className="font-semibold">{q.title}</span>
                  </div>
                  <div className="text-sm text-white/80 ml-11">
                    {option?.label || 'Не указано'}
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={() => {
              setCurrentScreen(0)
              setAnswers({})
            }}
            className="w-full max-w-md bg-white text-blue-600 font-semibold py-4 rounded-full text-lg hover:bg-gray-100 transition-colors"
          >
            Пройти снова
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default Index
