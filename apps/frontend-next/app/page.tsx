"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Pen,
  Users,
  Download,
  Shield,
  Zap,
  Github,
  Twitter,
  Menu,
  X,
  ArrowRight,
  Globe
} from 'lucide-react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const HandleClick = () => {
    router.push('/signup');
  };

  const GitHubclick = () => {
    window.open('https://github.com/godaralokesh29', '_blank')
  }

  const features = [
    {
      icon: <Pen className="w-5 h-5" />,
      title: "Hand-drawn Feel",
      description: "Diagrams that look like they were drawn by hand — personal and approachable."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time and see changes instantly."
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Privacy First",
      description: "Your data stays private. Your diagrams remain secure and confidential."
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning Fast",
      description: "Built for speed. Start drawing immediately without any setup."
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: "Export Anywhere",
      description: "Export as PNG, SVG, or share directly. Your work, your way."
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Works Everywhere",
      description: "Access from any device, any browser. No downloads required."
    }
  ];

  return (
    <div className="w-full bg-white relative text-gray-800 min-h-screen">
      {/* Dotted background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 w-full">
        {/* Navigation */}
        <nav className="border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center">
                  <Pen className="w-4 h-4 text-gray-800" />
                </div>
                <span className="text-xl font-semibold text-gray-900 tracking-wide">Duodle</span>
              </div>

              <div className="hidden md:flex items-center space-x-8 text-sm">
                <a href="#features" className="text-gray-500 hover:text-gray-900 transition-colors">Features</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Docs</a>
                <button onClick={GitHubclick} className="flex items-center space-x-1 text-gray-500 hover:text-gray-900 transition-colors bg-none border-none cursor-pointer">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </button>
                <a href="https://x.com/godaralokesh_29" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-gray-500 hover:text-gray-900 transition-colors">
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
                <button className="border border-gray-800 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  onClick={HandleClick}>
                  Start Drawing
                </button>
              </div>

              <button
                className="md:hidden text-gray-800"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-4 py-2 space-y-2 text-sm">
                <a href="#features" className="block py-2 text-gray-500">Features</a>
                <a href="#" className="block py-2 text-gray-500">Docs</a>
                <button onClick={GitHubclick} className="block py-2 text-gray-500 w-full text-left bg-none border-none cursor-pointer">GitHub</button>
                <a href="https://x.com/godaralokesh_29" target="_blank" rel="noopener noreferrer" className="block py-2 text-gray-500">Twitter</a>
                <button className="w-full bg-gray-900 text-white py-2 rounded-md mt-2" onClick={HandleClick}>
                  Start Drawing
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <span className="border border-gray-300 text-gray-500 px-3 py-1 rounded-full text-xs tracking-wide">
                  Free &amp; Open Source
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-wide">
                Collaborative
                <span className="block">Whiteboarding</span>
                Made Simple
              </h1>

              <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
                Create hand-drawn style diagrams and collaborate with your team in
                real-time. Privacy-focused, fast, and works everywhere.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button onClick={HandleClick} className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-700 transition-colors font-medium flex items-center justify-center space-x-2">
                  <span>Sign Up</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={HandleClick} className="w-full sm:w-auto border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:border-gray-500 transition-colors font-medium">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-24 border-t border-gray-200 bg-white/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-wide">
                Everything you need to bring ideas to life
              </h2>
              <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
                Powerful features while staying simple and intuitive
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 sm:p-8 hover:bg-gray-50 transition-colors">
                  <div className="text-gray-800 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-wide">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 border-t border-gray-200">
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-wide">
              Ready to start creating?
            </h2>
            <p className="text-base sm:text-lg text-gray-500 mb-8">
              Trusted by teams for their visual collaboration needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={HandleClick} className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-700 transition-colors font-medium">
                Start Drawing Now
              </button>
              <button onClick={GitHubclick} className="w-full sm:w-auto border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:border-gray-500 transition-colors font-medium">
                View on GitHub
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-12 bg-white/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center">
                  <Pen className="w-4 h-4 text-gray-800" />
                </div>
                <span className="text-lg font-semibold text-gray-900 tracking-wide">Duodle</span>
              </div>

              <div className="flex items-center space-x-6">
                <button onClick={GitHubclick} className="flex items-center space-x-1 text-gray-500 hover:text-gray-900 transition-colors bg-none border-none cursor-pointer">
                  <Github className="w-4 h-4" />
                  <span className="text-sm">GitHub</span>
                </button>
                <a href="https://x.com/godaralokesh_29" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-gray-500 hover:text-gray-900 transition-colors">
                  <Twitter className="w-4 h-4" />
                  <span className="text-sm">Twitter / X</span>
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-400 text-sm tracking-wide">
              <p>&copy; Duodle — Made by Lokesh Godara.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
