'use strict';
const supertest = require('supertest');
const server = require('../src/server');
const request = supertest(server.server);
describe('API Server', ()=>{
  let id;
  test ('404 on a bad route', async ()=>{
    const response = await request.get('/Hello World');
    expect(response.status).toEqual(404);
  });
  test('404 on a bad method', async ()=>{
    const response = await request.patch('/api/v1/foods');
    expect(response.status).toEqual(404);
  });
  test('Create a record using POST', async ()=>{
    const obj = {
      type: 'strawberry',
      price: '2.5 JD',
    };
    const response = await request.post('/api/v1/foods').send(obj);
    expect(response.status).toEqual(200);
    expect(response.body.type).toBe(obj.type);
    expect(response.body.price).toBe(obj.price);
  });
  test('Read a list of records using GET',async()=>{
    await request.post('/api/v1/foods').send({type:'watermelon',price:'7.5 JD'});
    await request.post('/api/v1/foods').send({type:'pineapple',price:'5.5 JD'});
    let response =await request.post('/api/v1/foods').send({type:'apple',price:'4.20 JD'});
    id = response.body.id;
    let result = await request.get('/api/v1/foods');
    expect(result.body.length).toBe(4); 
  });
  test('Read a record using GET',async()=>{
    let response = await request.get('/api/v1/foods/'+id);
    expect(response.status).toEqual(200);
    expect(response.body.type).toBe('apple');
  });
  test('Update a record using PUT',async()=>{
    let response = await request.put('/api/v1/foods/'+id).send({type:'Kiwi',price:'3.5'});
    expect(response.body.type).toEqual('Kiwi');
  });
  test('Destroy a record using DELETE',async()=>{
    let response = await request.delete('/api/v1/foods/'+id);
    expect(response.body).toEqual('');
  });
});