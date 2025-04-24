import { faker } from '@faker-js/faker';

// Types
export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  quantity: number;
  unitCost: number;
  reorderPoint: number;
  leadTimeDays: number;
  supplier: string;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    location: string;
  };
  status: string;
  total: number;
  createdAt: string;
  priority?: 'high' | 'medium' | 'low';
  notes?: Array<{
    id: number;
    text: string;
    date: string;
  }>;
}

export interface Supplier {
  id: string;
  name: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  location: string;
  leadTimeDays: number;
  reliabilityScore: number;
  paymentTerms: string;
  productCategories: string[];
}

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  carrier: string;
  mode: 'Truck' | 'Ship' | 'Air' | 'Rail';
  status: 'Scheduled' | 'In Transit' | 'Delivered' | 'Delayed';
  estimatedDelivery: string;
  actualDelivery?: string;
  weight: string;
  dimensions: string;
  content: string;
  estimatedCost: string;
}

// Dashboard statistics
export const dashboardStats = {
  ordersFulfilled: faker.number.int({ min: 1500, max: 2500 }),
  ordersFulfilledChange: faker.number.float({ min: 2, max: 15, precision: 0.1 }),
  deliveryTime: faker.number.float({ min: 2, max: 7, precision: 0.1 }),
  deliveryTimeChange: -faker.number.float({ min: 0.5, max: 2, precision: 0.1 }),
  inventoryTurnover: faker.number.float({ min: 4, max: 12, precision: 0.1 }),
  inventoryTurnoverChange: faker.number.float({ min: 0.5, max: 5, precision: 0.1 }),
  stockouts: faker.number.int({ min: 1, max: 15 }),
  stockoutsChange: -faker.number.float({ min: 5, max: 20, precision: 0.1 })
};

// Mock data
export const inventoryData: InventoryItem[] = [
  {
    id: "INV-001",
    name: "Microprocessor",
    description: "High-performance CPU for desktops",
    category: "Electronics",
    location: "Warehouse A",
    quantity: 500,
    unitCost: 250,
    reorderPoint: 100,
    leadTimeDays: 7,
    supplier: "Supplier A"
  },
  {
    id: "INV-002",
    name: "Display Module",
    description: "15.6-inch LCD screen",
    category: "Electronics",
    location: "Warehouse B",
    quantity: 300,
    unitCost: 120,
    reorderPoint: 50,
    leadTimeDays: 10,
    supplier: "Supplier B"
  },
  {
    id: "INV-003",
    name: "Battery Cell",
    description: "Lithium-ion battery for laptops",
    category: "Electronics",
    location: "Warehouse A",
    quantity: 1000,
    unitCost: 45,
    reorderPoint: 200,
    leadTimeDays: 5,
    supplier: "Supplier C"
  },
  {
    id: "INV-004",
    name: "Aluminum Casing",
    description: "Durable aluminum case for electronics",
    category: "Materials",
    location: "Warehouse C",
    quantity: 800,
    unitCost: 30,
    reorderPoint: 150,
    leadTimeDays: 8,
    supplier: "Supplier D"
  },
  {
    id: "INV-005",
    name: "Resistor Kit",
    description: "Assorted resistors for circuit boards",
    category: "Electronics",
    location: "Warehouse B",
    quantity: 1200,
    unitCost: 15,
    reorderPoint: 300,
    leadTimeDays: 6,
    supplier: "Supplier A"
  }
];

export const ordersData: Order[] = [
  {
    id: "ORD-2024-001",
    customer: {
      name: "TechCorp Solutions",
      location: "San Francisco, CA"
    },
    status: "processing",
    total: 15750.00,
    createdAt: "2024-04-15",
    priority: "high",
    notes: [
      {
        id: 1,
        text: "Customer requested expedited shipping",
        date: "2024-04-15T10:30:00Z"
      }
    ]
  },
  {
    id: "ORD-2024-002",
    customer: {
      name: "Global Industries",
      location: "Chicago, IL"
    },
    status: "shipped",
    total: 8920.50,
    createdAt: "2024-04-14",
    priority: "medium"
  },
  {
    id: "ORD-2024-003",
    customer: {
      name: "Innovate Manufacturing",
      location: "Austin, TX"
    },
    status: "delivered",
    total: 12450.75,
    createdAt: "2024-04-13",
    priority: "low"
  },
  {
    id: "ORD-2024-004",
    customer: {
      name: "GreenTech Innovations",
      location: "Seattle, WA"
    },
    status: "pending",
    total: 6200.00,
    createdAt: "2024-04-12",
    priority: "high"
  },
  {
    id: "ORD-2024-005",
    customer: {
      name: "Stellar Technologies",
      location: "New York, NY"
    },
    status: "processing",
    total: 9500.25,
    createdAt: "2024-04-11",
    priority: "medium"
  },
  {
    id: "ORD-2024-006",
    customer: {
      name: "Apex Solutions",
      location: "Los Angeles, CA"
    },
    status: "shipped",
    total: 11200.50,
    createdAt: "2024-04-10",
    priority: "low"
  },
  {
    id: "ORD-2024-007",
    customer: {
      name: "Bright Future Corp",
      location: "Miami, FL"
    },
    status: "delivered",
    total: 7850.00,
    createdAt: "2024-04-09",
    priority: "high"
  },
  {
    id: "ORD-2024-008",
    customer: {
      name: "NextGen Industries",
      location: "Dallas, TX"
    },
    status: "pending",
    total: 14500.75,
    createdAt: "2024-04-08",
    priority: "medium"
  },
  {
    id: "ORD-2024-009",
    customer: {
      name: "Pioneer Innovations",
      location: "Boston, MA"
    },
    status: "processing",
    total: 10200.00,
    createdAt: "2024-04-07",
    priority: "low"
  },
  {
    id: "ORD-2024-010",
    customer: {
      name: "United Global",
      location: "Houston, TX"
    },
    status: "shipped",
    total: 8800.25,
    createdAt: "2024-04-06",
    priority: "high"
  }
];

