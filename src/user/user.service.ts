import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

  async findOnebyEmail(email: string) {
    console.log(`findOnebyEmail in userServive : ${email}`)
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User ${email} not yet register`)
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10)
    const user: UserEntity = new UserEntity();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = hashPassword;

    return this.userRepository.save(user);
  }

  async findAllUser() {
    try {
      const user = await this.userRepository.find();
      if (!user) {
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      }
      return { status: HttpStatus.OK, message: 'Success', user }
    } catch (e) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
      if (e instanceof HttpException) {
        status = e.getStatus();
        const errorMessage = e.getResponse();
        message = typeof errorMessage === 'string' ? errorMessage : 'An error occurred';
      }
      return { status, message, user: [] };

    }

  }

  async findUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return { status: HttpStatus.OK, message: 'success', user };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found!`);
      }
      const updateUser = await this.userRepository.update(id, updateUserDto)
      return { status: HttpStatus.OK, message: ` User with ID ${id} Updated Sucessfully`, updateUser }

    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  async deletedUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found!`);
      }
      const removeUser = await this.userRepository.delete(id)
      return { status: HttpStatus.OK, message: ` User with ID ${id} Deteled Sucessfully`, removeUser }
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
