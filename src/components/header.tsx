'use client';

import { useState } from 'react';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, User, LogOut, Settings, Crown } from 'lucide-react';
import { AuthModal } from '@/components/auth-modal';

export function Header() {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      setShowAuthModal(true);
    }
  };

  const getPlanBadge = (plan: string) => {
    const badges = {
      free: { text: 'Gratuito', color: 'bg-gray-100 text-gray-600' },
      basic: { text: 'Básico', color: 'bg-blue-100 text-blue-600' },
      premium: { text: 'Premium', color: 'bg-purple-100 text-purple-600' },
      pro: { text: 'Pro', color: 'bg-gradient-to-r from-orange-400 to-pink-400 text-white' }
    };
    
    return badges[plan as keyof typeof badges] || badges.free;
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">PetCare</h1>
                <p className="text-xs text-gray-500">Cuidado com amor</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-600 hover:text-orange-500 transition-colors">
                Início
              </a>
              <a href="#training" className="text-gray-600 hover:text-orange-500 transition-colors">
                Adestramento
              </a>
              <a href="#calculator" className="text-gray-600 hover:text-orange-500 transition-colors">
                Calculadora
              </a>
              <a href="#vaccines" className="text-gray-600 hover:text-orange-500 transition-colors">
                Vacinas
              </a>
              <a href="#plans" className="text-gray-600 hover:text-orange-500 transition-colors">
                Planos
              </a>
            </nav>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPlanBadge(user.plan).color}`}>
                        {getPlanBadge(user.plan).text}
                      </span>
                      {user.plan === 'pro' && <Crown className="w-3 h-3 text-orange-500" />}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="hidden sm:flex">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleAuthClick}
                      className="text-gray-600 hover:text-red-500"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  onClick={handleAuthClick}
                  className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <nav className="flex flex-col space-y-3">
                <a href="#home" className="text-gray-600 hover:text-orange-500 transition-colors py-2">
                  Início
                </a>
                <a href="#training" className="text-gray-600 hover:text-orange-500 transition-colors py-2">
                  Adestramento
                </a>
                <a href="#calculator" className="text-gray-600 hover:text-orange-500 transition-colors py-2">
                  Calculadora
                </a>
                <a href="#vaccines" className="text-gray-600 hover:text-orange-500 transition-colors py-2">
                  Vacinas
                </a>
                <a href="#plans" className="text-gray-600 hover:text-orange-500 transition-colors py-2">
                  Planos
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}