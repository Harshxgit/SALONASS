export interface Service {
    id: string;
    name: string;
    price: number;
    type: 'Haircut' | 'Coloring' | 'Styling' | 'Treatment';
    duration: number;
    image: string;
  }
  
  export const services: Service[] = [
    {
      id: '1',
      name: 'Classic Haircut',
      price: 30,
      type: 'Haircut',
      duration: 30,
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      id: '2',
      name: 'Hair Coloring',
      price: 80,
      type: 'Coloring',
      duration: 120,
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      id: '3',
      name: 'Blowout Styling',
      price: 50,
      type: 'Styling',
      duration: 45,
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      id: '4',
      name: 'Deep Conditioning Treatment',
      price: 40,
      type: 'Treatment',
      duration: 30,
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      id: '5',
      name: 'Beard Trim',
      price: 20,
      type: 'Haircut',
      duration: 15,
      image: '/placeholder.svg?height=100&width=100',
    },
  ];
  
  