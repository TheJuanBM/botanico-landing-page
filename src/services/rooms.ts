/**
 * Servicio para obtener disponibilidad de habitaciones
 * TODO: Conectar con el backend real
 */

// Imágenes locales de habitaciones (optimizadas con caché)
import suiteEstandarImg from '../assets/botanico/images/rooms/suite-estandar.jpeg';
import suiteBalconImg from '../assets/botanico/images/rooms/suite-balcon.jpeg';
import twinEstandarImg from '../assets/botanico/images/rooms/twin-estandar.jpeg';
import twinBalconImg from '../assets/botanico/images/rooms/twin-balcon.jpeg';
import masterSuiteImg from '../assets/botanico/images/rooms/master-suite.jpg';

export interface Room {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: number;
  priceFormatted: string;
  maxGuests: number;
  available: boolean;
  availableCount: number;
  images: string[];
  bedType: string;
  size: string;
}

export interface AvailabilityParams {
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface AvailabilityResponse {
  success: boolean;
  data: {
    rooms: Room[];
    totalNights: number;
    checkIn: string;
    checkOut: string;
    guests: number;
  };
  error?: string;
}

export const rooms = [
  {
    title: 'Suite Estandar',
    img: suiteEstandarImg.src,
    alt: 'Imagen de la Suite Estandar',
    description:
      'Diseñada para el viajero de negocios exigente, esta amplia suite combina funcionalidad con elegancia. Espacio de trabajo dedicado, vistas panorámicas y todas las comodidades para maximizar su productividad y confort.',
    features: [
      'Cama King Size premium',
      'Escritorio ejecutivo amplio',
      'Baño de lujo con ducha y bañera',
      'Wi-Fi de alta velocidad',
      'Smart TV 55" con streaming',
      'Cafetera Nespresso',
      'Minibar completamente equipado',
      'Caja de seguridad digital',
    ],
    price: 'Desde $195.000 COP',
  },
  {
    title: 'Suite con Balcón',
    img: suiteBalconImg.src,
    alt: 'Imagen de la Suite con Balcón',
    description:
      'Perfecta para quienes buscan confort y estilo. Con un diseño contemporáneo que maximiza el espacio y la luz natural, esta habitación ofrece un refugio tranquilo después de un día de exploración.',
    features: [
      'Cama Queen Size',
      'Balcón privado con vista',
      'Baño moderno',
      'Aire acondicionado',
      'Smart TV 50"',
      'Minibar',
      'Escritorio de trabajo',
      'Closet espacioso',
    ],
    price: 'Desde $195.000 COP',
  },
  {
    title: 'Twin Estandar',
    img: twinEstandarImg.src,
    alt: 'Imagen de la Twin Estandar',
    description:
      'La máxima expresión de lujo y exclusividad. Esta suite de dos ambientes ofrece una experiencia incomparable con servicio de mayordomo, jacuzzi privado y las vistas más privilegiadas del hotel.',
    features: [
      'Sala y dormitorio separados',
      'Cama King Size de lujo',
      'Jacuzzi privado',
      'Vista panorámica privilegiada',
      'Servicio de mayordomo',
      'Bar privado equipado',
      'Smart TV 65" en ambos ambientes',
      'Terraza exclusiva',
      'Baño de mármol',
      'Walk-in closet',
    ],
    price: 'Desde $234.000 COP',
  },
  {
    title: 'Twin con Balcón',
    img: twinBalconImg.src,
    alt: 'Imagen de la Twin con Balcón',
    description:
      'Ideal para estancias prolongadas, esta habitación ofrece un excelente equilibrio entre precio y calidad. Decoración elegante y todas las comodidades esenciales para una estadía placentera.',
    features: [
      'Cama Queen Size',
      'Baño completo',
      'Aire acondicionado',
      'Smart TV 43"',
      'Wi-Fi gratuito',
      'Escritorio',
      'Caja de seguridad',
      'Secador de pelo',
    ],
    price: 'Desde $234.000 COP',
  },
  {
    title: 'Master Suite',
    img: masterSuiteImg.src,
    alt: 'Imagen de la Master Suite',
    description:
      'Espaciosa y funcional, perfecta para familias o grupos. Con capacidad para hasta 4 personas, ofrece privacidad y confort para todos los huéspedes.',
    features: [
      'Dos habitaciones separadas',
      'Cama King y dos individuales',
      'Sala de estar',
      'Dos baños completos',
      'Cocina equipada',
      'Comedor',
      'Smart TV en cada habitación',
      'Balcón amplio',
      'Frigobar grande',
    ],
    price: 'Desde $338.000 COP',
  },
];

// Mock data de habitaciones
const mockRooms: Room[] = [
  {
    id: 'suite-ejecutiva',
    title: 'Suite Ejecutiva',
    description:
      'Amplia suite con vistas panorámicas, perfecta para viajeros de negocios que buscan confort y elegancia.',
    features: [
      'Cama King Size',
      'Escritorio ejecutivo',
      'Baño de lujo con tina',
      'Wi-Fi de alta velocidad',
      'Smart TV 55"',
      'Minibar premium',
      'Caja de seguridad',
    ],
    price: 280000,
    priceFormatted: '$280.000 COP',
    maxGuests: 2,
    available: true,
    availableCount: 3,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
    ],
    bedType: 'Cama King Size',
    size: '45 m²',
  },
  {
    id: 'habitacion-deluxe',
    title: 'Habitación Deluxe',
    description:
      'Diseño contemporáneo que combina funcionalidad y estilo para una estadía memorable.',
    features: [
      'Cama Queen Size',
      'Balcón privado',
      'Minibar',
      'Aire acondicionado',
      'Caja de seguridad',
      'Smart TV 50"',
    ],
    price: 220000,
    priceFormatted: '$220.000 COP',
    maxGuests: 2,
    available: true,
    availableCount: 5,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    ],
    bedType: 'Cama Queen Size',
    size: '35 m²',
  },
  {
    id: 'suite-premium',
    title: 'Suite Premium',
    description:
      'Nuestra suite más exclusiva, diseñada para ofrecer la máxima experiencia de lujo.',
    features: [
      'Sala independiente',
      'Jacuzzi privado',
      'Vista privilegiada',
      'Servicio de mayordomo',
      'Bar privado',
      'Smart TV 65"',
      'Sistema de sonido Bose',
    ],
    price: 380000,
    priceFormatted: '$380.000 COP',
    maxGuests: 4,
    available: true,
    availableCount: 2,
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800',
    ],
    bedType: 'Cama King Size + Sofá cama',
    size: '65 m²',
  },
  {
    id: 'habitacion-familiar',
    title: 'Habitación Familiar',
    description:
      'Espaciosa habitación ideal para familias, con todas las comodidades para una estadía perfecta.',
    features: [
      '2 Camas Queen Size',
      'Área de estar',
      'Minibar',
      'Aire acondicionado',
      'Smart TV 55"',
      'Baño completo',
      'Vista al jardín',
    ],
    price: 320000,
    priceFormatted: '$320.000 COP',
    maxGuests: 4,
    available: true,
    availableCount: 4,
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    ],
    bedType: '2 Camas Queen Size',
    size: '50 m²',
  },
  {
    id: 'habitacion-estandar',
    title: 'Habitación Estándar',
    description: 'Confort y calidad en un espacio acogedor, perfecta para viajeros prácticos.',
    features: ['Cama Doble', 'Aire acondicionado', 'Wi-Fi gratis', 'Smart TV 43"', 'Baño privado'],
    price: 180000,
    priceFormatted: '$180.000 COP',
    maxGuests: 2,
    available: true,
    availableCount: 8,
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800',
    ],
    bedType: 'Cama Doble',
    size: '25 m²',
  },
];

