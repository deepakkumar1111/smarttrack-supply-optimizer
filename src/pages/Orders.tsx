
import React, { useState } from 'react';
import { Shell } from '@/components/Layout/Shell';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Pagination, PaginationContent, PaginationItem, 
  PaginationLink, PaginationNext, PaginationPrevious 
} from '@/components/ui/pagination';
import { motion } from 'framer-motion';
import { 
  Search, Plus, MoreVertical, Filter, ArrowUpDown, 
  Calendar, Clock, FileText, Truck 
} from 'lucide-react';
import { ordersData, Order } from '@/services/mockData';

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Order>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1
      }
    }
  };

  // Filter orders by search query
  const filteredOrders = ordersData.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let aVal: any = a[sortField];
    let bVal: any = b[sortField];
    
    // Special handling for nested fields
    if (sortField === 'customer') {
      aVal = a.customer.name;
      bVal = b.customer.name;
    }
    
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Paginate results
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  // Handle sort toggle
  const toggleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };
  
  // Status badge color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800';
      case 'shipped': return 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800';
      case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800';
      case 'pending': return 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-950/30 dark:text-slate-400 dark:border-slate-800';
      case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800';
      default: return 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-950/30 dark:text-slate-400 dark:border-slate-800';
    }
  };

  return (
    <Shell>
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track all purchase orders in your supply chain
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col md:flex-row gap-4 items-center justify-between"
          variants={itemVariants}
        >
          <div className="relative w-full md:w-auto md:min-w-[320px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders..." 
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-initial">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button className="flex-1 md:flex-initial">
              <Plus className="mr-2 h-4 w-4" />
              New Order
            </Button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle>All Orders</CardTitle>
              <CardDescription>
                Total {filteredOrders.length} orders found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px] cursor-pointer" onClick={() => toggleSort('id')}>
                        <div className="flex items-center">
                          Order ID
                          <ArrowUpDown className="ml-2 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => toggleSort('customer')}>
                        <div className="flex items-center">
                          Customer
                          <ArrowUpDown className="ml-2 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => toggleSort('status')}>
                        <div className="flex items-center">
                          Status
                          <ArrowUpDown className="ml-2 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => toggleSort('total')}>
                        <div className="flex items-center">
                          Total
                          <ArrowUpDown className="ml-2 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => toggleSort('createdAt')}>
                        <div className="flex items-center">
                          Date
                          <ArrowUpDown className="ml-2 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          No orders found
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{order.customer.name}</div>
                              <div className="text-xs text-muted-foreground">{order.customer.location}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            ${order.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="cursor-pointer">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Clock className="mr-2 h-4 w-4" />
                                  Track Order
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  <FileText className="mr-2 h-4 w-4" />
                                  Invoice
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Truck className="mr-2 h-4 w-4" />
                                  Shipping Info
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                          }}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                            isActive={currentPage === page}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Shell>
  );
};

export default Orders;
