import { ClientType } from '@prisma/client';
import { CreateClient } from '@salesapp/types';
import {
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  Length,
} from 'class-validator';
import { IsValidTaxpayerId, IsValidClientType } from '../../validators';

export class CreateClientDto implements CreateClient {
  @IsNotEmpty()
  company_name: string;

  @IsNotEmpty()
  trade_name: string;

  @IsNotEmpty()
  @Length(14, 14)
  @IsValidTaxpayerId()
  taxpayer_id: string;

  @IsNotEmpty()
  buyer_first_name: string;

  @IsNotEmpty()
  buyer_last_name: string;

  @IsNotEmpty()
  @IsMobilePhone('pt-BR')
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsValidClientType()
  type: ClientType;

  number: string;

  complement: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(8, 8)
  zip_code: string;
}
