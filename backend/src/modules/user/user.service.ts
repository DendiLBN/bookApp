import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userModel.exists({
      email: createUserDto.email,
    });

    console.log('userExists:', userExists);

    if (userExists) {
      throw new HttpException('User Already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = { ...createUserDto, password: hashedPassword };

    console.log('Hashed Password:', hashedPassword);

    const createdUser = new this.userModel(newUser);

    console.log('New User:', newUser);

    return createdUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    console.log('service findOne', id);
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.userModel.findOneAndDelete({ _id: id }).exec();
  }
}
