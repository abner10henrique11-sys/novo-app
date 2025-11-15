// Sistema de autenticação local usando localStorage
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  plan: 'free' | 'basic' | 'premium' | 'pro';
  createdAt: string;
}

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  birthDate: string;
  photo?: string;
  userId: string;
}

export class AuthService {
  private static readonly USER_KEY = 'petcare_user';
  private static readonly PETS_KEY = 'petcare_pets';

  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static login(email: string, password: string): Promise<User | null> {
    return new Promise((resolve) => {
      // Simulação de login - em produção seria uma API real
      setTimeout(() => {
        const user: User = {
          id: Date.now().toString(),
          name: email.split('@')[0],
          email,
          plan: 'free',
          createdAt: new Date().toISOString()
        };
        
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        resolve(user);
      }, 1000);
    });
  }

  static register(name: string, email: string, password: string): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: Date.now().toString(),
          name,
          email,
          plan: 'free',
          createdAt: new Date().toISOString()
        };
        
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        resolve(user);
      }, 1000);
    });
  }

  static logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  static updateUser(userData: Partial<User>): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
    }
  }

  static getUserPets(): Pet[] {
    if (typeof window === 'undefined') return [];
    
    const petsData = localStorage.getItem(this.PETS_KEY);
    const pets = petsData ? JSON.parse(petsData) : [];
    const currentUser = this.getCurrentUser();
    
    return pets.filter((pet: Pet) => pet.userId === currentUser?.id);
  }

  static addPet(petData: Omit<Pet, 'id' | 'userId'>): Pet {
    const currentUser = this.getCurrentUser();
    if (!currentUser) throw new Error('Usuário não autenticado');

    const pet: Pet = {
      ...petData,
      id: Date.now().toString(),
      userId: currentUser.id
    };

    const existingPets = JSON.parse(localStorage.getItem(this.PETS_KEY) || '[]');
    existingPets.push(pet);
    localStorage.setItem(this.PETS_KEY, JSON.stringify(existingPets));

    return pet;
  }

  static updatePet(petId: string, petData: Partial<Pet>): void {
    const existingPets = JSON.parse(localStorage.getItem(this.PETS_KEY) || '[]');
    const petIndex = existingPets.findIndex((pet: Pet) => pet.id === petId);
    
    if (petIndex !== -1) {
      existingPets[petIndex] = { ...existingPets[petIndex], ...petData };
      localStorage.setItem(this.PETS_KEY, JSON.stringify(existingPets));
    }
  }
}