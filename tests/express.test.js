const fs = require('fs/promises');
const request = require('supertest');
const app = require('../app');

describe('Express.js', () => {
    describe('Public Routes', () => {
        it('root (/) returns public/index.html', async () => {
            const comparison = await fs.readFile('./public/index.html', {encoding: 'utf-8'}, err => undefined);
            const res = await request(app).get('/');
            expect(res.text).toEqual(comparison);
        });
        it('notes (/notes) returns public/notes.html', async () => {
            const comparison = await fs.readFile('./public/notes.html', {encoding: 'utf-8'}, err => undefined);
            const res = await request(app).get('/notes');
            expect(res.text).toEqual(comparison);
        });
    });
    describe('API Routes', () => {
        it('GET /apis/notes exists', async () => {
            const res = await request(app).get('/apis/notes');
            expect(res.statusCode).not.toBe(404);
        });
        it('GET /apis/notes/:id exists', async () => {
            const res = await request(app).get('/apis/notes/z');
            expect(res.statusCode).not.toBe(404);
        });
        it('POST /apis/notes exists', async () => {
            const res = await request(app).post('/apis/notes');
            expect(res.statusCode).not.toBe(404);
        });
        it('DELETE /apis/notes/:id exists', async () => {
            const res = await request(app).delete('/apis/notes/z');
            expect(res.statusCode).not.toBe(404);
        });
    });
});