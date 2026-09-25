import { useState } from 'react'
import tobyImg from './imports/t1.jpg'
import tatyanImg from './imports/a011.jpg'

type Screen = 'welcome' | 'create' | 'main' | 'budget' | 'savings'

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div
        style={{
          width: 360,
          height: 800,
          borderRadius: 36,
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(33,150,243,0.25), 0 8px 32px rgba(0,0,0,0.18)',
          border: '6px solid #1a1a2e',
          position: 'relative',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Status bar */}
        <div style={{
          background: 'white',
          height: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          flexShrink: 0,
          fontSize: 11,
          fontWeight: 700,
          color: '#333',
        }}>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span>📶</span><span>🔋</span>
          </div>
        </div>
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Shared button ──────────────────────────────────────────────
function BigBtn({
  label,
  onClick,
  color = '#2196F3',
  textColor = 'white',
  small = false,
}: {
  label: string
  onClick: () => void
  color?: string
  textColor?: string
  small?: boolean
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: color,
        color: textColor,
        borderRadius: 18,
        padding: small ? '12px 20px' : '16px 24px',
        fontSize: small ? 15 : 18,
        fontWeight: 800,
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        boxShadow: `0 4px 14px ${color}55`,
        transition: 'transform 0.1s, box-shadow 0.1s',
        minHeight: 52,
        letterSpacing: 0.2,
      }}
      onPointerDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
      onPointerUp={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {label}
    </button>
  )
}

// ── SCREEN 1 — Welcome ─────────────────────────────────────────
function WelcomeScreen({ next }: { next: () => void }) {
  return (
    <div style={{ flex: 1, background: 'white', display: 'flex', flexDirection: 'column', padding: '20px 20px 28px' }}>
      {/* Top accent blob */}
      <div style={{
        background: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
        borderRadius: '0 0 40px 40px',
        margin: '-20px -20px 0',
        padding: '28px 24px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <img
          src={tobyImg}
          alt="Тоби"
          style={{ width: 110, height: 110, objectFit: 'contain', filter: 'brightness(0) invert(1)', borderRadius: 24 }}
        />
        <h1 style={{ fontSize: 28, fontWeight: 900, color: 'white', margin: 0, textAlign: 'center', lineHeight: 1.2 }}>
          Привет! Я Тоби 🐕
        </h1>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', margin: 0, textAlign: 'center', lineHeight: 1.4 }}>
          Давай учиться управлять монетками вместе!
        </p>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, paddingTop: 24 }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: '#444', margin: '0 0 4px', textAlign: 'center' }}>
          Что мы изучим:
        </p>

        <InfoCard
          emoji="🍖"
          title="Обязательные расходы"
          subtitle="Еда, вода и уход"
          bg="#E3F2FD"
          accent="#2196F3"
        />
        <InfoCard
          emoji="🎮"
          title="Желания"
          subtitle="Игрушки и развлечения"
          bg="#FFF3E0"
          accent="#FF9800"
        />
        <InfoCard
          emoji="🐷"
          title="Накопления"
          subtitle="На большую мечту"
          bg="#E8F5E9"
          accent="#4CAF50"
        />
      </div>

      <BigBtn label="🚀 Начать" onClick={next} color="#2196F3" />
    </div>
  )
}

function InfoCard({ emoji, title, subtitle, bg, accent }: {
  emoji: string; title: string; subtitle: string; bg: string; accent: string
}) {
  return (
    <div style={{
      background: bg,
      borderRadius: 18,
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      border: `2px solid ${accent}33`,
    }}>
      <span style={{ fontSize: 30, lineHeight: 1 }}>{emoji}</span>
      <div>
        <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#222' }}>{title}</p>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#666' }}>{subtitle}</p>
      </div>
    </div>
  )
}

