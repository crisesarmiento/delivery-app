import { IApiResponse, IBranch, IOrder, IProduct, OrderStatus } from '../types';
import { branches, orders, products } from '../mocks/data';

// Delay function to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generic fetch function with error handling
async function fetchData<T>(url: string): Promise<IApiResponse<T>> {
  try {
    // In a real app, this would be a fetch call
    // For now, we'll just simulate a successful response
    await delay(500); // Simulate network delay

    if (url.includes('error')) {
      // Simulate error for testing
      return {
        success: false,
        error: 'ServerError',
        message: 'An error occurred while fetching data',
      };
    }

    // This would normally come from a real API
    // We'll return dummy data based on the url
    let data: any;

    // Process URLs to determine what data to return
    if (url === '/api/branches') {
      data = [...branches];
    } else if (url.startsWith('/api/branches/')) {
      const branchId = url.split('/').pop();
      data = branches.find((branch) => branch.id === branchId);
      if (!data) {
        return {
          success: false,
          error: 'NotFound',
          message: `Branch with id ${branchId} not found`,
        };
      }
    } else if (url.startsWith('/api/products?branchId=')) {
      const branchId = url.split('=').pop();
      data = products.filter((product) => product.branchId === branchId);
    } else if (url.startsWith('/api/products/')) {
      const productId = url.split('/').pop();
      data = products.find((product) => product.id === productId);
      if (!data) {
        return {
          success: false,
          error: 'NotFound',
          message: `Product with id ${productId} not found`,
        };
      }
    } else if (url.startsWith('/api/orders?userId=')) {
      const userId = url.split('=').pop();
      data = orders.filter((order) => order.userId === userId);
    } else if (url.startsWith('/api/orders/')) {
      const orderId = url.split('/')[2];
      data = orders.find((order) => order.id === orderId);
      if (!data) {
        return {
          success: false,
          error: 'NotFound',
          message: `Order with id ${orderId} not found`,
        };
      }
    } else {
      // Default empty data
      data = {} as T;
    }

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    return {
      success: false,
      error: 'UnknownError',
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// API functions for branches
export const branchesApi = {
  getBranches: async (): Promise<IApiResponse<IBranch[]>> => {
    return fetchData<IBranch[]>('/api/branches');
  },

  getBranchById: async (id: string): Promise<IApiResponse<IBranch>> => {
    return fetchData<IBranch>(`/api/branches/${id}`);
  },
};

// API functions for products
export const productsApi = {
  getProducts: async (branchId: string): Promise<IApiResponse<IProduct[]>> => {
    return fetchData<IProduct[]>(`/api/products?branchId=${branchId}`);
  },

  getProductById: async (id: string): Promise<IApiResponse<IProduct>> => {
    return fetchData<IProduct>(`/api/products/${id}`);
  },
};

// API functions for orders
export const ordersApi = {
  getOrders: async (userId: string): Promise<IApiResponse<IOrder[]>> => {
    return fetchData<IOrder[]>(`/api/orders?userId=${userId}`);
  },

  getOrderById: async (id: string): Promise<IApiResponse<IOrder>> => {
    return fetchData<IOrder>(`/api/orders/${id}`);
  },

  createOrder: async (
    order: Omit<IOrder, 'id' | 'createdAt' | 'status'>
  ): Promise<IApiResponse<IOrder>> => {
    // In a real app, this would be a POST request
    await delay(800); // Simulate network delay

    const newOrder: IOrder = {
      id: `order-${Date.now()}`,
      ...order,
      status: OrderStatus.Pending,
      createdAt: new Date().toISOString(),
    };

    // In a real app this would be saved to the server
    // For mock purposes we'll just return the new order
    return {
      success: true,
      data: newOrder,
    };
  },

  updateOrderStatus: async (
    id: string,
    status: IOrder['status']
  ): Promise<IApiResponse<IOrder>> => {
    // In a real app, this would be a PATCH request
    await delay(500); // Simulate network delay

    const orderIndex = orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      return {
        success: false,
        error: 'NotFound',
        message: `Order with id ${id} not found`,
      };
    }

    // In a real app this would update the order in the database
    // For mock purposes, we'll return the updated order without actually modifying our mocks
    const updatedOrder = {
      ...orders[orderIndex],
      status,
    };

    return {
      success: true,
      data: updatedOrder,
    };
  },
};
