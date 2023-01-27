import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `This will return one movie with the id: ${id}`;
  }

  @Post()
  create() {
    return 'This will create a movie';
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return `This will delete a movie with the id: ${id}`;
  }

  @Put() // 전체 업데이트 시에 사용
  updateAll() {
    return ``;
  }

  @Patch(':id') // 리소스의 부분 업데이트 시에 사용
  update(@Param('id') id: string) {
    return `This will update a movie with the id: ${id}`;
  }
}