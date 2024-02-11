// Declare required modules
const fs = require('fs/promises');
const request = require('supertest');
const app = require('../app');

const dataSet = async () => JSON.parse(await fs.readFile('./db/test.json', {encoding: 'utf-8'}));

describe('Notes API', () => {
    describe('GET', () => {
        it('/apis/notes returns an array of notes', async () => {
            const sample = await dataSet();
            const res = await request(app).get('/apis/notes');
            expect(res.statusCode).toBe(200);
            expect(JSON.stringify(res.body)).toEqual(JSON.stringify(sample));
        });
        it('/apis/notes/:id returns a specific note', async () => {
            const sample = await dataSet();
            const res = await request(app).get('/apis/notes/1');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(sample[0]);
        });
        it('/apis/notes/:id returns an error when an invalid param is passed', async () => {
            const res = await request(app).get('/apis/notes/z');
            expect(res.statusCode).not.toBe(200);
        });
    });
    describe('POST', () => {
        it('/apis/notes adds a new note', async () => {
            const rand = Math.floor((Math.random() * 1024) + 1024);
            const res = await request(app).post('/apis/notes').send({title:"test", text:`${rand}`});
            expect(res.statusCode).toBe(200);
            const sample = await dataSet();
            expect(res.body.text).toEqual(sample[sample.length - 1].text)
        });
        it('/apis/notes rejects notes with no body/content', async () => {
            const res = await request(app).post('/apis/notes');
            expect(res.statusCode).not.toBe(200);
        });
    });
    describe('DELETE', () =>  {
        it('/apis/notes/:id deletes the specified note', async () => {
            const sample = await dataSet();
            const targetIndex = Math.ceil(Math.random() * sample.length);
            const res = await request(app).delete(`/apis/notes/${targetIndex}`);
            expect(res.statusCode).toBe(200);
            const sampleComparison = await dataSet();
            expect(sampleComparison.length).toBe((sample.length - 1));
        });
        it('/apis/notes/:id returns an error when an invalid param is passed', async () => {
            const res = await request(app).delete('/apis/notes/z');
            expect(res.statusCode).not.toBe(200);
        });
    });
});