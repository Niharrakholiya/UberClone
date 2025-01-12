import React, { useState } from 'react';
import { ChevronLeft, Mail, Lock, User } from 'lucide-react';
import { useEffect, useRef } from 'react';
const ParticleCanvas = () => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let animationFrameId;
      
      // Set canvas size
      const setCanvasSize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      
      setCanvasSize();
      window.addEventListener('resize', setCanvasSize);
  
      // Particle class
      class Particle {
        constructor() {
          this.reset();
        }
  
        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 1;
          this.speedX = Math.random() * 1 - 0.5;
          this.speedY = Math.random() * 1 - 0.5;
          this.opacity = Math.random() * 0.5 + 0.2;
        }
  
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
  
          if (this.x > canvas.width || this.x < 0 || 
              this.y > canvas.height || this.y < 0) {
            this.reset();
          }
        }
  
        draw() {
          ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
  
      // Create particles
      const particles = Array(50).fill().map(() => new Particle());
  
      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });
  
        animationFrameId = requestAnimationFrame(animate);
      };
  
      animate();
  
      // Cleanup
      return () => {
        window.removeEventListener('resize', setCanvasSize);
        cancelAnimationFrame(animationFrameId);
      };
    }, []);
  
    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />
    );
  };

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
   <div className="min-h-screen bg-white flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16 relative overflow-hidden">
        {/* Canvas Background */}
        <ParticleCanvas />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="mb-8">
            <img
              src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
              alt="Uber Logo"
              className="h-8 w-auto"
            />
          </div>

        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          
          <form className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              {!isLogin && (
                <p className="mt-2 text-sm text-gray-500">
                  Password must be at least 8 characters long
                </p>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-gray-600 hover:text-black">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>

            {/* {!isLogin && (
              <p className="text-sm text-gray-500 text-center">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-black hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-black hover:underline">
                  Privacy Policy
                </a>
              </p>
            )} */}
          </form>

          <div className="mt-8 text-center">
            <span className="text-gray-600">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-black font-medium hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Right Panel - Image (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
        <img
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="City street with cars"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthPages;