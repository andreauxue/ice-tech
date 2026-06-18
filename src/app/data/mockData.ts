export interface Skate {
  id: string;
  brand: string;
  model: string;
  bladeSize: string;
  qrCode?: string;
  qrStatus: 'linked' | 'none';
}

export interface Skater {
  id: string;
  name: string;
  phone: string;
  email: string;
  skates: Skate[];
  lastService?: string;
  totalServices: number;
  active: boolean;
}

export interface ActivityRecord {
  id: string;
  skaterId: string;
  skaterName: string;
  skateCount: number;
  date: string;
  status: 'ready' | 'in-progress' | 'pending';
}

export interface QRCode {
  id: string;
  code: string;
  status: 'assigned' | 'unassigned' | 'damaged';
  linkedSkater?: string;
  linkedSkaterId?: string;
}

export const mockSkaters: Skater[] = [
  {
    id: '1',
    name: 'Carlos Martínez',
    phone: '+52 55 1234 5678',
    email: 'carlos.martinez@email.com',
    active: true,
    totalServices: 12,
    lastService: '2026-05-15',
    skates: [
      {
        id: 's1',
        brand: 'Bauer',
        model: 'Vapor 3X Pro',
        bladeSize: '254mm',
        qrCode: 'QR-001',
        qrStatus: 'linked',
      },
      {
        id: 's2',
        brand: 'CCM',
        model: 'Jetspeed FT6',
        bladeSize: '272mm',
        qrCode: 'QR-002',
        qrStatus: 'linked',
      },
    ],
  },
  {
    id: '2',
    name: 'Ana García',
    phone: '+52 55 2345 6789',
    email: 'ana.garcia@email.com',
    active: true,
    totalServices: 8,
    lastService: '2026-05-18',
    skates: [
      {
        id: 's3',
        brand: 'Bauer',
        model: 'Supreme M5 Pro',
        bladeSize: '238mm',
        qrCode: 'QR-003',
        qrStatus: 'linked',
      },
    ],
  },
  {
    id: '3',
    name: 'Miguel Hernández',
    phone: '+52 55 3456 7890',
    email: 'miguel.h@email.com',
    active: true,
    totalServices: 15,
    lastService: '2026-05-20',
    skates: [
      {
        id: 's4',
        brand: 'True',
        model: 'TF9',
        bladeSize: '263mm',
        qrStatus: 'none',
      },
    ],
  },
  {
    id: '4',
    name: 'Laura Rodríguez',
    phone: '+52 55 4567 8901',
    email: 'laura.r@email.com',
    active: true,
    totalServices: 6,
    lastService: '2026-05-10',
    skates: [
      {
        id: 's5',
        brand: 'Bauer',
        model: 'Vapor 3X',
        bladeSize: '246mm',
        qrCode: 'QR-006',
        qrStatus: 'linked',
      },
      {
        id: 's6',
        brand: 'CCM',
        model: 'Ribcor 100K',
        bladeSize: '246mm',
        qrStatus: 'none',
      },
    ],
  },
];

export const mockActivities: ActivityRecord[] = [
  {
    id: 'a1',
    skaterId: '1',
    skaterName: 'Carlos Martínez',
    skateCount: 2,
    date: '2026-05-22',
    status: 'ready',
  },
  {
    id: 'a2',
    skaterId: '2',
    skaterName: 'Ana García',
    skateCount: 1,
    date: '2026-05-22',
    status: 'in-progress',
  },
  {
    id: 'a3',
    skaterId: '3',
    skaterName: 'Miguel Hernández',
    skateCount: 1,
    date: '2026-05-22',
    status: 'pending',
  },
  {
    id: 'a4',
    skaterId: '4',
    skaterName: 'Laura Rodríguez',
    skateCount: 2,
    date: '2026-05-21',
    status: 'ready',
  },
];

export const mockQRCodes: QRCode[] = [
  {
    id: '1',
    code: 'QR-001',
    status: 'assigned',
    linkedSkater: 'Carlos Martínez',
    linkedSkaterId: '1',
  },
  {
    id: '2',
    code: 'QR-002',
    status: 'assigned',
    linkedSkater: 'Carlos Martínez',
    linkedSkaterId: '1',
  },
  {
    id: '3',
    code: 'QR-003',
    status: 'assigned',
    linkedSkater: 'Ana García',
    linkedSkaterId: '2',
  },
  {
    id: '4',
    code: 'QR-004',
    status: 'unassigned',
  },
  {
    id: '5',
    code: 'QR-005',
    status: 'unassigned',
  },
  {
    id: '6',
    code: 'QR-006',
    status: 'assigned',
    linkedSkater: 'Laura Rodríguez',
    linkedSkaterId: '4',
  },
  {
    id: '7',
    code: 'QR-007',
    status: 'damaged',
  },
  {
    id: '8',
    code: 'QR-008',
    status: 'unassigned',
  },
  {
    id: '9',
    code: 'QR-009',
    status: 'damaged',
  },
];
