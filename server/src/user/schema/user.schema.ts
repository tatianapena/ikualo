import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, default: 0 })
  capital: number;
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Transaction',
    default: [],
  })
  transactions: mongoose.Types.ObjectId[];
}

export const userSchema = SchemaFactory.createForClass(User);
