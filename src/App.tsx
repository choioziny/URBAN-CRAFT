import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft,
  ArrowUp,
  Hammer, 
  Leaf, 
  Instagram, 
  Youtube, 
  PlayCircle, 
  Quote,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

const IMAGES = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIM263hMb8HpyIs5xtiPJrjCRHNuQcjIPOAY4nugeFXLtU7HpgejQLlfFTqh5aZmTh0sj9CSKYex_oBBAbwn-vDBwfgP4UgO4tsQ74Ls-SJ5qQZcaoVlfxCp6pT_g_KZHsL6WdCbpgSQkWq3Ro8Rpu6aUBEnzSd-5SVaX9wZKLx2PknOHiTHG6CWq1W1Hr3yWSTEayuG1EMAWO-u9lMtBMXZm52scmXnt4f3D-Uu5FDo_ywPF2bmM01okblQIbCgErJTlt-V_D_7M",
  philosophy1: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9LvtN0Evj34HLGrQIR7G9BRby9j-OBDOtkWcKsYFmeS3_IhDITy2JOsXOs1nsMWVyXU_Ukurz9LoVkj7DYAGL-1W4HzM9XuJ8fVQl01uSEVcs2vKFQyVTawEh8sTZuFwAZa_m6iWoGsiesfh5VGpIjNSSSoasjQ3SUSeEr3ZC0ViPGdBXKHT7tmS-1cY2upJGbTRre8-TkN_1J7JmtQ5brKSvfhS-fReq7ULLuQl0PkNDrS3ATpLWiQApZeZhQ9nALpf3MEJBPc8",
  philosophy2: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcCHqAuvU82sRbD3ETu0xxTt6fU1Hd8Nvk7ONPvE0_b7vJegZW86qJPsS6GU_e4AATPESr4Ye-R2abxZlgh8yYXAFxYyQuWLfGfjbT-qQ1pbmGnJ_XhESZX8LhxzNzn5q0rhVI-uVzMkgm46VVMdAc1qOYlXxPOpOkdczZ3Fe2rdcXD51riNmVfdf1RBhG4BqvcdSYhlYxaHMcCY9qSOWjYj5kEMkvM707zdxlbxiHr1TC1ry6Xw4chcB3j3Tpkck5Xod2h1kGq5c",
  portfolio1: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZGmXbb_O7EIvzWOAevGBw78-KG8hZZtwfzQJhew9rGSHQzHTrIBJ3CKuYXFX-KnwBIftYsckGjh0mnPSz4pyN90cI4EKG0J2Vuqy8-nwX5LW6yuqozT6-ou5QTr9OhGVX4m5-V72vyGz-zs8MSbkTlP-iKI3jQovrXaFqBzTLZogc3xo5Ki15HuTQFkdD6VhGnqMPJJY8t78-CMWia5bOlAA4dbYZk2vGT-iWTbVnon5UQm8tg5vqRc6YXNenO-fDZjC5AwZCQbs",
  portfolio2: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQpYJV9NVZHj6Vx02J8VB3jPLQr7S-Sjsrf78M1uuswByh0H7AppbqZNbJQkYIFhZ8e-KSRF2QzjAZUqbZfHgDrhNphznLFfkhxDGgl7SKrZpZ6z_reKn36O1L32x-EWE__BwCEXrOqrHK33b3u36T4pI_S7rGRM9iJiZFalSxV_pE9xloDT7jM9fskD4_uF1uFlg0XS9NkWNSrnILZLpQQUda5iBAK2LPqy3pDbmfTuMTEEJVldUL8PBJnTQpZU2upgN1wbLcMvM",
  portfolio3: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOrR8jiw5dlUjRCOkpj3XTn9m5p3qi-Cq_p5rmYrXc0InkHbXPNAx_6U06Df3oQ4IuArSSdvlOXMgYTtwKVdf85EdWCu_0r3vsiVs6fb5K5qu5U244-V45FDivVv-VgOYLRs1uqtbCcdBrTfrt8aiKNktwwyqD-WJow3i5kg_pvu-72EwErZ1WBb1jfkNmqLm1xT-DpQraVMBmppzkeexx6Q6SIYFRXXG7-7U3Fh8qphhWRTy6msZAq0T1XkO5nunc2lALaKeXqgo",
  testimonial: "https://lh3.googleusercontent.com/aida-public/AB6AXuCElXglWaOMUUmCv-ycKMgr_omC6gL76f7Q2RXQHVIXyvM-0OlOijKDSTyIkI74WmF5GhoHMe0Jc3ucfoJ1qbg9jV5c6R91UXwS6RqLsALv6NSZsDDtirVHzLkgxOXwG8C94OX9jNMyQZaMNp86JcX5oH_0jOpZW7sjhZHLitBGuXxbR8U8ky1zXq2QvFwzIUQL69KZ5okVo4pGu9qE6M4XHIU1vn7EXfJPV_c_BFzfLDN8pArB9wj_BpLsJ0_a4YiAEppVTtNLm7w",
  logo: "https://postfiles.pstatic.net/MjAyNjA1MDNfNDgg/MDAxNzc3Nzg2MzAzNjkx.ZgQ85EPfKgWRCulb-q8vVxdH0qpxLFs-qUlMG8xyPWwg.E2LdNEzGXaznn6P04Z7ySIvRN-9SMtAApbumqxni6gUg.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_3%EC%9D%BC_%EC%98%A4%EC%A0%84_01_13_14.png?type=w773",
  intro: "https://postfiles.pstatic.net/MjAyNjA1MDNfNzYg/MDAxNzc3Nzg2NTI1Mjgy.Zu7eH2hTCASLSvXuNEvamDgJ7cBejH00S2aoBzIC5Ksg.zmj1BvnayNpT_mbF-mbt0wNcbPrIBaw8eTO9f9uRKAsg.GIF/GIF_2026-05-03_%EC%98%A4%ED%9B%84_2-33-11.gif?type=w3840"
};

