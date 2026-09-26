import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
        document.querySelectorAll('audio, video').forEach((el) => {
          if (el !== videoRef.current) el.pause();
        });
        videoRef.current.play().catch(() => {});
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
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ea658e]/95 text-white flex items-center justify-center shadow-xl border border-white/50 group-hover:scale-110 transition-transform">
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
      className={`z-30 bg-gradient-to-br from-[#ee7197] to-[#e45c85] p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-[0_14px_32px_rgba(234,101,142,0.3)] border-2 border-white/50 backdrop-blur-md flex flex-col justify-between ${className || ''}`}
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
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#c93f69] border-2 border-white/40 flex items-center justify-center shadow-md cursor-pointer"
            onClick={togglePlay}
          >
            <div className="w-4 h-4 rounded-full bg-[#FEBAE5] border border-white/40 flex items-center justify-center">
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
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#ea658e] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform shrink-0 cursor-pointer"
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
          className="relative flex-1 h-2 bg-[#c93f69] rounded-full overflow-hidden cursor-pointer group"
        >
          <div
            className="h-full bg-gradient-to-r from-pink-200 to-white rounded-full transition-all duration-100"
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

export default function PhotoCollage({ onRestart }) {
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

  return (
    <div className="relative w-full overflow-hidden bg-[#FEBAE5] px-4 py-16 sm:px-10">
      
      {/* الإطارات الوردية (الخلفية) */}
      <img
        src="/images/flowers-left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-24 sm:w-36 object-cover object-left opacity-95 z-0"
      />
      <img
        src="/images/flowers-right.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-24 sm:w-36 object-cover object-right opacity-95 z-0"
      />

      {/* العنوان في المنتصف أعلى الفيديوهات */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-20 mx-auto text-center font-serif text-3xl sm:text-5xl uppercase tracking-widest text-[#7d1a3b] font-bold drop-shadow-sm mb-8 sm:mb-12"
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

      {/* زر إعادة القراءة في أسفل الصفحة تماماً */}
      <div className="relative z-20 mt-4 pb-12 flex justify-center">
        <motion.button
          type="button"
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full bg-[#ea658e] px-10 py-4 font-serif text-sm uppercase tracking-widest text-white shadow-xl border border-white/40 hover:bg-[#d85079] transition-all cursor-pointer"
        >
          Read it again
        </motion.button>
      </div>

    </div>
  )
}