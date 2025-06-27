import { useState, useEffect } from "react";

// RoseLoader: Big blooming roses animation for 30 seconds
function RoseLoader({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f0f23 0%, #1a0f1a 50%, #2d1b2d 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Floating petals background */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`petal-${i}`}
          style={{
            position: "absolute",
            width: "8px",
            height: "12px",
            background: `linear-gradient(45deg, #ff6b9d, #ffc3d8)`,
            borderRadius: "50% 0 50% 0",
            animation: `floatPetal${i % 3} ${8 + (i % 5)}s linear infinite`,
            animationDelay: `${i * 0.5}s`,
            left: `${Math.random() * 100}%`,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Big Rose Garden */}
      <div style={{ display: "flex", gap: "80px", alignItems: "flex-end" }}>
        {/* Rose 1 - Left */}
        <svg width="300" height="350" viewBox="0 0 240 300" style={{ transform: "rotate(-5deg)" }}>
          {/* Stem */}
          <path
            d="M120 260 Q116 220 110 180 Q104 140 100 100"
            stroke="#2d5a2d"
            strokeWidth="6"
            fill="none"
            strokeDasharray="160"
            strokeDashoffset="160"
            style={{ animation: "drawStem 3s ease-out forwards", animationDelay: "1s" }}
          />
          {/* Leaves */}
          <path
            d="M104 160 Q90 150 80 160 Q90 170 104 160"
            fill="#4a7c4a"
            opacity="0"
            style={{ animation: "fadeIn 1s ease-out forwards", animationDelay: "4s" }}
          />
          <path
            d="M96 200 Q110 190 120 200 Q110 210 96 200"
            fill="#4a7c4a"
            opacity="0"
            style={{ animation: "fadeIn 1s ease-out forwards", animationDelay: "4.5s" }}
          />

          {/* Rose bloom petals */}
          <g transform="translate(100, 100)">
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <path
                key={`left-outer-${i}`}
                d="M0 0 Q-24 -16 -30 -40 Q-24 -64 0 -50 Q24 -64 30 -40 Q24 -16 0 0"
                fill="url(#leftRoseGradient1)"
                transform={`rotate(${angle})`}
                style={{
                  transformOrigin: "0 0",
                  animation: `bloomPetal 2s ease-out forwards`,
                  animationDelay: `${5 + i * 0.2}s`,
                  opacity: 0,
                  transform: `rotate(${angle}) scale(0)`,
                }}
              />
            ))}
            {[30, 90, 150, 210, 270, 330].map((angle, i) => (
              <path
                key={`left-middle-${i}`}
                d="M0 0 Q-16 -12 -20 -30 Q-16 -48 0 -36 Q16 -48 20 -30 Q16 -12 0 0"
                fill="url(#leftRoseGradient2)"
                transform={`rotate(${angle})`}
                style={{
                  transformOrigin: "0 0",
                  animation: `bloomPetal 1.5s ease-out forwards`,
                  animationDelay: `${7 + i * 0.15}s`,
                  opacity: 0,
                  transform: `rotate(${angle}) scale(0)`,
                }}
              />
            ))}
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <path
                key={`left-inner-${i}`}
                d="M0 0 Q-10 -8 -12 -24 Q-10 -40 0 -30 Q10 -40 12 -24 Q10 -8 0 0"
                fill="url(#leftRoseGradient3)"
                transform={`rotate(${angle})`}
                style={{
                  transformOrigin: "0 0",
                  animation: `bloomPetal 1s ease-out forwards`,
                  animationDelay: `${9 + i * 0.1}s`,
                  opacity: 0,
                  transform: `rotate(${angle}) scale(0)`,
                }}
              />
            ))}
            <circle
              cx="0"
              cy="-24"
              r="6"
              fill="#d91a72"
              opacity="0"
              style={{ animation: "fadeIn 1s ease-out forwards", animationDelay: "10.5s" }}
            />
          </g>

          <defs>
            <linearGradient id="leftRoseGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4081" />
              <stop offset="100%" stopColor="#e91e63" />
            </linearGradient>
            <linearGradient id="leftRoseGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b9d" />
              <stop offset="100%" stopColor="#ff4081" />
            </linearGradient>
            <linearGradient id="leftRoseGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff8bb3" />
              <stop offset="100%" stopColor="#ff6b9d" />
            </linearGradient>
          </defs>
        </svg>

        {/* Rose 2 - Center (Largest) */}
        <svg width="380" height="420" viewBox="0 0 280 340">
          {/* Stem */}
          <path
            d="M140 300 Q136 250 130 200 Q124 150 120 100"
            stroke="#2d5a2d"
            strokeWidth="6"
            fill="none"
            strokeDasharray="200"
            strokeDashoffset="200"
            style={{ animation: "drawStem 3s ease-out forwards", animationDelay: "2s" }}
          />
          {/* Leaves */}
          <path
            d="M124 180 Q100 170 90 180 Q100 190 124 180"
            fill="#4a7c4a"
            opacity="0"
            style={{ animation: "fadeIn 1s ease-out forwards", animationDelay: "5s" }}
          />
          <path
            d="M116 230 Q140 220 150 230 Q140 240 116 230"
            fill="#4a7c4a"
            opacity="0"
            style={{ animation: "fadeIn 1s ease-out forwards", animationDelay: "5.5s" }}
          />

          {/* Large rose bloom */}
          <g transform="translate(120, 100)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <path
                key={`large-outer-${i}`}
                d="M0 0 Q-30 -20 -36 -50 Q-30 -80 0 -64 Q30 -80 36 -50 Q30 -20 0 0"
                fill="url(#largeRoseGradient1)"
                transform={`rotate(${angle})`}
                style={{
                  transformOrigin: "0 0",
                  animation: `bloomPetal 2.5s ease-out forwards`,
                  animationDelay: `${12 + i * 0.25}s`,
                  opacity: 0,
                  transform: `rotate(${angle}) scale(0)`,
                }}
              />
            ))}
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
              <path
                key={`large-middle-${i}`}
                d="M0 0 Q-20 -16 -24 -36 Q-20 -56 0 -44 Q20 -56 24 -36 Q20 -16 0 0"
                fill="url(#largeRoseGradient2)"
                transform={`rotate(${angle})`}
                style={{
                  transformOrigin: "0 0",
                  animation: `bloomPetal 2s ease-out forwards`,
                  animationDelay: `${15 + i * 0.2}s`,
                  opacity: 0,
                  transform: `rotate(${angle}) scale(0)`,
                }}
              />
            ))}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <path
                key={`large-inner-${i}`}
                d="M0 0 Q-12 -10 -16 -36 Q-12 -60 0 -45 Q12 -60 16 -36 Q12 -10 0 0"
                fill="url(#largeRoseGradient3)"
                transform={`rotate(${angle})`}
                style={{
                  transformOrigin: "0 0",
                  animation: `bloomPetal 1.5s ease-out forwards`,
                  animationDelay: `${18 + i * 0.15}s`,
                  opacity: 0,
                  transform: `rotate(${angle}) scale(0)`,
                }}
              />
            ))}
            <circle
              cx="0"
              cy="-36"
              r="8"
              fill="#c91a5c"
              opacity="0"
              style={{ animation: "fadeIn 1s ease-out forwards", animationDelay: "20s" }}
            />
          </g>

          <defs>
            <linearGradient id="largeRoseGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff1744" />
              <stop offset="100%" stopColor="#c2185b" />
            </linearGradient>
            <linearGradient id="largeRoseGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4569" />
              <stop offset="100%" stopColor="#ff1744" />
            </linearGradient>
            <linearGradient id="largeRoseGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6584" />
              <stop offset="100%" stopColor="#ff4569" />
            </linearGradient>
          </defs>
        </svg>

        {/* Rose 3 - Right */}
        <svg width="300" height="350" viewBox="0 0 240 300" style={{ transform: "rotate(5deg)" }}>
          {/* Stem */}
          <path
            d="M120 260 Q124 220 130 180 Q136 140 140 100"
            stroke="#2d5a2d"
            strokeWidth="6"
            fill="none"
            strokeDasharray="160"
            strokeDashoffset="160"
            style={{ animation: "drawStem 3s ease-out forwards", animationDelay: "3s" }}
          />
          {/* Leaves */}
          <path
            d="M136 160 Q150 150 160 160 Q150 170 136 160"
            fill="#4a7c4a"
            opacity="0"
            style={{ animation: "fadeIn 1s ease-out forwards", animationDelay: "6s" }}
          />
          <path
            d="M144 200 Q130 190 120 200 Q130 210 144 200"
            fill="#4a7c4a"
            opacity="0"
            style={{ animation: "fadeIn 1s ease-out forwards", animationDelay: "6.5s" }}
          />

          {/* Rose bloom */}
          <g transform="translate(140, 100)">
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <path
                key={`right-outer-${i}`}
                d="M0 0 Q-24 -16 -30 -40 Q-24 -64 0 -50 Q24 -64 30 -40 Q24 -16 0 0"
                fill="url(#rightRoseGradient1)"
                transform={`rotate(${angle})`}
                style={{
                  transformOrigin: "0 0",
                  animation: `bloomPetal 2s ease-out forwards`,
                  animationDelay: `${22 + i * 0.2}s`,
                  opacity: 0,
                  transform: `rotate(${angle}) scale(0)`,
                }}
              />
            ))}
            {[30, 90, 150, 210, 270, 330].map((angle, i) => (
              <path
                key={`right-middle-${i}`}
                d="M0 0 Q-16 -12 -20 -30 Q-16 -48 0 -36 Q16 -48 20 -30 Q16 -12 0 0"
                fill="url(#rightRoseGradient2)"
                transform={`rotate(${angle})`}
                style={{
                  transformOrigin: "0 0",
                  animation: `bloomPetal 1.5s ease-out forwards`,
                  animationDelay: `${24 + i * 0.15}s`,
                  opacity: 0,
                  transform: `rotate(${angle}) scale(0)`,
                }}
              />
            ))}
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <path
                key={`right-inner-${i}`}
                d="M0 0 Q-10 -8 -12 -24 Q-10 -40 0 -30 Q10 -40 12 -24 Q10 -8 0 0"
                fill="url(#rightRoseGradient3)"
                transform={`rotate(${angle})`}
                style={{
                  transformOrigin: "0 0",
                  animation: `bloomPetal 1s ease-out forwards`,
                  animationDelay: `${26 + i * 0.1}s`,
                  opacity: 0,
                  transform: `rotate(${angle}) scale(0)`,
                }}
              />
            ))}
            <circle
              cx="0"
              cy="-24"
              r="6"
              fill="#d91a72"
              opacity="0"
              style={{ animation: "fadeIn 1s ease-out forwards", animationDelay: "27.5s" }}
            />
          </g>

          <defs>
            <linearGradient id="rightRoseGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e91e63" />
              <stop offset="100%" stopColor="#ad1457" />
            </linearGradient>
            <linearGradient id="rightRoseGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f06292" />
              <stop offset="100%" stopColor="#e91e63" />
            </linearGradient>
            <linearGradient id="rightRoseGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f48fb1" />
              <stop offset="100%" stopColor="#f06292" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Sparkles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: 0.8,
            filter: "drop-shadow(0 0 4px white)",
            animation: `sparkleAnim 4s linear infinite`,
            animationDelay: `${i * 0.3}s`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 90 + 5}%`,
          }}
        />
      ))}

      {/* Animations */}
      <style>{`
        @keyframes drawStem {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        @keyframes bloomPetal {
          to {
            opacity: 1;
            transform: scale(1) rotate(var(--angle));
          }
        }
        @keyframes floatPetal0 {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.7;}
          50% { opacity: 0.4;}
          100% { transform: translateY(-200px) translateX(20px) rotate(360deg); opacity: 0;}
        }
        @keyframes floatPetal1 {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.7;}
          50% { opacity: 0.5;}
          100% { transform: translateY(-180px) translateX(-15px) rotate(-360deg); opacity: 0;}
        }
        @keyframes floatPetal2 {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.6;}
          50% { opacity: 0.3;}
          100% { transform: translateY(-210px) translateX(10px) rotate(360deg); opacity: 0;}
        }
        @keyframes sparkleAnim {
          0%, 100% {opacity: 0.8; transform: scale(1);}
          50% {opacity: 0.2; transform: scale(0.6);}
        }
      `}</style>
    </div>
  );
}

// Your existing CardSelection component here (paste your full CardSelection code)
const allCards = [
  {
    id: 1,
    description: "Plan a Movie Date 🎬 — You pick the movie, I’ll pick the vibe (snacks, lighting, cuddles or distance).",
    isSpecial: false
  },
  {
    id: 2,
    description: "Small Surprise 🛍️ — Buy or make me something small this week and don’t tell me until it’s done.",
    isSpecial: false
  },
  {
    id: 3,
    description: "Playlist Swap 🎧 — Share a 3-song playlist that captures how you feel about me lately.",
    isSpecial: false
  },
  {
    id: 4,
    description: "Memory Builder 📷 — Take a photo of something you’d want to share with me if I were there.",
    isSpecial: false
  },
  {
    id: 5,
    description: "Next-Date Dream ☕ — Describe our next date like a romantic scene in a movie. Go all out.",
    isSpecial: true
  },
  {
    id: 6,
    description: "Voice Flirt 🎙️ — Send a voice note where you try to flirt with me in your most charming tone.",
    isSpecial: true
  },
  {
    id: 7,
    description: "EXTREME: Video Position Tour 📹 — (No nudity needed) Fully dressed, use pillows or the bed to act out 3 positions you want us to try. Describe each one in detail like you're tempting me into it.",
    isSpecial: true,
    isExtreme: true
  },
  {
    id: 8,
    description: "EXTREME: Mirror Session 🔥 — Strip alone, sit in front of a mirror, and describe in audio what you’d want me to do if I were there.",
    isSpecial: true,
    isExtreme: true
  },
  {
    id: 9,
    description: "EXTREME: Voice-Over Fantasy 🎤 — Imagine you're riding me slowly. Record a voice note where you whisper what you're doing to me in real-time, like an erotic voice-over.",
    isSpecial: true,
    isExtreme: true
  },
  {
    id: 10,
    description: "Pick a song that makes you feel sexy. Dance like I’m watching. Record a short clip. No rules — just you, the rhythm, and the mood. Let your body move and show me how you feel.",
    isSpecial: true,
  }
  
];

const getRandomColor = () => {
  const palette = ['#f43f5e', '#10b981', '#f59e0b', '#6366f1', '#e879f9', '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#3b82f6'];
  return palette[Math.floor(Math.random() * palette.length)];
};

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const triggerConfetti = () => {
  const confettiContainer = document.createElement('div');
  confettiContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
  `;
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    const colors = ['#ff69b4', '#87ceeb', '#98fb98', '#dda0dd', '#f0e68c'];
    confetti.style.cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}%;
      animation: fall ${Math.random() * 3 + 2}s linear infinite;
      animation-delay: ${Math.random() * 2}s;
    `;
    confettiContainer.appendChild(confetti);
  }
  document.body.appendChild(confettiContainer);
  setTimeout(() => {
    if (document.body.contains(confettiContainer)) {
      document.body.removeChild(confettiContainer);
    }
  }, 5000);
};

const playSuccessSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [
      { freq: 523.25, duration: 0.2 },
      { freq: 659.25, duration: 0.2 },
      { freq: 783.99, duration: 0.2 },
      { freq: 1046.50, duration: 0.4 }
    ];
    let startTime = audioContext.currentTime;
    notes.forEach(note => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.frequency.value = note.freq;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);
      osc.start(startTime);
      osc.stop(startTime + note.duration);
      startTime += note.duration * 0.8;
    });
  } catch (e) {
    console.log('Audio not supported');
  }
};

const playClickSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.1);
  } catch (e) {}
};

function CardSelection() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);

  const reshuffle = () => {
    const randomized = shuffleArray(allCards).map(card => ({
      ...card,
      color: getRandomColor()
    }));
    setShuffledCards(randomized);
    setSelectedCard(null);
    setRevealed(false);
  };

  useEffect(() => {
    reshuffle();
  }, []);

  useEffect(() => {
    if (revealed && selectedCard) {
      triggerConfetti();
      playSuccessSound();
    }
  }, [revealed, selectedCard]);

  const handleCardClick = (card) => {
    playClickSound();
    setTimeout(() => {
      setSelectedCard(card);
      setRevealed(true);
    }, 100);
  };

  return (
    <>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100vh) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        @keyframes modalSlide {
          0% { transform: scale(0.8) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .card:hover { transform: scale(1.05) translateY(-5px) !important; }
        .card:active { transform: scale(0.95) !important; }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fce7f3 0%, #dbeafe 100%)',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'system-ui'
      }}>
        <div style={{
          backgroundColor: '#fef3c7',
          border: '2px solid #f59e0b',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '20px',
          maxWidth: '600px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#92400e', fontSize: '14px', fontWeight: '600', margin: 0 }}>
            ⚠️ DISCLAIMER: You must do it if you pick one. No backing out! 💕 ⚠️
          </p>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937' }}>Ready for Your Surprise? ❤️</h1>
        <p style={{ color: '#374151', marginBottom: '20px', fontSize: '18px', textAlign: 'center' }}>
          Pick a number and reveal your long-distance challenge!
        </p>

        <button onClick={reshuffle} style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '16px',
          marginBottom: '24px',
          border: 'none',
          cursor: 'pointer'
        }}>🔄 Reshuffle Cards</button>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px'
        }}>
          {shuffledCards.map((card, idx) => (
            <div
              key={card.id}
              className="card"
              onClick={() => handleCardClick(card)}
              style={{
                cursor: 'pointer',
                height: '140px',
                width: '110px',
                borderRadius: '16px',
                background: card.color,
                color: 'white',
                fontSize: '36px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                transition: 'transform 0.3s ease'
              }}
            >
              {idx + 1}
            </div>
          ))}
        </div>

        {revealed && selectedCard && (
          <div
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => {
              setSelectedCard(null);
              setRevealed(false);
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '448px',
                margin: '20px',
                textAlign: 'center',
                animation: 'modalSlide 0.3s ease-out'
              }}
              onClick={e => e.stopPropagation()}
            >
              <h2 style={{ fontSize: '24px', color: '#3730a3' }}>🎁 Your Surprise:</h2>
              <p style={{ color: '#374151', marginTop: '12px', lineHeight: '1.6' }}>{selectedCard.description}</p>
              {selectedCard.isSpecial && (
                <p style={{ color: '#db2777', fontSize: '18px', fontWeight: '600' }}>
                  ✨ This is the one I secretly hoped you'd pick ✨
                </p>
              )}
              <button
                onClick={() => {
                  setSelectedCard(null);
                  setRevealed(false);
                }}
                style={{
                  marginTop: '16px',
                  padding: '8px 24px',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function App() {
  const [showCards, setShowCards] = useState(false);

  return (
    <>
      {!showCards ? (
        <RoseLoader onFinish={() => setShowCards(true)} />
      ) : (
        <CardSelection />
      )}
    </>
  );
}
