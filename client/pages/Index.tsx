import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  ExternalLink, Github, Linkedin, Mail, Phone, Download, Eye, Moon, Sun, 
  ArrowRight, Play, Pause, ChevronDown, Star, Award, Users, Zap,
  Briefcase, Code, Palette, Globe, MessageCircle, Calendar, MapPin,
  Heart, Send, CheckCircle, ArrowUp, Menu, X, Trophy, Target, Music, Gamepad2
} from "lucide-react";

// Add custom styles for advanced animations
const customStyles = `
  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    }
    50% {
      box-shadow: 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.4);
    }
  }

  .glass-morphism {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .text-shadow-glow {
    text-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3);
  }

  .perspective-1000 {
    perspective: 1000px;
  }

  .preserve-3d {
    transform-style: preserve-3d;
  }
`;

export default function Index() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectType: 'UI/UX Design',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create email content
      const emailBody = `Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Project Type: ${formData.projectType}
Message: ${formData.message}`;

      // Create mailto link
      const mailtoLink = `mailto:nm001814@gmail.com?subject=Portfolio Contact from ${formData.firstName} ${formData.lastName}&body=${encodeURIComponent(emailBody)}`;

      // Open email client
      window.open(mailtoLink);

      // Reset form and show success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        projectType: 'UI/UX Design',
        message: ''
      });

      setSubmitStatus('success');
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'beyond-tech', label: 'Beyond Tech' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Account for fixed navbar height
      const elementPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });

      setActiveSection(sectionId);
      // Delay closing menu to ensure scroll starts properly
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 100);
    }
  };

  const projects = [
    {
      title: "MailBrief",
      subtitle: "AI-Powered Email Summarizer",
      description: "Revolutionary web application that transforms lengthy emails into concise, actionable summaries using advanced AI technology.",
      image: "/api/placeholder/600/400",
      features: ["AI Email Summarization", "Smart Point Highlighting", "One-Click Sharing", "Responsive Design", "Real-time Processing"],
      technologies: ["React.js", "Node.js", "Express", "TailwindCSS", "AI/LLM APIs"],
      category: "Web Application",
      status: "Live Project",
      liveDemo: "https://68af27d72b6db21d7657ca34--mailbrief.netlify.app/",
      githubLink: "https://github.com/Neyaz89/MailBrief",
      bgGradient: "from-blue-600 via-purple-600 to-cyan-600",
      year: "2025"
    },
    {
      title: "MeazApp",
      subtitle: "Social Media Platform",
      description: "Next-generation social platform combining chat, calls, and stories in one seamless, beautifully designed mobile experience.",
      image: "/api/placeholder/600/400",
      features: ["Real-time Messaging", "HD Video Calls", "Story Sharing", "Profile Customization", "Advanced UI/UX"],
      technologies: ["React Native", "Firebase", "Node.js", "Express", "Figma"],
      category: "Mobile App",
      status: "In Development",
      liveDemo: null,
      githubLink: "https://github.com/Neyaz89/MeazApp",
      bgGradient: "from-pink-600 via-rose-600 to-orange-600",
      year: "2024"
    },
    {
      title: "SpiceHeaven",
      subtitle: "Full Stack Food Delivery Platform",
      description: "Complete food delivery solution with real-time tracking, payment integration, and intuitive user experience for both customers and restaurants.",
      image: "/api/placeholder/600/400",
      features: ["Real-time Order Tracking", "Payment Gateway", "Restaurant Dashboard", "User Reviews", "Push Notifications"],
      technologies: ["React.js", "Node.js", "Express", "MongoDB", "Payment APIs"],
      category: "Web Application",
      status: "Completed",
      liveDemo: null,
      githubLink: "https://github.com/Neyaz89/SpiceHeaven",
      bgGradient: "from-green-600 via-teal-600 to-cyan-600",
      year: "2024"
    }
  ];

  const skills = [
    { name: "C, C++", level: 90, icon: <Code className="w-6 h-6" />, category: "Programming" },
    { name: "JavaScript", level: 92, icon: <Zap className="w-6 h-6" />, category: "Programming" },
    { name: "HTML, CSS", level: 95, icon: <Palette className="w-6 h-6" />, category: "Frontend" },
    { name: "React.js", level: 90, icon: <Code className="w-6 h-6" />, category: "Frontend" },
    { name: "Node.js, Express", level: 88, icon: <Globe className="w-6 h-6" />, category: "Backend" },
    { name: "TailwindCSS", level: 94, icon: <Palette className="w-6 h-6" />, category: "Frontend" },
    { name: "Git & GitHub", level: 89, icon: <Briefcase className="w-6 h-6" />, category: "Tools" },
    { name: "Figma (UI/UX)", level: 85, icon: <Palette className="w-6 h-6" />, category: "Design" },
    { name: "AWS Cloud", level: 80, icon: <Globe className="w-6 h-6" />, category: "Cloud" },
    { name: "Software Engineering", level: 87, icon: <Code className="w-6 h-6" />, category: "Concepts" },
    { name: "Operating Systems", level: 83, icon: <Briefcase className="w-6 h-6" />, category: "Concepts" },
    { name: "Cloud Computing", level: 82, icon: <Globe className="w-6 h-6" />, category: "Cloud" }
  ];

  const achievements = [
    {
      title: "Best Poster Award",
      event: "ICCMST 2023",
      description: "Recognized for outstanding research presentation and innovative approach in computer science.",
      icon: <Trophy className="w-8 h-8" />,
      year: "2023",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "HackerRank 3-Star",
      event: "C++ & Problem Solving",
      description: "Achieved 3-star rating in competitive programming and algorithmic problem solving.",
      icon: <Star className="w-8 h-8" />,
      year: "2023",
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Smart India Hackathon",
      event: "National Level Participant",
      description: "Selected to participate in India's premier hackathon showcasing innovative solutions.",
      icon: <Zap className="w-8 h-8" />,
      year: "2024",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "AWS Certifications",
      event: "Cloud Foundation, Data Engineering, Cloud Operations",
      description: "Multiple AWS certifications demonstrating expertise in cloud technologies and operations.",
      icon: <Globe className="w-8 h-8" />,
      year: "2022-2024",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Google AdWords Certification",
      event: "Digital Marketing",
      description: "Certified in Google AdWords for digital marketing and online advertising strategies.",
      icon: <Target className="w-8 h-8" />,
      year: "2023",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const beyondTechActivities = [
    {
      title: "Cultural Event Organizer",
      description: "Led organization of singing and dancing events, managing teams and coordinating performances.",
      icon: <Music className="w-8 h-8" />,
      year: "2023",
      color: "from-pink-500 to-rose-500",
      skills: ["Team Leadership", "Event Management", "Creative Direction"]
    },
    {
      title: "District-Level Cricket Player",
      description: "Competed at district level in cricket, demonstrating teamwork, strategy, and athletic excellence.",
      icon: <Gamepad2 className="w-8 h-8" />,
      year: "2019-2022",
      color: "from-green-500 to-emerald-500",
      skills: ["Team Collaboration", "Strategic Thinking", "Performance Under Pressure"]
    }
  ];


  return (
    <div className={`min-h-screen overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 bg-electric-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-border z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-electric-500 to-electric-700 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              NA
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative font-medium transition-colors ${
                    activeSection === item.id ? 'text-electric-500' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-electric-500"
                      layoutId="activeTab"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-card border border-border hover:bg-accent transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-card border border-border"
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-card border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left font-medium text-muted-foreground hover:text-foreground"
                    whileHover={{ x: 10 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 pt-24">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-electric-500/8 via-purple-500/4 to-cyan-500/8"
            animate={{
              background: [
                "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.04) 50%, rgba(6, 182, 212, 0.08) 100%)",
                "linear-gradient(135deg, rgba(147, 51, 234, 0.08) 0%, rgba(6, 182, 212, 0.04) 50%, rgba(59, 130, 246, 0.08) 100%)",
                "linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(59, 130, 246, 0.04) 50%, rgba(147, 51, 234, 0.08) 100%)"
              ]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          {/* Geometric shapes for unique aesthetic */}
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 border border-electric-500/20 rounded-lg"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-32 left-16 w-24 h-24 border-2 border-purple-500/20 rounded-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Floating Elements */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 4 === 0 ? 'w-3 h-3 bg-electric-500/30' :
                i % 4 === 1 ? 'w-2 h-2 bg-purple-500/25' :
                i % 4 === 2 ? 'w-4 h-4 bg-cyan-500/20 blur-sm' :
                'w-1 h-1 bg-white/40'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40 - Math.random() * 20, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5 + Math.random() * 0.5, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center mt-8">
          {/* Left Side - Content */}
          <motion.div 
            className="space-y-8"
            style={{ y, opacity }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              
              <h1 className="text-5xl lg:text-8xl font-bold font-poppins leading-tight tracking-tight">
                <motion.span
                  className="text-foreground block mb-4 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.span
                    className="inline-block"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  >
                    Hi, I'm
                  </motion.span>
                </motion.span>
                <motion.span
                  className="bg-gradient-to-r from-electric-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent block relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 6s ease infinite'
                  }}
                >
                  <motion.span
                    className="inline-block"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  >
                    Neyaz Ahmad
                  </motion.span>
                  <motion.div
                    className="absolute -bottom-4 left-0 h-2 bg-gradient-to-r from-electric-500 via-purple-500 to-cyan-500 rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute -bottom-6 left-0 h-1 bg-gradient-to-r from-electric-500/50 via-purple-500/50 to-cyan-500/50 rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '80%', opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                  />
                </motion.span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.p
                  className="text-2xl lg:text-4xl font-inter mb-6 font-bold relative"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
                    backgroundSize: '300% 300%',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    animation: 'gradientShift 8s ease infinite'
                  }}
                >
                  UI/UX Designer & Full Stack Developer
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-electric-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl -z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.p>
              </motion.div>
              <motion.p
                className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Computer Science student specializing in <motion.span
                  className="text-electric-500 font-bold relative px-2 py-1 rounded-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  transition={{ duration: 0.2 }}
                >C++</motion.span>,
                <motion.span
                  className="text-purple-500 font-bold relative px-2 py-1 rounded-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                  transition={{ duration: 0.2 }}
                > Full Stack Web Development</motion.span>, and
                <motion.span
                  className="text-cyan-500 font-bold relative px-2 py-1 rounded-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                  transition={{ duration: 0.2 }}
                > AI-powered applications</motion.span>.
                Creating exceptional digital experiences with strong design intuition and technical expertise.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="group relative bg-gradient-to-r from-electric-500 via-purple-500 to-electric-600 hover:from-electric-600 hover:via-purple-600 hover:to-electric-700 text-white px-10 py-5 rounded-3xl font-bold text-lg transition-all duration-700 flex items-center gap-3 shadow-2xl hover:shadow-3xl hover:shadow-electric-500/40 overflow-hidden backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.08, y: -5, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundSize: '300% 300%',
                  animation: 'gradientShift 6s ease infinite'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 rounded-3xl"
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <Eye className="w-5 h-5 relative z-10" />
                <span className="relative z-10">View My Work</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
              </motion.button>
              
              <motion.a
                href="https://cdn.builder.io/o/assets%2F97dde0a5b22043e1b740afdf775e56a1%2F5c497235a9e74554b1fcfca75b665025?alt=media&token=68ee1e1d-92ff-4def-8af3-43452282bfad&apiKey=97dde0a5b22043e1b740afdf775e56a1"
                download="Neyaz_Ahmad_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative border-3 border-electric-500 bg-electric-500/10 backdrop-blur-sm text-electric-500 hover:bg-electric-500 hover:text-white px-10 py-5 rounded-3xl font-bold text-lg transition-all duration-700 flex items-center gap-3 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-electric-500/30"
                whileHover={{ scale: 1.08, y: -5, rotateX: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-electric-500 via-purple-500 to-cyan-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-electric-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <Download className="w-5 h-5 relative z-10 transition-transform group-hover:scale-110 duration-300" />
                <span className="relative z-10">Download CV</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { icon: <Github className="w-6 h-6" />, href: "https://github.com/Neyaz89", label: "GitHub" },
                { icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/in/neyaz-ahmad-b80045306", label: "LinkedIn" },
                { icon: <Mail className="w-6 h-6" />, href: "mailto:nm001814@gmail.com", label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card border border-border rounded-xl hover:bg-electric-500 hover:text-white hover:border-electric-500 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Designer Photo */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative">
              {/* Background Decoration */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-electric-500 via-purple-500 to-cyan-500 rounded-3xl"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              
              {/* Main Image Container */}
              <motion.div
                className="relative bg-card rounded-3xl p-2 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F97dde0a5b22043e1b740afdf775e56a1%2Fab9a2d9ea7ca4b9c99dead0be1f96bdc?format=webp&width=800"
                  alt="Neyaz Ahmad - UI/UX Designer"
                  className="w-full max-w-md mx-auto h-auto rounded-2xl object-cover shadow-2xl"
                  style={{ maxHeight: '500px', objectFit: 'cover' }}
                />
                
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl opacity-80"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div
                className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-80"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm font-medium">Scroll Down</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-electric-500/10 text-electric-600 rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              About Me
            </motion.span>
            <h2 className="text-4xl lg:text-6xl font-bold font-poppins mb-6">
              Passionate About Creating
              <br />
              <span className="bg-gradient-to-r from-electric-500 to-purple-500 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              I'm a Computer Science student with expertise in C++, Full Stack Web Development, and AI-powered applications. 
              With strong HTML/CSS/JS fundamentals and design intuition, I create user-friendly digital experiences 
              that combine technical excellence with creative vision.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-electric-500/10 text-electric-600 rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Technical Skills
            </motion.span>
            <h2 className="text-4xl lg:text-6xl font-bold font-poppins mb-6">
              Technical
              <span className="bg-gradient-to-r from-electric-500 to-purple-500 bg-clip-text text-transparent">
                {" "}Competencies
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive skill set spanning programming, web development, cloud technologies, and design tools.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="relative glass-morphism border border-white/20 dark:border-white/10 rounded-3xl p-8 hover:shadow-3xl hover:shadow-electric-500/20 transition-all duration-700 group overflow-hidden backdrop-blur-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.05, rotateY: 5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-500 via-purple-500 to-cyan-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                />
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative p-3 bg-gradient-to-br from-electric-500/10 to-purple-500/10 rounded-xl text-electric-500 group-hover:from-electric-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground">{skill.category}</p>
                  </div>
                  <span className="text-sm font-bold text-electric-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 relative overflow-hidden">
                  <motion.div
                    className="h-3 bg-gradient-to-r from-electric-500 via-purple-500 to-cyan-500 rounded-full relative"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 -skew-x-12 animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-electric-500/10 text-electric-600 rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Featured Work
            </motion.span>
            <h2 className="text-4xl lg:text-6xl font-bold font-poppins mb-6">
              Projects That
              <span className="bg-gradient-to-r from-electric-500 to-purple-500 bg-clip-text text-transparent">
                {" "}Make Impact
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore my latest work where innovative design meets cutting-edge technology 
              to create exceptional user experiences.
            </p>
          </motion.div>

          <div className="space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Project Image */}
                <motion.div
                  className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} rounded-3xl opacity-15 group-hover:opacity-25 transition-all duration-700`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative glass-morphism border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl group-hover:shadow-3xl group-hover:shadow-electric-500/30 transition-all duration-700 overflow-hidden backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-electric-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-500 via-purple-500 to-cyan-500"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                    <div className={`w-full h-64 bg-gradient-to-br ${project.bgGradient} rounded-2xl mb-6 flex items-center justify-center text-white text-6xl font-bold opacity-80`}>
                      {project.title.charAt(0)}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-electric-500/10 text-electric-600 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Project Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-bold font-poppins mb-2 text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-xl text-electric-500 font-medium mb-4">{project.subtitle}</p>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {project.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {project.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="w-4 h-4 text-electric-500 shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          className="px-3 py-1 bg-card border border-border rounded-full text-sm font-medium hover:border-electric-500 transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      {project.status}
                    </span>

                    <div className="flex items-center gap-4">
                      {project.liveDemo && (
                        <motion.a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 bg-gradient-to-r from-electric-500 via-purple-500 to-electric-600 hover:from-electric-600 hover:via-purple-600 hover:to-electric-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-electric-500/40 overflow-hidden"
                          whileHover={{ scale: 1.08, y: -3, rotateX: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          <ExternalLink className="w-4 h-4" />
                          View Live
                        </motion.a>
                      )}

                      {project.githubLink && (
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 border-2 border-electric-500 bg-electric-500/10 backdrop-blur-sm text-electric-500 hover:bg-electric-500 hover:text-white px-8 py-4 rounded-2xl font-bold transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-electric-500/30 overflow-hidden"
                          whileHover={{ scale: 1.08, y: -3, rotateX: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-electric-500 via-purple-500 to-cyan-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                          <Github className="w-4 h-4" />
                          View Code
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Certifications Section */}
      <section id="achievements" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-electric-500/10 text-electric-600 rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Recognition
            </motion.span>
            <h2 className="text-4xl lg:text-6xl font-bold font-poppins mb-6">
              Achievements &
              <span className="bg-gradient-to-r from-electric-500 to-purple-500 bg-clip-text text-transparent">
                {" "}Certifications
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Recognition and certifications that validate my expertise and commitment to continuous learning.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="bg-card border border-border rounded-3xl p-8 hover:shadow-xl transition-all duration-500 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${achievement.color} text-white shrink-0`}>
                    {achievement.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-foreground">{achievement.title}</h3>
                      <span className="text-sm text-muted-foreground font-medium">{achievement.year}</span>
                    </div>
                    <p className="text-electric-500 font-medium mb-3">{achievement.event}</p>
                    <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                  </div>
                </div>
                
                {/* Decorative element */}
                <motion.div
                  className={`absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br ${achievement.color} opacity-10`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Tech Section */}
      <section id="beyond-tech" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-electric-500/10 text-electric-600 rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Personal Side
            </motion.span>
            <h2 className="text-4xl lg:text-6xl font-bold font-poppins mb-6">
              Beyond
              <span className="bg-gradient-to-r from-electric-500 to-purple-500 bg-clip-text text-transparent">
                {" "}Technology
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Life experiences and activities that shape my perspective, leadership skills, and creative approach to problem-solving.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {beyondTechActivities.map((activity, index) => (
              <motion.div
                key={activity.title}
                className="bg-card border border-border rounded-3xl p-8 hover:shadow-xl transition-all duration-500 group"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${activity.color} text-white shrink-0`}>
                    {activity.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-foreground">{activity.title}</h3>
                      <span className="text-sm text-muted-foreground font-medium">{activity.year}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
                  </div>
                </div>

                {/* Skills gained */}
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Skills Developed:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activity.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 bg-electric-100 dark:bg-electric-900/30 text-electric-700 dark:text-electric-300 rounded-full text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-electric-500/10 text-electric-600 rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Get In Touch
            </motion.span>
            <h2 className="text-4xl lg:text-6xl font-bold font-poppins mb-6">
              Let's Build Something
              <span className="bg-gradient-to-r from-electric-500 to-purple-500 bg-clip-text text-transparent">
                {" "}Amazing Together
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to bring your ideas to life? I'm here to help you create exceptional digital experiences. 
              Let's discuss your project and make something incredible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="bg-card border border-border rounded-3xl p-8 shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold font-poppins mb-6">Send me a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-electric-500 focus:border-transparent transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-electric-500 focus:border-transparent transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-electric-500 focus:border-transparent transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-electric-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Full Stack Project">Full Stack Project</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-electric-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-electric-500 hover:bg-electric-600 text-white'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-muted-foreground border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-center text-sm mt-2"
                  >
                    Thank you! Your email client should open shortly.
                  </motion.p>
                )}

                {submitStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-center text-sm mt-2"
                  >
                    Something went wrong. Please try again or contact me directly.
                  </motion.p>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold font-poppins mb-6">Let's connect</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail className="w-6 h-6" />,
                      label: "Email",
                      value: "nm001814@gmail.com",
                      href: "mailto:nm001814@gmail.com",
                      color: "from-blue-500 to-cyan-500"
                    },
                    {
                      icon: <Phone className="w-6 h-6" />,
                      label: "Phone",
                      value: "+91 8757973808",
                      href: "tel:8757973808",
                      color: "from-green-500 to-teal-500"
                    },
                    {
                      icon: <MapPin className="w-6 h-6" />,
                      label: "Location",
                      value: "India",
                      href: "#",
                      color: "from-purple-500 to-pink-500"
                    },
                    {
                      icon: <MessageCircle className="w-6 h-6" />,
                      label: "Response Time",
                      value: "Within 24 hours",
                      href: "#",
                      color: "from-orange-500 to-red-500"
                    }
                  ].map((contact, index) => (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      className="flex items-center gap-4 p-4 bg-muted/50 rounded-2xl hover:bg-electric-100 dark:hover:bg-electric-900/30 transition-all duration-300 group"
                      whileHover={{ scale: 1.02, x: 5 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className={`p-3 bg-gradient-to-br ${contact.color} rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                        {contact.icon}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{contact.label}</p>
                        <p className="text-sm text-muted-foreground">{contact.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links Card */}
              <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold font-poppins mb-6">Follow me</h3>
                <div className="flex gap-4">
                  {[
                    { icon: <Github className="w-6 h-6" />, href: "https://github.com/Neyaz89", label: "GitHub", color: "hover:bg-gray-600" },
                    { icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/in/neyaz-ahmad-b80045306", label: "LinkedIn", color: "hover:bg-blue-600" },
                    { icon: <Mail className="w-6 h-6" />, href: "mailto:nm001814@gmail.com", label: "Email", color: "hover:bg-red-600" }
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-4 bg-muted rounded-xl ${social.color} text-white transition-all duration-300 group`}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-poppins mb-4 bg-gradient-to-r from-electric-500 to-purple-500 bg-clip-text text-transparent">
              Neyaz Ahmad
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              UI/UX Designer & Full Stack Developer • Creating Digital Excellence
            </p>
            <div className="flex justify-center gap-6 mb-8">
              {[
                { icon: <Github className="w-6 h-6" />, href: "https://github.com/Neyaz89" },
                { icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/in/neyaz-ahmad-b80045306" },
                { icon: <Mail className="w-6 h-6" />, href: "mailto:nm001814@gmail.com" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-electric-500 transition-colors duration-300"
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="border-t border-border pt-8">
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                © 2024 Neyaz Ahmad. All rights reserved. • Designed & Built with <Heart className="w-4 h-4 text-red-500 fill-current" />
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-electric-500 hover:bg-electric-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: scrollYProgress.get() > 0.2 ? 1 : 0, scale: scrollYProgress.get() > 0.2 ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
