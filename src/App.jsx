import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================= 1. LOVE TIMER COMPONENT (28/12/2025) =================
function LoveTimer() {
  const [timeElapsed, setTimeElapsed] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateElapsed = () => {
      const startDate = new Date(2025, 11, 28, 0, 0, 0); // 28 Dec 2025
      const now = new Date();

      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      if (seconds < 0) {
        minutes--;
        seconds += 60;
      }
      if (minutes < 0) {
        hours--;
        minutes += 60;
      }
      if (hours < 0) {
        days--;
        hours += 24;
      }
      if (days < 0) {
        months--;
        const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonthDays;
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      const totalMonths = Math.max(0, years * 12 + months);

      setTimeElapsed({
        months: totalMonths,
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
      });
    };

    calculateElapsed();
    const interval = setInterval(calculateElapsed, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  const units = [
    { label: 'Months', value: formatNumber(timeElapsed.months) },
    { label: 'Days', value: formatNumber(timeElapsed.days) },
    { label: 'Hours', value: formatNumber(timeElapsed.hours) },
    { label: 'Minutes', value: formatNumber(timeElapsed.minutes) },
    { label: 'Seconds', value: formatNumber(timeElapsed.seconds) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="z-10 w-full max-w-xl mx-auto bg-[#9c2d52] p-6 sm:p-8 rounded-3xl shadow-[0_15px_35px_rgba(156,45,82,0.35)] border-2 border-white/35 text-center"
    >
      <div className="flex items-center justify-center gap-2.5 mb-6">
        <motion.span 
          animate={{ scale: [1, 1.25, 1] }} 
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="text-2xl sm:text-3xl"
        >
          💖
        </motion.span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
          Our Time
        </h3>
        <motion.span 
          animate={{ scale: [1, 1.25, 1] }} 
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.2 }}
          className="text-2xl sm:text-3xl"
        >
          💖
        </motion.span>
      </div>

      {/* Grid of 5 Time Units */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3.5">
        {units.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 * index }}
            whileHover={{ scale: 1.06 }}
            className="bg-[#801b3d] border border-white/20 rounded-2xl p-2.5 sm:p-3.5 shadow-sm flex flex-col items-center justify-center"
          >
            <span className="text-xl sm:text-3xl md:text-4xl font-bold text-white font-mono leading-none tracking-tight">
              {unit.value}
            </span>
            <span className="text-[10px] sm:text-[12px] font-semibold text-pink-100 mt-2 font-serif uppercase tracking-wider">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ================= 2. COLLAGE VIDEO CARD =================
function CollageVideoCard({ video, index }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        // Pause all other audio and video playback
        document.querySelectorAll('audio, video').forEach((el) => {
          if (el !== videoRef.current) el.pause();
        });
        videoRef.current.play().catch(() => { });
        setIsPlaying(true);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: video.rotate }}
      animate={{ opacity: 1, scale: 1, rotate: video.rotate }}
      transition={{ duration: 0.5, delay: 0.12 * index }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 40 }}
      className={`z-10 bg-white p-2 sm:p-3 shadow-[0_10px_25px_rgba(0,0,0,0.25)] rounded-2xl transition-all duration-300 flex flex-col justify-between ${video.classes}`}
    >
      <div
        className="relative w-full aspect-[4/5] bg-black/90 rounded-xl overflow-hidden cursor-pointer group shadow-inner"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-cover"
          playsInline
          preload="metadata"
          controls={isPlaying}
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={video.src} type="video/mp4" />
        </video>

        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] group-hover:bg-black/40 transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#9c2d52]/90 text-[#fff5f7] flex items-center justify-center shadow-xl border border-white/40 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-2 sm:mt-2.5 px-1 py-1 text-center" dir="rtl">
        <p className="text-[11px] sm:text-[13px] md:text-sm font-bold text-[#4a362f] leading-snug font-sans">
          {video.message}
        </p>
      </div>
    </motion.div>
  );
}

