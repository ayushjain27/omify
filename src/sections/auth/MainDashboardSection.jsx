import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Users,
  DollarSign,
  Globe,
  Smartphone,
  Clock,
  BarChart3,
  Link as LinkIcon,
  QrCode,
  Bell,
  Eye,
  Download,
  ArrowUp,
  Menu,
  X,
  ChevronRight,
  Layers,
  Sparkles,
  Target,
  Gift,
  Circle,
  Hexagon,
  Triangle,
  Square,
  MoveRight,
  MoveLeft,
  Rocket,
  BadgeCheck,
  ShieldCheck,
  Lock,
  PieChart,
  Activity,
  Wallet,
  Banknote,
  SmartphoneCharging,
  Mail,
  MessageSquare,
  HelpCircle,
  FileText,
  BookOpen,
  LifeBuoy,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  ChevronDown
} from 'lucide-react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Hidden,
  Fab,
  Tabs,
  Tab,
  Badge,
  Tooltip,
  Fade,
  Grow,
  Slide,
  Zoom
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

// Custom animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const floatHorizontal = keyframes`
  0%, 100% { transform: translateX(0px); }
  50% { transform: translateX(10px); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
  40%, 43% { transform: translateY(-10px); }
  70% { transform: translateY(-5px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const wave = keyframes`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(-10deg); }
  20% { transform: rotate(12deg); }
  30% { transform: rotate(-10deg); }
  40% { transform: rotate(9deg); }
  50% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
`;

// Styled components
const AnimatedFloat = styled('div')({
  animation: `${float} 6s ease-in-out infinite`
});

const AnimatedFloatHorizontal = styled('div')({
  animation: `${floatHorizontal} 8s ease-in-out infinite`
});

const AnimatedGradientBackground = styled('div')({
  background: 'linear-gradient(270deg, #667eea, #764ba2, #6B46C1, #4C51BF)',
  backgroundSize: '400% 400%',
  animation: `${gradientBackground} 12s ease infinite`
});

const AnimatedFadeInUp = styled('div')(({ animate }) => ({
  opacity: animate ? 1 : 0,
  animation: animate ? `${fadeInUp} 0.8s ease-out forwards` : 'none'
}));

const AnimatedSlideInRight = styled('div')(({ animate }) => ({
  opacity: animate ? 1 : 0,
  animation: animate ? `${slideInRight} 0.8s ease-out forwards` : 'none'
}));

const AnimatedSlideInLeft = styled('div')(({ animate }) => ({
  opacity: animate ? 1 : 0,
  animation: animate ? `${slideInLeft} 0.8s ease-out forwards` : 'none'
}));

const AnimatedPulse = styled('div')({
  animation: `${pulse} 2s ease-in-out infinite`
});

const AnimatedBounce = styled('div')({
  animation: `${bounce} 2s infinite`
});

const AnimatedRotate = styled('div')({
  animation: `${rotate} 20s linear infinite`
});

const AnimatedWave = styled('div')({
  display: 'inline-block',
  animation: `${wave} 2s infinite`,
  transformOrigin: '70% 70%'
});

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 'bold'
}));

const GlassEffect = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  border: 'none',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)'
  }
}));

const StatCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1))',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
}));

const UseCaseCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  border: 'none',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1)'
  }
}));

const PricingCard = styled(Card)(({ theme, highlighted }) => ({
  transition: 'all 0.3s ease',
  border: highlighted ? '2px solid transparent' : '1px solid rgba(0, 0, 0, 0.1)',
  background: highlighted ? 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box' : 'white',
  boxShadow: highlighted ? '0 12px 28px rgba(102, 126, 234, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
  '&:hover': {
    transform: highlighted ? 'scale(1.05)' : 'translateY(-5px)',
    boxShadow: highlighted ? '0 16px 32px rgba(102, 126, 234, 0.3)' : '0 12px 28px rgba(0, 0, 0, 0.1)'
  }
}));

const FloatingShape = styled('div')(({ theme, color, size, top, left, right, bottom, animation }) => ({
  position: 'absolute',
  width: size,
  height: size,
  background: color,
  borderRadius: '50%',
  top,
  left,
  right,
  bottom,
  zIndex: 0,
  opacity: 0.6,
  filter: 'blur(20px)',
  animation: animation ? `${animation} 15s infinite alternate` : 'none'
}));

