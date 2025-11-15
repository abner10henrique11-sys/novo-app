'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Star, 
  Play, 
  Calculator, 
  Calendar, 
  Crown, 
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Shield
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Testimonial, Plan } from '@/lib/supabase';

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  // Dados de fallback caso o Supabase não esteja configurado
  const fallbackTestimonials: Testimonial[] = [
    {
      id: '1',
      name: "Maria Silva",
      location: "São Paulo, SP",
      text: "O PetCare transformou a relação com minha Golden Retriever! As lições de adestramento são incríveis e os lembretes de vacina salvaram minha vida.",
      rating: 5,
      plan: "Premium",
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: "João Santos",
      location: "Rio de Janeiro, RJ", 
      text: "Finalmente um app que entende as necessidades do meu Bulldog. A calculadora de alimentação é perfeita e o suporte é excepcional!",
      rating: 5,
      plan: "Pro",
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      name: "Ana Costa",
      location: "Belo Horizonte, MG",
      text: "Meu Poodle nunca foi tão bem cuidado! O sistema de metas diárias me motiva todos os dias. Recomendo para todos os tutores!",
      rating: 5,
      plan: "Básico",
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      name: "Carlos Oliveira",
      location: "Curitiba, PR",
      text: "Incrível como o app me ajudou a organizar toda a rotina do meu Labrador. As notificações são pontuais e o conteúdo é de qualidade!",
      rating: 5,
      plan: "Premium",
      created_at: new Date().toISOString()
    }
  ];

  const fallbackPlans: Plan[] = [
    {
      id: '1',
      name: "Básico",
      price: "R$ 19,90",
      period: "/mês",
      description: "Perfeito para começar",
      features: [
        "Adestramento básico (10 lições)",
        "Calculadora de alimentação",
        "Carteira de vacinas",
        "Suporte por email"
      ],
      link: "https://mpago.la/2prynuq",
      popular: false,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: "Premium",
      price: "R$ 39,90", 
      period: "/mês",
      description: "Mais popular entre tutores",
      features: [
        "Adestramento completo (50+ lições)",
        "Calculadora avançada com IA",
        "Lembretes inteligentes",
        "Consultas veterinárias online",
        "Suporte prioritário",
        "Relatórios detalhados"
      ],
      link: "https://mpago.la/2yTup7L",
      popular: true,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      name: "Pro",
      price: "R$ 69,90",
      period: "/mês", 
      description: "Para tutores profissionais",
      features: [
        "Tudo do Premium +",
        "Adestramento personalizado",
        "Múltiplos pets",
        "Consultoria especializada",
        "Acesso antecipado a novidades",
        "Suporte 24/7 via WhatsApp"
      ],
      link: "https://mpago.la/26ciiKH",
      popular: false,
      created_at: new Date().toISOString()
    }
  ];

  // Carregar dados do Supabase
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Se o Supabase não estiver configurado, usar dados de fallback
      if (!supabase) {
        console.log('Supabase não configurado, usando dados de exemplo');
        setTestimonials(fallbackTestimonials);
        setPlans(fallbackPlans);
        setLoading(false);
        return;
      }

      // Carregar depoimentos
      const { data: testimonialsData, error: testimonialsError } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (testimonialsError) {
        console.error('Erro ao carregar depoimentos:', testimonialsError);
        setTestimonials(fallbackTestimonials);
      } else if (testimonialsData && testimonialsData.length > 0) {
        setTestimonials(testimonialsData);
      } else {
        setTestimonials(fallbackTestimonials);
      }

      // Carregar planos
      const { data: plansData, error: plansError } = await supabase
        .from('plans')
        .select('*')
        .order('price', { ascending: true });

      if (plansError) {
        console.error('Erro ao carregar planos:', plansError);
        setPlans(fallbackPlans);
      } else if (plansData && plansData.length > 0) {
        setPlans(plansData);
      } else {
        setPlans(fallbackPlans);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setTestimonials(fallbackTestimonials);
      setPlans(fallbackPlans);
    } finally {
      setLoading(false);
    }
  };

  // Função para scroll suave até uma seção
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const features = [
    {
      icon: Play,
      title: "Adestramento Profissional",
      description: "Lições em vídeo com especialistas, metas diárias e acompanhamento de progresso personalizado.",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Calculator,
      title: "Calculadora Inteligente",
      description: "Calcule a alimentação ideal baseada no peso, idade e raça do seu pet com precisão científica.",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Calendar,
      title: "Carteira de Vacinas",
      description: "Controle completo das vacinas com lembretes automáticos e histórico detalhado.",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: Crown,
      title: "Planos Premium",
      description: "Acesso a conteúdo exclusivo, consultas veterinárias e suporte prioritário 24/7.",
      color: "from-orange-400 to-pink-400"
    }
  ];

  // Função para obter cor do card do plano
  const getPlanCardColor = (index: number, popular: boolean) => {
    if (popular) return "border-purple-200 bg-purple-50";
    if (index === 0) return "border-blue-200 bg-blue-50";
    if (index === 2) return "border-orange-200 bg-gradient-to-br from-orange-50 to-pink-50";
    return "border-gray-200 bg-gray-50";
  };

  // Função para obter cor do botão do plano
  const getPlanButtonColor = (index: number, popular: boolean) => {
    if (popular) return "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700";
    if (index === 0) return "bg-blue-500 hover:bg-blue-600";
    if (index === 2) return "bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500";
    return "bg-gray-800 hover:bg-gray-900";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-600 border-orange-200">
                  ✨ Mais de 50.000 pets felizes
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                  Cuide do seu
                  <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent"> pet </span>
                  com amor e tecnologia
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  O app mais completo para adestramento, alimentação, vacinas e cuidados do seu melhor amigo. 
                  Transforme a vida do seu pet com ciência e carinho.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white px-8 py-6 text-lg"
                  onClick={() => scrollToSection('plans')}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Começar Gratuitamente
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-gray-200 hover:border-orange-300 px-8 py-6 text-lg"
                  onClick={() => scrollToSection('features')}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demonstração
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">+50k tutores</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">4.9/5 (2.847 avaliações)</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&h=600&fit=crop&crop=faces" 
                  alt="Cachorro feliz" 
                  className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto"
                />
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Pet saudável!</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-medium text-gray-700">+1.200 lições</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-pink-200 rounded-3xl blur-3xl opacity-30 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-600 border-orange-200 mb-4">
              🐕 Recursos Exclusivos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tudo que seu pet precisa em um só lugar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desenvolvido por veterinários e especialistas em comportamento animal para oferecer o melhor cuidado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-white text-orange-600 border-orange-200 mb-4">
              💬 Depoimentos Reais
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              O que os tutores estão dizendo
            </h2>
            <p className="text-xl text-gray-600">
              Mais de 50.000 pets e tutores já transformaram suas vidas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-600">
                      {testimonial.plan}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-600 border-orange-200 mb-4">
              💎 Planos Premium
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Escolha o melhor plano para seu pet
            </h2>
            <p className="text-xl text-gray-600">
              Todos os planos incluem garantia de 30 dias. Cancele quando quiser.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={plan.id} className={`relative border-2 ${getPlanCardColor(index, plan.popular)} hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'scale-105 shadow-xl' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1">
                      ⭐ Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${getPlanButtonColor(index, plan.popular)} text-white py-6 text-lg font-semibold`}
                    onClick={() => window.open(plan.link, '_blank')}
                  >
                    Escolher {plan.name}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Garantia 30 dias</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>+50k usuários</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Suporte premium</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-400 to-pink-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para transformar a vida do seu pet?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Junte-se a mais de 50.000 tutores que já descobriram o poder do PetCare
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-500 hover:bg-gray-50 px-8 py-6 text-lg font-semibold"
              onClick={() => scrollToSection('plans')}
            >
              <Heart className="w-5 h-5 mr-2" />
              Começar Gratuitamente
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-6 text-lg font-semibold"
            >
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">PetCare</h3>
                  <p className="text-sm text-gray-400">Cuidado com amor</p>
                </div>
              </div>
              <p className="text-gray-400">
                O app mais completo para cuidar do seu melhor amigo com amor e tecnologia.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Adestramento</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Calculadora</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vacinas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consultas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reembolso</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PetCare. Todos os direitos reservados. Feito com ❤️ para pets e tutores.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
