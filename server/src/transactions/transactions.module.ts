import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction, transactionSchema } from './schema/transactions.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import { userSchema } from 'src/user/schema/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: transactionSchema },
      { name: User.name, schema: userSchema },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
