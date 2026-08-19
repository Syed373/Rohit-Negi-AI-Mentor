import { useEffect, useState, useRef } from 'react';
import { 
  ArrowRight, Code2, Mic, History, Languages, 
  ChevronDown, MessageSquare, Sparkles, GraduationCap, 
  Lightbulb, Check, X
} from 'lucide-react';
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
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
    <div className="border-b border-gray-200/50 dark:border-white/5">
      <button
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none rounded-lg group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-[var(--accent)] transition-colors">{question}</span>
        <ChevronDown className={`text-gray-400 group-hover:text-[var(--accent)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
        aria-hidden={!isOpen}
      >
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">{answer}</p>
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
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans selection:bg-[var(--accent)] selection:text-white">
      
      {/* 1. Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Logo showText={true} />
          <div className="hidden md:flex items-center gap-8">
            <a href="#problem" onClick={(e) => scrollToSection(e, 'problem')} className="text-[13px] font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors tracking-wide uppercase">Why GuruAI</a>
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-[13px] font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors tracking-wide uppercase">Features</a>
            <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="text-[13px] font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors tracking-wide uppercase">How it works</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-[13px] font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors tracking-wide uppercase">FAQ</a>
          </div>
          <button 
            onClick={onStartChat}
            className="px-4 py-2 text-sm font-semibold bg-gray-900 text-white dark:bg-white dark:text-black rounded-lg transition-all hover:bg-gray-800 dark:hover:bg-gray-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            Start chatting
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs font-semibold mb-8 backdrop-blur-sm">
            <Sparkles size={14} className="text-[var(--accent)]" />
            Built for DSA & System Design Prep
          </div>
        </FadeIn>
        
        <FadeIn delay={100}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1] max-w-4xl">
            Learn DSA the way your <span className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent)] to-teal-400">senior</span> would explain it.
          </h1>
        </FadeIn>
        
        <FadeIn delay={200}>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            GuruAI is a bilingual AI mentor that breaks down complex Data Structures and Algorithms naturally in English and Hindi—inspired by the teaching style of Rohit Negi.
          </p>
        </FadeIn>
        
        <FadeIn delay={300} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-20">
          <button 
            onClick={onStartChat}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white dark:bg-white dark:text-black text-[15px] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Start chatting <ArrowRight size={18} />
          </button>
          <a 
            href="#how-it-works"
            onClick={(e) => scrollToSection(e, 'how-it-works')}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3.5 bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 text-[15px] font-semibold rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
          >
            See how it works
          </a>
        </FadeIn>

        {/* Hero Visual Mockup */}
        <FadeIn delay={400} className="w-full max-w-5xl mx-auto relative group perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/10 to-transparent blur-3xl opacity-50 dark:opacity-20 -z-10"></div>
          <div className="rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white dark:bg-[#111111] p-4 md:p-6 shadow-2xl relative overflow-hidden transition-transform duration-700 ease-out group-hover:rotate-x-1 group-hover:-translate-y-2">
            {/* Mac-like header */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
            </div>
            
            <div className="flex flex-col gap-6 text-left relative z-10 pb-8">
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 shrink-0">You</div>
                <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-2xl rounded-tr-sm border border-gray-100 dark:border-white/5 shadow-sm text-gray-800 dark:text-gray-200 text-sm max-w-[80%]">
                  I'm stuck on reversing a linked list. Can you explain it simply?
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent)] to-teal-500 flex items-center justify-center shrink-0 p-1.5 shadow-sm shadow-[var(--accent)]/20">
                  <Icon className="w-full h-full text-white" />
                </div>
                <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-2xl rounded-tl-sm border border-gray-100 dark:border-white/5 shadow-sm text-gray-800 dark:text-gray-200 text-sm max-w-[90%] leading-relaxed">
                  <p className="mb-3">Bhai, reverse a linked list is a classic! 🚀 Socho tumhare paas ek line mein log khade hain, aur sab apne aage wale ko point kar rahe hain. Reverse karne ka matlab hai sabko peeche wale ko point karwana.</p>
                  <p className="mb-4">We just need 3 pointers: <code className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-1.5 py-0.5 rounded text-[var(--accent)] text-[13px] font-mono">prev</code>, <code className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-1.5 py-0.5 rounded text-[var(--accent)] text-[13px] font-mono">curr</code>, and <code className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-1.5 py-0.5 rounded text-[var(--accent)] text-[13px] font-mono">next</code>.</p>
                  <div className="bg-[#fafafa] dark:bg-[#0a0a0a] rounded-xl p-4 text-gray-600 dark:text-gray-400 font-mono text-[13px] overflow-x-hidden border border-gray-200 dark:border-white/5 shadow-inner">
                    <span className="text-pink-500 dark:text-pink-400">while</span> (curr != <span className="text-blue-500 dark:text-blue-400">null</span>) {'{'}
                    <br/>&nbsp;&nbsp;next = curr.next;
                    <br/>&nbsp;&nbsp;curr.next = prev;
                    <br/>&nbsp;&nbsp;prev = curr;
                    <br/>&nbsp;&nbsp;curr = next;
                    <br/>{'}'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white dark:from-[#111111] to-transparent pointer-events-none z-20"></div>
          </div>
        </FadeIn>
      </section>

      {/* 3. Problem -> Solution Section */}
      <section id="problem" className="py-24 md:py-32 bg-gray-50 dark:bg-[#111111]/30 border-y border-gray-200/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Why generic chatbots fall short</h2>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Most students hit a wall on the same handful of DSA concepts alone, and generic AI answers feel like reading a textbook.
            </p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <FadeIn direction="right" className="bg-white dark:bg-[#161616] p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm">
              <div className="flex items-center gap-3 text-red-500 mb-8">
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
                  <X size={20} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Standard AI Chatbots</h3>
              </div>
              <ul className="space-y-5 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <X size={18} className="mt-0.5 text-red-400 shrink-0" />
                  <span className="leading-relaxed">Give correct but robotic, textbook-style explanations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X size={18} className="mt-0.5 text-red-400 shrink-0" />
                  <span className="leading-relaxed">Strictly monolingual, missing the nuances of colloquial tech discussions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X size={18} className="mt-0.5 text-red-400 shrink-0" />
                  <span className="leading-relaxed">Just print the solution without guiding you to the "aha!" moment.</span>
                </li>
              </ul>
            </FadeIn>
            
            <FadeIn direction="left" className="bg-white dark:bg-[#161616] p-8 md:p-10 rounded-3xl border border-[var(--accent)]/30 dark:border-[var(--accent)]/30 shadow-xl shadow-[var(--accent)]/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[var(--accent)]/10 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="flex items-center gap-3 text-[var(--accent)] mb-8">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                  <Check size={20} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">The GuruAI Approach</h3>
              </div>
              <ul className="space-y-5 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 text-[var(--accent)] shrink-0" />
                  <span className="leading-relaxed">Mimics a real mentor's voice, focusing on intuition and logic.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 text-[var(--accent)] shrink-0" />
                  <span className="leading-relaxed">Mixes Hindi and English naturally, making complex topics relatable.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 text-[var(--accent)] shrink-0" />
                  <span className="leading-relaxed">Available 24/7—no waiting for office hours or a senior's free time.</span>
                </li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section id="features" className="py-24 md:py-32 max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-20 md:mb-32">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Everything you need to master code</h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            A purpose-built interface designed for distraction-free learning and problem-solving.
          </p>
        </FadeIn>

        <div className="space-y-24 md:space-y-40">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <FadeIn direction="right" className="flex-1 text-left order-2 md:order-1">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[var(--accent)] flex items-center justify-center mb-6 shadow-sm">
                <Languages size={24} />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Authentic Mentor Persona</h3>
              <p className="text-[17px] text-gray-500 dark:text-gray-400 leading-relaxed">
                GuruAI doesn't just feed you answers. It talks to you like a supportive senior dev, blending Hindi and English effortlessly. Expect encouraging signature phrases and relatable analogies that make hard concepts stick.
              </p>
            </FadeIn>
            <FadeIn direction="left" className="flex-1 w-full order-1 md:order-2">
              <div className="bg-gray-50 dark:bg-[#111111] rounded-3xl p-6 md:p-8 border border-gray-200/50 dark:border-white/5 shadow-lg h-72 flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="space-y-4 relative z-10">
                  <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm w-[85%] ml-auto rounded-tr-sm text-[13px] text-gray-700 dark:text-gray-300">
                    Can you explain Time Complexity?
                  </div>
                  <div className="bg-emerald-50/50 dark:bg-[var(--accent)]/5 p-4 rounded-2xl border border-[var(--accent)]/20 shadow-sm w-[90%] rounded-tl-sm text-[13px] border-l-[3px] border-l-[var(--accent)] text-gray-800 dark:text-gray-200 leading-relaxed">
                    Haan bilkul! Time complexity bas ye batata hai ki jab tumhara input size badhega, toh code ko run hone mein kitna extra time lagega. Socho agar tumhe ek array mein element dhundna hai...
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <FadeIn direction="right" className="flex-1 w-full">
              <div className="bg-gray-50 dark:bg-[#111111] rounded-3xl p-6 md:p-8 border border-gray-200/50 dark:border-white/5 shadow-lg h-72 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-full max-w-sm bg-white dark:bg-[#1a1a1a] border border-gray-200/50 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm relative z-10">
                  <div className="p-3 border-b border-gray-100 dark:border-white/5 font-semibold text-[11px] uppercase tracking-wider text-gray-500 flex items-center gap-2 bg-gray-50 dark:bg-[#111111]">
                    <History size={14} /> Recent Chats
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-[var(--accent)] text-[13px] font-medium flex items-center gap-2.5">
                      <MessageSquare size={14} /> DP Tabulation vs Memoization
                    </div>
                    <div className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 text-[13px] flex items-center gap-2.5">
                      <MessageSquare size={14} /> System Design: Rate Limiter
                    </div>
                    <div className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 text-[13px] flex items-center gap-2.5">
                      <MessageSquare size={14} /> Binary Search Edge Cases
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left" className="flex-1 text-left">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[var(--accent)] flex items-center justify-center mb-6 shadow-sm">
                <History size={24} />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Persistent Chat History</h3>
              <p className="text-[17px] text-gray-500 dark:text-gray-400 leading-relaxed">
                Don't lose your train of thought. GuruAI automatically saves your conversations locally. Switch seamlessly between your Graph theory session and your System Design mock interview.
              </p>
            </FadeIn>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <FadeIn direction="right" className="flex-1 text-left order-2 md:order-1">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[var(--accent)] flex items-center justify-center mb-6 shadow-sm">
                <Code2 size={24} />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">First-Class Code Support</h3>
              <p className="text-[17px] text-gray-500 dark:text-gray-400 leading-relaxed">
                Read code clearly. GuruAI renders responses with full markdown support and beautiful Prism.js syntax highlighting for code blocks. Found a snippet you like? Copy it with one click.
              </p>
            </FadeIn>
            <FadeIn direction="left" className="flex-1 w-full order-1 md:order-2">
              <div className="bg-gray-50 dark:bg-[#111111] rounded-3xl p-6 md:p-8 border border-gray-200/50 dark:border-white/5 shadow-lg h-72 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-full max-w-sm rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a] shadow-md relative z-10">
                  <div className="flex justify-between items-center px-4 py-2 bg-gray-50 dark:bg-[#111111] border-b border-gray-100 dark:border-white/5">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-500">cpp</span>
                    <span className="flex items-center gap-1 text-[var(--accent)] text-[11px] font-medium"><Check size={12} /> Copied</span>
                  </div>
                  <div className="p-4 text-[13px] font-mono text-gray-600 dark:text-gray-300">
                    <span className="text-pink-600 dark:text-pink-400">int</span> <span className="text-blue-600 dark:text-blue-400">binarySearch</span>(vector&lt;<span className="text-pink-600 dark:text-pink-400">int</span>&gt;& arr, <span className="text-pink-600 dark:text-pink-400">int</span> target) {'{'}
                    <br/>&nbsp;&nbsp;<span className="text-gray-400 dark:text-gray-500">// Implementation</span>
                    <br/>&nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">return</span> -1;
                    <br/>{'}'}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Feature 4 & 5 Combined */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 pt-8">
            <FadeIn direction="up" className="bg-white dark:bg-[#111111] rounded-3xl p-8 md:p-12 border border-gray-200/50 dark:border-white/5 shadow-sm hover:shadow-lg transition-shadow duration-500 group">
              <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-[var(--accent)] flex items-center justify-center mb-8">
                <Mic size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Hands-Free Voice Input</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                Tired of typing out long logic questions? Just click the microphone and dictate your thoughts naturally. The Web Speech API handles the rest.
              </p>
              <div className="flex items-center justify-center p-6 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-white/5">
                <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative">
                  <div className="absolute inset-0 rounded-full border border-[var(--accent)]/30 animate-ping"></div>
                  <Mic size={24} />
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={100} className="bg-white dark:bg-[#111111] rounded-3xl p-8 md:p-12 border border-gray-200/50 dark:border-white/5 shadow-sm hover:shadow-lg transition-shadow duration-500">
              <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-[var(--accent)] flex items-center justify-center mb-8">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Native Light/Dark Mode</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                Late night leetcode sessions? Toggle dark mode to save your eyes. The interface adapts instantly, respecting your system preferences by default.
              </p>
              <div className="flex mt-8 gap-4">
                <div className="flex-1 h-28 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center text-gray-500 text-[13px] font-semibold tracking-wide uppercase">Light</div>
                <div className="flex-1 h-28 bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-sm flex items-center justify-center text-gray-400 text-[13px] font-semibold tracking-wide uppercase">Dark</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="py-24 md:py-32 bg-gray-50 dark:bg-[#111111]/50 border-y border-gray-200/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-20 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">How it works</h2>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Three simple steps to unblock your coding progress.
            </p>
          </FadeIn>
          
          <div className="flex flex-col md:flex-row gap-8 relative max-w-5xl mx-auto">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent z-0"></div>
            
            {[
              { num: "01", title: "Ask naturally", desc: "Type or speak your question in Hindi, English, or Hinglish. No strict formatting needed." },
              { num: "02", title: "Get mentored", desc: "Receive a detailed, intuitive breakdown with examples, analogies, and clean code snippets." },
              { num: "03", title: "Dive deeper", desc: "Ask follow-ups, request edge cases, or switch topics. GuruAI remembers the context." }
            ].map((step, idx) => (
              <FadeIn key={idx} delay={idx * 150} direction="up" className="flex-1 relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-center text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed px-2 text-[15px]">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Persona Spotlight Section */}
      <section id="about" className="py-24 md:py-32 max-w-7xl mx-auto px-6">
        <div className="bg-white dark:bg-[#111111] border border-gray-200/50 dark:border-white/5 rounded-[2.5rem] p-8 md:p-20 flex flex-col md:flex-row items-center gap-16 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--accent)]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="flex-1 text-center md:text-left relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white mb-8">
              <GraduationCap size={24} />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Designed for real students</h2>
            <p className="text-[17px] text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              GuruAI was built with a specific learner in mind: students preparing for rigorous DSA interviews, campus placements, and system design rounds. 
            </p>
            <p className="text-[17px] text-gray-500 dark:text-gray-400 leading-relaxed p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
              <strong className="text-gray-900 dark:text-white font-semibold">The Inspiration:</strong> This AI persona is a fan-built homage to Rohit Negi (Coder Army), designed to capture the encouraging, bilingual, and highly practical teaching style that has helped thousands of students succeed. Note: This project is an independent creation and is not officially affiliated with Rohit Negi.
            </p>
          </div>
          <div className="md:w-1/3 w-full flex justify-center relative z-10">
            <div className="relative w-full max-w-[280px] aspect-square rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1a1a1a] dark:to-[#111111] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-[var(--accent)]/10"></div>
              <Icon className="w-1/3 h-1/3 text-[var(--accent)]" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="py-24 md:py-32 bg-gray-50 dark:bg-[#111111]/50 border-t border-gray-200/50 dark:border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">FAQ</h2>
          </FadeIn>
          
          <FadeIn delay={100} className="space-y-0 bg-white dark:bg-[#161616] p-4 md:p-8 rounded-3xl border border-gray-200/50 dark:border-white/5 shadow-sm">
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
      <section className="py-32 bg-gray-900 dark:bg-[#050505] relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent)]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to master DSA?</h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Stop struggling with textbook explanations. Start chatting with a mentor that understands exactly how you learn.
            </p>
            <button 
              onClick={onStartChat}
              className="px-8 py-4 bg-white text-black text-[15px] font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              Start Chatting Now
            </button>
          </FadeIn>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-white dark:bg-[#0a0a0a] border-t border-gray-200/50 dark:border-white/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <Logo showText={true} />
            <div className="flex gap-8 text-[13px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
              <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</a>
              <a href="https://github.com/Syed373/GuruAI" target="_blank" rel="noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
          <div className="text-center md:text-left text-sm text-gray-400 dark:text-gray-500 border-t border-gray-200/50 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} GuruAI. Open Source Project.</p>
            <p>Inspired by the teaching style of Rohit Negi / Coder Army.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;