import React, { useState } from 'react';
import { Shell } from '@/components/Layout/Shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useOrders } from '@/hooks/useOrders';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, ArrowUpDown, FileText, BarChart } from 'lucide-react';
import { format } from 'date-fns';

const Orders = () => {
  const {
    orders,
    filters,
    setFilters,
    updateOrderStatus,
    addOrderNote,
    exportOrders,
    getOrderInsights
  } = useOrders();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [noteDialog, setNoteDialog] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [insightDialog, setInsightDialog] = useState(false);
  const [currentInsights, setCurrentInsights] = useState<any>(null);

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !filters.status || order.status === filters.status;
    const matchesPriority = !filters.priority || order.priority === filters.priority;
    
    let matchesDate = true;
    if (filters.dateRange) {
      const orderDate = new Date(order.createdAt);
      matchesDate = orderDate >= filters.dateRange.from && orderDate <= filters.dateRange.to;
    }
    
    return matchesSearch && matchesStatus && matchesPriority && matchesDate;
  });

  // Handle getting AI insights
  const handleGetInsights = async (orderId: string) => {
    const insights = await getOrderInsights(orderId);
    if (insights) {
      setCurrentInsights(insights);
      setInsightDialog(true);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
        <div>
          <motion.h1 className="text-3xl font-bold tracking-tight mb-1">Orders</h1>
          <motion.p className="text-muted-foreground">
            Manage and track all purchase orders in your supply chain
          </motion.p>
        </div>

        <motion.div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={filters.status}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={filters.priority}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" onClick={exportOrders}>
              <FileText className="mr-2 h-4 w-4" />
              Export
            </Button>
            
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Order
            </Button>
          </div>
        </motion.div>

        <motion.div>
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
                      <TableHead className="w-[120px]">Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.customer.name}</div>
                            <div className="text-xs text-muted-foreground">{order.customer.location}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value) => updateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          ${order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell>
                          {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedOrder(order.id);
                                setNoteDialog(true);
                              }}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleGetInsights(order.id)}
                            >
                              <BarChart className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Note Dialog */}
      <Dialog open={noteDialog} onOpenChange={setNoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note to Order</DialogTitle>
            <DialogDescription>
              Add a note to this order for future reference.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Enter your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNoteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              if (selectedOrder && newNote.trim()) {
                addOrderNote(selectedOrder, newNote.trim());
                setNewNote('');
                setNoteDialog(false);
              }
            }}>
              Add Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Insights Dialog */}
      <Dialog open={insightDialog} onOpenChange={setInsightDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Insights</DialogTitle>
            <DialogDescription>
              AI-powered insights about this order.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {currentInsights ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Delivery Prediction</h4>
                  <p className="text-sm text-muted-foreground">{currentInsights.deliveryPrediction}</p>
                </div>
                <div>
                  <h4 className="font-medium">Risk Assessment</h4>
                  <p className="text-sm text-muted-foreground">{currentInsights.riskAssessment}</p>
                </div>
                <div>
                  <h4 className="font-medium">Recommendations</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {currentInsights.recommendations.map((rec: string, i: number) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Loading insights...</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Shell>
  );
};

export default Orders;
