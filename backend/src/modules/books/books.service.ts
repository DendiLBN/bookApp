import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchBookDto } from './dto/search-book.dto';
import { PaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/book.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(createBookDto: Book): Promise<BookDocument> {
    const newBook = await this.bookModel.create({
      ...createBookDto,
    });

    return newBook;
  }

  async findAll(
    searchBookDto: SearchBookDto,
  ): Promise<PaginatedResponse<Book>> {
    const { page, perPage } = searchBookDto;

    const { skip, take } = this.getPaginationParams(page, perPage);
    const query = this.buildSearchQuery(searchBookDto);

    const totalItems = await this.bookModel.countDocuments(query);

    const data = await this.bookModel.find(query).skip(skip).limit(take);

    return {
      data,
      page,
      perPage,
      totalItems,
    };
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }

  async updateOne(id: string, updateBookDto: Partial<Book>): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return this.bookModel.findByIdAndDelete(id);
  }

  private buildSearchQuery(searchBookDto: SearchBookDto) {
    const query: FilterQuery<Book> = {};

    if (searchBookDto.searchString) {
      query.$or = [
        { title: { $regex: searchBookDto.searchString, $options: 'i' } },
        { author: { $regex: searchBookDto.searchString, $options: 'i' } },
      ];
    }

    return query;
  }

  private getPaginationParams(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    return {
      skip,
      take: perPage,
    };
  }
}
