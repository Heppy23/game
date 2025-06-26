import { useState, useEffect } from "react";

const cards = [
  {
    id: 1,
    description: "Movie Date Night 🍿 — You pick the movie, I bring the charm. We start it at the same time and pretend we’re side by side.",
    color: "#facc15", // yellow-400
    isSpecial: false
  },
  {
    id: 2,
    description: "Dress up just how I say 💃 — and follow every little instruction I give you... no questions asked 😉",
    color: "#f43f5e", // rose-500
    isSpecial: true
  },
  {
    id: 3,
    description: "Dance for Me 💃🎶 — Put on your favorite song and send me a private dance. Bonus points if you smile while doing it 😍",
    color: "#38bdf8", // sky-400
    isSpecial: false
  },
  {
    id: 4,
    description: "All-Night Dirty Talk 🌙🔥 — We talk until sleep wins… sweet, teasing, and maybe a little wicked. Just you, me, and no limits.",
    color: "#a78bfa", // violet-400
    isSpecial: true
  },
  {
    id: 5,
    description: "Your Wish, My Command 🧞‍♂️ — Ask me anything. Anything. I’ll do my best to make it come true (or at least make it fun 😏).",
    color: "#10b981", // emerald-500
    isSpecial: false
  }
];


// Simple confetti effect
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

// Music functionality
const playSuccessSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create a sequence of notes for a cheerful melody
    const notes = [
      { freq: 523.25, duration: 0.2 }, // C5
      { freq: 659.25, duration: 0.2 }, // E5
      { freq: 783.99, duration: 0.2 }, // G5
      { freq: 1046.50, duration: 0.4 } // C6
    ];
    
    let startTime = audioContext.currentTime;
    
    notes.forEach((note, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = note.freq;
      oscillator.type = 'sine';
      
      // Envelope for smooth sound
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + note.duration);
      
      startTime += note.duration * 0.8; // Slight overlap
    });
  } catch (error) {
    console.log('Audio not supported or permission denied');
  }
};

const playClickSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.log('Audio not supported');
  }
};

export default function CardSelection() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [audioContext, setAudioContext] = useState(null);

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

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fce7f3 0%, #dbeafe 100%)',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const cardsContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px',
    flexWrap: 'wrap',
    marginTop: '20px'
  };

  const cardStyle = (color) => ({
    cursor: 'pointer',
    height: '140px',
    width: '110px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '36px',
    fontWeight: 'bold',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    background: color,
    transition: 'all 0.3s ease',
    transform: 'scale(1)',
    border: 'none'
  });

  const modalBackdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    backdropFilter: 'blur(4px)'
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '32px',
    width: '100%',
    maxWidth: '448px',
    margin: '20px',
    textAlign: 'center',
    animation: 'modalSlide 0.3s ease-out'
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
        
        .card:hover {
          transform: scale(1.05) translateY(-5px) !important;
        }
        
        .card:active {
          transform: scale(0.95) !important;
        }
      `}</style>
      
      <div style={containerStyle}>
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
            ⚠️ DISCLAIMER: You must do it if you choose to pick one. Else just quit💕 ⚠️
          </p>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', textAlign: 'center' }}>
          Hey Ready ❤️
        </h1>
        <p style={{ color: '#374151', marginBottom: '40px', fontSize: '18px', textAlign: 'center' }}>
          Pick a number and see your LOOOOOOOOOOOOOOOONG DISTANCE surprise!
        </p>

        <div style={cardsContainerStyle}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="card"
              style={cardStyle(card.color)}
              onClick={() => handleCardClick(card)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05) translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>

        {revealed && selectedCard && (
          <div
            style={modalBackdropStyle}
            onClick={() => {
              setSelectedCard(null);
              setRevealed(false);
            }}
          >
            <div
              style={modalStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#3730a3', marginBottom: '16px' }}>
                🎁 Your Surprise:
              </h2>
              <p style={{ color: '#374151', marginBottom: '16px', lineHeight: '1.6' }}>
                {selectedCard.description}
              </p>
              {selectedCard.isSpecial && (
                <p style={{ color: '#db2777', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
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
                  fontSize: '16px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#3730a3';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#4f46e5';
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