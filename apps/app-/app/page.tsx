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
    router.push('https://github.com/godaralokesh29')

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Pen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Excalidraw</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Documentation</a>
              <a href="#" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
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
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block py-2 text-gray-600">Features</a>
              <a href="#about" className="block py-2 text-gray-600">About</a>
              <a href="#" className="block py-2 text-gray-600">Documentation</a>
              <a href="https://github.com/godaralokesh29" className="block py-2 text-gray-600">GitHub</a>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2"  onClick={HandleClick}>
                Start Drawing
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Free & Open Source</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Collaborative
              <span className="text-blue-600 block">Whiteboarding</span>
              Made Simple
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create beautiful hand-drawn style diagrams and collaborate with your team in real-time. 
              Privacy-focused, lightning-fast, and works everywhere.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={HandleClick} className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg flex items-center space-x-2 shadow-lg">
                <span>Start Drawing Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={HandleClick} className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-gray-400 transition-colors font-semibold text-lg">
                View Examples
              </button>
            </div>
            
            <div className="mt-12 flex justify-center items-center space-x-8 text-sm text-gray-500">
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
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to bring ideas to life
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Packed with powerful features while staying simple and intuitive
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perfect for every use case
            </h2>
            <p className="text-xl text-gray-600">
              From quick sketches to complex diagrams
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                  {useCase.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start creating?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of teams who trust Excalidraw for their visual collaboration needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={HandleClick} className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg">
              Start Drawing Now
            </button>
            <button onClick={GitHubclick} className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg">
              View on GitHub
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Pen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Excalidraw</span>
              </div>
              <p className="text-gray-400 max-w-md">
                The open-source collaborative whiteboarding tool that makes visual collaboration simple and enjoyable.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Features</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Examples</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Changelog</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors"><button onClick={GitHubclick}>Github</button></a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Discord</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Blog</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; Doraw  Made with ❤️ by Lokesh Godara.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;