// ── SCREEN 2 — Create Pet ──────────────────────────────────────
function CreateScreen({ next }: { next: () => void }) {
  const [name, setName] = useState('Тоби')
  const [petType, setPetType] = useState(0)
  const [color, setColor] = useState(0)

  const pets = ['🐕 Щенок', '🐱 Котёнок', '🐹 Хомячок']
  const colors = ['🟠 Рыжий', '⚪ Серый', '⚫ Чёрный']

  return (
    <div style={{ flex: 1, background: 'white', display: 'flex', flexDirection: 'column', padding: '20px 20px 28px', gap: 18 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 130, height: 130,
          borderRadius: 32,
          background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 20px #2196F340',
          border: '3px solid #90CAF9',
        }}>
          <img src={tobyImg} alt="Тоби" style={{ width: 105, height: 105, objectFit: 'contain' }} />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1a1a2e', margin: 0, textAlign: 'center' }}>
          Как назовёшь питомца?
        </h1>
      </div>

      {/* Name input */}
      <div>
        <label style={{ fontSize: 14, fontWeight: 700, color: '#888', marginBottom: 6, display: 'block' }}>
          Имя питомца
        </label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Имя питомца"
          style={{
            width: '100%', boxSizing: 'border-box',
            borderRadius: 14, border: '2.5px solid #2196F380',
            padding: '14px 16px', fontSize: 18, fontWeight: 700,
            color: '#222', outline: 'none',
            background: '#F5F9FF',
            fontFamily: 'Nunito, sans-serif',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = '#2196F3')}
          onBlur={e => (e.currentTarget.style.borderColor = '#2196F380')}
        />
      </div>

      {/* Pet type */}
      <div>
        <label style={{ fontSize: 14, fontWeight: 700, color: '#888', marginBottom: 8, display: 'block' }}>
          Вид питомца
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          {pets.map((p, i) => (
            <button
              key={i}
              onClick={() => setPetType(i)}
              style={{
                flex: 1, borderRadius: 14, padding: '10px 4px',
                fontSize: 13, fontWeight: 800,
                border: `2.5px solid ${petType === i ? '#2196F3' : '#e0e0e0'}`,
                background: petType === i ? '#E3F2FD' : '#fafafa',
                color: petType === i ? '#2196F3' : '#666',
                cursor: 'pointer',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <label style={{ fontSize: 14, fontWeight: 700, color: '#888', marginBottom: 8, display: 'block' }}>
          Цвет питомца
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          {colors.map((c, i) => (
            <button
              key={i}
              onClick={() => setColor(i)}
              style={{
                flex: 1, borderRadius: 14, padding: '10px 4px',
                fontSize: 13, fontWeight: 800,
                border: `2.5px solid ${color === i ? '#FF9800' : '#e0e0e0'}`,
                background: color === i ? '#FFF3E0' : '#fafafa',
                color: color === i ? '#E65100' : '#666',
                cursor: 'pointer',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <BigBtn label={`✅ Готово — это ${name || 'Тоби'}!`} onClick={next} color="#4CAF50" />
    </div>
  )
}

// ── SCREEN 3 — Main Screen ─────────────────────────────────────
function MainScreen({ next, nextBudget, nextSavings }: {
  next: () => void; nextBudget: () => void; nextSavings: () => void
}) {
  return (
    <div style={{ flex: 1, background: '#F8FAFF', display: 'flex', flexDirection: 'column', padding: '16px 16px 24px', gap: 12, overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#888' }}>Мой питомец</p>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: '#1a1a2e' }}>Тоби 🐕</h2>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #2196F3, #42A5F5)',
          borderRadius: 14, padding: '6px 12px',
          fontSize: 13, fontWeight: 800, color: 'white',
        }}>
          Ур. 1
        </div>
      </div>

      {/* Pet image */}
      <div style={{
        background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
        borderRadius: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px 0',
        border: '2px solid #90CAF950',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -15, right: -15, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
        <img src={tobyImg} alt="Тоби" style={{ width: 120, height: 120, objectFit: 'contain' }} />
        <div style={{ position: 'absolute', bottom: 10, right: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1565C0', background: 'rgba(255,255,255,0.8)', borderRadius: 10, padding: '3px 8px' }}>
            😊 Настроение: отличное
          </span>
        </div>
      </div>

      {/* Balance cards */}
      <div style={{ display: 'flex', gap: 10 }}>
        <StatCard emoji="💰" label="Баланс" value="100 монет" bg="linear-gradient(135deg, #43A047, #66BB6A)" />
        <StatCard emoji="🐷" label="Накопления" value="0 монет" bg="linear-gradient(135deg, #FB8C00, #FFA726)" />
      </div>

      {/* Navigation buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <NavBtn emoji="📊" label="Бюджет" sublabel="Планируй расходы" color="#2196F3" onClick={nextBudget} />
        <NavBtn emoji="📝" label="Задания" sublabel="Зарабатывай монеты" color="#9C27B0" onClick={() => {}} />
        <NavBtn emoji="🛒" label="Покупки" sublabel="Трать с умом" color="#FF9800" onClick={() => {}} />
      </div>

      {/* Tatyana button */}
      <button
        onClick={nextSavings}
        style={{
          background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
          border: '2.5px solid #FF9800',
          borderRadius: 18, padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 12,
          cursor: 'pointer', width: '100%',
          fontFamily: 'Nunito, sans-serif',
        }}
        onPointerDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
        onPointerUp={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img src={tatyanImg} alt="Татьяна" style={{ width: 36, height: 36, objectFit: 'contain' }} />
        <div style={{ textAlign: 'left' }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#E65100' }}>🍍 Ананас Татьяна — копилка</p>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#FF9800' }}>Откладывай на мечту!</p>
        </div>
        <span style={{ marginLeft: 'auto', fontSize: 18, color: '#FF9800' }}>›</span>
      </button>
    </div>
  )
}

function StatCard({ emoji, label, value, bg }: { emoji: string; label: string; value: string; bg: string }) {
  return (
    <div style={{
      flex: 1, borderRadius: 20, padding: '14px 14px',
      background: bg, boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
    }}>
      <p style={{ margin: 0, fontSize: 22 }}>{emoji}</p>
      <p style={{ margin: '4px 0 2px', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{label}</p>
      <p style={{ margin: 0, fontSize: 16, fontWeight: 900, color: 'white' }}>{value}</p>
    </div>
  )
}

function NavBtn({ emoji, label, sublabel, color, onClick }: {
  emoji: string; label: string; sublabel: string; color: string; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'white', borderRadius: 18, padding: '14px 18px',
        display: 'flex', alignItems: 'center', gap: 14,
        cursor: 'pointer', width: '100%', border: `2px solid ${color}33`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        fontFamily: 'Nunito, sans-serif',
      }}
      onPointerDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
      onPointerUp={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <div style={{
        width: 46, height: 46, borderRadius: 14,
        background: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, flexShrink: 0,
      }}>
        {emoji}
      </div>
      <div style={{ textAlign: 'left' }}>
        <p style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#1a1a2e' }}>{label}</p>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#888' }}>{sublabel}</p>
      </div>
      <span style={{ marginLeft: 'auto', fontSize: 20, color: color, fontWeight: 700 }}>›</span>
    </button>
  )
}

// ── SCREEN 4 — Budget Planning ─────────────────────────────────
function BudgetScreen({ back }: { back: () => void }) {
  const [mandatory, setMandatory] = useState(40)
  const [optional, setOptional] = useState(30)
  const [savings, setSavings] = useState(30)

  const total = 100
  const used = mandatory + optional + savings
  const remaining = total - used

  function handleSlider(
    setter: (v: number) => void,
    val: number,
    other1: number,
    other2: number,
    _set1: (v: number) => void,
    _set2: (v: number) => void,
  ) {
    const max = total - other1 - other2
    setter(Math.min(val, max))
  }

  return (
    <div style={{ flex: 1, background: 'white', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2196F3, #42A5F5)',
        padding: '20px 20px 28px',
        borderRadius: '0 0 32px 32px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <button
            onClick={back}
            style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: 12, padding: '6px 10px', cursor: 'pointer', color: 'white', fontSize: 18, fontFamily: 'Nunito, sans-serif' }}
          >
            ←
          </button>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: 'white' }}>
            📊 Планирование бюджета
          </h1>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 16, padding: '12px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>Всего монет:</span>
          <span style={{ fontSize: 24, fontWeight: 900, color: 'white' }}>💰 {total}</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: '20px 20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <SliderRow
          emoji="🍖"
          label="Обязательные"
          sublabel="Еда, вода, уход"
          value={mandatory}
          color="#2196F3"
          onChange={v => handleSlider(setMandatory, v, optional, savings, setOptional, setSavings)}
        />
        <SliderRow
          emoji="🎮"
          label="Необязательные"
          sublabel="Игрушки, развлечения"
          value={optional}
          color="#FF9800"
          onChange={v => handleSlider(setOptional, v, mandatory, savings, setMandatory, setSavings)}
        />
        <SliderRow
          emoji="🐷"
          label="Накопления"
          sublabel="На мечту"
          value={savings}
          color="#4CAF50"
          onChange={v => handleSlider(setSavings, v, mandatory, optional, setMandatory, setOptional)}
        />

        {/* Summary */}
        <div style={{
          background: remaining === 0 ? '#E8F5E9' : '#FFF3E0',
          borderRadius: 20, padding: '16px 18px',
          border: `2px solid ${remaining === 0 ? '#4CAF50' : '#FF9800'}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#555' }}>Распределено:</span>
            <span style={{ fontSize: 17, fontWeight: 900, color: '#333' }}>{used} монет</span>
          </div>
          <div style={{ background: '#e0e0e0', borderRadius: 99, height: 12, overflow: 'hidden', marginBottom: 10 }}>
            <div style={{
              height: '100%', borderRadius: 99,
              background: `linear-gradient(90deg, #2196F3 ${mandatory}%, #FF9800 ${mandatory}% ${mandatory + optional}%, #4CAF50 ${mandatory + optional}%)`,
              width: `${Math.min(used, 100)}%`,
              transition: 'width 0.3s',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: remaining === 0 ? '#2E7D32' : '#E65100' }}>
              {remaining === 0 ? '✅ Отлично! Остаток: 0' : `⚠️ Остаток: ${remaining}`}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 10 }}>
          {[['#2196F3', 'Обяз.', mandatory], ['#FF9800', 'Необяз.', optional], ['#4CAF50', 'Накопл.', savings]].map(([c, l, v]) => (
            <div key={l as string} style={{ flex: 1, textAlign: 'center', background: (c as string) + '15', borderRadius: 12, padding: '8px 4px' }}>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 900, color: c as string }}>{v}</p>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#777' }}>{l as string}</p>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />
        <BigBtn label="✅ Подтвердить план" onClick={back} color="#4CAF50" />
      </div>
    </div>
  )
}

function SliderRow({ emoji, label, sublabel, value, color, onChange }: {
  emoji: string; label: string; sublabel: string; value: number; color: string; onChange: (v: number) => void
}) {
  return (
    <div style={{ background: color + '10', borderRadius: 20, padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#222' }}>{emoji} {label}</p>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#888' }}>{sublabel}</p>
        </div>
        <div style={{
          background: color, borderRadius: 10, padding: '4px 10px',
          fontSize: 18, fontWeight: 900, color: 'white', minWidth: 44, textAlign: 'center',
        }}>
          {value}
        </div>
      </div>
      <input
        type="range" min={0} max={100} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="slider-track"
        style={{ width: '100%', accentColor: color, color }}
      />
    </div>
  )
}

// ── SCREEN 5 — Savings ─────────────────────────────────────────
function SavingsScreen({ back }: { back: () => void }) {
  const [saved, setSaved] = useState(30)
  const goal = 200
  const pct = Math.round((saved / goal) * 100)

  return (
    <div style={{ flex: 1, background: 'white', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #FF9800, #FFA726)',
        padding: '20px 20px 28px',
        borderRadius: '0 0 32px 32px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={back}
            style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: 12, padding: '6px 10px', cursor: 'pointer', color: 'white', fontSize: 18, fontFamily: 'Nunito, sans-serif' }}
          >
            ←
          </button>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: 'white', lineHeight: 1.2 }}>
            🍍 Ананас Татьяна
          </h1>
        </div>
        <p style={{ margin: '6px 0 0 46px', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
          Копилка на мечту
        </p>
      </div>

      <div style={{ flex: 1, padding: '20px 20px 24px', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
        {/* Tatyana image */}
        <div style={{
          width: 150, height: 150, borderRadius: 36,
          background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '3px solid #FFCC02',
          boxShadow: '0 8px 28px #FF980040',
        }}>
          <img src={tatyanImg} alt="Татьяна" style={{ width: 120, height: 120, objectFit: 'contain' }} />
        </div>

        {/* Goal card */}
        <div style={{
          width: '100%', background: '#FFF3E0', borderRadius: 22,
          padding: '18px 20px', border: '2px solid #FFB300',
          boxShadow: '0 4px 16px #FF980025',
        }}>
          <p style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700, color: '#888' }}>🎯 Цель</p>
          <p style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 900, color: '#E65100' }}>
            Домик для Тоби 🏠
          </p>

          {/* Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#777' }}>Накоплено</span>
            <span style={{ fontSize: 16, fontWeight: 900, color: '#E65100' }}>{saved} из {goal} монет</span>
          </div>
          <div style={{ background: '#FFE082', borderRadius: 99, height: 18, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{
              height: '100%', borderRadius: 99,
              background: 'linear-gradient(90deg, #FF9800, #FFB300)',
              width: `${pct}%`,
              transition: 'width 0.4s',
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 6,
            }}>
              {pct > 15 && <span style={{ fontSize: 10, fontWeight: 900, color: 'white' }}>{pct}%</span>}
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#BF360C' }}>
            Осталось накопить: {goal - saved} монет
          </p>
        </div>

        {/* Quick add buttons */}
        <div style={{ width: '100%' }}>
          <p style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: '#888', textAlign: 'center' }}>
            Быстрое пополнение:
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {[5, 10, 20].map(amount => (
              <button
                key={amount}
                onClick={() => setSaved(s => Math.min(s + amount, goal))}
                style={{
                  flex: 1, borderRadius: 14, padding: '10px 0',
                  fontSize: 15, fontWeight: 800,
                  border: '2px solid #FF9800',
                  background: '#FFF8E1',
                  color: '#E65100',
                  cursor: 'pointer',
                  fontFamily: 'Nunito, sans-serif',
                }}
                onPointerDown={e => (e.currentTarget.style.background = '#FFE0B2')}
                onPointerUp={e => (e.currentTarget.style.background = '#FFF8E1')}
              >
                +{amount} 🪙
              </button>
            ))}
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <BigBtn label="🐷 Пополнить копилку (+10)" onClick={() => setSaved(s => Math.min(s + 10, goal))} color="#FF9800" />
          <BigBtn label="🎯 Сменить цель" onClick={() => {}} color="white" textColor="#FF9800" small />
        </div>

        <button
          onClick={back}
          style={{
            background: 'none', border: 'none', fontSize: 14, fontWeight: 700,
            color: '#aaa', cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
            textDecoration: 'underline',
          }}
        >
          ← Вернуться к Тоби
        </button>
      </div>
    </div>
  )
}

// ── Root ───────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome')

  return (
    <PhoneShell>
      {screen === 'welcome' && <WelcomeScreen next={() => setScreen('create')} />}
      {screen === 'create' && <CreateScreen next={() => setScreen('main')} />}
      {screen === 'main' && (
        <MainScreen
          next={() => setScreen('main')}
          nextBudget={() => setScreen('budget')}
          nextSavings={() => setScreen('savings')}
        />
      )}
      {screen === 'budget' && <BudgetScreen back={() => setScreen('main')} />}
      {screen === 'savings' && <SavingsScreen back={() => setScreen('main')} />}
    </PhoneShell>
  )
}
