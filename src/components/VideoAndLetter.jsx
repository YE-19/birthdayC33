import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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
      className="z-10 w-full max-w-xl mx-auto bg-gradient-to-br from-[#ee7197] to-[#e45c85] p-6 sm:p-8 rounded-3xl shadow-[0_15px_35px_rgba(234,101,142,0.35)] border-2 border-white/50 text-center"
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
            className="bg-[#c93f69] border border-white/30 rounded-2xl p-2.5 sm:p-3.5 shadow-sm flex flex-col items-center justify-center"
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

export default function VideoAndLetter({ onContinue }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#FEBAE5] px-4 py-14 sm:px-8">
      {/* Floral borders */}
      <img
        src="/images/flowers-left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-12 object-cover object-left opacity-90 sm:w-24 md:w-32"
      />
      <img
        src="/images/flowers-right.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-12 object-cover object-right opacity-90 sm:w-24 md:w-32"
      />

      {/* "I LOVE U" pill label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-8 rounded-full bg-[#ea658e] px-8 py-2 font-serif text-sm uppercase tracking-widest text-white shadow-md border border-white/30"
      >
        I love u
      </motion.div>

      {/* Love timer */}
      <div className="z-10 w-full max-w-xl">
        <LoveTimer />
      </div>

      {/* The letter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="z-10 mt-10 relative w-[95%] max-w-[560px] sm:max-w-[650px] md:max-w-[720px] mx-auto flex flex-col items-center justify-center text-center"
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
      </motion.div>

      {/* Continue to the photo collage */}
      <motion.button
        type="button"
        onClick={onContinue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        aria-label="See our photos"
        className="relative z-10 mt-10 rounded-full bg-[#ea658e] px-8 py-3 font-serif text-sm uppercase tracking-widest text-white shadow-lg border border-white/40 hover:bg-[#d85079] transition-all"
      >
        See our photos ↓
      </motion.button>
    </div>
  )
}
