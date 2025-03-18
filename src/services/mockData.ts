
// Mock data service for demonstration purposes
// In a real application, this would be replaced with API calls

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  reorderLevel: number;
  unitCost: number;
  location: string;
  lastUpdated: string;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    id: string;
    location: string;
  };
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  products: string[];
  performance: {
    qualityScore: number;
    onTimeDelivery: number;
    responseTime: number;
  };
  lastOrder: string;
}

export interface ShipmentRoute {
  id: string;
  origin: string;
  destination: string;
  carrier: string;
  departureDate: string;
  arrivalDate: string;
  status: 'scheduled' | 'in-transit' | 'delayed' | 'arrived' | 'cancelled';
  trackingNumber: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
  notes?: string;
}

// Sample inventory data
export const inventoryData: InventoryItem[] = [
  {
    id: 'INV001',
    name: 'Microprocessors A12',
    sku: 'MP-A12-001',
    category: 'Electronics',
    quantity: 850,
    reorderLevel: 200,
    unitCost: 115,
    location: 'Warehouse A, Bay 12',
    lastUpdated: '2023-10-30T14:30:00Z'
  },
  {
    id: 'INV002',
    name: 'Display Modules 5.5"',
    sku: 'DM-55-002',
    category: 'Components',
    quantity: 120,
    reorderLevel: 150,
    unitCost: 65,
    location: 'Warehouse B, Bay 05',
    lastUpdated: '2023-10-29T10:15:00Z'
  },
  {
    id: 'INV003',
    name: 'Battery Cells 3000mAh',
    sku: 'BC-3K-003',
    category: 'Power',
    quantity: 25,
    reorderLevel: 100,
    unitCost: 22,
    location: 'Warehouse A, Bay 18',
    lastUpdated: '2023-10-30T16:45:00Z'
  },
  {
    id: 'INV004',
    name: 'Aluminum Casings Type C',
    sku: 'AC-C-004',
    category: 'Materials',
    quantity: 450,
    reorderLevel: 150,
    unitCost: 18,
    location: 'Warehouse C, Bay 03',
    lastUpdated: '2023-10-28T09:20:00Z'
  },
  {
    id: 'INV005',
    name: 'Circuit Boards V2',
    sku: 'CB-V2-005',
    category: 'Electronics',
    quantity: 320,
    reorderLevel: 100,
    unitCost: 42,
    location: 'Warehouse A, Bay 14',
    lastUpdated: '2023-10-27T11:10:00Z'
  },
  {
    id: 'INV006',
    name: 'Touch Sensors T10',
    sku: 'TS-T10-006',
    category: 'Components',
    quantity: 210,
    reorderLevel: 80,
    unitCost: 12,
    location: 'Warehouse B, Bay 09',
    lastUpdated: '2023-10-30T15:30:00Z'
  },
  {
    id: 'INV007',
    name: 'Charging Modules 20W',
    sku: 'CM-20W-007',
    category: 'Power',
    quantity: 180,
    reorderLevel: 60,
    unitCost: 8,
    location: 'Warehouse A, Bay 22',
    lastUpdated: '2023-10-29T14:50:00Z'
  },
  {
    id: 'INV008',
    name: 'Glass Panels Premium',
    sku: 'GP-P-008',
    category: 'Materials',
    quantity: 95,
    reorderLevel: 50,
    unitCost: 35,
    location: 'Warehouse C, Bay 07',
    lastUpdated: '2023-10-28T12:40:00Z'
  }
];

// Sample orders data
export const ordersData: Order[] = [
  {
    id: 'ORD-001628',
    customer: {
      name: 'Apple Inc.',
      id: 'CUST001',
      location: 'Cupertino, CA'
    },
    products: [
      { id: 'INV001', name: 'Microprocessors A12', quantity: 200, price: 125 },
      { id: 'INV002', name: 'Display Modules 5.5"', quantity: 150, price: 75 }
    ],
    status: 'shipped',
    total: 34840,
    createdAt: '2023-11-01T09:00:00Z',
    updatedAt: '2023-11-01T14:30:00Z',
    estimatedDelivery: '2023-11-10T00:00:00Z'
  },
  {
    id: 'ORD-001627',
    customer: {
      name: 'Tesla Motors',
      id: 'CUST002',
      location: 'Fremont, CA'
    },
    products: [
      { id: 'INV003', name: 'Battery Cells 3000mAh', quantity: 500, price: 24 },
      { id: 'INV007', name: 'Charging Modules 20W', quantity: 50, price: 11 }
    ],
    status: 'processing',
    total: 12350,
    createdAt: '2023-10-31T15:20:00Z',
    updatedAt: '2023-10-31T16:45:00Z',
    estimatedDelivery: '2023-11-08T00:00:00Z'
  },
  {
    id: 'ORD-001626',
    customer: {
      name: 'Samsung Electronics',
      id: 'CUST003',
      location: 'Seoul, SK'
    },
    products: [
      { id: 'INV001', name: 'Microprocessors A12', quantity: 150, price: 125 },
      { id: 'INV005', name: 'Circuit Boards V2', quantity: 200, price: 45 },
      { id: 'INV006', name: 'Touch Sensors T10', quantity: 300, price: 15 }
    ],
    status: 'delivered',
    total: 28654,
    createdAt: '2023-10-30T10:15:00Z',
    updatedAt: '2023-11-01T09:30:00Z',
    estimatedDelivery: '2023-11-02T00:00:00Z'
  },
  {
    id: 'ORD-001625',
    customer: {
      name: 'Microsoft Corp',
      id: 'CUST004',
      location: 'Redmond, WA'
    },
    products: [
      { id: 'INV002', name: 'Display Modules 5.5"', quantity: 100, price: 75 },
      { id: 'INV005', name: 'Circuit Boards V2', quantity: 150, price: 45 },
      { id: 'INV008', name: 'Glass Panels Premium', quantity: 80, price: 40 }
    ],
    status: 'pending',
    total: 18290,
    createdAt: '2023-10-29T14:50:00Z',
    updatedAt: '2023-10-29T14:50:00Z',
    estimatedDelivery: '2023-11-15T00:00:00Z'
  }
];

