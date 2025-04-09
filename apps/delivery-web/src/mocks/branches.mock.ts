import { IBranch } from '@/types';

export const branchesMock: IBranch[] = [
  {
    id: '1',
    name: 'Punto 33 Alta Córdoba',
    description: 'Alta Córdoba',
    address: 'Av. Principal 123, Alta Córdoba',
    openingHoursStructured: {
      mondayToThursday: { open: '06:00', close: '23:59' },
      fridayToSunday: {
        firstShift: { open: '11:00', close: '14:59' },
        secondShift: { open: '16:00', close: '23:59' },
      },
    },
    phoneNumber: '555-1234',
    imageUrl: `/images/branches/1.jpg`,
  },
  {
    id: '2',
    name: 'Punto 33 Quebrada las Rosas',
    description: 'Av. Colón',
    address: 'Calle 45 #789, Quebrada las Rosas',
    openingHoursStructured: {
      mondayToThursday: { open: '09:00', close: '21:00' },
      fridayToSunday: {
        firstShift: { open: '11:00', close: '14:59' },
        secondShift: { open: '16:00', close: '20:00' },
      },
    },
    phoneNumber: '555-5678',
    imageUrl: `/images/branches/2.jpg`,
  },
  {
    id: '3',
    name: 'Punto 33 Jardín y las Flores',
    description: 'Av. Richieri',
    address: 'Av. del Jardín 567, Barrio Jardín',
    openingHoursStructured: {
      mondayToThursday: { open: '10:00', close: '20:00' },
      fridayToSunday: {
        firstShift: { open: '11:00', close: '14:59' },
        secondShift: { open: '16:00', close: '20:00' },
      },
    },
    phoneNumber: '555-9012',
    imageUrl: `/images/branches/3.jpg`,
  },
  {
    id: '4',
    name: 'Punto 33 Av. Sabattini',
    description: 'Av. Sabattini',
    address: 'Av. Sabattini 456, Centro',
    openingHoursStructured: {
      mondayToThursday: { open: '08:30', close: '21:30' },
      fridayToSunday: {
        firstShift: { open: '11:00', close: '14:59' },
        secondShift: { open: '16:00', close: '20:00' },
      },
    },
    phoneNumber: '555-3456',
    imageUrl: `/images/branches/4.jpg`,
  },
  {
    id: '5',
    name: 'Punto 33 Duarte Quirós',
    description: 'Duarte Quirós',
    address: 'Av. Duarte Quirós 789, Centro',
    openingHoursStructured: {
      mondayToThursday: { open: '08:00', close: '22:00' },
      fridayToSunday: {
        firstShift: { open: '11:00', close: '14:59' },
        secondShift: { open: '16:00', close: '21:00' },
      },
    },
    phoneNumber: '555-7890',
    imageUrl: `/images/branches/5.jpg`,
  },
  {
    id: '6',
    name: 'Punto 33 General Paz',
    description: 'General Paz',
    address: 'Barrio General Paz 123',
    openingHoursStructured: {
      mondayToThursday: { open: '09:00', close: '21:00' },
      fridayToSunday: {
        firstShift: { open: '11:00', close: '14:59' },
        secondShift: { open: '16:00', close: '20:00' },
      },
    },
    phoneNumber: '555-1122',
    imageUrl: `/images/branches/6.jpg`,
  },
  {
    id: '7',
    name: 'Punto 33 Inaudi',
    description: 'Inaudi',
    address: 'Av. Principal 123, Inaudi',
    openingHoursStructured: {
      mondayToThursday: { open: '08:00', close: '22:00' },
      fridayToSunday: {
        firstShift: { open: '11:00', close: '14:59' },
        secondShift: { open: '16:00', close: '21:00' },
      },
    },
    phoneNumber: '555-1234',
    imageUrl: `/images/branches/7.jpg`,
  },
  {
    id: '8',
    name: 'Punto 33 Nueva Córdoba',
    description: 'Nueva Córdoba',
    address: 'Av. Principal 123, Nueva Córdoba',
    openingHoursStructured: {
      mondayToThursday: { open: '08:00', close: '22:00' },
      fridayToSunday: {
        firstShift: { open: '11:00', close: '14:59' },
        secondShift: { open: '16:00', close: '21:00' },
      },
    },
    phoneNumber: '555-1234',
    imageUrl: `/images/branches/8.jpg`,
  },
  {
    id: '9',
    name: 'Punto 33 Villa Belgrano',
    description: 'Recta Martinolli',
    address: 'Av. Principal 123, Villa Belgrano',
    openingHoursStructured: {
      mondayToThursday: { open: '08:00', close: '22:00' },
      fridayToSunday: {
        firstShift: { open: '11:00', close: '14:59' },
        secondShift: { open: '16:00', close: '21:00' },
      },
    },
    phoneNumber: '555-1234',
    imageUrl: `/images/branches/9.jpg`,
  },
  {
    id: '10',
    name: 'Punto 33 Barrio Yofre',
    description: 'Yofre',
    address: 'Av. Principal 123, Barrio Yofre',
    openingHoursStructured: {
      mondayToThursday: { open: '08:00', close: '22:00' },
      fridayToSunday: {
        firstShift: { open: '11:00', close: '14:59' },
        secondShift: { open: '16:00', close: '21:00' },
      },
    },
    phoneNumber: '555-1234',
    imageUrl: `/images/branches/10.jpg`,
  },
  {
    id: '11',
    name: 'Punto 33 Fuerza Aérea',
    description: 'Fuerza Aérea',
    address: 'Av. Principal 123, Fuerza Aérea',
    openingHoursStructured: {
      mondayToThursday: { open: '08:00', close: '22:00' },
      fridayToSunday: {
        firstShift: { open: '11:00', close: '14:59' },
        secondShift: { open: '16:00', close: '21:00' },
      },
    },
    phoneNumber: '555-1234',
    imageUrl: `/images/branches/11.jpg`,
  },
  {
    id: '12',
    name: 'Punto 33 Villa María',
    description: 'Villa María',
    address: 'Av. Principal 123, Villa María',
    openingHoursStructured: {
      mondayToThursday: { open: '08:00', close: '22:00' },
      fridayToSunday: {
        firstShift: { open: '11:00', close: '14:59' },
        secondShift: { open: '16:00', close: '21:00' },
      },
    },
    phoneNumber: '555-1234',
    imageUrl: `/images/branches/12.jpg`,
  },
];
