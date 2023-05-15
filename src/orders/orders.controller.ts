import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  createNewOrder(@Body() body: CreateOrderDto) {
    return this.ordersService.create(body);
  }

  @Get()
  getOrderById(@Query('server_id') server_id: string) {
    return this.ordersService.getById(parseInt(server_id));
  }

  @Get('/client')
  getClientOrders(@Query('server_id') server_id: string) {
    return this.ordersService.getClientOrders(parseInt(server_id));
  }

  @Get('/employee')
  getEmployeeOrders(@Query('server_id') server_id: string) {
    return this.ordersService.getEmployeeOrders(parseInt(server_id));
  }

  @Delete()
  deleteOrder(@Query('server_id') server_id: string) {
    return this.ordersService.delete(parseInt(server_id));
  }

  @Put()
  updateClientOrder(
    @Query('server_id') server_id: string,
    @Body() body: UpdateOrderDto
  ) {
    // TODO: validate if client belongs to employee. Avoid cross-employee updates
    return this.ordersService.update(parseInt(server_id), body);
  }
}