// Sample suppliers data
export const suppliersData: Supplier[] = [
  {
    id: 'SUP001',
    name: 'NanoChip Technologies',
    contactPerson: 'David Chen',
    email: 'david.chen@nanochip.com',
    phone: '+1-415-555-0123',
    address: '123 Semiconductor Ave, San Jose, CA 95134',
    products: ['Microprocessors', 'Circuit Boards', 'Memory Modules'],
    performance: {
      qualityScore: 95,
      onTimeDelivery: 92,
      responseTime: 98
    },
    lastOrder: '2023-10-20T00:00:00Z'
  },
  {
    id: 'SUP002',
    name: 'VisualTech Displays',
    contactPerson: 'Sarah Kim',
    email: 'sarah.kim@visualtech.com',
    phone: '+82-2-555-0199',
    address: '45 Display Blvd, Seoul, South Korea',
    products: ['Display Modules', 'Touch Sensors', 'Glass Panels'],
    performance: {
      qualityScore: 92,
      onTimeDelivery: 88,
      responseTime: 95
    },
    lastOrder: '2023-10-15T00:00:00Z'
  },
  {
    id: 'SUP003',
    name: 'PowerCell Industries',
    contactPerson: 'Michael Wong',
    email: 'm.wong@powercell.com',
    phone: '+1-650-555-0177',
    address: '78 Energy Drive, Palo Alto, CA 94301',
    products: ['Battery Cells', 'Charging Modules', 'Power Management Units'],
    performance: {
      qualityScore: 89,
      onTimeDelivery: 94,
      responseTime: 90
    },
    lastOrder: '2023-10-25T00:00:00Z'
  },
  {
    id: 'SUP004',
    name: 'MetalWorks Manufacturing',
    contactPerson: 'Carlos Rodriguez',
    email: 'c.rodriguez@metalworks.com',
    phone: '+52-55-555-0144',
    address: '321 Industrial Parkway, Monterrey, Mexico',
    products: ['Aluminum Casings', 'Metal Frames', 'Cooling Elements'],
    performance: {
      qualityScore: 91,
      onTimeDelivery: 87,
      responseTime: 86
    },
    lastOrder: '2023-10-10T00:00:00Z'
  }
];

// Sample shipment routes
export const shipmentsData: ShipmentRoute[] = [
  {
    id: 'RT-5678',
    origin: 'Shanghai, China',
    destination: 'Los Angeles, USA',
    carrier: 'Ocean Freight Ltd.',
    departureDate: '2023-10-25T08:30:00Z',
    arrivalDate: '2023-11-15T14:00:00Z',
    status: 'in-transit',
    trackingNumber: 'OFL-89012345',
    items: [
      { id: 'INV001', name: 'Microprocessors A12', quantity: 500 },
      { id: 'INV002', name: 'Display Modules 5.5"', quantity: 350 }
    ]
  },
  {
    id: 'RT-5677',
    origin: 'Tokyo, Japan',
    destination: 'Seattle, USA',
    carrier: 'Pacific Shipping',
    departureDate: '2023-10-22T10:15:00Z',
    arrivalDate: '2023-11-12T09:30:00Z',
    status: 'delayed',
    trackingNumber: 'PS-78901234',
    items: [
      { id: 'INV006', name: 'Touch Sensors T10', quantity: 600 },
      { id: 'INV005', name: 'Circuit Boards V2', quantity: 300 }
    ],
    notes: 'Delay due to port congestion. New ETA: 2023-11-15'
  },
  {
    id: 'RT-5676',
    origin: 'Berlin, Germany',
    destination: 'Paris, France',
    carrier: 'Euro Logistics',
    departureDate: '2023-11-01T12:00:00Z',
    arrivalDate: '2023-11-02T18:00:00Z',
    status: 'in-transit',
    trackingNumber: 'EL-67890123',
    items: [
      { id: 'INV008', name: 'Glass Panels Premium', quantity: 150 }
    ]
  },
  {
    id: 'RT-5675',
    origin: 'Bengaluru, India',
    destination: 'Singapore',
    carrier: 'Asian Express',
    departureDate: '2023-10-28T22:45:00Z',
    arrivalDate: '2023-11-04T05:30:00Z',
    status: 'in-transit',
    trackingNumber: 'AE-56789012',
    items: [
      { id: 'INV005', name: 'Circuit Boards V2', quantity: 250 },
      { id: 'INV007', name: 'Charging Modules 20W', quantity: 200 }
    ],
    notes: 'Weather concerns in Bay of Bengal'
  }
];

// Dashboard statistics
export const dashboardStats = {
  ordersFulfilled: 1248,
  ordersFulfilledChange: { value: 12, trend: 'up', text: 'vs last month' },
  
  deliveryTime: 3.2,
  deliveryTimeChange: { value: 8, trend: 'down', text: 'faster than target' },
  
  inventoryTurnover: 4.5,
  inventoryTurnoverChange: { value: 5, trend: 'up', text: 'vs last quarter' },
  
  stockouts: 3,
  stockoutsChange: { value: 25, trend: 'down', text: 'vs last month' }
};
