import { useState, useEffect } from "react";

// Define the cards (without color)
const allCards = [
  {
    id: 1,
    description: "Write me a short, sweet message that you'd whisper if I was lying next to you right now.",
    isSpecial: false
  },
  {
    id: 2,
    description: "Romantic Audio 🎧 — Record a 30-second voice note telling me something you love about me. Extra points if it's cheeky.",
    isSpecial: false
  },
  {
    id: 3,
    description: "Emoji Fantasy 🧠📲 — Describe your last naughty thought about me using only emojis. I’ll try to guess what it means.",
    isSpecial: true
  },
  {
    id: 4,
    description: "Midnight Dare 🌙 — I give you a fun or naughty dare right now. You must complete it before bed, no excuses.",
    isSpecial: true
  },
  {
    id: 5,
    description: "Picture Roulette 📸 — Take a photo of something soft, something warm, and something naughty. Send all three.",
    isSpecial: false
  },
  {
    id: 6,
    description: "Strip One 😳 — You remove one item of inner clothing (your choice). Send a hint, not a reveal. Let me imagine the rest.",
    isSpecial: true
  },
  {
    id: 7,
    description: "Fantasy Builder 🔥 — Text me a detailed, step-by-step plan of what you'd do to me if we had one uninterrupted night.",
    isSpecial: true
  },
  {
    id: 8,
    description: "Voice Tease 🎤 — Say something completely filthy you'd whisper into my ear. No holding back. One take. Send.",
    isSpecial: true
  },
  {
    id: 9,
    description: "EXTREME: I want to hear you lose control. Record the moment you finish while moaning my name. Or fake it flawlessly. 😈",
    isSpecial: true,
    isExtreme: true
  },
  {
    id: 10,
    description: "EXTREME: Strip fully, sit in front of the mirror, and describe out loud what you see and what you'd do to me if I was there. 🔥",
    isSpecial: true,
    isExtreme: true
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

export default function CardSelection() {
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
