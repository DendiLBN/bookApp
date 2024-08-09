import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { SearchBookDto } from './dto/search-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // @Post()
  // create(@Body() createBookDto: CreateBookDto) {
  //   return this.booksService.create(createBookDto);
  // }

  // @Get()
  // findAll(@Query() searchBookDto: SearchBookDto) {
  //   return this.booksService.findAll(searchBookDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.booksService.findOne(id);
  // }
}
