import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    return this.movies.find((movie) => movie.id === parseInt(id));
  }

  deleteOne(id: string): Movie[] {
    return this.movies.filter((movie) => movie.id !== parseInt(id));
  }

  create(movieData): Movie[] {
    this.movies.push({ id: this.movies.length + 1, ...movieData });
    return this.movies;
  }
}
