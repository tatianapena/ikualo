import { TransactionType } from '../schema/transactions.schema';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @IsNotEmpty()
  user: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  moveDate?: Date;
}
