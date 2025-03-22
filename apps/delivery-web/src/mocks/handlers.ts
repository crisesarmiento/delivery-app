import { rest } from 'msw';
import { branches, orders, products } from './data';

export const handlers = [
  // Branches API handlers
  rest.get('/api/branches', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: branches,
      })
    );
  }),

  rest.get('/api/branches/:id', (req, res, ctx) => {
    const id = req.params.id as string;
    const branch = branches.find((branch) => branch.id === id);

    if (!branch) {
      return res(
        ctx.status(404),
        ctx.json({
          success: false,
          error: 'NotFound',
          message: `Branch with id ${id} not found`,
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: branch,
      })
    );
  }),

  // Products API handlers
  rest.get('/api/products', (req, res, ctx) => {
    const url = new URL(req.url);
    const branchId = url.searchParams.get('branchId');

    if (branchId) {
      const filteredProducts = products.filter(
        (product) => product.branchId === branchId
      );
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          data: filteredProducts,
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: products,
      })
    );
  }),

  rest.get('/api/products/:id', (req, res, ctx) => {
    const id = req.params.id as string;
    const product = products.find((product) => product.id === id);

    if (!product) {
      return res(
        ctx.status(404),
        ctx.json({
          success: false,
          error: 'NotFound',
          message: `Product with id ${id} not found`,
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: product,
      })
    );
  }),

  // Orders API handlers
  rest.get('/api/orders', (req, res, ctx) => {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (userId) {
      const userOrders = orders.filter((order) => order.userId === userId);
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          data: userOrders,
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: orders,
      })
    );
  }),

  rest.get('/api/orders/:id', (req, res, ctx) => {
    const id = req.params.id as string;
    const order = orders.find((order) => order.id === id);

    if (!order) {
      return res(
        ctx.status(404),
        ctx.json({
          success: false,
          error: 'NotFound',
          message: `Order with id ${id} not found`,
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: order,
      })
    );
  }),

  rest.post('/api/orders', async (req, res, ctx) => {
    const orderData = await req.json();

    // Create a new order with a generated ID
    const newOrder = {
      id: `order-${Date.now()}`,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: newOrder,
      })
    );
  }),

  rest.patch('/api/orders/:id/status', async (req, res, ctx) => {
    const id = req.params.id as string;
    const { status } = await req.json();

    const orderIndex = orders.findIndex((order) => order.id === id);

    if (orderIndex === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          success: false,
          error: 'NotFound',
          message: `Order with id ${id} not found`,
        })
      );
    }

    // In a real API this would update the database
    const updatedOrder = {
      ...orders[orderIndex],
      status,
    };

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: updatedOrder,
      })
    );
  }),
];
