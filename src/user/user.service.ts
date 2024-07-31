import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './dto/user.entity';
import { Between, Repository, ILike } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    // const data = await this.userRepository.find({ select: { name: true } });

    const data = await this.userRepository
      .createQueryBuilder('user')
      .select('user.name')
      .addSelect('COUNT(user.id)', 'count')
      .groupBy('user.name')
      .getRawMany();
    return data;
  }

  async createUser(body: CreateUserDto) {
    const user = await this.userRepository.save(
      this.userRepository.create({
        name: body.name,
        isDeleted: body.isDeleted,
        username: body.username,
        createUserId: body.createUserId,
        password: body.password,
      }),
    );

    // const user = await this.userRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(User)
    //   .values([
    //     {
    //       name: 'test',
    //       isDeleted: false,
    //       username: 'test',
    //       createUserId: '1',
    //       password: 'password',
    //     },
    //   ])
    //   .execute();

    if (!user) {
      throw new InternalServerErrorException('User error');
    }

    return user;
  }

  async updateUsername(newName: string) {
    const [newUser] = await Promise.all([
      this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ name: newName })
        .where({ id: '13' })
        .execute(),
    ]);
    return newUser;
  }

  // GET USER BY DATE (Timestamp or yyy-dd-mm)
  async getUserItemByCreationDate(body: { date: Date }) {
    const startDate = new Date(body.date);
    const endDate = new Date(body.date);
    endDate.setDate(endDate.getDate() + 1);

    const users = await this.userRepository.findAndCount({
      where: {
        createDateTime: Between(startDate, endDate),
      },
    });

    if (!users.length) {
      throw new InternalServerErrorException('User not found');
    }
    return users;
  }

  async getUserByName(searchTerm: string) {
    // const users = await this.userRepository
    //   .createQueryBuilder('user')
    //   .where('LOWER(user.name) LIKE LOWER(:name)', { name: `%${searchTerm}%` })
    //   .getMany();

    const users = await this.userRepository.find({
      where: {
        name: ILike(`%${searchTerm}%`),
      },
    });
    console.log(users);
    return users;
  }
}
