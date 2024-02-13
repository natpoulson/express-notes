// Declare required modules
const fs = require('fs/promises');
const request = require('supertest');
const app = require('../app');

const dataSet = async () => JSON.parse(await fs.readFile('./db/test.json', {encoding: 'utf-8'}));

describe('Notes API', () => {
    describe('GET', () => {
        it('/api/notes returns an array of notes', async () => {
            const sample = await dataSet();
            const treatedSample = sample;
            for (let i = 0; i < treatedSample.length; i++) {
                treatedSample[i].id = i + 1;
            }

            const res = await request(app).get('/api/notes').set('x-is-test', 'true');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(treatedSample);
        });
        it('/api/notes/:id returns a specific note', async () => {
            const sample = await dataSet();
            const index = Math.ceil(Math.random() * (sample.length - 1));
            const res = await request(app).get(`/api/notes/${index}`).set('x-is-test', 'true');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(sample[index]);
        });
        it('/api/notes/:id returns an error when an invalid param is passed', async () => {
            const res = await request(app).get('/api/notes/z').set('x-is-test', 'true');
            expect(res.statusCode).not.toBe(200);
        });
    });
    describe('POST', () => {
        it('/api/notes adds a new note', async () => {
            const rand = Math.floor((Math.random() * 1024) + 1024);
            const res = await request(app).post('/api/notes').set('x-is-test', 'true').send({title:"test", text:`${rand}`});
            expect(res.statusCode).toBe(200);
            const sample = await dataSet();
            expect(res.body.text).toEqual(sample[(sample.length - 1)].text);
        });
        it('/api/notes rejects notes with no body/content', async () => {
            const res = await request(app).post('/api/notes').set('x-is-test', 'true');
            expect(res.statusCode).not.toBe(200);
        });
    });
    describe('DELETE', () =>  {
        it('/api/notes/:id deletes the specified note', async () => {
            const sample = await dataSet();
            const targetIndex = Math.ceil(Math.random() * (sample.length - 1));
            const res = await request(app).delete(`/api/notes/${targetIndex}`).set('x-is-test', 'true');
            expect(res.statusCode).toBe(200);
            const sampleComparison = await dataSet();
            expect(sampleComparison.length).toBe((sample.length - 1));
        });
        it('/api/notes/:id returns an error when an invalid param is passed', async () => {
            const res = await request(app).delete('/api/notes/z').set('x-is-test', 'true');
            expect(res.statusCode).toBe(403);
        });
    });
});