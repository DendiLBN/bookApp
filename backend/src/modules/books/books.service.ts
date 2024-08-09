import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { SearchBookDto } from './dto/search-book.dto';
import { PaginatetResponse } from 'src/shared/interfaces/paginated-response.interface';

// Normally, whole communication with the database should be done using repository design pattern, in my opinion.

@Injectable()
export class BooksService implements OnModuleInit {
  constructor() {}

  async onModuleInit() {
    // const booksCount = await this.prisma.book.count();
    // if (booksCount === 0) await this.seedBooks(100);
  }

  // async create(createBookDto: Prisma.BookCreateInput): Promise<string> {
  //   const isBookExists = await this.findOneByTitle(createBookDto.title);
  //   if (isBookExists) {
  //     throw new ConflictException('Book already exists');
  //   }

  //   const newBook = await this.prisma.book.create({
  //     data: createBookDto,
  //   });

  //   return newBook.id;
  // }

  // async findAll(
  //   searchBookDto: SearchBookDto,
  // ): Promise<PaginatetResponse<Book>> {
  //   const { page, perPage } = searchBookDto;

  //   const { skip, take } = this.getPaginationParams(page, perPage);
  //   const query = this.buildSearchQuery(searchBookDto);

  //   const total = await this.prisma.book.count({ where: query });

  //   const data = await this.prisma.book.findMany({
  //     where: query,
  //     orderBy: { createdAt: 'desc' },
  //     skip,
  //     take,
  //   });

  //   return {
  //     data,
  //     page,
  //     perPage,
  //     total,
  //   };
  // }

  // findOne(id: string): Promise<Book> {
  //   return this.prisma.book.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  // private findOneByTitle(title: string) {
  //   return this.prisma.book.findFirst({
  //     where: {
  //       title,
  //     },
  //   });
  // }

  // private buildSearchQuery(searchBookDto: SearchBookDto) {
  //   const query: Prisma.BookWhereInput = {};

  //   if (searchBookDto.searchString) {
  //     query.OR = [
  //       {
  //         title: {
  //           contains: searchBookDto.searchString,
  //           mode: 'insensitive',
  //         },
  //       },
  //       {
  //         author: {
  //           contains: searchBookDto.searchString,
  //           mode: 'insensitive',
  //         },
  //       },
  //     ];
  //   }

  //   return query;
  // }

  // private getPaginationParams(page: number, perPage: number) {
  //   const skip = (page - 1) * perPage;
  //   return {
  //     skip,
  //     take: perPage,
  //   };
  // }

  // private async seedBooks(numberOfBooks: number) {
  //   const randomBetween = (min: number, max: number) =>
  //     Math.floor(Math.random() * (max - min + 1) + min);
  //   const randomNumericString = (length: number) =>
  //     new Array(length)
  //       .fill(0)
  //       .map(() => randomBetween(0, 9))
  //       .join('');

  //   for (let i = 0; i < numberOfBooks; i++) {
  //     await this.prisma.book.create({
  //       data: {
  //         title: `Book ${i}`,
  //         author: `Author ${randomBetween(1, 10)}`,
  //         rate: randomBetween(1, 5),
  //         pagesNumber: randomBetween(100, 500),
  //         isbn: `${randomNumericString(10)}`,
  //       },
  //     });
  //   }

  //   console.log('Seeded books');
  // }
}