const MainDashboardSection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [stats, setStats] = useState({
    earnings: 0,
    withdrawn: 0,
    users: 0
  });
  const [tabValue, setTabValue] = useState(0);

  const theme = useTheme();

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    const animateNumber = (target, key, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setStats((prev) => ({ ...prev, [key]: Math.floor(start) }));
      }, 16);
    };

    setTimeout(() => {
      animateNumber(320456, 'earnings');
      animateNumber(100000, 'withdrawn');
      animateNumber(25000, 'users');
    }, 500);

    const featureTimer = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % 3);
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(featureTimer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const features = [
    {
      icon: <Zap size={32} />,
      title: 'No-Code Link',
      description: 'Go online and start collecting payments instantly with no tech integrations.',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      details: 'Create professional payment pages without writing a single line of code. Our drag-and-drop builder makes it easy.'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Smart Tracking',
      description: 'Track and analyze all your payments at a single platform with real-time insights.',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      details: 'Get detailed analytics on customer behavior, payment patterns, and revenue trends to optimize your business.'
    },
    {
      icon: <CreditCard size={32} />,
      title: 'Easy Withdrawals',
      description: 'Withdraw your money hassle-free as and when you need with instant transfers.',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      details: 'Access your earnings instantly with our automated withdrawal system. No waiting periods or complex procedures.'
    }
  ];

  const advancedFeatures = [
    {
      icon: <QrCode size={24} />,
      title: 'QR Code Generation',
      description: 'Generate QR codes for offline payments',
      color: 'primary'
    },
    {
      icon: <Bell size={24} />,
      title: 'Smart Notifications',
      description: 'Real-time payment alerts via SMS & email',
      color: 'secondary'
    },
    {
      icon: <Eye size={24} />,
      title: 'Customer Insights',
      description: 'Track customer behavior and preferences',
      color: 'success'
    },
    {
      icon: <Layers size={24} />,
      title: 'Multi-Product Support',
      description: 'Sell multiple products from one page',
      color: 'warning'
    },
    {
      icon: <Gift size={24} />,
      title: 'Discount Codes',
      description: 'Create and manage promotional offers',
      color: 'error'
    },
    {
      icon: <Target size={24} />,
      title: 'A/B Testing',
      description: 'Optimize conversion with split testing',
      color: 'info'
    }
  ];

  const useCases = [
    {
      title: 'Content Creators',
      description: 'Monetize your YouTube, Instagram, or blog content',
      icon: <Sparkles size={32} />,
      examples: ['Course sales', 'Exclusive content', 'Tips & donations'],
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)'
    },
    {
      title: 'Consultants & Coaches',
      description: 'Accept payments for services and sessions',
      icon: <Users size={32} />,
      examples: ['1-on-1 sessions', 'Group coaching', 'Consultation fees'],
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
    },
    {
      title: 'Small Businesses',
      description: 'Expand your business online with ease',
      icon: <Globe size={32} />,
      examples: ['Product sales', 'Service bookings', 'Advance payments'],
      gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)'
    },
    {
      title: 'Freelancers',
      description: 'Get paid for your skills and projects',
      icon: <Layers size={32} />,
      examples: ['Project payments', 'Milestone billing', 'Retainer fees'],
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    }
  ];

  const faqs = [
    {
      question: 'How quickly can I start accepting payments?',
      answer: 'You can create your first payment page and start accepting payments in under 60 seconds. No technical setup required!'
    },
    {
      question: 'What payment methods do you support?',
      answer: 'We support all major payment methods including UPI, credit/debit cards, net banking, and digital wallets popular in India.'
    },
    {
      question: 'Are there any hidden fees?',
      answer:
        'No hidden fees! We charge a transparent transaction fee only when you receive payments. No setup fees, monthly fees, or hidden charges.'
    },
    {
      question: 'How fast are payouts?',
      answer:
        'Payouts are instant! You can withdraw your earnings to your bank account anytime, 24/7, and the money reaches within minutes.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely! We use bank-grade security with SSL encryption and are compliant with all Indian financial regulations.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Digital Creator',
      content: "Omify transformed my online business. I've increased my revenue by 300% in just 3 months!",
      rating: 5,
      avatar: 'PS',
      verified: true
    },
    {
      name: 'Raj Patel',
      role: 'Course Creator',
      content: "The easiest payment solution I've ever used. Setup took less than 2 minutes!",
      rating: 5,
      avatar: 'RP',
      verified: true
    },
    {
      name: 'Anita Singh',
      role: 'Consultant',
      content: 'Professional, reliable, and incredibly user-friendly. Highly recommend!',
      rating: 5,
      avatar: 'AS',
      verified: true
    },
    {
      name: 'Vikram Gupta',
      role: 'Small Business Owner',
      content: 'Finally, a payment solution that understands Indian businesses. Game changer!',
      rating: 5,
      avatar: 'VG',
      verified: true
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for getting started',
      features: ['5 payment pages', 'Basic analytics', 'Email support', '2.9% transaction fee'],
      highlighted: false,
      buttonText: 'Start Free'
    },
    {
      name: 'Professional',
      price: '₹499',
      period: '/month',
      description: 'Best for growing businesses',
      features: [
        'Unlimited payment pages',
        'Advanced analytics',
        'Priority support',
        '2.4% transaction fee',
        'Custom branding',
        'QR codes'
      ],
      highlighted: true,
      buttonText: 'Start 14-day trial'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large scale operations',
      features: ['Everything in Pro', 'Dedicated support', 'Custom integrations', 'Negotiable rates', 'White-label solution'],
      highlighted: false,
      buttonText: 'Contact Sales'
    }
  ];

  const pulseAnimation = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

  const bounceAnimation = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

  const floatAnimation = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
