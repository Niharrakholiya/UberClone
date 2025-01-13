import React, { useState } from 'react';
import { ChevronLeft, Mail, Lock, User } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useContext } from 'react';
import  CaptainContext from '../Context/CaptainContext';
// Reusing the same ParticleCanvas component from AuthPages


const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

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

    const particles = Array(50).fill().map(() => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

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

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    rememberMe: boolean;
    vehicle: {
      color: string;
      plate: string;
      capacity: number;
      vehicleType: 'car' | 'motorcycle' | 'auto';
    };
  }
  
  const CaptainAuthPage = () => {
    const captainContext = useContext(CaptainContext);
    if (!captainContext) throw new Error('useUser must be used within a UserProvider');
  
    const { loading, error: contextError, login, signup } = captainContext;
    const [isLogin, setIsLogin] = useState(true);
    const [formError, setFormError] = useState<string>('');
  
    const [formData, setFormData] = useState<FormData>({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rememberMe: false,
      vehicle: {
        color: '',
        plate: '',
        capacity: 1,
        vehicleType: 'car'
      }
    });
  
    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      
      if (name.startsWith('vehicle.')) {
        const vehicleField = name.split('.')[1];
        setFormData(prevState => ({
          ...prevState,
          vehicle: {
            ...prevState.vehicle,
            [vehicleField]: type === 'number' ? Number(value) : value
          }
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          [name]: (e.target as HTMLInputElement).type === 'checkbox' 
            ? (e.target as HTMLInputElement).checked 
            : value
        }));
      }
    };
  
    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setFormError('');
  
      try {
        if (isLogin) {
          await login(formData.email, formData.password, formData.rememberMe);
        } else {
          await signup(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.password,
            formData.vehicle
          );
        }
  
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          rememberMe: false,
          vehicle: {
            color: '',
            plate: '',
            capacity: 1,
            vehicleType: 'car'
          }
        });
  
      } catch (err) {
        setFormError((err as Error).message);
      }
    };
  
    const displayError = contextError || formError;
  
    return (
      <div className="min-h-screen bg-white flex">
        {/* Left Panel - Form */}
        <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16 relative overflow-hidden">
          <ParticleCanvas />
  
          <div className="relative z-10">
            <div className="mb-8">
              <a href='/'>
                <img
                  src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
                  alt="Uber Logo"
                  className="h-8 w-auto"
                />
              </a>
            </div>
  
            <div className="max-w-md w-full mx-auto">
              <h1 className="text-4xl font-bold mb-6">
                {isLogin ? 'Welcome Captain' : 'Become a Captain'}
              </h1>
  
              {displayError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {displayError}
                </div>
              )}
  
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="firstName"
                            required
                            placeholder="First name"
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            value={formData.firstName}
                            onChange={handleChange}
                            minLength={3}
                          />
                        </div>
                      </div>
  
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            value={formData.lastName}
                            onChange={handleChange}
                            minLength={3}
                          />
                        </div>
                      </div>
                    </div>
  
                    {/* Vehicle Information Section */}
                    <div className="border-t pt-6 mt-6">
                      <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vehicle Color
                          </label>
                          <div className="relative">
                            <Car className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              name="vehicle.color"
                              required
                              placeholder="Vehicle color"
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                              value={formData.vehicle.color}
                              onChange={handleChange}
                              minLength={3}
                            />
                          </div>
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            License Plate
                          </label>
                          <div className="relative">
                            <Car className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              name="vehicle.plate"
                              required
                              placeholder="License plate"
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                              value={formData.vehicle.plate}
                              onChange={handleChange}
                              minLength={3}
                            />
                          </div>
                        </div>
                      </div>
  
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vehicle Type
                          </label>
                          <select
                            name="vehicle.vehicleType"
                            required
                            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            value={formData.vehicle.vehicleType}
                            onChange={handleChange}
                          >
                            <option value="car">Car</option>
                            <option value="motorcycle">Motorcycle</option>
                            <option value="auto">Auto</option>
                          </select>
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Passenger Capacity
                          </label>
                          <input
                            type="number"
                            name="vehicle.capacity"
                            required
                            min="1"
                            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            value={formData.vehicle.capacity}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      value={formData.email}
                      onChange={handleChange}
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
                      name="password"
                      required
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      value={formData.password}
                      onChange={handleChange}
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
                        name="rememberMe"
                        className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                        checked={formData.rememberMe}
                        onChange={handleChange}
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
                  disabled={loading}
                  className={`w-full bg-black text-white py-3 rounded-lg transition-colors duration-300 ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                  }`}
                >
                  {loading
                    ? 'Loading...'
                    : isLogin
                    ? 'Sign In'
                    : 'Create Account'}
                </button>
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
  
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => window.location.href = '/auth'} 
                  className="w-full py-3 rounded-lg border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-300 flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Sign in as User Instead
                </button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Right Panel - Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
          <img
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Driver in car"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  };
  
  export default CaptainAuthPage;