export const suppliersData: Supplier[] = [
  {
    id: "SUP-001",
    name: "Global Electronics Inc.",
    contact: {
      name: "John Smith",
      email: "john.smith@globalelectronics.com",
      phone: "555-123-4567"
    },
    location: "Shanghai, China",
    leadTimeDays: 14,
    reliabilityScore: 0.95,
    paymentTerms: "Net 30",
    productCategories: ["Electronics", "Components"]
  },
  {
    id: "SUP-002",
    name: "Precision Materials Corp",
    contact: {
      name: "Alice Johnson",
      email: "alice.johnson@precisionmaterials.com",
      phone: "555-987-6543"
    },
    location: "Tokyo, Japan",
    leadTimeDays: 10,
    reliabilityScore: 0.98,
    paymentTerms: "Net 45",
    productCategories: ["Materials", "Metals"]
  },
  {
    id: "SUP-003",
    name: "Tech Components Ltd.",
    contact: {
      name: "Bob Williams",
      email: "bob.williams@techcomponents.com",
      phone: "555-246-8013"
    },
    location: "Seoul, South Korea",
    leadTimeDays: 12,
    reliabilityScore: 0.92,
    paymentTerms: "Net 60",
    productCategories: ["Electronics", "Batteries"]
  },
  {
    id: "SUP-004",
    name: "Durable Casings Inc.",
    contact: {
      name: "Emily Davis",
      email: "emily.davis@durablecasings.com",
      phone: "555-789-3456"
    },
    location: "Taipei, Taiwan",
    leadTimeDays: 9,
    reliabilityScore: 0.96,
    paymentTerms: "Net 30",
    productCategories: ["Materials", "Plastics"]
  },
  {
    id: "SUP-005",
    name: "Circuit Solutions LLC",
    contact: {
      name: "Chris Miller",
      email: "chris.miller@circuitsolutions.com",
      phone: "555-135-7912"
    },
    location: "Singapore",
    leadTimeDays: 11,
    reliabilityScore: 0.94,
    paymentTerms: "Net 45",
    productCategories: ["Electronics", "Resistors"]
  }
];

export const shipmentsData: Shipment[] = [
  {
    id: "SHP-001",
    origin: "Shanghai, China",
    destination: "Los Angeles, USA",
    carrier: "FastFreight",
    mode: "Ship",
    status: "In Transit",
    estimatedDelivery: "2024-05-10",
    actualDelivery: undefined,
    weight: "2500 kg",
    dimensions: "10x5x4 meters",
    content: "Electronics components",
    estimatedCost: "4800"
  },
  {
    id: "SHP-002",
    origin: "Tokyo, Japan",
    destination: "Chicago, USA",
    carrier: "Pacific Ship",
    mode: "Ship",
    status: "Scheduled",
    estimatedDelivery: "2024-04-28",
    actualDelivery: undefined,
    weight: "1800 kg",
    dimensions: "8x4x3 meters",
    content: "Precision materials",
    estimatedCost: "3500"
  },
  {
    id: "SHP-003",
    origin: "Seoul, South Korea",
    destination: "New York, USA",
    carrier: "AeroFreight",
    mode: "Air",
    status: "Delivered",
    estimatedDelivery: "2024-04-15",
    actualDelivery: "2024-04-15",
    weight: "500 kg",
    dimensions: "3x2x1 meters",
    content: "Battery cells",
    estimatedCost: "6200"
  },
  {
    id: "SHP-004",
    origin: "Taipei, Taiwan",
    destination: "Houston, USA",
    carrier: "Global Transport",
    mode: "Ship",
    status: "In Transit",
    estimatedDelivery: "2024-05-05",
    actualDelivery: undefined,
    weight: "3200 kg",
    dimensions: "12x6x5 meters",
    content: "Durable casings",
    estimatedCost: "5100"
  },
  {
    id: "SHP-005",
    origin: "Singapore",
    destination: "San Francisco, USA",
    carrier: "Swift Logistics",
    mode: "Air",
    status: "Scheduled",
    estimatedDelivery: "2024-04-25",
    actualDelivery: undefined,
    weight: "400 kg",
    dimensions: "2x1.5x0.8 meters",
    content: "Circuit solutions",
    estimatedCost: "5900"
  }
];
