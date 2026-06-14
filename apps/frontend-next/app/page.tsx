"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Pen, 
  Users, 
  Download, 
  Shield, 
  Zap, 
  Heart, 
  Github, 
  Twitter, 
  Menu, 
  X,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Globe,
  Lock,
  Palette
} from 'lucide-react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const router = useRouter();

 const HandleClick = () => {
    router.push('/signup');
  };

  const GitHubclick=()=>{
    window.open('https://github.com/godaralokesh29', '_blank')
  }

  const features = [
    {
      icon: <Pen className="w-6 h-6" />,
      title: "Hand-drawn Feel",
      description: "Create diagrams that look like they were drawn by hand, giving your work a personal and approachable touch."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time. See changes instantly and collaborate seamlessly."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "Your data stays private. End-to-end encryption ensures your diagrams remain secure and confidential."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Built for speed and performance. Start drawing immediately without any setup or installation."
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export Anywhere",
      description: "Export your creations as PNG, SVG, or share them directly. Your work, your way."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Works Everywhere",
      description: "Access from any device, any browser. No downloads required, just open and start creating."
    }
  ];

  const useCases = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Brainstorming",
      description: "Capture ideas as they flow"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Team Planning",
      description: "Align your team visually"
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "UI Wireframes",
      description: "Sketch interfaces quickly"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Process Flows",
      description: "Map out complex workflows"
    }
  ];

  return (
    <div className="w-full bg-[#f8fafc] relative text-gray-800">
      {/* Circuit Board Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "#f8fafc",
          backgroundImage: `
            linear-gradient(90deg, #e2e8f0 1px, transparent 1px),
            linear-gradient(180deg, #e2e8f0 1px, transparent 1px),
            linear-gradient(90deg, #cbd5e1 1px, transparent 1px),
            linear-gradient(180deg, #cbd5e1 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px, 50px 50px, 10px 10px, 10px 10px",
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Pen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">Duodle</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Documentation</a>
              <button onClick={GitHubclick} className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors bg-none border-none cursor-pointer">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              onClick={HandleClick}>
                Start Drawing
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-3 sm:px-4 py-2 space-y-2">
              <a href="#features" className="block py-2 text-gray-600 text-sm">Features</a>
              <a href="#about" className="block py-2 text-gray-600 text-sm">About</a>
              <a href="#" className="block py-2 text-gray-600 text-sm">Documentation</a>
              <button onClick={GitHubclick} className="block py-2 text-gray-600 text-sm w-full text-left bg-none border-none cursor-pointer">GitHub</button>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 text-sm font-medium"  onClick={HandleClick}>
                Start Drawing
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
          <div className="text-center">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Free & Open Source</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Collaborative
              <span className="text-blue-600 block">Whiteboarding</span>
              Made Simple
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Create beautiful hand-drawn style diagrams and collaborate with your team in real-time. 
              Privacy-focused, lightning-fast, and works everywhere.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
              <button onClick={HandleClick} className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 shadow-lg">
                <span>SignUp</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={HandleClick} className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:border-gray-400 transition-colors font-semibold text-base sm:text-lg">
                SignIn
              </button>
            </div>
            
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500 px-2">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>No account required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Always free</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Privacy first</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Everything you need to bring ideas to life
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Packed with powerful features while staying simple and intuitive
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Perfect for every use case
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">
              From quick sketches to complex diagrams
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="text-center p-4 sm:p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                  {useCase.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-sm text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to start creating?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8">
            Join thousands of teams who trust Duodle for their visual collaboration needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <button onClick={HandleClick} className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-base sm:text-lg">
              Start Drawing Now
            </button>
            <button onClick={GitHubclick} className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-colors font-semibold text-base sm:text-lg">
              View on GitHub
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Pen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Duodle</span>
              </div>
              <p className="text-gray-400 max-w-md text-sm sm:text-base">
                The open-source collaborative whiteboarding tool that makes visual collaboration simple and enjoyable.
              </p>
              <div className="flex space-x-4 mt-6">
                <button onClick={GitHubclick} className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                  <Github className="w-5 h-5" />
                </button>
                <a href="https://x.com/godaralokesh_29" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-sm sm:text-base">Community</h3>
              <div className="space-y-2">
                <button onClick={GitHubclick} className="block text-gray-400 hover:text-white transition-colors text-sm bg-none border-none cursor-pointer text-left">GitHub</button>
                <a href="https://x.com/godaralokesh_29" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors text-sm">Twitter / X</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400 text-sm">
            <p>&copy; Doraw  Made with ❤️ by Lokesh Godara.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}

export default App;