/**
 * Calcula el número de noches entre dos fechas
 */
function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

/**
 * Obtiene las habitaciones disponibles según los parámetros de búsqueda
 *
 * TODO: Reemplazar mock con llamada real al API
 * Endpoint esperado: GET /api/rooms/availability
 * Query params: checkIn, checkOut, guests
 */
export async function getAvailableRooms(params: AvailabilityParams): Promise<AvailabilityResponse> {
  const { checkIn, checkOut, guests } = params;

  // Validaciones básicas
  if (!checkIn || !checkOut) {
    return {
      success: false,
      data: {
        rooms: [],
        totalNights: 0,
        checkIn,
        checkOut,
        guests,
      },
      error: 'Las fechas de check-in y check-out son requeridas',
    };
  }

  const totalNights = calculateNights(checkIn, checkOut);

  if (totalNights <= 0) {
    return {
      success: false,
      data: {
        rooms: [],
        totalNights: 0,
        checkIn,
        checkOut,
        guests,
      },
      error: 'La fecha de check-out debe ser posterior al check-in',
    };
  }

  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mostrar todas las habitaciones disponibles
  // Los huéspedes pueden repartirse en múltiples habitaciones
  const availableRooms = mockRooms.filter((room) => {
    // Simular disponibilidad aleatoria basada en fechas
    // En producción, esto vendría del backend
    const dateHash =
      checkIn.split('-').reduce((acc, val) => acc + parseInt(val), 0) +
      checkOut.split('-').reduce((acc, val) => acc + parseInt(val), 0);

    // Hacer que algunas habitaciones no estén disponibles de forma "aleatoria"
    const isAvailable = (dateHash + room.id.length) % 10 !== 0;

    return isAvailable && room.available;
  });

  return {
    success: true,
    data: {
      rooms: availableRooms,
      totalNights,
      checkIn,
      checkOut,
      guests,
    },
  };
}

/**
 * Formatea una fecha ISO a formato legible
 */
export function formatDateDisplay(dateString: string): string {
  if (!dateString) return '';

  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('es-CO', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Formatea el precio total de la estadía
 */
export function formatTotalPrice(pricePerNight: number, nights: number): string {
  const total = pricePerNight * nights;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(total);
}