// ================= 3. COLLAGE AUDIO CARD =================
function CollageAudioCard({ id, src, title, subtitle, className, isSpecial = false, specialMessage = '' }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlay = (e) => {
    e?.stopPropagation?.();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Pause all other media elements
      document.querySelectorAll('audio, video').forEach((el) => {
        if (el !== audioRef.current) {
          el.pause();
        }
      });
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.error('Audio playback error:', err);
          });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    setCurrentTime(formatTime(cur));
    if (dur && !isNaN(dur)) {
      setProgress((cur / dur) * 100);
      setDuration(formatTime(dur));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setDuration(formatTime(audioRef.current.duration));
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!audioRef.current || !audioRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={`z-30 bg-[#9c2d52] p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-[0_14px_32px_rgba(0,0,0,0.28)] border-2 border-white/35 backdrop-blur-md flex flex-col justify-between ${className || ''}`}
    >
      <audio
        ref={audioRef}
        src={`/images/${src}.mp3`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        preload="auto"
      >
        <source src={`/images/${src}.mp3`} type="audio/mpeg" />
        <source src={`/images/${src}.mpeg`} type="audio/mpeg" />
        <source src={`/images/${src}.m4a`} type="audio/mp4" />
      </audio>

      <div className="flex items-center gap-3 w-full">
        {/* Animated Vinyl Disc */}
        <div className="relative shrink-0">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { repeat: Infinity, duration: 4, ease: "linear" } : { duration: 0.5 }}
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#801b3d] border-2 border-white/30 flex items-center justify-center shadow-md cursor-pointer"
            onClick={togglePlay}
          >
            <div className="w-4 h-4 rounded-full bg-[#ea85a0] border border-white/40 flex items-center justify-center">
              <span className="text-[9px]">🎵</span>
            </div>
          </motion.div>
          {isPlaying && (
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute -top-1 -right-1 text-xs"
            >
              ✨
            </motion.span>
          )}
        </div>

        {/* Title & Equalizer wave */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h4 className="font-serif text-sm sm:text-base font-bold text-white truncate">
              {title}
            </h4>
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3.5 mr-1 shrink-0">
                {[0.4, 1.0, 0.3, 0.8, 0.6].map((bar, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ height: ['25%', '100%', '30%'] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.5 + idx * 0.12,
                      ease: 'easeInOut',
                    }}
                    className="w-0.5 sm:w-1 bg-[#fff5f7] rounded-full"
                  />
                ))}
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-[10.5px] sm:text-xs text-pink-100/90 truncate font-sans">
              {subtitle}
            </p>
          )}
        </div>

        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#9c2d52] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform shrink-0 cursor-pointer"
        >
          {isPlaying ? (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Progress Bar & Timers */}
      <div className="w-full flex items-center gap-2 pt-0.5">
        <span className="text-[9.5px] sm:text-[11px] font-mono text-pink-100 shrink-0">
          {currentTime}
        </span>
        <div
          onClick={handleSeek}
          className="relative flex-1 h-2 bg-[#801b3d] rounded-full overflow-hidden cursor-pointer group"
        >
          <div
            className="h-full bg-gradient-to-r from-pink-300 to-white rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[9.5px] sm:text-[11px] font-mono text-pink-100 shrink-0">
          {duration}
        </span>
      </div>

      {/* Special Message for A3 */}
      {isSpecial && specialMessage && (
        <div className="mt-3 pt-3.5 border-t border-white/20 text-center w-full" dir="rtl">
          <p className="font-sans text-sm sm:text-base md:text-lg font-bold text-[#fff5f7] leading-relaxed drop-shadow-sm">
            {specialMessage}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ================= 3. PASSWORD SCREEN =================
function PasswordScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    const normalized = password.trim().replace(/-/g, '/').replace(/\s+/g, '');
    if (normalized === '29/9/2008' || normalized === '29/09/2008' || normalized === '29/9/08') {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div
      key="password-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-[#ea85a0] px-4 text-center overflow-hidden"
    >
      <div 
        className="absolute left-0 top-0 h-full w-16 sm:w-32 pointer-events-none opacity-90"
        style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
      ></div>
      <div 
        className="absolute right-0 top-0 h-full w-16 sm:w-32 pointer-events-none opacity-90"
        style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
      ></div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="z-10 flex flex-col items-center max-w-sm w-full"
      >
        <div className="mb-4 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#9c2d52] text-[#fff5f7] shadow-xl border-2 border-white/30">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-current" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#fff5f7] font-bold drop-shadow-md mb-2">
          Enter Password 🔐
        </h2>
        <p className="font-serif text-base sm:text-lg text-[#fff5f7] drop-shadow-sm mb-6">
          Enter the special date to open your gift ✨
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <motion.div 
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="DD/MM/YYYY"
              className="w-full text-center px-6 py-3.5 rounded-full bg-white text-[#4a362f] placeholder-pink-300 font-bold text-lg shadow-xl border-2 border-white/80 focus:outline-none focus:ring-4 focus:ring-[#9c2d52]/40 tracking-wider"
              autoFocus
            />
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm font-bold text-red-100 bg-red-900/50 px-4 py-1 rounded-full drop-shadow font-sans"
            >
              Incorrect password, please try again 🔒💔
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-5 w-full rounded-full bg-[#9c2d52] px-8 py-3.5 font-serif text-sm uppercase tracking-widest text-[#fff5f7] shadow-xl border border-white/20 hover:bg-[#852243] transition-all cursor-pointer"
          >
            Unlock 💖
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ================= 4. PHOTO 1 REVEAL SCREEN =================
function PhotoRevealScreen({ onDismiss }) {
  return (
    <motion.div
      key="photo-reveal-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7 }}
      onClick={onDismiss}
      className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-[#ea85a0] px-4 cursor-pointer overflow-hidden"
    >
      <div 
        className="absolute left-0 top-0 h-full w-16 sm:w-32 pointer-events-none opacity-90"
        style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
      ></div>
      <div 
        className="absolute right-0 top-0 h-full w-16 sm:w-32 pointer-events-none opacity-90"
        style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
      ></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: -2 }}
        exit={{ opacity: 0, scale: 1.15, rotate: 6 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
        whileHover={{ scale: 1.04, rotate: 0 }}
        className="z-10 flex flex-col items-center group"
      >
        <div className="bg-white p-3 sm:p-4 pb-8 sm:pb-10 shadow-[0_20px_50px_rgba(0,0,0,0.35)] rounded-2xl transition-all duration-300 max-w-[290px] sm:max-w-[360px] border border-white/60">
          <img 
            src="/images/photo1.jpg" 
            alt="My Love" 
            className="w-full aspect-[3/4] object-cover rounded-xl shadow-inner" 
          />
          <p className="mt-3 sm:mt-4 text-center font-hand text-xl sm:text-2xl text-[#9c2d52] font-bold tracking-wide">
            Happy Birthday, Malak ♥️
          </p>
        </div>

        <motion.p
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="mt-6 font-serif text-lg sm:text-xl text-[#fff5f7] drop-shadow-md text-center"
        >
          Tap the photo to continue ✨💌
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// ================= 5. MAIN APP COMPONENT =================
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPhotoReveal, setShowPhotoReveal] = useState(false);
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const handleUnlock = () => {
    setIsAuthenticated(true);
    setShowPhotoReveal(true);
  };

  const handleDismissPhoto = () => {
    setShowPhotoReveal(false);
  };

  const VIDEOS = [
    {
      id: 1,
      src: '/images/v1.mp4',
      message: 'انتي فعلا اجمل ست ف العالم ✨️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️',
      classes: 'absolute top-[3%] left-[3%] sm:left-[6%] w-[47%] sm:w-[34%]',
      rotate: -5
    },
    {
      id: 2,
      src: '/images/v2.mp4',
      message: '🥹♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️',
      classes: 'absolute top-[1%] right-[3%] sm:right-[6%] w-[45%] sm:w-[32%]',
      rotate: 6
    },
    {
      id: 3,
      src: '/images/v3.mp4',
      message: 'احلي واحده تتم ال 18 والله ♥️♥️♥️',
      classes: 'absolute top-[37%] left-[3%] sm:left-[6%] w-[47%] sm:w-[34%]',
      rotate: -4
    },
    {
      id: 4,
      src: '/images/v4.mp4',
      message: 'كل سنه وانتي صاحبتي وحبيبتي واختي وكل حاجه ليا ف الدنيا ♥️♥️♥️♥️♥️♥️♥️♥️♥️🫶🏻',
      classes: 'absolute top-[35%] right-[3%] sm:right-[6%] w-[46%] sm:w-[33%]',
      rotate: 5
    },
    {
      id: 5,
      src: '/images/v5.mp4',
      message: 'وجودك جنبي فعلا كفايه 🥹♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️',
      classes: 'absolute top-[71%] left-[3%] sm:left-[6%] w-[47%] sm:w-[34%]',
      rotate: -6
    },
    {
      id: 6,
      src: '/images/v6.mp4',
      message: 'كل سنه وانت الحب 😍♥️♥️♥️♥️♥️♥️♥️♥️♥️',
      classes: 'absolute top-[69%] right-[3%] sm:right-[6%] w-[46%] sm:w-[33%]',
      rotate: 4
    },
  ];

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`w-full bg-[#ea85a0] text-white ${showMain ? 'overflow-y-auto' : 'h-screen overflow-hidden'}`}>

      {/* ================= STEP 1: PASSWORD SCREEN ================= */}
      <AnimatePresence>
        {!isAuthenticated && (
          <PasswordScreen onUnlock={handleUnlock} />
        )}
      </AnimatePresence>

      {/* ================= STEP 2: PHOTO 1 REVEAL SCREEN ================= */}
      <AnimatePresence>
        {isAuthenticated && showPhotoReveal && (
          <PhotoRevealScreen onDismiss={handleDismissPhoto} />
        )}
      </AnimatePresence>

      {/* ================= STEP 3: THE ENVELOPE ================= */}
      <AnimatePresence>
        {isAuthenticated && !showPhotoReveal && !showMain && (
          <motion.section
            key="envelope-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-[#ea85a0]"
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 sm:mb-12 -rotate-6 font-hand text-3xl sm:text-4xl text-[#fff5f7] relative right-12 sm:right-16 drop-shadow-md z-30"
            >
              open me!
            </motion.p>

            <div
              className="relative flex items-center justify-center w-full max-w-sm cursor-pointer mt-6"
              onClick={() => setIsEnvelopeOpened(true)}
            >
              <motion.img
                src="/images/envelope-closed.png"
                alt="Closed Envelope"
                className="relative z-20 w-72 sm:w-80 object-contain drop-shadow-2xl"
                animate={isEnvelopeOpened ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1, rotate: -6 }}
                transition={{ duration: 0.8 }}
                onAnimationComplete={() => {
                  if (isEnvelopeOpened) {
                    setShowMain(true);
                  }
                }}
                whileHover={!isEnvelopeOpened ? { scale: 1.05 } : {}}
                whileTap={!isEnvelopeOpened ? { scale: 0.95 } : {}}
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ================= SECTION 2: GREETING HERO ================= */}
      <section id="hero-section" className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden py-10">
        <div
          className="absolute left-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
        ></div>
        <div
          className="absolute right-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
        ></div>

        <p className="z-10 mt-8 font-serif text-sm uppercase tracking-[0.15em] text-[#fff5f7] drop-shadow-sm max-w-xs sm:max-w-md">
          To the most beautiful girl!
        </p>

        <h1 className="z-10 my-2 font-script text-[6.5rem] leading-none text-[#fff5f7] drop-shadow-md sm:text-[9rem]">
          Malak
        </h1>

        <p className="z-10 font-serif text-sm uppercase tracking-[0.2em] text-[#fff5f7] drop-shadow-sm">
          Happy birthday, love
        </p>

        <p className="z-10 mt-5 mb-2 font-sans text-[13px] text-white/90 tracking-wide sm:text-sm"></p>

        {/* Envelope with only photo 1 */}
        <div className="relative z-10 mt-10 h-64 w-[310px] sm:h-80 sm:w-[420px] flex items-end justify-center">
          <div className="absolute bottom-0 h-44 w-full bg-[#e8b7c4] rounded-md shadow-inner sm:h-56"></div>

          <div className="absolute bottom-24 z-10 h-48 w-36 sm:bottom-32 sm:h-60 sm:w-44 bg-white p-2 sm:p-2.5 pb-6 sm:pb-8 shadow-polaroid rounded-sm rotate-[-2deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
            <img src="/images/photo1.jpg" className="h-full w-full object-cover rounded-[2px]" alt="Pic 1" />
          </div>

          <div
            className="relative z-20 h-32 w-full bg-[#fff0f3] shadow-[-2px_-4px_12px_rgba(0,0,0,0.08)] rounded-b-md sm:h-40"
            style={{ clipPath: 'polygon(0 0, 50% 15%, 100% 0, 100% 100%, 0 100%)' }}
          ></div>
        </div>

        <div className="z-10 mt-16 mb-8 rounded-full bg-[#9c2d52] px-14 py-3.5 font-serif text-sm uppercase tracking-[0.3em] text-[#fff5f7] shadow-xl hover:scale-105 transition-transform cursor-pointer border border-[#fff5f7]/20">
          I love u
        </div>
      </section>

      {/* ================= SECTION 3: VIDEO & LETTER ================= */}
      <section className="relative flex min-h-screen flex-col items-center justify-start sm:justify-center py-20 px-4 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
        ></div>
        <div
          className="absolute right-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
        ></div>

        {/* ================= 28/12/2025 LOVE TIMER ================= */}
        <div className="z-10 w-full px-2 max-w-4xl flex justify-center">
          <LoveTimer />
        </div>

        {/* ورقة الرسالة بدون أي بوردر خارجي أو شادو مربع - تظهر ورقة الدانتيل الشفافة مباشرة */}
        <div 
          className="z-10 mt-12 sm:mt-20 relative w-[95%] max-w-[560px] sm:max-w-[650px] md:max-w-[720px] mx-auto flex flex-col items-center justify-center text-center"
          style={{
            backgroundImage: "url('/images/lace paper.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="w-full pt-[21%] pb-[21%] px-[27%] sm:pt-[20%] sm:pb-[20%] sm:px-[27%] flex flex-col items-center justify-center text-center">
            <p className="font-letter text-sm sm:text-lg md:text-xl font-bold text-[#4a362f] mb-2 sm:mb-3">
              To my favorite person,
            </p>
            
            <p 
              className="font-letter text-[10px] sm:text-[12px] md:text-[13.5px] leading-[1.75] sm:leading-[1.85] md:leading-[1.95] font-bold text-[#4a362f] text-center break-words [overflow-wrap:anywhere] [word-break:break-word] w-full"
              dir="rtl"
            >
              عايز اقولك ان ده اجمل واهم يوم ف الدنيا اليوم اللي اتولدت فيه احلي واجمل بنت شافتها عيني البنت اللي عيشتني اجمل ايام حياتي معاها ولسه هعيش عمري الجاي كله معاها ان شاء الله كل حاجه معاكي حلوه كلامنا هزارنا ضحكنا حتي الاوقات اللي بنتخانق فيها كل ده حلو معاكي يملوكه عايز كمان اقولك ان انا لو لفيت الدنيا دي شبر شبر مش هلاقي بنت زيك بتخاف عليا من اي حاجه بتحبني من قلبها بجد بتغير عليا من اي حاجه حنينه عليا زيك يست البنات ربنا يخليكي ليا وميحرمنيش منك ابدا ي اجمل واحده ف الكون كله انا فاكر كل لحظه عيشتها معاكي حلوه او وحشه من ساعه ما دخلتي حياتي وانا والله انسان تاني خلتيني احب الحياه وخلتيني احبك بسحرك معرفش انتي سحراني ولا سحرالي ولا اي بس يارب الحب اللي ف قلبي ليكي يكتر اكتر واكتر انا والله لو قعدت اوصفلك وابينلك انا بحبك قد اي مش هقدر اوفيكي حقك انا مبقيتش اتمني حاجه م الدنيا دي غير اني اكمل حياتي كلها معاكي عشان انتي اصلا كل حياتي ونتجوز ونعيش سوا يحبيبتي ده اول عيد ميلاد ليكي واحنا سوا وعقبال كل سنه يارب انتي احلي صدفه ف حياتي بشكر جدا الصدفه اللي جمعتنا سوا واللي بسببها احنا مع بعض دلوقتي مع ان مكانش حد يقدر يتخيل ده لسه فاكر اول مره اتكلمنا فيها باليوم والشهر والسنه وكل تفصيله وفاكر اول مره قولتلك بحبك فيها كل تفصيله ف حياتنا انا ممتن جدا ليها ي احلي حاجه ف حياتي كل سنه وانتي طيبه يحبيبتي كل سنه وانتي معايا ودايما ف قلبي كل سنه وانتي بتحلوي ف عيني اكتر واكتر كل سنه وانتي لسه زي منتي مكانك ف قلبي مبيتغيرش كل سنه وانتي وجودك منور حياتي ويارب متفارقنيش ابدا كل سنه وانتي حاجه انا مهما بتكلم بعجز عن وصفك برضو كل سنه واحنا سند وضهر لبعض ده احلي واجمل 18 سنه ف الدنيا والله اجمل واحده ف الدنيا تتم 18 سنه وعايز اقولك اني بحبك اوي والله ومش عايز حاجه غيرك م الدنيا ربنا يخليكي ليا يست البنات وميحرمنيش من وجودك وجمالك وضحكتك وكل حاجه فيكي والله 🥹
            </p>

            {/* صف القلوب المتناسق داخل المساحة البيج */}
            <div className="my-2 sm:my-2.5 text-[10px] sm:text-xs tracking-widest text-[#e22f5e] flex flex-wrap justify-center gap-0.5 max-w-full">
              <span>♥️♥️♥️♥️♥️♥️♥️♥️</span>
              <span>♥️♥️♥️♥️♥️♥️♥️♥️</span>
            </div>

            <div className="mt-2 sm:mt-3 space-y-1 text-center w-full">
              <p className="font-serif text-[9.5px] sm:text-[11.5px] md:text-[13px] font-bold text-[#6b283d] break-words [overflow-wrap:anywhere] [word-break:break-word] text-center leading-snug">
                Alles Gute zum Geburtstag, meine erste und letzte Liebe 💍♥️
              </p>
              <p className="font-serif text-[9.5px] sm:text-[11.5px] md:text-[13px] font-bold text-[#6b283d] break-words [overflow-wrap:anywhere] [word-break:break-word] text-center leading-snug">
                İyi ki doğdun, ilk ve son aşkım 🥹♥️
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: VIDEO COLLAGE & SONGS ================= */}
      <section className="relative w-full overflow-hidden px-4 py-16 sm:px-10 min-h-screen">

        <div
          className="absolute left-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
        ></div>
        <div
          className="absolute right-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
        ></div>

        {/* عنوان السكشن في المنتصف بدون تداخل */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-20 mx-auto text-center font-serif text-3xl sm:text-5xl uppercase tracking-widest text-[#fff5f7] drop-shadow-md mb-8 sm:mb-12"
        >
          THESE VIDEOS ARE FOR YOU ✨
        </motion.h2>

        <div className="relative mx-auto w-full max-w-5xl h-[2000px] sm:h-[2400px] z-10">

          {/* Pair 1: Video 1 & Video 2 */}
          {VIDEOS.slice(0, 2).map((video, i) => (
            <CollageVideoCard
              key={video.id}
              video={video}
              index={i}
            />
          ))}

          {/* Song 1 (a1) between Pair 1 and Pair 2 */}
          <div className="absolute top-[26%] left-[3%] right-[3%] sm:left-[20%] sm:right-[20%] z-30">
            <CollageAudioCard
              id="a1"
              src="a1"
              title="Song 01 🎵"
              subtitle="Special Melody for You ✨"
            />
          </div>

          {/* Pair 2: Video 3 & Video 4 */}
          {VIDEOS.slice(2, 4).map((video, i) => (
            <CollageVideoCard
              key={video.id}
              video={video}
              index={i + 2}
            />
          ))}

          {/* Song 2 (a2) between Pair 2 and Pair 3 */}
          <div className="absolute top-[60%] left-[3%] right-[3%] sm:left-[20%] sm:right-[20%] z-30">
            <CollageAudioCard
              id="a2"
              src="a2"
              title="Song 02 🎵"
              subtitle="Forever in My Heart 💖"
            />
          </div>

          {/* Pair 3: Video 5 & Video 6 */}
          {VIDEOS.slice(4, 6).map((video, i) => (
            <CollageVideoCard
              key={video.id}
              video={video}
              index={i + 4}
            />
          ))}

        </div>

        {/* ================= FINAL STANDALONE SONG: A3 ================= */}
        <div className="relative z-20 mx-auto w-full max-w-md sm:max-w-xl mt-10 mb-12 px-2">
          <CollageAudioCard
            id="a3"
            src="a3"
            title="Song 03 🎶"
            subtitle="The Most Special Song For My Girl 💖"
            isSpecial={true}
            specialMessage="الاغنيه دي عشان انتي بتحبيها ♥️♥️♥️♥️♥️♥️"
          />
        </div>

        <div className="relative z-20 mt-4 pb-12 flex justify-center">
          <motion.button
            type="button"
            onClick={handleRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-[#9c2d52] px-10 py-4 font-serif text-sm uppercase tracking-widest text-[#fff5f7] shadow-xl border border-[#fff5f7]/20 cursor-pointer"
          >
            Read it again
          </motion.button>
        </div>

      </section>

    </div>
  );
}