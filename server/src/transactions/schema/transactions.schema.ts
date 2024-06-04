import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Schema({ collection: 'transactions', timestamps: true })
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true })
  type: TransactionType;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop()
  description: string;
  @Prop({ default: Date.now })
  moveDate: Date;
}

export const transactionSchema = SchemaFactory.createForClass(Transaction);
