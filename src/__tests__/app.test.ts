import { Response } from "supertest";

import request from 'supertest';

import app from '../app';

describe('GET /', () => {
    it('GET /v1/api/product => array of products', async () => {
        const response = await request(app).get('/v1/api/product');

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),

                    amount: expect.any(String),

                    description: expect.any(String),
                    price: expect.any(String),
                }),
            ])
        );

    });

    it('GET /v1/api/product/17 => products by ID', async () => {

        const response = await request(app).get('/v1/api/product/17');


        expect(response.body).toEqual(
            expect.objectContaining({
                name: expect.any(String),

                amount: expect.any(String),

                description: expect.any(String),
                price: expect.any(String),
            })
        );

    });

    it('GET /id => 404 if item not found', () => {
        return request(app).get('/v1/api/product/10000000000').expect(404);
    });

    it('POST /v1/api/product => create NEW product', () => {
        return (
            request(app)
                .post('/v1/api/product')

                // Item send code

                .send({
                    name: 'Xbox Series X',
                    description: "aslkfnsaklnflaksnflksaf",
                    price: "45.78",
                    amount: 68
                })

                .expect('Content-Type', /json/)

                .expect(201)

                .then((response: any) => {
                    expect(response.body).toEqual(
                        expect.objectContaining({
                            name: 'Xbox Series X',
                            description: "aslkfnsaklnflaksnflksaf",
                            price: "45.78",
                            amount: "68"
                        })
                    );
                })
        );
    });



});


