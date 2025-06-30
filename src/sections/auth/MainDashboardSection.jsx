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
  Link,
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
  Gift
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
  Fab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router';

// Animation keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
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

// Styled components
const AnimatedFloat = styled('div')({
  animation: `${float} 6s ease-in-out infinite`
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

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}));

const GlassEffect = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.18)'
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[6]
  }
}));

const StatCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)'
}));

const UseCaseCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)'
  }
}));

const PricingCard = styled(Card)(({ theme, highlighted }) => ({
  transition: 'all 0.3s ease',
  ...(highlighted && {
    transform: 'scale(1.05)',
    border: `2px solid ${theme.palette.primary.main}`
  }),
  '&:hover': {
    transform: highlighted ? 'scale(1.07)' : 'translateY(-5px)'
  }
}));

const MainDashboardSection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [stats, setStats] = useState({
    earnings: 0,
    withdrawn: 0,
    users: 0
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setIsVisible(true);

    // Handle scroll for scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Animate numbers
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

    // Auto-rotate feature showcase
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

  const features = [
    {
      icon: <Zap />,
      title: 'No-Code Link',
      description: 'Go online and start collecting payments instantly with no tech integrations.',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      details: 'Create professional payment pages without writing a single line of code. Our drag-and-drop builder makes it easy.'
    },
    {
      icon: <TrendingUp />,
      title: 'Smart Tracking',
      description: 'Track and analyze all your payments at a single platform with real-time insights.',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      details: 'Get detailed analytics on customer behavior, payment patterns, and revenue trends to optimize your business.'
    },
    {
      icon: <CreditCard />,
      title: 'Easy Withdrawals',
      description: 'Withdraw your money hassle-free as and when you need with instant transfers.',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      details: 'Access your earnings instantly with our automated withdrawal system. No waiting periods or complex procedures.'
    }
  ];

  const advancedFeatures = [
    {
      icon: <QrCode />,
      title: 'QR Code Generation',
      description: 'Generate QR codes for offline payments',
      color: 'primary'
    },
    {
      icon: <Bell />,
      title: 'Smart Notifications',
      description: 'Real-time payment alerts via SMS & email',
      color: 'secondary'
    },
    {
      icon: <Eye />,
      title: 'Customer Insights',
      description: 'Track customer behavior and preferences',
      color: 'success'
    },
    {
      icon: <Layers />,
      title: 'Multi-Product Support',
      description: 'Sell multiple products from one page',
      color: 'warning'
    },
    {
      icon: <Gift />,
      title: 'Discount Codes',
      description: 'Create and manage promotional offers',
      color: 'error'
    },
    {
      icon: <Target />,
      title: 'A/B Testing',
      description: 'Optimize conversion with split testing',
      color: 'info'
    }
  ];

  const useCases = [
    {
      title: 'Content Creators',
      description: 'Monetize your YouTube, Instagram, or blog content',
      icon: <Sparkles />,
      examples: ['Course sales', 'Exclusive content', 'Tips & donations'],
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)'
    },
    {
      title: 'Consultants & Coaches',
      description: 'Accept payments for services and sessions',
      icon: <Users />,
      examples: ['1-on-1 sessions', 'Group coaching', 'Consultation fees'],
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
    },
    {
      title: 'Small Businesses',
      description: 'Expand your business online with ease',
      icon: <Globe />,
      examples: ['Product sales', 'Service bookings', 'Advance payments'],
      gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)'
    },
    {
      title: 'Freelancers',
      description: 'Get paid for your skills and projects',
      icon: <Layers />,
      examples: ['Project payments', 'Milestone billing', 'Retainer fees'],
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #c7d2fe 100%)'
      }}
    >
      {/* Navigation */}
      <GlassEffect sx={{ position: 'fixed', top: 0, width: '100%', zIndex: 50 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 64
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexShrink: 0 }}>
                <GradientText variant="h6" sx={{ fontWeight: 'bold' }}>
                  Omify
                </GradientText>
              </Box>
            </Box>

            <Hidden mdDown>
              <Box sx={{ ml: 10, display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <Button href="#features" color="inherit">
                  Features
                </Button>
                <Button href="#use-cases" color="inherit">
                  Use Cases
                </Button>
                <Button href="#pricing" color="inherit">
                  Pricing
                </Button>
                <Button href="#about" color="inherit">
                  About
                </Button>
              </Box>
            </Hidden>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/login')}
                sx={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)'
                  }
                }}
              >
                Create Payment Page
              </Button>
              <Hidden mdUp>
                <IconButton color="inherit" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X /> : <Menu />}
                </IconButton>
              </Hidden>
            </Box>
          </Box>
        </Container>

        {/* Mobile Menu */}
        <Hidden mdUp>
          <Box
            sx={{
              position: 'fixed',
              top: 64,
              right: 0,
              width: '100%',
              height: 'calc(100vh - 64px)',
              backgroundColor: 'background.paper',
              boxShadow: 3,
              transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s ease-in-out',
              zIndex: 40,
              p: 4
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button href="#features" color="inherit" fullWidth>
                Features
              </Button>
              <Button href="#use-cases" color="inherit" fullWidth>
                Use Cases
              </Button>
              <Button href="#pricing" color="inherit" fullWidth>
                Pricing
              </Button>
              <Button href="#about" color="inherit" fullWidth>
                About
              </Button>
              <Divider sx={{ my: 2 }} />
              <Button color="inherit" fullWidth>
                Login
              </Button>
            </Box>
          </Box>
        </Hidden>
      </GlassEffect>

      {/* Hero Section */}
      <Box component="section" sx={{ pt: 20, pb: 12, px: { xs: 2, sm: 3, md: 4 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} md={6}>
              <AnimatedFadeInUp animate={isVisible}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Chip
                      icon={<Zap />}
                      label="Launch in under 60 seconds"
                      sx={{
                        alignSelf: 'flex-start',
                        background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                        color: '#4f46e5'
                      }}
                    />
                    <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                      Create a custom{' '}
                      <GradientText component="span" variant="inherit">
                        payment page
                      </GradientText>{' '}
                      in less than a minute!
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      Monetize your content in a few clicks. Create a no-code payment link to receive payments instantly by sharing it with
                      your customers.
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={<ArrowRight />}
                      sx={{
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)'
                        }
                      }}
                      onClick={() => navigate('/login')}
                    >
                      Get Started Free
                    </Button>
                    <Button variant="outlined" color="inherit" size="large" startIcon={<Play />}>
                      Watch Demo
                    </Button>
                  </Box>

                  {/* Trust Indicators */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircle color="success" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          No setup fees
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircle color="success" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Instant payouts
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircle color="success" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          24/7 support
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </AnimatedFadeInUp>
            </Grid>

            {/* Right Content - Dashboard Preview */}
            <Grid item xs={12} md={6}>
              <AnimatedSlideInRight animate={isVisible}>
                <Box sx={{ position: 'relative' }}>
                  <AnimatedFloat>
                    <Card
                      sx={{
                        borderRadius: 4,
                        boxShadow: 6,
                        transform: 'rotate(3deg)',
                        '&:hover': {
                          transform: 'rotate(0)'
                        },
                        transition: 'transform 0.5s ease'
                      }}
                    >
                      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h6" component="h3">
                            Payment Dashboard
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                bgcolor: 'success.main',
                                animation: `${pulse} 2s ease-in-out infinite`
                              }}
                            />
                            <Typography variant="caption" color="success.main" fontWeight="medium">
                              Live
                            </Typography>
                          </Box>
                        </Box>

                        {/* Stats */}
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <StatCard sx={{ p: 2, borderRadius: 2 }}>
                              <Typography variant="h4" color="success.main" fontWeight="bold">
                                ₹{stats.earnings.toLocaleString()}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Total Earnings
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <ArrowUp sx={{ fontSize: 14, mr: 0.5 }} />
                                <Typography variant="caption" color="success.main">
                                  +24% this month
                                </Typography>
                              </Box>
                            </StatCard>
                          </Grid>
                          <Grid item xs={6}>
                            <StatCard sx={{ p: 2, borderRadius: 2 }}>
                              <Typography variant="h4" color="primary.main" fontWeight="bold">
                                ₹{stats.withdrawn.toLocaleString()}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Withdrawn
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <Download sx={{ fontSize: 14, mr: 0.5 }} />
                                <Typography variant="caption" color="primary.main">
                                  Last: 2 hours ago
                                </Typography>
                              </Box>
                            </StatCard>
                          </Grid>
                        </Grid>

                        {/* Chart Placeholder */}
                        <Box
                          sx={{
                            height: 120,
                            background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                          <TrendingUp sx={{ fontSize: 48, color: '#4f46e5' }} />
                          <Box
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                              animation: `${pulse} 2s ease-in-out infinite`
                            }}
                          />
                        </Box>

                        {/* Recent Activity */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            Recent Activity
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="caption" color="text.secondary">
                                Payment received
                              </Typography>
                              <Typography variant="caption" color="success.main" fontWeight="medium">
                                +₹2,499
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="caption" color="text.secondary">
                                New customer
                              </Typography>
                              <Typography variant="caption" color="primary.main" fontWeight="medium">
                                Rajesh K.
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </AnimatedFloat>

                  {/* Floating Elements */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -16,
                      right: -16,
                      width: 64,
                      height: 64,
                      background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 3,
                      animation: `${pulse} 2s ease-in-out infinite`,
                      zIndex: 1
                    }}
                  >
                    <DollarSign sx={{ color: 'white', fontSize: 32 }} />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -16,
                      left: -16,
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 3,
                      animation: `${float} 6s ease-in-out infinite`,
                      zIndex: 1
                    }}
                  >
                    <Shield sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: -32,
                      width: 32,
                      height: 32,
                      background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 3,
                      animation: `${bounce} 2s infinite`,
                      zIndex: 1
                    }}
                  >
                    <Bell sx={{ color: 'white', fontSize: 16 }} />
                  </Box>
                </Box>
              </AnimatedSlideInRight>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box
        component="section"
        sx={{
          py: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary.main" fontWeight="bold" gutterBottom>
                  {stats.users.toLocaleString()}+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Happy Users
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="success.main" fontWeight="bold" gutterBottom>
                  ₹{(stats.earnings * 10).toLocaleString()}+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Processed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="secondary.main" fontWeight="bold" gutterBottom>
                  99.9%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Uptime
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="warning.main" fontWeight="bold" gutterBottom>
                  2s
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Load Time
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Interactive Feature Showcase */}
      <Box
        component="section"
        sx={{
          py: 4,
          background: 'linear-gradient(135deg, #f9fafb 0%, #e0e7ff 100%)'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              See Omify in Action
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Interactive preview of our key features
            </Typography>
          </Box>

          <Grid container spacing={6} alignItems="center">
            {/* Feature Navigation */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {features.map((feature, index) => (
                  <Paper
                    key={index}
                    elevation={currentFeatureIndex === index ? 4 : 1}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      borderLeft: currentFeatureIndex === index ? '4px solid' : 'none',
                      borderColor: currentFeatureIndex === index ? 'primary.main' : 'transparent',
                      backgroundColor: currentFeatureIndex === index ? 'background.paper' : 'rgba(255, 255, 255, 0.5)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.7)'
                      }
                    }}
                    onClick={() => setCurrentFeatureIndex(index)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 1,
                          background: feature.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          flexShrink: 0
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight="medium" gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {feature.description}
                        </Typography>
                        {currentFeatureIndex === index && (
                          <Typography variant="caption" color="primary.main" fontWeight="medium">
                            {feature.details}
                          </Typography>
                        )}
                      </Box>
                      <ChevronRight
                        sx={{
                          color: 'text.secondary',
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
                    borderRadius: 3,
                    boxShadow: 4,
                    transition: 'all 0.5s',
                    p: 4
                  }}
                >
                  {currentFeatureIndex === 0 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Typography variant="h6" fontWeight="medium">
                        Payment Page Builder
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Page Title
                          </Typography>
                          <Box
                            sx={{
                              width: 128,
                              height: 16,
                              borderRadius: 1,
                              background: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)'
                            }}
                          />
                        </Paper>
                        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Price
                          </Typography>
                          <Box
                            sx={{
                              width: 80,
                              height: 16,
                              borderRadius: 1,
                              background: 'linear-gradient(135deg, #bbf7d0 0%, #86efac 100%)'
                            }}
                          />
                        </Paper>
                        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Description
                          </Typography>
                          <Box
                            sx={{
                              width: 160,
                              height: 16,
                              borderRadius: 1,
                              background: 'linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%)'
                            }}
                          />
                        </Paper>
                      </Box>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
                        }}
                      >
                        Generate Link
                      </Button>
                    </Box>
                  )}

                  {currentFeatureIndex === 1 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Typography variant="h6" fontWeight="medium">
                        Analytics Dashboard
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Paper sx={{ p: 2, borderRadius: 2, backgroundColor: 'primary.light' }}>
                            <Typography variant="h4" color="primary.dark" fontWeight="bold">
                              156
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Page Views
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper sx={{ p: 2, borderRadius: 2, backgroundColor: 'success.light' }}>
                            <Typography variant="h4" color="success.dark" fontWeight="bold">
                              23
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Conversions
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                      <Box
                        sx={{
                          height: 96,
                          background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <BarChart3 sx={{ fontSize: 32, color: '#4f46e5' }} />
                      </Box>
                    </Box>
                  )}

                  {currentFeatureIndex === 2 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Typography variant="h6" fontWeight="medium">
                        Instant Withdrawals
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Paper
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            backgroundColor: 'success.light',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Box>
                            <Typography variant="subtitle2" color="success.dark" fontWeight="bold">
                              Available Balance
                            </Typography>
                            <Typography variant="caption" color="success.dark">
                              Ready to withdraw
                            </Typography>
                          </Box>
                          <Typography variant="h4" color="success.dark" fontWeight="bold">
                            ₹12,450
                          </Typography>
                        </Paper>
                        <Button
                          fullWidth
                          variant="contained"
                          color="success"
                          sx={{
                            '&:hover': {
                              backgroundColor: 'success.dark'
                            }
                          }}
                        >
                          Withdraw Now
                        </Button>
                        <Typography variant="caption" color="text.secondary" textAlign="center">
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
      </Box>

      {/* Features Section */}
      <Box component="section" id="features" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Power-packed custom payment pages you need today
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Everything you need to monetize your content and grow your business online
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ mb: 8 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard>
                  <AnimatedFadeInUp animate={isVisible} style={{ animationDelay: `${index * 0.2}s` }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          background: feature.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          mb: 3
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" component="h3" fontWeight="medium" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </AnimatedFadeInUp>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>

          {/* Advanced Features Grid */}
          <Card sx={{ borderRadius: 4, boxShadow: 4, p: 4 }}>
            <Typography variant="h5" component="h3" fontWeight="bold" textAlign="center" gutterBottom>
              Advanced Features
            </Typography>
            <Grid container spacing={3}>
              {advancedFeatures.map((feature, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'flex-start', gap: 2, '&:hover': { backgroundColor: 'action.hover' } }}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: `${feature.color}.light`,
                        color: `${feature.color}.dark`
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Container>
      </Box>

      {/* Use Cases Section */}
      <Box
        component="section"
        id="use-cases"
        sx={{
          py: 10,
          background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Perfect for every type of business
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Whether you're a creator, consultant, or business owner, Omify adapts to your needs
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {useCases.map((useCase, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <UseCaseCard>
                  <AnimatedFadeInUp animate={isVisible} style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          background: useCase.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          mb: 3
                        }}
                      >
                        {useCase.icon}
                      </Box>
                      <Typography variant="h6" component="h3" fontWeight="medium" gutterBottom>
                        {useCase.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" gutterBottom>
                        {useCase.description}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" fontWeight="medium" gutterBottom>
                          Popular uses:
                        </Typography>
                        <List dense disablePadding>
                          {useCase.examples.map((example, i) => (
                            <ListItem key={i} disableGutters>
                              <ListItemAvatar sx={{ minWidth: 24 }}>
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    backgroundColor: 'primary.main'
                                  }}
                                />
                              </ListItemAvatar>
                              <ListItemText primary={example} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </CardContent>
                  </AnimatedFadeInUp>
                </UseCaseCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box component="section" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              How it works
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Get started in just 3 simple steps
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    mx: 'auto',
                    mb: 3
                  }}
                >
                  1
                </Box>
                <Typography variant="h6" component="h3" fontWeight="medium" gutterBottom>
                  Create Your Page
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Set up your payment page in under 60 seconds. Add your product details, pricing, and customize the design.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    mx: 'auto',
                    mb: 3
                  }}
                >
                  2
                </Box>
                <Typography variant="h6" component="h3" fontWeight="medium" gutterBottom>
                  Share Your Link
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Share your payment link anywhere - social media, email, WhatsApp, or embed it on your website.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    mx: 'auto',
                    mb: 3
                  }}
                >
                  3
                </Box>
                <Typography variant="h6" component="h3" fontWeight="medium" gutterBottom>
                  Get Paid
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Receive payments instantly and withdraw your earnings to your bank account anytime.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box
        component="section"
        id="pricing"
        sx={{
          py: 10,
          background: 'linear-gradient(135deg, #f9fafb 0%, #e0e7ff 100%)'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Simple, transparent pricing
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Choose the plan that fits your business needs
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <PricingCard highlighted={plan.highlighted}>
                  <CardContent sx={{ p: 4 }}>
                    {plan.highlighted && (
                      <Chip
                        label="Most Popular"
                        color="primary"
                        sx={{
                          width: '100%',
                          mb: 3,
                          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                          color: 'white'
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
                            <CheckCircle color="success" />
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
                        ...(plan.highlighted && {
                          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)'
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
      </Box>

      {/* Enhanced Testimonials Section */}
      <Box component="section" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Loved by thousands of entrepreneurs
            </Typography>
            <Typography variant="h6" color="text.secondary">
              See what our users have to say
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 2,
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: 4
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        sx={{
                          width: 16,
                          height: 16,
                          color: 'warning.main',
                          fill: 'currentColor'
                        }}
                      />
                    ))}
                  </Box>
                  <Typography variant="body2" color="text.secondary" fontStyle="italic" sx={{ mb: 3 }}>
                    "{testimonial.content}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        mr: 2,
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="medium" sx={{ display: 'flex', alignItems: 'center' }}>
                        {testimonial.name}
                        {testimonial.verified && (
                          <CheckCircle
                            sx={{
                              width: 16,
                              height: 16,
                              color: 'primary.main',
                              ml: 0.5
                            }}
                          />
                        )}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box
        component="section"
        sx={{
          py: 10,
          background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)'
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Frequently Asked Questions
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Everything you need to know about Omify
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              {
                question: 'How quickly can I start accepting payments?',
                answer:
                  'You can create your first payment page and start accepting payments in under 60 seconds. No technical setup required!'
              },
              {
                question: 'What payment methods do you support?',
                answer:
                  'We support all major payment methods including UPI, credit/debit cards, net banking, and digital wallets popular in India.'
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
                answer:
                  'Absolutely! We use bank-grade security with SSL encryption and are compliant with all Indian financial regulations.'
              }
            ].map((faq, index) => (
              <Accordion key={index} elevation={2}>
                <AccordionSummary expandIcon={<ChevronRight />}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        component="section"
        sx={{
          py: 10,
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Ready to start earning online?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of creators who are already monetizing their content with Omify
            </Typography>
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
                color="secondary"
                size="large"
                endIcon={<ArrowRight />}
                sx={{
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'background.paper'
                  }
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                startIcon={<Play />}
                sx={{
                  borderWidth: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 2
                  }
                }}
              >
                Watch Demo
              </Button>
            </Box>
            <Typography variant="caption" sx={{ opacity: 0.75 }}>
              ✓ No credit card required ✓ Setup in 60 seconds ✓ Cancel anytime
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        id="about"
        sx={{
          py: 8,
          backgroundColor: 'grey.900',
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <GradientText variant="h6" sx={{ fontWeight: 'bold' }}>
                  Omify
                </GradientText>
                <Typography variant="body2" color="grey.300">
                  Omify empowers digital entrepreneurs across India to build, manage, and monetise their online business.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Shield sx={{ color: 'success.main', fontSize: 16 }} />
                  <Typography variant="caption" color="success.light">
                    Guaranteed safe and secure payments
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Clock sx={{ color: 'info.main', fontSize: 16 }} />
                  <Typography variant="caption" color="info.light">
                    24/7 customer support
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                Product
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0 }}>
                    Features
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0 }}>
                    Pricing
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0 }}>
                    Security
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0 }}>
                    Integrations
                  </Button>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                Support
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0 }}>
                    Help Center
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0 }}>
                    Contact Us
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0 }}>
                    API Docs
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0 }}>
                    Status Page
                  </Button>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                Legal
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0 }}>
                    Terms
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0 }}>
                    Privacy
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0 }}>
                    Refund Policy
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Button href="#" color="inherit" sx={{ p: 0 }}>
                    Cookie Policy
                  </Button>
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Divider
            sx={{
              borderColor: 'grey.700',
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
            <Typography variant="body2" color="grey.300">
              © 2025 Omify Pvt Ltd. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" color="grey.400">
                Made with ❤️ in India
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Fab
          onClick={scrollToTop}
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)'
            }
          }}
        >
          <ArrowUp />
        </Fab>
      )}
    </Box>
  );
};

export default MainDashboardSection;
