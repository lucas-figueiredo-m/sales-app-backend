import { Injectable } from '@nestjs/common';
import {
  UpdateOrderProductType,
  CreateOrderType,
  OrderData,
  OrderStatus,
  UpdateOrderType,
} from '@salesapp/types';
import { PrismaService } from '../services/prisma.service';
import { OrdersInterface } from './interfaces';

@Injectable()
export class OrdersService extends OrdersInterface {
  constructor(private prisma: PrismaService) {
    super();
  }

  protected async getProductsPriceListById(
    productIdList: { server_id: number }[],
  ) {
    return await this.prisma.products.findMany({
      where: {
        OR: productIdList,
      },
      select: {
        server_id: true,
        price: true,
      },
    });
  }

  protected async processOrderData(orderData: UpdateOrderProductType[]) {
    const productPriceList = await this.getProductsPriceListById(
      orderData.map((product) => ({
        server_id: product.product_id,
      })),
    );

    return orderData.map((product) => ({
      ...(product.server_id && { server_id: product.server_id }),
      ...(product.notes && { notes: product.notes }),
      product_id: product.product_id,
      negotiated_price: product.negotiated_price,
      ordered_weight_in_grams: product.ordered_weight_in_grams,
      table_price: productPriceList.find(
        (productPrice) => productPrice.server_id === product.product_id,
      ).price,
      estimated_product_total_price:
        (product.negotiated_price * product.ordered_weight_in_grams) / 1000,
    }));
  }

  async create(orderData: CreateOrderType): Promise<void> {
    const processedOrderData = await this.processOrderData(orderData.products);

    const order = await this.prisma.orders.create({
      data: {
        client_id: orderData.client_id,
        status: OrderStatus.created,
        estimated_order_price: processedOrderData.reduce(
          (prev, curr) => prev + curr.estimated_product_total_price,
          0,
        ),
      },
    });

    await this.prisma.orderItems.createMany({
      data: processedOrderData.map((processedProduct) => ({
        ...processedProduct,
        order_id: order.server_id,
      })),
    });
  }
  async getById(orderId: number): Promise<OrderData> {
    return await this.prisma.orders.findFirst({
      where: {
        server_id: orderId,
      },
      include: {
        order_items: true,
        client: true,
      },
    });
  }

  async getClientOrders(client_id: number): Promise<OrderData[]> {
    return await this.prisma.orders.findMany({
      where: {
        client_id,
      },
      include: {
        order_items: true,
        client: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async getEmployeeOrders(employee_id: number): Promise<OrderData[]> {
    return await this.prisma.orders.findMany({
      where: {
        client: {
          employee_id,
        },
      },
      include: {
        order_items: true,
        client: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async update(order_id: number, orderData: UpdateOrderType): Promise<void> {
    const processedOrderData = await this.processOrderData(orderData.products);

    const orderItemsToUpdate = processedOrderData.filter(
      (order) => !!order.server_id,
    );
    const orderItemsToCreate = processedOrderData.filter(
      (order) => !order.server_id,
    );

    await this.prisma.$transaction([
      ...orderItemsToUpdate.map((product) =>
        this.prisma.orderItems.update({
          where: {
            server_id: product.server_id,
          },
          data: {
            negotiated_price: product.negotiated_price,
            ordered_weight_in_grams: product.ordered_weight_in_grams,
            estimated_product_total_price:
              (product.negotiated_price * product.ordered_weight_in_grams) /
              1000,
            notes: product.notes,
          },
        }),
      ),
      this.prisma.orderItems.createMany({
        data: orderItemsToCreate.map((newOrder) => ({ ...newOrder, order_id })),
      }),
    ]);

    const sum = await this.prisma.orderItems.aggregate({
      _sum: {
        estimated_product_total_price: true,
      },
      where: {
        order_id,
      },
    });

    await this.prisma.orders.update({
      where: { server_id: order_id },
      data: { estimated_order_price: sum._sum.estimated_product_total_price },
    });
  }
  async delete(orderId: number): Promise<void> {
    await this.prisma.orders.delete({
      where: {
        server_id: orderId,
      },
    });
  }
}
