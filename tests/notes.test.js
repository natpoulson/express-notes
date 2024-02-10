// Declare required modules
const fs = require('fs/promises');
const request = require('supertest');
const express = require('express');
const { notes } = require ('./routes/notes');

const app = express();

describe('Notes API'), () => {
    describe('GET', () => {
        it('/apis/notes returns an array of notes', async () => {

        });
        it('/apis/notes/:id returns a specific note', async () => {

        });
    });
    describe('POST', () => {
        it('/apis/notes adds a new note', async () => {

        });
    });
    describe('DELETE', () =>  {
        it('/apis/notes/:id deletes the specified note', async () => {

        });
    });
};