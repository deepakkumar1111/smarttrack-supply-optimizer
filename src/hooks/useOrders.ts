
import { useState, useCallback } from 'react';
import { ordersData, Order } from '@/services/mockData';
import { mlService } from '@/services/mlService';
import { toast } from "sonner";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>(ordersData);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    dateRange: null as { from: Date; to: Date } | null,
  });

  const updateOrderStatus = useCallback((orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { ...order, status: newStatus };
        toast.success(`Order ${orderId} status updated to ${newStatus}`);
        return updatedOrder;
      }
      return order;
    }));
  }, []);

  const addOrderNote = useCallback((orderId: string, note: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const notes = order.notes || [];
        const updatedOrder = {
          ...order,
          notes: [...notes, { id: Date.now(), text: note, date: new Date().toISOString() }]
        };
        toast.success('Note added successfully');
        return updatedOrder;
      }
      return order;
    }));
  }, []);

  const exportOrders = useCallback(() => {
    const csv = orders.map(order => {
      return `${order.id},${order.customer.name},${order.status},${order.total},${order.createdAt}`;
    }).join('\n');
    
    const blob = new Blob([`ID,Customer,Status,Total,Date\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Orders exported successfully');
  }, [orders]);

  // Get AI insights about orders
  const getOrderInsights = useCallback(async (orderId: string) => {
    if (!mlService.isConfigured()) {
      toast.error('ML service not configured');
      return null;
    }
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return null;
      
      const insights = await mlService.analyzeOrder(order);
      return insights;
    } catch (error) {
      console.error('Error getting order insights:', error);
      toast.error('Failed to get order insights');
      return null;
    }
  }, [orders]);

  return {
    orders,
    filters,
    setFilters,
    updateOrderStatus,
    addOrderNote,
    exportOrders,
    getOrderInsights
  };
};
