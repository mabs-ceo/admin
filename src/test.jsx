import { useState, useEffect } from 'react';
import { Bell, Calendar, BookOpen, MessageCircle, Menu, X, ChevronRight } from 'lucide-react';

export default function UmmahNotifier() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Bell size={24} />,
      title: "Real-time Janazah Notifications",
      description: "Receive immediate alerts for Janazah prayers across Singapore, enabling you to fulfill your community obligations promptly and respectfully."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Islamic Blog Articles",
      description: "Access scholarly reflections, spiritual guidance, and updates on local happenings relevant to the Muslim community in Singapore."
    },
    {
      icon: <Calendar size={24} />,
      title: "Events Calendar",
      description: "Stay informed about upcoming religious events, educational sessions, and community gatherings with our comprehensive Islamic calendar."
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Easy Subscription",
      description: "Subscribe via email or Telegram to receive curated updates in your preferred format, maintaining a strong connection with the Ummah."
    }
  ];

  return (
    <div className="font-sans text-gray-900 bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white text-gray-900 shadow-md py-2' : 'bg-transparent text-white py-4'}`}>
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className={`${scrolled ? 'text-emerald-800' : 'text-gold'} text-2xl mr-2`}>☪</div>
            <h1 className="font-serif text-xl font-medium tracking-wide">Ummah Notifier</h1>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="transition-all" />
            ) : (
              <Menu size={24} className="transition-all" />
            )}
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink active={true} scrolled={scrolled}>Home</NavLink>
            <NavLink scrolled={scrolled}>Events</NavLink>
            <NavLink scrolled={scrolled}>Janazah</NavLink>
            <NavLink scrolled={scrolled}>Blog</NavLink>
            <NavLink scrolled={scrolled}>Contact</NavLink>
            <button className={`ml-4 bg-emerald-800 hover:bg-emerald-900 text-white font-medium px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 text-sm`}>
              Subscribe
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden bg-white text-gray-900 absolute w-full shadow-lg transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="container mx-auto px-4">
            <div className="py-2 space-y-1">
              <MobileNavLink active={true}>Home</MobileNavLink>
              <MobileNavLink>Events</MobileNavLink>
              <MobileNavLink>Janazah</MobileNavLink>
              <MobileNavLink>Blog</MobileNavLink>
              <MobileNavLink>Contact</MobileNavLink>
              <div className="pt-2">
                <button className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium w-full px-4 py-3 rounded transition-all duration-300 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/api/placeholder/1920/1080')`, 
            filter: 'brightness(0.4)' 
          }}
        />
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 bg-emerald-900 bg-opacity-40 z-0">
          <div className="absolute inset-0 opacity-10" 
               style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.9'%3E%3Cpath d='M0 40a40 40 0 1 1 80 0 40 40 0 1 1-80 0zm45.3-8.2l8.8-15.3 8.9 15.3a20 20 0 0 1 0 16.4l-8.9 15.3-8.8-15.3a20 20 0 0 1 0-16.4zm-10.6 0l-8.8-15.3-8.9 15.3a20 20 0 0 0 0 16.4l8.9 15.3 8.8-15.3a20 20 0 0 0 0-16.4zM40 45.3l-15.3 8.8 15.3 8.9a20 20 0 0 0 16.4 0l15.3-8.9-15.3-8.8a20 20 0 0 0-16.4 0zm0-10.6l15.3-8.8-15.3-8.9a20 20 0 0 0-16.4 0L8 25.9l15.3 8.8a20 20 0 0 0 16.4 0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
               }}
          />
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-gold text-lg md:text-xl tracking-wider uppercase font-medium inline-block mb-3">Singapore's Muslim Community Hub</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 leading-tight">
              Stay Connected <span className="text-gold">with the Ummah</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
              Get timely updates on Janazah prayers, Islamic events, and community news – straight to your device.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-gold hover:bg-amber-600 text-emerald-900 font-semibold py-3 px-8 rounded-md shadow-lg transition duration-300 transform hover:scale-105 w-full sm:w-auto">
                Join the Ummah Notifier
              </button>
              <button className="bg-transparent hover:bg-white/10 border border-white text-white font-semibold py-3 px-8 rounded-md transition duration-300 flex items-center justify-center w-full sm:w-auto">
                <span>Learn More</span>
                <ChevronRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
          <div className="w-12 h-12 border border-gold/40 rounded-full flex items-center justify-center">
            <div className="text-gold text-xl">☪</div>
          </div>
        </div>
        
        <div className="absolute bottom-0 right-0 text-gold/30 hidden md:block">
          <svg width="320" height="160" viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16,160 V96 Q16,64 48,64 Q80,64 80,96 V160" fill="currentColor"/>
            <path d="M96,160 V80 Q96,48 128,48 Q160,48 160,80 V160" fill="currentColor"/>
            <path d="M176,160 V64 Q176,32 208,32 Q240,32 240,64 V160" fill="currentColor"/>
            <path d="M256,160 V112 Q256,80 288,80 Q320,80 320,112 V160" fill="currentColor"/>
            <path d="M128,48 L128,16 Q128,0 160,0 Q192,0 192,16 L192,48" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-white/70 text-sm mb-2">Explore Features</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto md:text-center mb-16">
            <span className="text-emerald-800 uppercase tracking-wider font-medium text-sm">What We Offer</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 text-gray-800">
              Connecting Our Community
            </h2>
            <div className="w-16 h-1 bg-gold mt-6 mb-6 md:mx-auto"></div>
            <p className="text-gray-600 leading-relaxed">
              Our platform provides essential services to keep the Muslim community in Singapore informed, connected, and engaged.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white rounded-lg p-6 transition-all duration-500 flex flex-col ${
                  index === activeFeature 
                    ? 'shadow-xl border-b-4 border-emerald-800 transform -translate-y-1' 
                    : 'shadow border-b-4 border-transparent'
                }`}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                  index === activeFeature ? 'bg-emerald-800 text-white' : 'bg-emerald-100 text-emerald-800'
                } mb-5 transition-all duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a href="#" className="inline-flex items-center text-emerald-800 font-medium text-sm hover:text-emerald-900">
                    Learn more <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Testimonial */}
          <div className="mt-20 bg-emerald-50 rounded-xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="w-20 h-20 bg-emerald-200 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-emerald-800 text-3xl">☪</span>
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-8">
                  <p className="text-gray-700 text-lg italic mb-4">
                    "This platform has transformed how our community stays connected. The Janazah notifications especially have helped us fulfill our obligations to our brothers and sisters."
                  </p>
                  <div>
                    <h4 className="font-medium text-gray-900">Imam Ahmad bin Abdullah</h4>
                    <p className="text-sm text-gray-600">Islamic Centre of Singapore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subscription CTA */}
          <div className="mt-20 text-center bg-emerald-900 text-white rounded-xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0"
                   style={{ 
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
                   }}
              />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">Join Our Growing Community</h3>
              <p className="text-white/80 mb-8">
                Stay informed about important events and announcements relevant to Muslims in Singapore.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent w-full sm:w-64"
                />
                <button className="bg-gold hover:bg-amber-600 text-emerald-900 font-semibold py-3 px-8 rounded-md shadow-lg transition duration-300 transform hover:scale-105">
                  Subscribe Now
                </button>
              </div>
              <p className="text-white/60 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Navigation link components
function NavLink({ children, active, scrolled }) {
  return (
    <a 
      href="#" 
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active 
          ? scrolled ? 'text-emerald-800' : 'text-gold' 
          : scrolled ? 'text-gray-700 hover:text-emerald-800' : 'text-white/90 hover:text-white'
      }`}
    >
      {children}
    </a>
  );
}

function MobileNavLink({ children, active }) {
  return (
    <a 
      href="#" 
      className={`block py-3 px-2 rounded-md text-sm font-medium ${
        active ? 'text-emerald-800' : 'text-gray-700 hover:text-emerald-800'
      }`}
    >
      {children}
    </a>
  );
}