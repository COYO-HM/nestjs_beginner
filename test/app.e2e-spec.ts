import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  //url에 대한 요청을 테스팅하고 있다 : Controller, Service, Pipe의 결과에 대해 모든 테스트를 하고 있다.
  it('/ (GET)', () => {
    // API request를 보내는 부분
    return (
      request(app.getHttpServer())
        //웹사이트의 서버에 request 를 보내면
        .get('/')
        .expect(200) // 200, Hello World 출력
        .expect('Welcome to my Movie')
    );
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'TEST', year: 2023, genres: ['test'] })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'TEST', year: 2023, genres: ['test'], other: 'thing' })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    it.todo('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });
    it.todo('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
