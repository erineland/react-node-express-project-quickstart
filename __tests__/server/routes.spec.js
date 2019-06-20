import express from 'express';
import path from 'path';
import fs from 'fs';
import supertest from 'supertest';
const routes = require('../../src/server/routes');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const pathName = path.resolve(__dirname, `../__mocks__/profession-categories-mock.json`);
const professionCategories = fs.readFileSync(pathName, 'utf8');

let app;
describe('Server', () => {
    beforeAll(() => {
        app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.json({
            type: 'application/vnd.api+json'
        }));
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(methodOverride('X-HTTP-Method-Override'));
        routes(app);
    });

    it('Exposes an endopint to return categories', async () => {
        const response = await supertest(app).get('/api/categories');
        expect(JSON.parse(response.text)).toEqual(JSON.parse(professionCategories));
    });
});