const IntroScreen = ({ onComplete }: { onComplete: () => void, key?: string }) => {
  return (
    <motion.div 
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-white flex items-center overflow-hidden cursor-default"
    >
      <motion.img 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        src={IMAGES.intro}
        alt="Urban Craft Intro"
        className="absolute inset-0 w-full h-full object-cover brightness-[1.05]"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/20 to-transparent"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-10 text-[#7D6452]"
        >
          <p className="text-lg md:text-2xl font-bold tracking-[0.2em] mb-4">공간에 가치를 더하다.</p>
          <h1 className="text-4xl md:text-7xl font-sans font-extralight tracking-tight uppercase leading-none">URBAN CRAFT</h1>
          <p className="text-sm md:text-base mt-4 tracking-[0.6em] font-bold">어반크래프트</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="bg-[#7D6452] text-white px-10 py-5 rounded-full font-medium uppercase tracking-widest text-sm hover:opacity-90 transition-all flex items-center gap-3 group shadow-xl"
        >
          사이트 보러가기
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

    </motion.div>
  );
};

const Navbar = ({ onConsult }: { onConsult: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: '홈', href: '#' },
    { name: '소개', href: '#philosophy' },
    { name: '포트폴리오', href: '#portfolio' },
    { name: '시공사례', href: '#portfolio' },
    { name: '고객후기', href: '#testimonials' },
    { name: '문의하기', href: '#consultation' },
  ];

  return (
    <header className="glass-nav font-serif antialiased sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-8 py-2 max-w-7xl mx-auto">
        <a className="flex items-center" href="#">
          <img src={IMAGES.logo} alt="URBAN CRAFT" className="h-14 md:h-20 w-auto object-contain" referrerPolicy="no-referrer" />
        </a>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              className="text-stone-500 font-medium hover:text-stone-800 transition-colors duration-300" 
              href={item.href}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={onConsult} className="hidden sm:block button-primary !py-2 !px-6 text-xs">
            상담 신청
          </button>
          <button className="md:hidden text-stone-800" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-stone-100 p-8 flex flex-col gap-6 md:hidden shadow-lg"
          >
            {navItems.map((item) => (
              <a 
                key={item.name} 
                className="text-lg font-medium text-stone-800" 
                href={item.href} 
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button onClick={() => { onConsult(); setIsOpen(false); }} className="button-primary w-full text-center">상담 신청</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const HERO_IMAGES = [
  "https://postfiles.pstatic.net/MjAyNjA1MDVfMTM4/MDAxNzc3OTA3NjcxMTM3.vyzuVmzQ0HpbJgPctLWITyOhY6LLJnqNpukStf8UAO4g.a5fVErxRKOaEdNlvbjqIMFz-nYU3kJc1LgMLW6X2Ghwg.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_3%EC%9D%BC_%EC%98%A4%ED%9B%84_04_50_28.png?type=w3840",
  "https://postfiles.pstatic.net/MjAyNjA1MDVfNjAg/MDAxNzc3OTA3NjcxMTMy.2bTDhb9Gu-Wp8UpoogjeMH8MwuAUYlSPgleFCz1RrRMg.CJoUekmBpDVfVCNx9pPcaGec4SAqx-KMPVyKva-9vMIg.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_3%EC%9D%BC_%EC%98%A4%ED%9B%84_04_47_52.png?type=w3840",
  "https://postfiles.pstatic.net/MjAyNjA1MDVfMTc4/MDAxNzc3OTA3NjcxMTc4.vYY0AuLLxh0GbW4U0S0NF4xdvXWJ8OPsP0JRrU-LZbQg.NIsduxHaLR9cAJ5wPpqNfsfnRYM2nVutnwcwaY8tfRMg.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_3%EC%9D%BC_%EC%98%A4%ED%9B%84_04_47_44.png?type=w3840"
];

const Hero = ({ onConsult, onViewPortfolio }: { onConsult: () => void, onViewPortfolio: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[90vh] md:h-screen w-full flex items-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 bg-stone-100">
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img 
              className="w-full h-full object-cover" 
              src={HERO_IMAGES[currentImageIndex]} 
              alt={`Urban Craft Interior ${currentImageIndex + 1}`}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent z-[5]"></div>
      </motion.div>
      
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-8 w-full text-stone-900"
      >
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-sans font-extralight text-4xl md:text-6xl mb-6 leading-tight uppercase tracking-tighter text-[#634c3b]"
          >
            DESIGN YOUR LIFE,<br/>CRAFT YOUR SPACE
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-lg md:text-xl text-[#634c3b] mb-10 max-w-3xl leading-relaxed font-sans"
          >
            어반크래프트는 당신의 삶을 담는 그릇을 빚습니다.
            <br />
            현대 건축의 틀 안에서 따스한 나무의 숨결과 세심한 장인 정신으로 완성하는 나만의 공간.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex flex-wrap items-center gap-6"
          >
            <button 
              onClick={onViewPortfolio}
              className="bg-[#7d6452] text-white px-10 py-5 font-bold uppercase tracking-widest hover:opacity-90 transition-all text-xs"
            >
              포트폴리오
            </button>
            <button onClick={onConsult} className="bg-white border border-[#7d6452]/30 text-[#7d6452] px-10 py-5 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              상담 문의하기 <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const PHILOSOPHY_IMAGES = [
  "https://postfiles.pstatic.net/MjAyNjA1MDVfMTc4/MDAxNzc3OTA3NjcxMTc4.vYY0AuLLxh0GbW4U0S0NF4xdvXWJ8OPsP0JRrU-LZbQg.NIsduxHaLR9cAJ5wPpqNfsfnRYM2nVutnwcwaY8tfRMg.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_3%EC%9D%BC_%EC%98%A4%ED%9B%84_04_47_44.png?type=w3840",
  "https://postfiles.pstatic.net/MjAyNjA1MDVfMjQy/MDAxNzc3OTA3NjcxNTgx.Js7imCwSMXMcJLOIpm6b_jv6g0yDmg1pDEt7eVzo9tgg.GIoPzf72AkMQ0vcFrEGphaf2oMojMIkoqMu_-sJOxFAg.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_3%EC%9D%BC_%EC%98%A4%ED%9B%84_04_38_37.png?type=w3840",
  "https://postfiles.pstatic.net/MjAyNjA1MDVfODkg/MDAxNzc3OTA3NjcxNjU2.OUCPndR52YqrHT-JA5FxwbtQlIDETmy3rFgDKhetm5Ig.VADXyqFzX0aKmj0XCCCbEXx5hf6ZvuuVT6TLk8yt3fQg.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_3%EC%9D%BC_%EC%98%A4%ED%9B%84_04_30_12.png?type=w3840"
];

const BrandPhilosophy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PHILOSOPHY_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PHILOSOPHY_IMAGES.length) % PHILOSOPHY_IMAGES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PHILOSOPHY_IMAGES.length);
  };

  return (
    <section id="philosophy" className="py-24 md:py-32 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-5"
        >
          <h2 className="text-editorial text-4xl md:text-5xl text-[#7d6452] mb-6">URBAN CRAFT</h2>
          <h3 className="text-2xl md:text-3xl font-sans font-bold text-[#7D6452] uppercase tracking-[0.25em] mb-8 block">당신의 일상이 예술이 되는<br/>건축적 따스함</h3>
          <p className="text-stone-600 mb-8 text-lg leading-relaxed">단순한 인테리어를 넘어, 우리는 공간을 구성하는 소재의 본질에 집중합니다. 자연이 주는 나무의 질감과 돌의 견고함을 현대적인 디자인 언어로 재해석합니다.</p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 border border-stone-200 rounded-lg">
                <Hammer className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-stone-800 mb-1">정교한 맞춤 공법</h4>
                <p className="text-stone-500">모든 주거 환경의 특성에 맞춘 비스포크 솔루션을 제공합니다.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 border border-stone-200 rounded-lg">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-stone-800 mb-1">친환경 소재의 미학</h4>
                <p className="text-stone-500">시간이 흐를수록 깊이를 더하는 천연 소재만을 고집합니다.</p>
              </div>
            </div>
          </div>
        </motion.div>
  
        <div className="md:col-span-7 flex justify-center">
          <div className="relative aspect-[3/2] overflow-hidden rounded-sm w-full group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img 
                  className="w-full h-full object-cover" 
                  src={PHILOSOPHY_IMAGES[currentIndex]} 
                  alt={`Philosophy detail ${currentIndex + 1}`} 
                  referrerPolicy="no-referrer" 
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-x-0 bottom-8 flex justify-center gap-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={handlePrev}
                className="p-3 bg-white/90 hover:bg-white text-stone-800 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                className="p-3 bg-white/90 hover:bg-white text-stone-800 rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

const WorkProcess = () => {
  const steps = [
    {
      number: "01",
      title: "상담 및 현장 진단",
      description: "고객의 라이프스타일과 공간의 잠재력을 파악합니다. 공간의 본질을 찾기 위한 첫 걸음입니다."
    },
    {
      number: "02",
      title: "공간 설계 및 디자인",
      description: "어반크래프트만의 감각으로 도면을 그리고 자재를 선정합니다. 시뮬레이션을 통해 미리 공간을 경험합니다."
    },
    {
      number: "03",
      title: "정밀 시공 및 감리",
      description: "숙련된 장인들이 설계의 가치를 현장에 구현합니다. 보이지 않는 부분까지 세밀하게 챙깁니다."
    },
    {
      number: "04",
      title: "입주 및 사후 관리",
      description: "완성된 공간의 모든 디테일을 최종 점검합니다. 공간이 삶에 잘 녹아들 수 있도록 지속적으로 관리합니다."
    }
  ];

  return (
    <section id="process" className="py-24 md:py-32 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm tracking-[0.3em] text-[#634c3b] font-medium block mb-4">OUR PROCESS</span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900">어반크래프트 작업 프로세스</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-10 border border-stone-200 hover:bg-[#634c3b] hover:border-[#634c3b] transition-all duration-500 group relative shadow-sm hover:shadow-2xl"
            >
              <span className="text-5xl font-serif text-stone-100 group-hover:text-white/10 transition-colors duration-500 absolute top-6 right-6 select-none">
                {step.number}
              </span>
              <div className="relative z-10">
                <h3 className="text-xl font-medium text-stone-900 group-hover:text-white mb-6 font-sans transition-colors duration-500">{step.title}</h3>
                <p className="text-stone-600 group-hover:text-stone-100 leading-relaxed text-sm transition-colors duration-500">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ScrollRevealSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-stone-900"
    >
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 z-0"
      >
        <img 
          src={IMAGES.philosophy1} 
          className="w-full h-full object-cover opacity-40 grayscale"
          alt="Atmospheric design detail"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-stone-900/60 z-[1]"></div>
      
      <motion.div 
        style={{ scale, opacity }}
        className="relative z-10 text-center px-8"
      >
        <span className="text-white/50 text-xs md:text-sm uppercase tracking-[0.5em] mb-8 block font-bold">Artisanal Dedication</span>
        <h2 className="text-white text-3xl md:text-6xl font-serif leading-tight mb-10 tracking-tight">
          완성도 높은 디테일,<br/>
          비로소 완성되는 삶의 무대
        </h2>
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-px bg-white/20"></div>
          <p className="text-white/60 text-sm md:text-lg max-w-xl font-light leading-relaxed">
            어반크래프트는 보이지 않는 곳까지 세심하게 고민합니다.<br className="hidden md:block" />
            우리의 장인 정신은 당신의 일상을 더욱 빛나게 만듭니다.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const ProjectCard = ({ title, location, category, image, index, onClick }: any) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[16/10] overflow-hidden mb-6 rounded-sm relative">
        <motion.img 
          className="w-full h-full object-cover" 
          src={image} 
          alt={title} 
          referrerPolicy="no-referrer"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
        />
        <div className="absolute inset-0 bg-[#7d6452]/0 group-hover:bg-[#7d6452]/10 transition-colors duration-500"></div>
      </div>
      <motion.span 
        initial={{ opacity: 0.5 }}
        whileHover={{ opacity: 1, x: 5 }}
        className="text-xs text-stone-400 uppercase tracking-widest mb-2 block transition-all"
      >
        {location}
      </motion.span>
      <h3 className="font-serif text-2xl text-stone-800 mb-2 group-hover:text-[#7d6452] transition-colors">
        {title}
      </h3>
      <p className="text-stone-500 text-sm">{category}</p>
      <motion.div 
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        className="h-px bg-[#7d6452]/30 mt-4 origin-left"
      />
    </motion.div>
  );
};

const Portfolio = ({ onViewAll }: { onViewAll: () => void }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6"
        >
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-sm text-stone-400 uppercase tracking-[0.3em] font-bold mb-4 block"
            >
              Portfolio
            </motion.span>
            <h2 className="text-editorial text-4xl md:text-5xl text-stone-800">어반크래프트의 포트폴리오</h2>
          </div>
          <button 
            onClick={onViewAll}
            className="font-bold text-stone-800 border-b-2 border-[#7d6452] pb-1 uppercase tracking-widest hover:text-[#7d6452] transition-all self-start flex items-center gap-2" 
          >
            모든 프로젝트 보러가기 <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <ProjectCard 
            title="빛의 잔상, 대치동 아파트"
            location="Gangnam Residential Project"
            category="62평형 | 천연 무늬목 & 마이크로 시멘트 시공"
            image={IMAGES.portfolio1}
            index={0}
            onClick={onViewAll}
          />
          <ProjectCard 
            title="무의 미학, 한남 하우스"
            location="Hannam-dong Villa"
            category="45평형 | 월넛 가구 커스텀 & 대리석 포인트"
            image={IMAGES.portfolio2}
            index={1}
            onClick={onViewAll}
          />
          <ProjectCard 
            title="숨 쉬는 공간, 성수 아틀리에"
            location="Seongsu Studio Loft"
            category="32평형 | 화이트 오크 마루 & 라인 조명"
            image={IMAGES.portfolio3}
            index={2}
            onClick={onViewAll}
          />
        </motion.div>
      </div>
    </section>
  );
};

const TESTIMONIALS = [
  {
    quote: "어반크래프트는 단순히 예쁜 집을 만드는 것이 아니라,<br className=\"hidden md:block\" /> 우리 가족이 어떻게 살아야 할지를 디자인해주었습니다.<br className=\"hidden md:block\" /> 매일 아침 눈을 뜰 때마다 느껴지는 나무의 온기가 삶의 질을 바꾸어 놓았어요.",
    author: "김지수 님",
    role: "Pangyo Residential Client",
    image: IMAGES.portfolio1
  },
  {
    quote: "공간의 미학적 가치뿐만 아니라 실제 거주 편의성까지 완벽하게 고려해주셨습니다.<br className=\"hidden md:block\" /> 특히 디테일한 마감 처리에 매번 감탄하게 되네요.<br className=\"hidden md:block\" /> 전문성이 느껴지는 최고의 파트너입니다.",
    author: "이정훈 님",
    role: "Hannam Villa Resident",
    image: IMAGES.portfolio2
  },
  {
    quote: "까다로운 요구사항이 많았음에도 불구하고, 항상 친절하게 경청하고 더 좋은 대안을 제시해주셨어요.<br className=\"hidden md:block\" /> 어반크래프트와 함께하면서 집이 단순한 건물이 아닌<br className=\"hidden md:block\" /> '우리만의 안식처'가 되었습니다.",
    author: "박혜원 님",
    role: "Seongsu Studio Owner",
    image: IMAGES.portfolio3
  },
  {
    quote: "기존의 전형적인 인테리어에서 벗어나 창의적이고 감각적인 공간을 원했는데,<br className=\"hidden md:block\" /> 딱 제가 그리던 모습 그대로 구현되었습니다.<br className=\"hidden md:block\" /> 조명 하나, 가구 배치 하나에도 철학이 담겨있어 만족스럽습니다.",
    author: "최준혁 님",
    role: "Gangnam Office Project",
    image: IMAGES.philosophy1
  },
  {
    quote: "시공 과정이 매우 투명하고 체계적이어서 신뢰가 갔습니다.<br className=\"hidden md:block\" /> 일정 준수는 물론 사후 관리까지 책임감 있게 진행해주시는 모습에 감동했어요.<br className=\"hidden md:block\" /> 다음 프로젝트도 꼭 어반크래프트와 하고 싶습니다.",
    author: "정미경 님",
    role: "Bundang Multi-family House",
    image: IMAGES.philosophy2
  }
];

const Counter = ({ value, duration = 2, suffix = "" }: { value: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        setCount(Math.floor(easeOutQuad * value));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, value, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}{suffix}</span>;
};

const Testimonial = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-24 md:py-40 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative mb-16 md:mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm tracking-[0.3em] text-[#634c3b] font-medium block mb-4">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">고객후기</h2>
          <div className="flex gap-8 md:gap-12 text-stone-600">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">Total Projects</span>
              <span className="text-2xl font-serif text-[#634c3b]">
                <Counter value={1250} suffix="+" />
              </span>
              <span className="text-xs mt-1">누적 구매건수</span>
            </div>
            <div className="w-px h-10 bg-stone-200 mt-4"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">Verified Reviews</span>
              <span className="text-2xl font-serif text-[#634c3b]">
                <Counter value={480} suffix="+" />
              </span>
              <span className="text-xs mt-1">고객후기 건수</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div 
        className="relative flex overflow-hidden group/marquee"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div 
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: isPaused ? undefined : [0, "-50%"] }}
          transition={{ 
            duration: 80, 
            ease: "linear", 
            repeat: Infinity,
            repeatType: "loop"
          }}
          style={{ width: "fit-content" }}
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 group flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 w-[400px] shrink-0"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={testimonial.image} 
                  alt="Completed project testimonial" 
                  className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105 grayscale-0 group-hover:grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-stone-900/10 transition-colors duration-500"></div>
                <div className="absolute top-6 left-6 text-white opacity-40 group-hover:opacity-100 transition-opacity">
                  <Quote className="w-8 h-8 fill-current" />
                </div>
              </div>
              
              <div className="p-8 md:p-10 flex flex-col h-[320px] whitespace-normal">
                <div className="flex-1 overflow-hidden">
                  <blockquote className="mb-6">
                    <h3 
                      className="text-stone-700 font-serif text-lg leading-relaxed italic"
                      dangerouslySetInnerHTML={{ __html: testimonial.quote.replace(/<br className=\\"hidden md:block\\" \/>/g, ' ') }}
                    />
                  </blockquote>
                </div>
                
                <div className="flex items-center gap-4 pt-6 border-t border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-[#634c3b] font-bold text-xs ring-4 ring-stone-50">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-sm">{testimonial.author}</p>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CTA = ({ onConsult }: { onConsult: () => void }) => (
  <section id="consultation" className="py-32 bg-[#7d6452] relative overflow-hidden text-center text-white">
    <div className="relative z-10 max-w-7xl mx-auto px-8">
      <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">
        당신만의 특별한 공간을<br/>지금 계획해보세요
      </h2>
      <p className="text-stone-100 mb-12 max-w-2xl mx-auto text-lg opacity-90">
        공간의 가치를 아는 당신을 위해 어반크래프트의 전문 디자이너가 1:1 맞춤 상담을 진행합니다.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button onClick={onConsult} className="bg-white text-[#7d6452] px-12 py-5 font-bold uppercase tracking-widest hover:bg-stone-100 transition-all text-xs">
          간편 상담 신청하기
        </button>
        <button className="border border-white/30 text-white px-12 py-5 font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-xs">
          카카오톡 문의
        </button>
      </div>
    </div>
  </section>
);

const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-2xl overflow-hidden shadow-2xl rounded-sm"
          >
            <div className="p-8 md:p-12">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-stone-400 hover:text-stone-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="mb-10 text-center">
                <span className="text-xs text-[#7d6452] font-bold uppercase tracking-[0.3em] block mb-4">Request Consultation</span>
                <h3 className="font-serif text-3xl md:text-4xl text-stone-800">상담문의하기</h3>
              </div>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('상담 신청이 완료되었습니다.'); onClose(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest px-1">성함</label>
                    <input type="text" required placeholder="홍길동" className="w-full bg-stone-50 border-b border-stone-200 py-3 px-4 focus:border-[#7d6452] outline-none transition-colors text-sm" />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest px-1">연락처</label>
                    <input type="tel" required placeholder="010-0000-0000" className="w-full bg-stone-50 border-b border-stone-200 py-3 px-4 focus:border-[#7d6452] outline-none transition-colors text-sm" />
                  </div>
                </div>
                
                <div className="space-y-2 text-left">
                  <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest px-1">문의 유형</label>
                  <select className="w-full bg-stone-50 border-b border-stone-200 py-3 px-4 focus:border-[#7d6452] outline-none transition-colors text-sm appearance-none">
                    <option>전체 주거 인테리어</option>
                    <option>부분 인테리어 / 가구 맞춤</option>
                    <option>상업 공간 / 오피스</option>
                  </select>
                </div>
                
                <div className="space-y-2 text-left">
                  <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest px-1">상세 문의 내용</label>
                  <textarea rows={4} placeholder="시공 지역, 평형대, 원하시는 컨셉 등을 적어주세요." className="w-full bg-stone-50 border-b border-stone-200 py-3 px-4 focus:border-[#7d6452] outline-none transition-colors text-sm resize-none"></textarea>
                </div>
                
                <div className="pt-4">
                  <button type="submit" className="w-full bg-[#7d6452] text-white py-5 font-bold uppercase tracking-widest hover:opacity-90 transition-all text-xs">
                    상담 신청 보내기
                  </button>
                  <p className="text-[10px] text-stone-400 mt-4 text-center tracking-tighter">* 보내주신 소중한 정보는 담당 디자이너 확인 후 1-2일 내로 연락드립니다.</p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const PortfolioDetail = ({ onClose }: { onClose: () => void }) => {
  const cases = [
    { title: "분당 정자동 아파트", before: "https://postfiles.pstatic.net/MjAyNjA1MDVfMTk0/MDAxNzc3OTA3NjA5MzUx.tGDMGd0t18RhZPnV_sdfu_JUFeAGvx9zDlag9GRw9rsg.gSu44QP_9tPfF8K-MfwkCbl8trFT2uIF9dWtk1_6D44g.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_3%EC%9D%BC_%EC%98%A4%ED%9B%84_04_56_54_(1).png?type=w3840", after: "https://postfiles.pstatic.net/MjAyNjA1MDVfNDUg/MDAxNzc3OTA3NjQxODQz.tlr0CY5fUIyV64MMn-0E0CzFAdXcT-_uff-yU3NfCGAg.fWsCxSEXmCG6v_GqMj2u8Dh82TRGntXVWM4ZButPxG0g.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_3%EC%9D%BC_%EC%98%A4%ED%9B%84_04_56_54_(2).png?type=w3840", description: "노후된 아파트의 변신, 채광을 극대화한 구조 변경" },
    { title: "잠실동 아파트", before: "https://postfiles.pstatic.net/MjAyNjA1MDVfMjM1/MDAxNzc3OTgxNTU2NzUx.obMgVOo1YjQkiEW-MKSKM7FpQYyKqrrmo5GnOiT9yyYg.lYpkv9AAovJSZjaHAr2q4fuCnstLf83vihcs3QyWGxsg.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_5%EC%9D%BC_%EC%98%A4%ED%9B%84_08_29_35.png?type=w3840", after: "https://postfiles.pstatic.net/MjAyNjA1MDVfMTY3/MDAxNzc3OTgxNTYwMDkz.JhVOg6E0E_Udfw2mBw3bnVP9FNrRn6DckQ4MlTTAq1Mg.i51tC6eTn8_mg15_Fgi5AczHrDMRi7-IyLUepo85ge8g.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_5%EC%9D%BC_%EC%98%A4%ED%9B%84_08_39_23.png?type=w3840", description: "본질에 집중한 미니멀리즘 다이닝 공간" },
    { title: "성수동 서울숲 트리마제", before: "https://postfiles.pstatic.net/MjAyNjA1MDVfMzkg/MDAxNzc3OTgxODg1MjQ0.ncWHCJUv2FJcWWoTZciqmGu-WAxL-hlb_p1_q28fTLsg.KlcMRIe69GT40XHsVbv6E5CI5QPmOg__g5XrbtDXWAcg.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_5%EC%9D%BC_%EC%98%A4%ED%9B%84_08_51_14_(1).png?type=w3840", after: "https://postfiles.pstatic.net/MjAyNjA1MDVfMTE4/MDAxNzc3OTgxODkxMzAw.3mK9MJwBGqV4n4zj8S8aVPw9-2njnxKKDch-cUp72bYg.72J6YxE1bJvRL1aqc5W4S7ur0rs5eKscIqUxGbakEVQg.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_5%EC%9D%BC_%EC%98%A4%ED%9B%84_08_51_15_(2).png?type=w3840", description: "도시의 화려함 속에 깃든 휴식의 공간" }
  ];

const GALLERY_ITEMS = [
    {
      url: "https://postfiles.pstatic.net/MjAyNjA1MDVfMyAg/MDAxNzc3OTA3NjcwOTY2.EtccbUqYnI2O4NkQ-Q3OwoJWFQqKm-gv0cdR-P7U2CIg.oTy-rVSisPgLdM4ZWWvzTvab7xHUgqd16ai4GzBvJ-Ag.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_3%EC%9D%BC_%EC%98%A4%ED%9B%84_04_11_16.png?type=w3840",
      title: "담백한 휴식",
      description: "시각적 피로를 줄여주는 미니멀리즘 거실 구성"
    },
    {
      url: "https://postfiles.pstatic.net/MjAyNjA1MDVfMzEg/MDAxNzc3OTA3NjcxMTQ3.4JonZZjkwJwThQtPgDmTa0D5pyirPH802amR_EFkqUgg.hF7OTHPJUVfXEcqZo8GPAtMIi6JHGR_nnjCsvibPuA8g.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_3%EC%9D%BC_%EC%98%A4%ED%9B%84_04_52_12.png?type=w3840",
      title: "본질에 집중한 미학",
      description: "편안하고 아늑한 휴식이 있는 침실"
    },
    {
      url: "https://postfiles.pstatic.net/MjAyNjA1MDVfNjAg/MDAxNzc3OTA3NjcxMTMy.2bTDhb9Gu-Wp8UpoogjeMH8MwuAUYlSPgleFCz1RrRMg.CJoUekmBpDVfVCNx9pPcaGec4SAqx-KMPVyKva-9vMIg.PNG/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_3%EC%9D%BC_%EC%98%A4%ED%9B%84_04_47_52.png?type=w3840",
      title: "고요한 식탁",
      description: "군더더기 없는 라인과 소재의 질감이 강조된 주방"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[110] bg-white overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="mb-24">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          <h2 className="text-editorial text-4xl md:text-5xl text-stone-800 mb-3 leading-tight">어반 크래프트 포트폴리오</h2>
          <p className="text-xl text-stone-500 leading-relaxed">어반크래프트가 진행한 시공 전/후의 극명한 변화와 다양한 프로젝트 리스트를 확인해보세요.</p>
        </div>

        <div className="space-y-32">
          <section>
            <h3 className="font-serif text-3xl text-stone-800 mb-12 flex items-center gap-4">
              시공 전 후
            </h3>
            <div className="grid grid-cols-1 gap-20">
              {cases.map((project, idx) => (
                <div key={idx} className="group">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative aspect-video overflow-hidden rounded-sm">
                      <img src={project.before} className="w-full h-full object-cover grayscale brightness-75" alt="Before" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Before</div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-sm">
                      <img src={project.after} className="w-full h-full object-cover" alt="After" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 left-4 bg-[#7d6452] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">After</div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between items-end">
                    <div>
                      <h4 className="font-serif text-2xl text-stone-800 mb-2">{project.title}</h4>
                      <p className="text-stone-500">{project.description}</p>
                    </div>
                    <span className="text-stone-300 font-mono text-4xl">0{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section className="pb-20">
            <h3 className="text-editorial text-4xl md:text-5xl text-stone-800 mb-12">
              포트폴리오
            </h3>
            <div className="grid grid-cols-1 gap-20">
              {GALLERY_ITEMS.map((item, i) => (
                <div key={i} className="group">
                  <div className="aspect-video overflow-hidden rounded-sm relative">
                    <img 
                      src={item.url} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                      alt={item.title} 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute inset-0 bg-[#7d6452]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="mt-10 group/item">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-[#7d6452] font-mono text-sm font-bold tracking-tighter">PROJECT / 0{i + 1}</span>
                      <div className="h-px flex-1 bg-stone-100 group-hover/item:bg-[#7d6452]/20 transition-colors"></div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                      <div className="space-y-4">
                        <h4 className="font-serif text-2xl md:text-3xl text-[#7d6452] tracking-tighter leading-none">
                          {item.title}
                        </h4>
                        <p className="text-stone-500 text-base md:text-lg font-light leading-relaxed max-w-2xl">
                          {item.description}
                        </p>
                      </div>
                      {/* Removed individual arrow button based on request */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-[100] bg-transparent hover:bg-[#7d6452] border border-[#7d6452] text-[#7d6452] hover:text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 active:scale-95 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Footer = ({ onConsult }: { onConsult: () => void }) => (
  <footer className="bg-white text-stone-400 py-20 border-t border-stone-100">
    <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
      <div className="md:col-span-1">
        <div className="mb-6">
          <img src={IMAGES.logo} alt="URBAN CRAFT" className="h-16 md:h-24 w-auto object-contain" referrerPolicy="no-referrer" />
        </div>
        <p className="leading-relaxed mb-8 text-stone-500 text-sm">Architectural Warmth in Every Detail. 우리는 공간을 통해 사람의 삶을 위로하고 가치를 증명합니다.</p>
        <div className="flex gap-4">
          <a href="#" className="p-2 border border-stone-200 rounded-full hover:bg-stone-50 transition-all text-stone-800"><Instagram className="w-4 h-4" /></a>
          <a href="#" className="p-2 border border-stone-200 rounded-full hover:bg-stone-50 transition-all text-stone-800"><Youtube className="w-4 h-4" /></a>
          <a href="#" className="p-2 border border-stone-200 rounded-full hover:bg-stone-50 transition-all text-stone-800"><PlayCircle className="w-4 h-4" /></a>
        </div>
      </div>
      
      <div>
        <h4 className="text-stone-800 font-bold mb-6 uppercase tracking-widest text-[10px]">Quick Links</h4>
        <ul className="space-y-4 text-xs">
          <li><a href="#" className="hover:text-stone-800 transition-colors">회사 소개</a></li>
          <li><a href="#process" className="hover:text-stone-800 transition-colors">시공 프로세스</a></li>
          <li><button onClick={(e) => { e.preventDefault(); onConsult(); }} className="hover:text-stone-800 transition-colors text-left">견적 문의</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-stone-800 font-bold mb-6 uppercase tracking-widest text-[10px]">Policy</h4>
        <ul className="space-y-4 text-xs">
          <li><a href="#" className="hover:text-stone-800 transition-colors">이용약관</a></li>
          <li><a href="#" className="hover:text-stone-800 transition-colors">개인정보처리방침</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-stone-800 font-bold mb-6 uppercase tracking-widest text-[10px]">Contact</h4>
        <ul className="space-y-4 text-[11px] font-medium text-stone-600">
          <li className="flex gap-3"><MapPin className="w-3.5 h-3.5 text-stone-400" /> 서울특별시 강남구 테헤란로 어반타워 12F</li>
          <li className="flex gap-3"><Phone className="w-3.5 h-3.5 text-stone-400" /> 02-1234-5678</li>
          <li className="flex gap-3"><Mail className="w-3.5 h-3.5 text-stone-400" /> info@urbancraft.co.kr</li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium tracking-widest uppercase text-stone-400">
      <p>© 2024 URBAN CRAFT. ARCHITECTURAL WARMTH IN EVERY DETAIL.</p>
      <div className="flex gap-8">
        <a href="#" className="hover:text-stone-800 transition-colors">Instagram</a>
        <a href="#" className="hover:text-stone-800 transition-colors">Youtube</a>
        <a href="https://section.blog.naver.com/BlogHome.naver?directoryNo=0&currentPage=1&groupId=0" target="_blank" rel="noopener noreferrer" className="hover:text-stone-800 transition-colors">Naver Blog</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewPortfolio, setViewPortfolio] = useState(false);

  const openConsult = () => setIsModalOpen(true);
  const closeConsult = () => setIsModalOpen(false);

  useEffect(() => {
    if (showIntro || isModalOpen || viewPortfolio) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showIntro, isModalOpen, viewPortfolio]);

  return (
    <div className="min-h-screen font-sans selection:bg-primary-container selection:text-white overflow-x-hidden">
      <AnimatePresence>
        {showIntro && (
          <IntroScreen key="intro" onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {viewPortfolio && <PortfolioDetail onClose={() => setViewPortfolio(false)} />}
      </AnimatePresence>

      <ConsultationModal isOpen={isModalOpen} onClose={closeConsult} />

      <Navbar onConsult={openConsult} />
      <main>
        <Hero onConsult={openConsult} onViewPortfolio={() => setViewPortfolio(true)} />
        <BrandPhilosophy />
        <WorkProcess />
        <ScrollRevealSection />
        <Portfolio onViewAll={() => setViewPortfolio(true)} />
        <Testimonial />
        <CTA onConsult={openConsult} />
      </main>
      <Footer onConsult={openConsult} />
      <ScrollToTop />
    </div>
  );
}
