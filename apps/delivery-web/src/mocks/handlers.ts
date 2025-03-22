import { http, HttpResponse } from 'msw';
import { branches, orders, products } from './data';

// Define types for request payloads
interface OrderData {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  branchId: string;
  total: number;
  [key: string]: any;
}

interface StatusUpdateData {
  status: string;
}

export const handlers = [
  // Branches API handlers
  http.get('/api/branches', () => {
    return HttpResponse.json({
      success: true,
      data: branches,
    });
  }),

  http.get('/api/branches/:id', ({ params }) => {
    const id = params.id as string;
    const branch = branches.find((branch) => branch.id === id);

    if (!branch) {
      return HttpResponse.json(
        {
          success: false,
          error: 'NotFound',
          message: `Branch with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: branch,
    });
  }),

  // Products API handlers
  http.get('/api/products', ({ request }) => {
    const url = new URL(request.url);
    const branchId = url.searchParams.get('branchId');

    if (branchId) {
      const filteredProducts = products.filter(
        (product) => product.branchId === branchId
      );
      return HttpResponse.json({
        success: true,
        data: filteredProducts,
      });
    }

    return HttpResponse.json({
      success: true,
      data: products,
    });
  }),

  http.get('/api/products/:id', ({ params }) => {
    const id = params.id as string;
    const product = products.find((product) => product.id === id);

    if (!product) {
      return HttpResponse.json(
        {
          success: false,
          error: 'NotFound',
          message: `Product with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: product,
    });
  }),

  // Orders API handlers
  http.get('/api/orders', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (userId) {
      const userOrders = orders.filter((order) => order.userId === userId);
      return HttpResponse.json({
        success: true,
        data: userOrders,
      });
    }

    return HttpResponse.json({
      success: true,
      data: orders,
    });
  }),

  http.get('/api/orders/:id', ({ params }) => {
    const id = params.id as string;
    const order = orders.find((order) => order.id === id);

    if (!order) {
      return HttpResponse.json(
        {
          success: false,
          error: 'NotFound',
          message: `Order with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: order,
    });
  }),

  http.post('/api/orders', async ({ request }) => {
    const orderData = (await request.json()) as OrderData;

    // Create a new order with a generated ID
    const newOrder = {
      id: `order-${Date.now()}`,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    return HttpResponse.json(
      {
        success: true,
        data: newOrder,
      },
      { status: 201 }
    );
  }),

  http.patch('/api/orders/:id/status', async ({ params, request }) => {
    const id = params.id as string;
    const { status } = (await request.json()) as StatusUpdateData;

    const orderIndex = orders.findIndex((order) => order.id === id);

    if (orderIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          error: 'NotFound',
          message: `Order with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    // In a real API this would update the database
    const updatedOrder = {
      ...orders[orderIndex],
      status,
    };

    return HttpResponse.json({
      success: true,
      data: updatedOrder,
    });
  }),
];
