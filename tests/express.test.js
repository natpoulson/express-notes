const fs = require('fs/promises');
const request = require('supertest');
const express = require('express');

const app = express();

describe('Express.js', () => {
    describe('Public Routes', () => {
        it('root (/) returns public/index.html', async () => {
            const comparison = await fs.readFile('../public/index.html', {encoding: 'utf-8'}, err => undefined);
            const res = await request(app).get('/');
            expect(res.body).toEqual(comparison);
        });
        it('pages (/pages) returns public/pages.html', async () => {
            const comparison = await fs.readFile('../public/pages.html', {encoding: 'utf-8'}, err => undefined);
            const res = await request(app).get('/pages');
            expect(res.body).toEqual(comparison);
        });
    });
    describe('API Routes', () => {
        it('GET /apis/notes exists', async () => {
            const res = await request(app).get('/apis/notes');
            expect(res.statusCode).not.toBe(404);
        });
        it('GET /apis/notes/:id exists', async () => {
            const res = await request(app).get('/apis/notes/1');
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