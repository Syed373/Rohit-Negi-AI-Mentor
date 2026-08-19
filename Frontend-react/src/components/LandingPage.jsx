import { useEffect, useState, useRef } from 'react';
import { 
  FaArrowRight, FaCode, FaMicrophone, FaClockRotateLeft, FaLanguage, 
  FaChevronDown, FaMessage, FaWandMagicSparkles, FaUserGraduate, 
  FaLightbulb, FaCheck, FaXmark
} from 'react-icons/fa6';
import Logo, { Icon } from './Logo';

// FadeIn Component for scroll animations
const FadeIn = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const getTranslate = () => {
    if (isVisible) return 'translate-y-0 translate-x-0';
    switch (direction) {
      case 'up': return 'translate-y-10';
      case 'down': return '-translate-y-10';
      case 'left': return 'translate-x-10';
      case 'right': return '-translate-x-10';
      default: return 'translate-y-10';
    }
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${getTranslate()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Accordion for FAQ
const Accordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <button
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{question}</span>
        <FaChevronDown className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
        aria-hidden={!isOpen}
      >
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const LandingPage = ({ onStartChat }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-[var(--accent)] selection:text-white">
      
      {/* 1. Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Logo showText={true} />
          <div className="hidden md:flex items-center gap-8">
            <a href="#problem" onClick={(e) => scrollToSection(e, 'problem')} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[var(--accent)] dark:hover:text-[var(--accent)] transition-colors">Why GuruAI</a>
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[var(--accent)] dark:hover:text-[var(--accent)] transition-colors">Features</a>
            <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[var(--accent)] dark:hover:text-[var(--accent)] transition-colors">How it works</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[var(--accent)] dark:hover:text-[var(--accent)] transition-colors">FAQ</a>
          </div>
          <button 
            onClick={onStartChat}
            className="px-5 py-2.5 text-sm font-semibold bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-all hover:shadow-md hover:shadow-[var(--accent)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Start chatting
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-[var(--accent)] text-sm font-semibold mb-8 border border-emerald-200 dark:border-emerald-800/30">
            <FaWandMagicSparkles />
            Built for DSA & System Design Prep
          </div>
        </FadeIn>
        
        <FadeIn delay={100}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight max-w-4xl">
            Learn DSA the way your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-teal-400">senior</span> would explain it.
          </h1>
        </FadeIn>
        
        <FadeIn delay={200}>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            GuruAI is a bilingual AI mentor that breaks down complex Data Structures and Algorithms naturally in English and Hindi—inspired by the teaching style of Rohit Negi.
          </p>
        </FadeIn>
        
        <FadeIn delay={300} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <button 
            onClick={onStartChat}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[var(--accent)] text-white text-lg font-semibold rounded-xl shadow-lg shadow-[var(--accent)]/30 hover:bg-[var(--accent-hover)] transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Start chatting <FaArrowRight />
          </button>
          <a 
            href="#how-it-works"
            onClick={(e) => scrollToSection(e, 'how-it-works')}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-lg font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
          >
            See how it works
          </a>
        </FadeIn>

        {/* Hero Visual Mockup */}
        <FadeIn delay={400} className="w-full max-w-5xl mx-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-4 md:p-6 shadow-2xl relative overflow-hidden">
          {/* Mac-like header */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          
          <div className="flex flex-col gap-6 text-left">
            <div className="flex gap-4 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-200 shrink-0">You</div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl rounded-tr-sm border border-gray-100 dark:border-gray-600 shadow-sm text-gray-800 dark:text-gray-200 text-sm md:text-base max-w-[80%]">
                I'm stuck on reversing a linked list. Can you explain it simply?
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0 p-1">
                <Icon className="w-full h-full text-white" />
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl rounded-tl-sm border border-gray-100 dark:border-gray-600 shadow-sm text-gray-800 dark:text-gray-200 text-sm md:text-base max-w-[90%]">
                <p className="mb-3">Bhai, reverse a linked list is a classic! 🚀 Socho tumhare paas ek line mein log khade hain, aur sab apne aage wale ko point kar rahe hain. Reverse karne ka matlab hai sabko peeche wale ko point karwana.</p>
                <p className="mb-3">We just need 3 pointers: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-[var(--accent)]">prev</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-[var(--accent)]">curr</code>, and <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-[var(--accent)]">next</code>.</p>
                <div className="bg-gray-900 rounded-lg p-3 text-gray-300 font-mono text-xs overflow-x-hidden border border-gray-700">
                  <span className="text-pink-400">while</span> (curr != <span className="text-blue-400">null</span>) {'{'}
                  <br/>&nbsp;&nbsp;next = curr.next;
                  <br/>&nbsp;&nbsp;curr.next = prev;
                  <br/>&nbsp;&nbsp;prev = curr;
                  <br/>&nbsp;&nbsp;curr = next;
                  <br/>{'}'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-800/90 to-transparent pointer-events-none"></div>
        </FadeIn>
      </section>

      {/* 3. Problem -> Solution Section */}
      <section id="problem" className="py-24 bg-gray-50 dark:bg-gray-800/30 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why generic chatbots fall short for learning</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Most students hit a wall on the same handful of DSA concepts alone, and generic AI answers feel like reading a textbook.
            </p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <FadeIn direction="right" className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 text-red-500 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <FaXmark size={20} />
                </div>
                <h3 className="text-2xl font-bold">Standard AI Chatbots</h3>
              </div>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-red-400 shrink-0">•</span>
                  <span>Give correct but robotic, textbook-style explanations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-red-400 shrink-0">•</span>
                  <span>Strictly monolingual, missing the nuances of colloquial tech discussions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-red-400 shrink-0">•</span>
                  <span>Just print the solution without guiding you to the "aha!" moment.</span>
                </li>
              </ul>
            </FadeIn>
            
            <FadeIn direction="left" className="bg-white dark:bg-gray-800 p-8 rounded-2xl border-2 border-[var(--accent)] shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/10 rounded-bl-full -z-10"></div>
              <div className="flex items-center gap-3 text-[var(--accent)] mb-6">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                  <FaCheck size={20} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">The GuruAI Approach</h3>
              </div>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[var(--accent)] shrink-0">•</span>
                  <span>Mimics a real mentor's voice, focusing on intuition and logic.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[var(--accent)] shrink-0">•</span>
                  <span>Mixes Hindi and English naturally, making complex topics relatable.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[var(--accent)] shrink-0">•</span>
                  <span>Available 24/7—no waiting for office hours or a senior's free time.</span>
                </li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to master code</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A purpose-built interface designed for distraction-free learning and problem-solving.
          </p>
        </FadeIn>

        <div className="space-y-24 md:space-y-32">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <FadeIn direction="right" className="flex-1 text-left">
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-6">
                <FaLanguage size={28} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Authentic Mentor Persona</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                GuruAI doesn't just feed you answers. It talks to you like a supportive senior dev, blending Hindi and English effortlessly. Expect encouraging signature phrases and relatable analogies that make hard concepts stick.
              </p>
            </FadeIn>
            <FadeIn direction="left" className="flex-1 w-full">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm h-64 flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600 shadow-sm w-5/6 ml-auto rounded-tr-sm text-sm">
                    Can you explain Time Complexity?
                  </div>
                  <div className="bg-emerald-50 dark:bg-[var(--accent)]/10 p-4 rounded-xl border border-emerald-100 dark:border-[var(--accent)]/20 shadow-sm w-5/6 rounded-tl-sm text-sm border-l-4 border-l-[var(--accent)]">
                    Haan bilkul! Time complexity bas ye batata hai ki jab tumhara input size badhega, toh code ko run hone mein kitna extra time lagega. Socho agar tumhe ek array mein element dhundna hai...
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
            <FadeIn direction="left" className="flex-1 text-left">
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-6">
                <FaClockRotateLeft size={28} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Persistent Chat History</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Don't lose your train of thought. GuruAI automatically saves your conversations locally. Switch seamlessly between your Graph theory session and your System Design mock interview.
              </p>
            </FadeIn>
            <FadeIn direction="right" className="flex-1 w-full">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm h-64 flex items-center">
                <div className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
                  <div className="p-3 border-b border-gray-100 dark:border-gray-800 font-medium text-sm flex items-center gap-2">
                    <FaClockRotateLeft className="text-gray-400" /> Recent Chats
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="p-2 rounded bg-gray-100 dark:bg-gray-800 text-[var(--accent)] text-sm flex items-center gap-2">
                      <FaMessage size={12} /> DP Tabulation vs Memoization
                    </div>
                    <div className="p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2">
                      <FaMessage size={12} /> System Design: Rate Limiter
                    </div>
                    <div className="p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2">
                      <FaMessage size={12} /> Binary Search Edge Cases
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <FadeIn direction="right" className="flex-1 text-left">
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-6">
                <FaCode size={28} />
              </div>
              <h3 className="text-3xl font-bold mb-4">First-Class Code Support</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Read code clearly. GuruAI renders responses with full markdown support and beautiful Prism.js syntax highlighting for code blocks. Found a snippet you like? Copy it with one click.
              </p>
            </FadeIn>
            <FadeIn direction="left" className="flex-1 w-full">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm h-64 flex items-center justify-center">
                <div className="w-full max-w-sm rounded-xl overflow-hidden border border-gray-700 bg-[#1e1e1e] shadow-lg">
                  <div className="flex justify-between items-center px-4 py-2 bg-[#2d2d2d] text-gray-400 text-xs font-mono border-b border-gray-700">
                    <span>cpp</span>
                    <span className="flex items-center gap-1 text-[var(--accent)]"><FaCheck /> Copied</span>
                  </div>
                  <div className="p-4 text-sm font-mono text-gray-300">
                    <span className="text-pink-400">int</span> <span className="text-blue-300">binarySearch</span>(vector&lt;<span className="text-pink-400">int</span>&gt;& arr, <span className="text-pink-400">int</span> target) {'{'}
                    <br/>&nbsp;&nbsp;<span className="text-gray-500">// Implementation</span>
                    <br/>&nbsp;&nbsp;<span className="text-pink-400">return</span> -1;
                    <br/>{'}'}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Feature 4 & 5 Combined in a Grid for variety */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <FadeIn direction="up" className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-10 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-6">
                <FaMicrophone size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Hands-Free Voice Input</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Tired of typing out long logic questions? Just click the microphone and dictate your thoughts naturally. The Web Speech API handles the rest.
              </p>
              <div className="flex items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center animate-pulse">
                  <FaMicrophone size={24} />
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={100} className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-10 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-6">
                <FaLightbulb size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Native Light/Dark Mode</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Late night leetcode sessions? Toggle dark mode to save your eyes. The interface adapts instantly, respecting your system preferences by default.
              </p>
              <div className="flex mt-8 gap-4">
                <div className="flex-1 h-24 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center text-gray-400 font-medium">Light</div>
                <div className="flex-1 h-24 bg-gray-900 border border-gray-700 rounded-xl shadow-sm flex items-center justify-center text-gray-500 font-medium">Dark</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Three simple steps to unblock your coding progress.</p>
          </FadeIn>
          
          <div className="flex flex-col md:flex-row gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-gray-200 via-[var(--accent)] to-gray-200 dark:from-gray-700 dark:via-[var(--accent)] dark:to-gray-700 z-0"></div>
            
            {[
              { num: 1, title: "Ask naturally", desc: "Type or speak your question in Hindi, English, or Hinglish. No strict formatting needed." },
              { num: 2, title: "Get mentored", desc: "Receive a detailed, intuitive breakdown with examples, analogies, and clean code snippets." },
              { num: 3, title: "Dive deeper", desc: "Ask follow-ups, request edge cases, or switch topics. GuruAI remembers the context." }
            ].map((step, idx) => (
              <FadeIn key={idx} delay={idx * 150} direction="up" className="flex-1 relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 border-4 border-gray-50 dark:border-gray-900 shadow-xl flex items-center justify-center text-3xl font-bold text-[var(--accent)] mb-6 ring-1 ring-gray-200 dark:ring-gray-700">
                    {step.num}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed px-4">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Persona Spotlight Section */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-[var(--accent)]/5 dark:bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent)] text-white mb-6 shadow-lg shadow-[var(--accent)]/30">
              <FaUserGraduate size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Designed for real students</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              GuruAI was built with a specific learner in mind: students preparing for rigorous DSA interviews, campus placements, and system design rounds. 
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>The Inspiration:</strong> This AI persona is a fan-built homage to Rohit Negi (Coder Army), designed to capture the encouraging, bilingual, and highly practical teaching style that has helped thousands of students succeed. Note: This project is an independent creation and is not officially affiliated with Rohit Negi.
            </p>
          </div>
          <div className="md:w-1/3 w-full flex justify-center">
            <div className="relative w-full max-w-xs aspect-square rounded-full border-8 border-white dark:border-gray-800 shadow-2xl bg-gradient-to-br from-[var(--accent)] to-teal-400 flex items-center justify-center overflow-hidden">
              <Icon className="w-1/2 h-1/2 text-white/90" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="py-24 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </FadeIn>
          
          <FadeIn delay={100} className="space-y-2">
            <Accordion 
              question="Is GuruAI free to use?" 
              answer="Yes! GuruAI is an open-source project and completely free to use. You just need to run it locally with your own Google Gemini API key." 
            />
            <Accordion 
              question="Does it save my chat history?" 
              answer="Yes, all your chat history is saved locally in your browser's localStorage. This means your conversations persist across sessions, but remain completely private to your device." 
            />
            <Accordion 
              question="What topics can I ask about?" 
              answer="GuruAI is specifically prompted to excel at Data Structures, Algorithms (DSA), System Design, and general software engineering concepts. However, powered by Gemini, it can help with a wide variety of coding questions." 
            />
            <Accordion 
              question="Is my data private?" 
              answer="Your chat history never leaves your device—it is saved in your browser. The prompts you send are routed to Google's Gemini API for processing, subject to Google's API terms." 
            />
            <Accordion 
              question="Can I use it in Hindi?" 
              answer="Absolutely. GuruAI is explicitly designed to be a bilingual mentor. You can ask questions in pure Hindi, pure English, or Hinglish, and it will respond in a natural, conversational tone." 
            />
          </FadeIn>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="py-24 bg-[var(--accent)] relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to master DSA?</h2>
            <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
              Stop struggling with textbook explanations. Start chatting with a mentor that understands exactly how you learn.
            </p>
            <button 
              onClick={onStartChat}
              className="px-10 py-5 bg-white text-[var(--accent)] text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              Start Chatting Now
            </button>
          </FadeIn>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <Logo showText={true} />
            <div className="flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
              <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-[var(--accent)] transition-colors">Features</a>
              <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-[var(--accent)] transition-colors">FAQ</a>
              <a href="https://github.com/Syed373/GuruAI" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors">GitHub</a>
            </div>
          </div>
          <div className="text-center md:text-left text-xs text-gray-500 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} GuruAI. Open Source Project.</p>
            <p>Inspired by the teaching style of Rohit Negi / Coder Army. Not officially affiliated.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;