`;
  useEffect(() => {
    setIsVisible(true);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  const GlobalStyles = () => (
    <style>
      {pulseAnimation}
      {bounceAnimation}
      {floatAnimation}
    </style>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5ff 50%, #e0e7ff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Floating background shapes */}
      <FloatingShape color="#667eea" size="300px" top="-100px" left="-100px" animation={gradientBackground} />
      <FloatingShape color="#764ba2" size="400px" bottom="-150px" right="-150px" animation={gradientBackground} />
      <FloatingShape color="#6B46C1" size="200px" top="30%" left="10%" animation={float} />
      <FloatingShape color="#4C51BF" size="250px" bottom="20%" right="10%" animation={floatHorizontal} />

      {/* Navigation */}
      <div style={styles.appContainer}>
        <GlobalStyles />

        {/* Background Elements */}
        <div style={styles.backgroundContainer}>
          <div style={styles.backgroundCircle1}></div>
          <div style={styles.backgroundCircle2}></div>
          <div style={styles.backgroundCircle3}></div>

          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.particle,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav style={styles.nav}>
          <div style={styles.navContainer}>
            <div style={styles.navContent}>
              {/* Logo */}
              <div style={styles.logoContainer}>
                <div style={styles.logoIcon}>
                  <DollarSign style={styles.logoSvg} />
                  <div style={styles.logoIndicator}></div>
                </div>
                <h1 style={styles.logoText}>Omify</h1>
              </div>

              {/* Desktop Navigation */}
              {isDesktop && (
                <div style={styles.desktopNav}>
                  <a href="#features" style={styles.navLink}>
                    Features
                  </a>
                  <a href="#use-cases" style={styles.navLink}>
                    Use Cases
                  </a>
                  <a href="#pricing" style={styles.navLink}>
                    Pricing
                  </a>
                  <a href="#about" style={styles.navLink}>
                    About
                  </a>
                </div>
              )}

              {/* CTA Button */}
              <div style={styles.ctaContainer}>
                {isDesktop && (
                  <button onClick={() => navigate('/login')} style={styles.ctaButton}>
                    Create Payment Page
                  </button>
                )}

                {/* Mobile Menu Button */}
                {!isDesktop && (
                  <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={styles.mobileMenuButton}>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && !isDesktop && (
            <div style={styles.mobileMenu}>
              <div style={styles.mobileMenuContent}>
                <a href="#features" style={styles.mobileNavLink}>
                  Features
                </a>
                <a href="#use-cases" style={styles.mobileNavLink}>
                  Use Cases
                </a>
                <a href="#pricing" style={styles.mobileNavLink}>
                  Pricing
                </a>
                <a href="#about" style={styles.mobileNavLink}>
                  About
                </a>
                <div style={styles.mobileMenuFooter}>
                  <button style={styles.mobileLoginButton}>Login</button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroContainer}>
            <div
              style={{
                ...styles.heroGrid,
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr'
              }}
            >
              {/* Left Content */}
              <div
                style={{
                  ...styles.heroLeftContent,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0,
                  padding: isMobile ? '0 1rem' : '0'
                }}
              >
                {/* Badge */}
                <div style={styles.heroBadge}>
                  <Zap style={styles.badgeIcon} />
                  <span style={styles.badgeText}>Launch in under 60 seconds</span>
                  <Sparkles style={styles.badgeIcon} />
                </div>

                {/* Headline */}
                <div style={styles.heroHeadline}>
                  <h1
                    style={{
                      ...styles.heroTitle,
                      fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem'
                    }}
                  >
                    <span style={styles.heroTitleText}>Create a custom</span>
                    <br />
                    <span style={styles.heroGradientText}>payment page</span>
                    <br />
                    <span style={styles.heroTitleText}>in seconds!</span>
                  </h1>
                  <p
                    style={{
                      ...styles.heroDescription,
                      fontSize: isMobile ? '1rem' : '1.125rem'
                    }}
                  >
                    Monetize your content effortlessly. Create beautiful, no-code payment links and start receiving payments instantly.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div
                  style={{
                    ...styles.ctaButtons,
                    flexDirection: isMobile ? 'column' : 'row'
                  }}
                >
                  <button onClick={() => navigate('/login')} style={styles.primaryButton}>
                    <span>Get Started Free</span>
                    <ArrowRight style={styles.buttonIcon} />
                  </button>
                  <button style={styles.secondaryButton}>
                    <Play style={styles.buttonIcon} />
                    <span>Watch Demo</span>
                  </button>
                </div>

                {/* Trust Indicators */}
                <div
                  style={{
                    ...styles.trustIndicators,
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: isMobile ? '1rem' : '1.5rem'
                  }}
                >
                  <div style={styles.trustItem}>
                    <CheckCircle style={styles.checkIcon} />
                    <span style={styles.trustText}>No setup fees</span>
                  </div>
                  <div style={styles.trustItem}>
                    <CheckCircle style={styles.checkIcon} />
                    <span style={styles.trustText}>Instant payouts</span>
                  </div>
                  <div style={styles.trustItem}>
                    <CheckCircle style={styles.checkIcon} />
                    <span style={styles.trustText}>24/7 support</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Dashboard */}
              {!isMobile && (
                <div
                  style={{
                    ...styles.heroRightContent,
                    transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                    opacity: isVisible ? 1 : 0
                  }}
                >
                  <div style={styles.dashboardContainer}>
                    {/* Main Dashboard Card */}
                    <div style={styles.dashboardCard}>
                      {/* Header */}
                      <div style={styles.dashboardHeader}>
                        <div style={styles.dashboardLogo}>
                          <div style={styles.dashboardLogoIcon}>
                            <BarChart3 style={styles.dashboardLogoSvg} />
                          </div>
                          <h3 style={styles.dashboardTitle}>Payment Dashboard</h3>
                        </div>
                        <div style={styles.liveIndicator}>
                          <div style={styles.liveDot}></div>
                          <span style={styles.liveText}>Live</span>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                          <div style={styles.statValue}>₹{stats.earnings.toLocaleString()}</div>
                          <div style={styles.statLabel}>Total Earnings</div>
                          <div style={styles.statTrend}>
                            <ArrowUp style={styles.trendIcon} />
                            <span style={styles.trendText}>+24% this month</span>
                          </div>
                        </div>
                        <div style={styles.statCard}>
                          <div style={{ ...styles.statValue, color: '#60a5fa' }}>₹{stats.withdrawn.toLocaleString()}</div>
                          <div style={styles.statLabel}>Withdrawn</div>
                          <div style={styles.statTrend}>
                            <Download style={{ ...styles.trendIcon, color: '#60a5fa' }} />
                            <span style={{ ...styles.trendText, color: '#60a5fa' }}>2 hours ago</span>
                          </div>
                        </div>
                      </div>

                      {/* Chart Area */}
                      <div style={styles.chartContainer}>
                        <div style={styles.chartPlaceholder}>
                          <TrendingUp style={styles.chartIcon} />
                        </div>
                        <div style={styles.chartShimmer}></div>
                      </div>

                      {/* Recent Activity */}
                      <div style={styles.activityContainer}>
                        <h4 style={styles.activityTitle}>Recent Activity</h4>
                        <div style={styles.activityList}>
                          <div style={styles.activityItem}>
                            <span style={styles.activityText}>Payment received</span>
                            <span style={styles.activityAmount}>+₹2,499</span>
                          </div>
                          <div style={styles.activityItem}>
                            <span style={styles.activityText}>New customer</span>
                            <span style={styles.activityCustomer}>Rajesh K.</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div style={styles.floatingElement1}>
                      <DollarSign style={styles.floatingIcon} />
                    </div>
                    <div style={styles.floatingElement2}>
                      <Shield style={styles.floatingIcon} />
                    </div>
                    <div style={styles.floatingElement3}>
                      <Bell style={styles.floatingIcon} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={styles.featuresSection}>
          <div style={styles.featuresContainer}>
            <div style={styles.featuresHeader}>
              <h2 style={styles.featuresTitle}>Why Choose Omify?</h2>
              <p style={styles.featuresSubtitle}>Everything you need to start accepting payments and grow your business</p>
            </div>

            <div
              style={{
                ...styles.featuresGrid,
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr'
              }}
            >
              {[
                {
                  icon: <Zap style={styles.featureIcon} />,
                  title: 'Lightning Fast Setup',
                  description: 'Get your payment page live in under 60 seconds. No coding required.',
                  gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)'
                },
                {
                  icon: <Lock style={styles.featureIcon} />,
                  title: 'Bank-Grade Security',
                  description: 'Your payments are protected with enterprise-level encryption.',
                  gradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)'
                },
                {
                  icon: <Globe style={styles.featureIcon} />,
                  title: 'Global Reach',
                  description: 'Accept payments from customers worldwide in multiple currencies.',
                  gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
                }
              ].map((feature, index) => (
                <div key={index} style={styles.featureCard}>
                  <div style={{ ...styles.featureIconContainer, background: feature.gradient }}>{feature.icon}</div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Container maxWidth="lg" sx={{ marginBottom: '2rem' }}>
          <Grid container spacing={4}>
            <Grid item xs={6} md={3}>
              <Box
                sx={{
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(0.5rem)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  {stats.users.toLocaleString()}+
                </Typography>
                <Typography variant="body1" sx={{ color: '#d1d5db' }}>
                  Happy Users
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} md={3}>
              <Box
                sx={{
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(0.5rem)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  ₹{(stats.earnings * 10).toLocaleString()}+
                </Typography>
                <Typography variant="body1" sx={{ color: '#d1d5db' }}>
                  Processed
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} md={3}>
              <Box
                sx={{
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(0.5rem)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  99.9%
                </Typography>
                <Typography variant="body1" sx={{ color: '#d1d5db' }}>
                  Uptime
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} md={3}>
              <Box
                sx={{
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(0.5rem)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  2s
                </Typography>
                <Typography variant="body1" sx={{ color: '#d1d5db' }}>
                  Load Time
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ marginBottom: '2rem' }}>
          <Box sx={{ textAlign: 'center', mb: 4, position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: 'white',
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              See Omify in Action
            </Typography>
            <Typography variant="h6" sx={{ color: '#d1d5db' }}>
              Interactive preview of our key features
            </Typography>
          </Box>

          <Grid container spacing={6} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
            {/* Feature Navigation */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {features.map((feature, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: '16px',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      borderLeft: currentFeatureIndex === index ? '4px solid' : 'none',
                      borderColor: currentFeatureIndex === index ? '#8b5cf6' : 'transparent',
                      backgroundColor: currentFeatureIndex === index ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: currentFeatureIndex === index ? '0 8px 24px rgba(139, 92, 246, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        borderColor: 'rgba(255, 255, 255, 0.3)'
                      }
                    }}
                    onClick={() => setCurrentFeatureIndex(index)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '12px',
                          background: feature.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight="medium" sx={{ color: 'white' }} gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#d1d5db' }} gutterBottom>
                          {feature.description}
                        </Typography>
                        {currentFeatureIndex === index && (
                          <Typography variant="caption" sx={{ color: '#8b5cf6', fontWeight: 'medium' }}>
                            {feature.details}
                          </Typography>
                        )}
                      </Box>
                      <ChevronRight
                        sx={{
                          color: '#d1d5db',
                          transition: 'transform 0.3s',
                          transform: currentFeatureIndex === index ? 'rotate(90deg)' : 'none'
                        }}
                      />
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Grid>

            {/* Feature Preview */}
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <Card
                  sx={{
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
                    transition: 'all 0.5s',
                    p: 4,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  {currentFeatureIndex === 0 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Typography variant="h6" fontWeight="medium" sx={{ color: 'white' }}>
                        Payment Page Builder
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                            Page Title
                          </Typography>
                          <Box
                            sx={{
                              width: 128,
                              height: 16,
                              borderRadius: '8px',
                              background: 'linear-gradient(135deg, rgba(191, 219, 254, 0.3) 0%, rgba(147, 197, 253, 0.3) 100%)'
                            }}
                          />
                        </Paper>
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                            Price
                          </Typography>
                          <Box
                            sx={{
                              width: 80,
                              height: 16,
                              borderRadius: '8px',
                              background: 'linear-gradient(135deg, rgba(187, 247, 208, 0.3) 0%, rgba(134, 239, 172, 0.3) 100%)'
                            }}
                          />
                        </Paper>
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                            Description
                          </Typography>
                          <Box
                            sx={{
                              width: 160,
                              height: 16,
                              borderRadius: '8px',
                              background: 'linear-gradient(135deg, rgba(233, 213, 255, 0.3) 0%, rgba(216, 180, 254, 0.3) 100%)'
                            }}
                          />
                        </Paper>
                      </Box>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                          fontWeight: 600,
                          color: 'white',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)'
                          }
                        }}
                      >
                        Generate Link
                      </Button>
                    </Box>
                  )}

                  {currentFeatureIndex === 1 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Typography variant="h6" fontWeight="medium" sx={{ color: 'white' }}>
                        Analytics Dashboard
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Paper
                            sx={{
                              p: 2,
                              borderRadius: '12px',
                              backgroundColor: 'rgba(59, 130, 246, 0.1)',
                              backdropFilter: 'blur(12px)',
                              border: '1px solid rgba(59, 130, 246, 0.2)'
                            }}
                          >
                            <Typography variant="h4" color="#3B82F6" fontWeight="bold">
                              156
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                              Page Views
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper
                            sx={{
                              p: 2,
                              borderRadius: '12px',
                              backgroundColor: 'rgba(16, 185, 129, 0.1)',
                              backdropFilter: 'blur(12px)',
                              border: '1px solid rgba(16, 185, 129, 0.2)'
                            }}
                          >
                            <Typography variant="h4" color="#10B981" fontWeight="bold">
                              23
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                              Conversions
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                      <Box
                        sx={{
                          height: 120,
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          backdropFilter: 'blur(12px)'
                        }}
                      >
                        <BarChart3 size={32} color="#8b5cf6" />
                      </Box>
                    </Box>
                  )}

                  {currentFeatureIndex === 2 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Typography variant="h6" fontWeight="medium" sx={{ color: 'white' }}>
                        Instant Withdrawals
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Paper
                          sx={{
                            p: 3,
                            borderRadius: '12px',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            backdropFilter: 'blur(12px)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            border: '1px solid rgba(16, 185, 129, 0.2)'
                          }}
                        >
                          <Box>
                            <Typography variant="subtitle2" color="#10B981" fontWeight="bold">
                              Available Balance
                            </Typography>
                            <Typography variant="caption" color="#10B981">
                              Ready to withdraw
                            </Typography>
                          </Box>
                          <Typography variant="h4" color="#10B981" fontWeight="bold">
                            ₹12,450
                          </Typography>
                        </Paper>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            borderRadius: '12px',
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                            color: 'white',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #0D9488 0%, #047857 100%)'
                            }
                          }}
                        >
                          Withdraw Now
                        </Button>
                        <Typography variant="caption" sx={{ color: '#d1d5db' }} textAlign="center">
                          Funds will be transferred instantly to your bank account
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ marginBottom: '2rem' }}>
          <Box
            sx={{
              textAlign: 'center',
              mb: 4,
              position: 'relative',
              zIndex: 1
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Power-packed custom payment pages you need today
            </Typography>
            <Typography variant="h6" sx={{ color: '#d1d5db' }}>
              Everything you need to monetize your content and grow your business online
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ mb: 8, position: 'relative', zIndex: 1 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={`feature-${index}`}>
                <Box
                  sx={{
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      p: 4,
                      height: '100%',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.5s ease ${index * 0.2}s`
                    }}
                  >
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: '16px',
                        background: feature.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        mb: 3,
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" fontWeight="medium" gutterBottom sx={{ color: 'white' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#d1d5db' }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ marginBottom: '2rem' }}>
          {/* Section header */}
          <Box sx={{ textAlign: 'center', mb: 4, position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Perfect for every type of business
            </Typography>
            <Typography variant="h6" sx={{ color: '#d1d5db' }}>
              Whether you're a creator, consultant, or business owner, Omify adapts to your needs
            </Typography>
          </Box>

          {/* Use case cards grid */}
          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
            {useCases.map((useCase, index) => (
              <Grid item xs={12} sm={6} lg={3} key={`usecase-${index}`}>
                <Box
                  sx={{
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      p: 4,
                      height: '100%',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.5s ease ${index * 0.1}s`
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: '16px',
                        background: useCase.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        mb: 3,
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {useCase.icon}
                    </Box>

                    {/* Content */}
                    <Typography variant="h6" component="h3" fontWeight="medium" gutterBottom sx={{ color: 'white' }}>
                      {useCase.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#d1d5db' }} gutterBottom>
                      {useCase.description}
                    </Typography>

                    {/* Examples list */}
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="medium" sx={{ color: '#a5b4fc' }} gutterBottom>
                        Popular uses:
                      </Typography>
                      <Box component="ul" sx={{ listStyle: 'none', pl: 0, m: 0 }}>
                        {useCase.examples.map((example, i) => (
                          <Box
                            key={`example-${i}`}
                            component="li"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: 1,
                              '&:last-child': { mb: 0 }
                            }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                backgroundColor: '#818cf8',
                                mr: 2,
                                flexShrink: 0
                              }}
                            />
                            <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                              {example}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ marginBottom: '2rem' }}>
          <Box
            sx={{
              textAlign: 'center',
              mb: 4,
              position: 'relative',
              zIndex: 1
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              How it works
            </Typography>
            <Typography variant="h6" sx={{ color: '#d1d5db' }}>
              Get started in just 3 simple steps
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
            {[
              {
                number: 1,
                gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                title: 'Create Your Page',
                description: 'Set up your payment page in under 60 seconds. Add your product details, pricing, and customize the design.',
                shadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
              },
              {
                number: 2,
                gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                title: 'Share Your Link',
                description: 'Share your payment link anywhere - social media, email, WhatsApp, or embed it on your website.',
                shadow: '0 8px 16px rgba(139, 92, 246, 0.3)'
              },
              {
                number: 3,
                gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                title: 'Get Paid',
                description: 'Receive payments instantly and withdraw your earnings to your bank account anytime.',
                shadow: '0 8px 16px rgba(16, 185, 129, 0.3)'
              }
            ].map((step, index) => (
              <Grid item xs={12} md={4} key={`step-${index}`}>
                <Box
                  sx={{
                    textAlign: 'center',
                    height: '100%',
                    p: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      background: step.gradient,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: step.shadow
                    }}
                  >
                    {step.number}
                  </Box>
                  <Typography variant="h6" component="h3" fontWeight="medium" gutterBottom sx={{ color: 'white' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#d1d5db' }}>
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ marginBottom: '2rem' }}>
          <Box
            sx={{
              textAlign: 'center',
              mb: 4,
              position: 'relative',
              zIndex: 1
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Loved by thousands of entrepreneurs
            </Typography>
            <Typography variant="h6" sx={{ color: '#d1d5db' }}>
              See what our users have to say
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} lg={3} key={`testimonial-${index}`}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    height: '100%',
                    '&:hover': {
                      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.2)',
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  {/* Rating stars */}
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Box
                        key={`star-${i}`}
                        component="span"
                        sx={{
                          width: 16,
                          height: 16,
                          color: i < testimonial.rating ? '#f59e0b' : '#6b7280',
                          mr: 0.5
                        }}
                      >
                        ★
                      </Box>
                    ))}
                  </Box>

                  {/* Testimonial content */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: 'italic',
                      mb: 3,
                      color: '#d1d5db'
                    }}
                  >
                    "{testimonial.content}"
                  </Typography>

                  {/* Author info */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        mr: 2,
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      {testimonial.avatar}
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight="medium"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          color: 'white'
                        }}
                      >
                        {testimonial.name}
                        {testimonial.verified && (
                          <Box
                            component="span"
                            sx={{
                              color: '#3b82f6',
                              ml: 0.5,
                              display: 'inline-flex'
                            }}
                          >
                            ✓
                          </Box>
                        )}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container maxWidth="md" sx={{ marginBottom: '2rem' }}>
          <Box
            sx={{
              textAlign: 'center',
              mb: 4,
              position: 'relative',
              zIndex: 1
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography variant="h6" sx={{ color: '#d1d5db' }}>
              Everything you need to know about Omify
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              position: 'relative',
              zIndex: 1
            }}
          >
            {faqs.map((faq, index) => (
              <Accordion
                key={`faq-${index}`}
                elevation={0}
                sx={{
                  borderRadius: '12px !important',
                  background: 'rgba(255, 255, 255, 0.1) !important',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:before': { display: 'none' },
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.4)'
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ChevronDown
                      sx={{
                        color: '#8b5cf6',
                        transition: 'transform 0.3s'
                      }}
                    />
                  }
                  sx={{
                    minHeight: 64,
                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                      transform: 'rotate(180deg)'
                    }
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="medium" sx={{ color: 'white' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    pt: 0
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>

        <Container maxWidth="md" sx={{ marginBottom: '2rem' }}>
          <Box
            sx={{
              textAlign: 'center',
              position: 'relative',
              zIndex: 1
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Ready to start earning online?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, color: '#d1d5db' }}>
              Join thousands of creators who are already monetizing their content with Omify
            </Typography>

            {/* CTA Buttons */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                justifyContent: 'center',
                mb: 4
              }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={20} />}
                sx={{
                  color: '#0f172a',
                  borderRadius: '12px',
                  fontWeight: 600,
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<Play size={20} />}
                sx={{
                  borderRadius: '12px',
                  fontWeight: 600,
                  borderWidth: '2px',
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Watch Demo
              </Button>
            </Box>

            <Typography
              variant="caption"
              sx={{
                opacity: 0.75,
                color: '#d1d5db',
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                flexWrap: 'wrap'
              }}
            >
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                ✓ No credit card required
              </Box>
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                ✓ Setup in 60 seconds
              </Box>
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                ✓ Cancel anytime
              </Box>
            </Typography>
          </Box>
        </Container>
      </div>

      {/* Pricing Section */}
      {/* <Box
        component="section"
        id="pricing"
        sx={{
          py: 10,
          background: 'linear-gradient(135deg, #f9fafb 0%, #e0e7ff 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <FloatingShape color="#8B5CF6" size="300px" top="10%" left="-150px" animation={float} />
        <FloatingShape color="#EC4899" size="400px" bottom="10%" right="-200px" animation={floatHorizontal} />

        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8, position: 'relative', zIndex: 1 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Simple, transparent pricing
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Choose the plan that fits your business needs
            </Typography>
          </Box>

          <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 6, position: 'relative', zIndex: 1 }}>
            <Tab label="Monthly" sx={{ fontWeight: 600 }} />
            <Tab label="Yearly (Save 20%)" sx={{ fontWeight: 600 }} />
          </Tabs>

          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <PricingCard highlighted={plan.highlighted}>
                  <CardContent sx={{ p: 4, height: '100%' }}>
                    {plan.highlighted && (
                      <Chip
                        label="Most Popular"
                        color="primary"
                        sx={{
                          width: '100%',
                          mb: 3,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          fontWeight: 600,
                          borderRadius: '12px'
                        }}
                      />
                    )}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                      <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                        {plan.name}
                      </Typography>
                      <Typography variant="h3" fontWeight="bold" gutterBottom>
                        {plan.price}
                        {plan.period && (
                          <Typography component="span" variant="h6" color="text.secondary">
                            {plan.period}
                          </Typography>
                        )}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {plan.description}
                      </Typography>
                    </Box>
                    <List sx={{ mb: 4 }}>
                      {plan.features.map((feature, i) => (
                        <ListItem key={i} disableGutters>
                          <ListItemAvatar sx={{ minWidth: 32 }}>
                            <CheckCircle color="#10B981" />
                          </ListItemAvatar>
                          <ListItemText primary={feature} primaryTypographyProps={{ color: 'text.secondary' }} />
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      fullWidth
                      variant={plan.highlighted ? 'contained' : 'outlined'}
                      color={plan.highlighted ? 'primary' : 'inherit'}
                      size="large"
                      sx={{
                        borderRadius: '12px',
                        fontWeight: 600,
                        ...(plan.highlighted && {
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #5a6fd1 0%, #6a42b8 100%)'
                          }
                        }),
                        ...(!plan.highlighted && {
                          borderWidth: '2px',
                          '&:hover': {
                            borderWidth: '2px'
                          }
                        })
                      }}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </PricingCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box> */}

      {/* Footer */}
      <Box
        component="footer"
        id="about"
        sx={{
          py: 8,
          backgroundColor: '#111827',
          color: 'white',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    <DollarSign size={24} />
                  </Box>
                  <GradientText variant="h6" sx={{ fontWeight: 'bold' }}>
                    Omify
                  </GradientText>
                </Box>
                <Typography variant="body2" color="grey.400">
                  Omify empowers digital entrepreneurs across India to build, manage, and monetise their online business.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ShieldCheck size={20} color="#10B981" />
                  <Typography variant="caption" color="#A7F3D0">
                    Guaranteed safe and secure payments
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Clock size={20} color="#3B82F6" />
                  <Typography variant="caption" color="#BFDBFE">
                    24/7 customer support
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                  <IconButton sx={{ color: 'grey.400', '&:hover': { color: '#3B82F6' } }}>
                    <Twitter size={20} />
                  </IconButton>
                  <IconButton sx={{ color: 'grey.400', '&:hover': { color: '#EC4899' } }}>
                    <Instagram size={20} />
                  </IconButton>
                  <IconButton sx={{ color: 'grey.400', '&:hover': { color: '#3B82F6' } }}>
                    <Linkedin size={20} />
                  </IconButton>
                  <IconButton sx={{ color: 'grey.400', '&:hover': { color: '#F43F5E' } }}>
                    <Youtube size={20} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={6} sm={4} md={2}>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                Product
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Features
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Pricing
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Security
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Integrations
                  </Button>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={6} sm={4} md={2}>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                Support
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Help Center
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Contact Us
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    API Docs
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Status Page
                  </Button>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={6} sm={4} md={2}>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                Resources
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Blog
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Guides
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Webinars
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Community
                  </Button>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={6} sm={4} md={2}>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                Legal
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Terms
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Privacy
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Refund Policy
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0, color: 'grey.400', '&:hover': { color: 'white' } }}>
                    Cookie Policy
                  </Button>
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Divider
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.1)',
              my: 4
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography variant="body2" color="grey.400">
              © 2025 Omify Pvt Ltd. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" color="grey.500">
                Made with <AnimatedWave>❤️</AnimatedWave> in India
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Zoom in={showScrollTop}>
          <Fab
            onClick={scrollToTop}
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd1 0%, #6a42b8 100%)'
              }
            }}
          >
            <ArrowUp />
          </Fab>
        </Zoom>
      )}
    </Box>
  );
};

const styles = {
  appContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
    position: 'relative',
    overflow: 'hidden'
  },
  backgroundContainer: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden'
  },
  backgroundCircle1: {
    position: 'absolute',
    top: '-10rem',
    right: '-10rem',
    width: '20rem',
    height: '20rem',
    backgroundColor: '#a855f7',
    borderRadius: '50%',
    mixBlendMode: 'multiply',
    filter: 'blur(1.5rem)',
    opacity: 0.7,
    animation: 'pulse 4s infinite',
    '@media (max-width: 768px)': {
      width: '15rem',
      height: '15rem',
      top: '-5rem',
      right: '-5rem'
    }
  },
  backgroundCircle2: {
    position: 'absolute',
    bottom: '-10rem',
    left: '-10rem',
    width: '20rem',
    height: '20rem',
    backgroundColor: '#3b82f6',
    borderRadius: '50%',
    mixBlendMode: 'multiply',
    filter: 'blur(1.5rem)',
    opacity: 0.7,
    animation: 'pulse 4s infinite',
    '@media (max-width: 768px)': {
      width: '15rem',
      height: '15rem',
      bottom: '-5rem',
      left: '-5rem'
    }
  },
  backgroundCircle3: {
    position: 'absolute',
    top: '10rem',
    left: '10rem',
    width: '15rem',
    height: '15rem',
    backgroundColor: '#ec4899',
    borderRadius: '50%',
    mixBlendMode: 'multiply',
    filter: 'blur(1.5rem)',
    opacity: 0.5,
    animation: 'pulse 4s infinite',
    '@media (max-width: 768px)': {
      width: '10rem',
      height: '10rem',
      top: '5rem',
      left: '5rem'
    }
  },
  particle: {
    position: 'absolute',
    width: '0.5rem',
    height: '0.5rem',
    backgroundColor: 'white',
    borderRadius: '50%',
    opacity: 0.2,
    animation: 'pulse 2s infinite'
  },
  nav: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 50,
    backdropFilter: 'blur(1rem)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
  },
  navContainer: {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '0 1rem',
    '@media (max-width: 768px)': {
      padding: '0 0.5rem'
    }
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '5rem',
    '@media (max-width: 768px)': {
      height: '4rem'
    }
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  logoIcon: {
    position: 'relative',
    width: '3rem',
    height: '3rem',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 768px)': {
      width: '2.5rem',
      height: '2.5rem'
    }
  },
  logoSvg: {
    width: '1.5rem',
    height: '1.5rem',
    color: 'white',
    '@media (max-width: 768px)': {
      width: '1.25rem',
      height: '1.25rem'
    }
  },
  logoIndicator: {
    position: 'absolute',
    top: '-0.25rem',
    right: '-0.25rem',
    width: '1rem',
    height: '1rem',
    backgroundColor: '#4ade80',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
    '@media (max-width: 768px)': {
      width: '0.75rem',
      height: '0.75rem'
    }
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, white, #e9d5ff)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    '@media (max-width: 768px)': {
      fontSize: '1.25rem'
    }
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem'
  },
  navLink: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 500,
    transition: 'color 0.3s ease',
    textDecoration: 'none',
    ':hover': {
      color: 'white'
    }
  },
  ctaContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  ctaButton: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    fontWeight: 600,
    boxShadow: '0 4px 6px rgba(139, 92, 246, 0.3)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
      background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
      boxShadow: '0 6px 8px rgba(139, 92, 246, 0.4)',
      transform: 'translateY(-2px)'
    },
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  mobileMenuButton: {
    padding: '0.5rem',
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(0.5rem)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'none',
    '@media (max-width: 1023px)': {
      display: 'block'
    },
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
    }
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(1rem)',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)'
  },
  mobileMenuContent: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  mobileNavLink: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 500,
    transition: 'color 0.3s ease',
    textDecoration: 'none',
    padding: '0.5rem 0',
    display: 'block',
    ':hover': {
      color: 'white'
    }
  },
  mobileMenuFooter: {
    paddingTop: '1rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)'
  },
  mobileLoginButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer'
  },
  heroSection: {
    position: 'relative',
    paddingTop: '8rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    '@media (max-width: 768px)': {
      paddingTop: '6rem',
      paddingBottom: '3rem'
    }
  },
  heroContainer: {
    maxWidth: '80rem',
    margin: '0 auto'
  },
  heroGrid: {
    display: 'grid',
    gap: '3rem',
    alignItems: 'center'
  },
  heroLeftContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    transition: 'all 1s ease'
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
    backdropFilter: 'blur(0.5rem)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '9999px',
    padding: '0.5rem 1rem'
  },
  badgeIcon: {
    width: '1rem',
    height: '1rem',
    color: '#a855f7'
  },
  badgeText: {
    color: '#d8b4fe',
    fontWeight: 500,
    fontSize: '0.875rem'
  },
  heroHeadline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  heroTitle: {
    fontWeight: 'bold',
    lineHeight: 1.2
  },
  heroTitleText: {
    color: 'white'
  },
  heroGradientText: {
    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  },
  heroDescription: {
    color: '#d1d5db',
    lineHeight: 1.6
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem'
  },
  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '0.75rem',
    fontWeight: 600,
    boxShadow: '0 4px 6px rgba(139, 92, 246, 0.3)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      boxShadow: '0 6px 8px rgba(139, 92, 246, 0.4)',
      transform: 'translateY(-2px)'
    },
    '@media (max-width: 768px)': {
      width: '100%',
      padding: '0.75rem 1.5rem'
    }
  },
  secondaryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(0.5rem)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderColor: 'rgba(255, 255, 255, 0.3)'
    },
    '@media (max-width: 768px)': {
      width: '100%',
      padding: '0.75rem 1.5rem'
    }
  },
  buttonIcon: {
    width: '1.25rem',
    height: '1.25rem',
    transition: 'transform 0.3s ease'
  },
  trustIndicators: {
    display: 'grid'
    // paddingTop: '1rem'
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  checkIcon: {
    width: '1.25rem',
    height: '1.25rem',
    color: '#4ade80'
  },
  trustText: {
    color: '#d1d5db',
    fontSize: '0.875rem'
  },
  heroRightContent: {
    position: 'relative',
    transition: 'all 1s ease 0.3s',
    '@media (max-width: 767px)': {
      display: 'none'
    }
  },
  dashboardContainer: {
    position: 'relative'
  },
  dashboardCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(1rem)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '1.5rem',
    padding: '2rem',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    transform: 'rotate(3deg)',
    transition: 'transform 0.5s ease',
    ':hover': {
      transform: 'rotate(0)'
    },
    '@media (max-width: 1023px)': {
      padding: '1.5rem',
      transform: 'rotate(0)'
    }
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  dashboardLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  dashboardLogoIcon: {
    width: '2rem',
    height: '2rem',
    background: 'linear-gradient(135deg, #4ade80 0%, #3b82f6 100%)',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dashboardLogoSvg: {
    width: '1rem',
    height: '1rem',
    color: 'white'
  },
  dashboardTitle: {
    color: 'white',
    fontWeight: 600
  },
  liveIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px'
  },
  liveDot: {
    width: '0.5rem',
    height: '0.5rem',
    backgroundColor: 'white',
    borderRadius: '50%',
    animation: 'pulse 2s infinite'
  },
  liveText: {
    color: 'white',
    fontWeight: 500,
    fontSize: '0.875rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(0.5rem)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0.75rem',
    padding: '1rem'
  },
  statValue: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#4ade80',
    marginBottom: '0.25rem'
  },
  statLabel: {
    color: '#d1d5db',
    fontSize: '0.875rem',
    marginBottom: '0.5rem'
  },
  statTrend: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  trendIcon: {
    width: '0.75rem',
    height: '0.75rem',
    color: '#4ade80'
  },
  trendText: {
    color: '#4ade80',
    fontSize: '0.75rem',
    fontWeight: 500
  },
  chartContainer: {
    height: '6rem',
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
    backdropFilter: 'blur(0.5rem)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '0.75rem',
    marginBottom: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chartPlaceholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chartIcon: {
    width: '3rem',
    height: '3rem',
    color: '#a855f7',
    opacity: 0.7
  },
  chartShimmer: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
    animation: 'shimmer 2.5s infinite'
  },
  activityContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    backgroundColor: 'rgba(107, 114, 128, 0.03)',
    borderRadius: '0.75rem',
    padding: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  },
  activityTitle: {
    color: '#a855f7',
    fontWeight: 600,
    fontSize: '0.875rem'
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  activityItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '0.5rem',
    padding: '0.75rem'
  },
  activityText: {
    color: '#9ca3af',
    fontSize: '0.875rem'
  },
  activityAmount: {
    color: '#4ade80',
    fontWeight: 'bold',
    fontSize: '0.875rem'
  },
  activityCustomer: {
    color: '#3b82f6',
    fontWeight: 'bold',
    fontSize: '0.875rem'
  },
  floatingElement1: {
    position: 'absolute',
    top: '-1.5rem',
    right: '-1.5rem',
    width: '4rem',
    height: '4rem',
    background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(245, 158, 11, 0.3)',
    animation: 'pulse 2s infinite',
    zIndex: 10,
    '@media (max-width: 1023px)': {
      width: '3rem',
      height: '3rem'
    }
  },
  floatingElement2: {
    position: 'absolute',
    bottom: '-1.5rem',
    left: '-1.5rem',
    width: '3rem',
    height: '3rem',
    background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)',
    animation: 'bounce 6s infinite',
    zIndex: 10,
    '@media (max-width: 1023px)': {
      width: '2.5rem',
      height: '2.5rem'
    }
  },
  floatingElement3: {
    position: 'absolute',
    top: '50%',
    left: '-2rem',
    width: '2.5rem',
    height: '2.5rem',
    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(236, 72, 153, 0.3)',
    animation: 'pulse 2s infinite',
    zIndex: 10,
    '@media (max-width: 1023px)': {
      width: '2rem',
      height: '2rem'
    }
  },
  floatingIcon: {
    width: '1.5rem',
    height: '1.5rem',
    color: 'white',
    '@media (max-width: 1023px)': {
      width: '1rem',
      height: '1rem'
    }
  },
  floatingStat1: {
    position: 'absolute',
    top: '-3rem',
    left: '25%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(1rem)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0.75rem',
    padding: '0.5rem 1rem',
    animation: 'pulse 2s infinite',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '@media (max-width: 1023px)': {
      top: '-2.5rem',
      fontSize: '0.75rem'
    }
  },
  floatingStat2: {
    position: 'absolute',
    bottom: '-3rem',
    right: '25%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(1rem)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0.75rem',
    padding: '0.5rem 1rem',
    animation: 'pulse 2s infinite',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '@media (max-width: 1023px)': {
      bottom: '-2.5rem',
      fontSize: '0.75rem'
    }
  },
  floatingStatIcon: {
    width: '1rem',
    height: '1rem',
    color: '#a855f7'
  },
  floatingStatText: {
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: 500
  },
  featuresSection: {
    position: 'relative',
    paddingTop: '1rem',
    paddingBottom: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    '@media (max-width: 768px)': {
      paddingTop: '3rem',
      paddingBottom: '3rem'
    }
  },
  featuresContainer: {
    maxWidth: '80rem',
    margin: '0 auto'
  },
  featuresHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
    '@media (max-width: 768px)': {
      marginBottom: '2rem'
    }
  },
  featuresTitle: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      fontSize: '1.75rem'
    }
  },
  featuresSubtitle: {
    fontSize: '1.25rem',
    color: '#d1d5db',
    maxWidth: '36rem',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      fontSize: '1rem'
    }
  },
  featuresGrid: {
    display: 'grid',
    gap: '2rem'
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(1rem)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '1.5rem',
    padding: '2rem',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
    },
    '@media (max-width: 768px)': {
      padding: '1.5rem'
    }
  },
  featureIconContainer: {
    width: '4rem',
    height: '4rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    marginBottom: '1.5rem',
    '@media (max-width: 768px)': {
      width: '3rem',
      height: '3rem',
      marginBottom: '1rem'
    }
  },
  featureIcon: {
    width: '2rem',
    height: '2rem',
    '@media (max-width: 768px)': {
      width: '1.5rem',
      height: '1.5rem'
    }
  },
  featureTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'white',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      fontSize: '1.1rem',
      marginBottom: '0.75rem'
    }
  },
  featureDescription: {
    color: '#d1d5db',
    '@media (max-width: 768px)': {
      fontSize: '0.875rem'
    }
  }
};

export default MainDashboardSection;
