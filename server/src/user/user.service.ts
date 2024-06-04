import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save().catch((e) => {
      throw new InternalServerErrorException('Error creating user');
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel
      .find({})
      .populate(['transactions'])
      .exec()
      .catch((e) => {
        throw new InternalServerErrorException('Error finding users');
      });
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).catch((e) => {
      throw new InternalServerErrorException('Error getting user');
    });
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).catch((e) => {
      throw new InternalServerErrorException('Error obteniendo Usuario');
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return 'User updated successfully';
  }

  async delete(id: string) {
    const user = await this.userModel.findById(id).catch((e) => {
      throw new InternalServerErrorException('Error getting user');
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userModel.findByIdAndDelete(id).catch((e) => {
      throw new InternalServerErrorException('Error deleting user');
    });

    return 'User deleted successfully';
  }
}
