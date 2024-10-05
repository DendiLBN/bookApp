import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  findOneByEmail() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async getUserById(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('+password')
      .lean()
      .exec();
    if (!user) throw new NotFoundException(`User with id${userId} not found`);

    return user;
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(userId, updateUserDto, {
      new: true,
    });
  }

  async findOne(userId: string) {
    console.log('service findOne', userId);
    return await this.userModel.findById(userId).exec();
  }

  async remove(userId: string) {
    return await this.userModel.findByIdAndDelete(userId);
  }
}
