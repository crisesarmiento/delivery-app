import { useState, useEffect } from 'react';
import { IOrder, IApiResponse } from '@/types';
import { OrderStatus } from '@/types/enums';
import { ordersMock } from '@/mocks/orders.mock';

export const useOrders = (userId?: string) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      // Mock order data for different users
      const mockOrders: IOrder[] = ordersMock;

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Filter orders by userId if provided
      const filteredOrders = userId
        ? mockOrders.filter((order) => order.userId === userId)
        : mockOrders;

      // Mock successful response
      const mockResponse: IApiResponse<IOrder[]> = {
        success: true,
        data: filteredOrders,
      };

      if (mockResponse.success) {
        setOrders(mockResponse.data || []);
      } else {
        setError('No se pudieron cargar los pedidos');
      }
    } catch (err) {
      setError('Error al obtener los pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  // Create a new order
  const createOrder = async (
    branchId: string,
    items: Array<{ productId: string; quantity: number }>
  ) => {
    setLoading(true);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real implementation, we would send this data to the server
      // For now, we're just simulating a successful response
      const mockResponse: IApiResponse<IOrder> = {
        success: true,
        data: {
          id: `order-${Date.now()}`,
          items: items.map((item, index) => ({
            id: `item-${index}`,
            productId: item.productId,
            quantity: item.quantity,
            price: 9.99, // Dummy price since we don't have product data here
            name: `Producto ${item.productId}`,
          })),
          total: items.reduce((acc) => acc + 9.99, 0), // Dummy calculation
          status: OrderStatus.Pending,
          createdAt: new Date().toISOString(),
          userId: userId || 'guest',
          branchId,
        },
      };

      if (mockResponse.success && mockResponse.data) {
        // Add the new order to the list
        setOrders((prevOrders) => [mockResponse.data!, ...prevOrders]);
        return { success: true, orderId: mockResponse.data.id };
      } else {
        setError('No se pudo crear el pedido');
        return { success: false, error: 'Error al crear el pedido' };
      }
    } catch (err) {
      setError('Error al crear el pedido');
      console.error(err);
      return { success: false, error: 'Error al crear el pedido' };
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
  };
};
