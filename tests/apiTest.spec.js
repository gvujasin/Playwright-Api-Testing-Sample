import { test, expect } from '@playwright/test';

test.describe.parallel('API Tests', () => {
  test('GET request - get specific user', async ({ request }) => {

    const baseUrl = 'https://reqres.in/api/';

    const response = await request.get(`${baseUrl}users/2`);
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.data).toBeDefined();
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.email).toBe('janet.weaver@reqres.in');
    expect(responseBody.data.first_name).toBe('Janet');
    expect(responseBody.data.last_name).toBe('Weaver');
    expect(responseBody.data.avatar).toBe('https://reqres.in/img/faces/2-image.jpg');
    expect(responseBody.support).toBeDefined();
  });

  test('POST request - create new user', async ({ request }) => {
    
    const baseUrl = 'https://reqres.in/api/';

    const payload = {
      name: 'neo',
      job: 'fighter'
    };

    const response = await request.post(`${baseUrl}users`, { data: payload });
    const responseBody = await response.json();

    expect(response.status()).toBe(201);
    expect(responseBody).toEqual({
      name: 'neo',
      job: 'fighter',
      id: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  test('POST request - Login user', async ({ request }) => {

    const baseUrl = 'https://reqres.in/api/';

    const loginDetails = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    };

    const response = await request.post(`${baseUrl}login`, { data: loginDetails });
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody).toBeTruthy();
  });

  test('POST request - Login failed', async ({ request }) => {

    const baseUrl = 'https://reqres.in/api/';

    const loginDetails = { 
      email: 'peter@klaven' 
    };

    const response = await request.post(`${baseUrl}login`, { data: loginDetails });
    const responseBody = await response.json();

    expect(response.status()).toBe(400);
    expect(responseBody).toEqual({ error: 'Missing password' });
  });

  test('PUT request - update user', async ({ request }) => {

    const baseUrl = 'https://reqres.in/api/';

    const payload = { 
      name: 'neo', 
      job: 'chosen one' 
    };

    const response = await request.put(`${baseUrl}users/2`, { data: payload });
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody).toEqual({
      name: 'neo',
      job: 'chosen one',
      updatedAt: expect.any(String)
    });
  });

  test('DELETE request - delete user', async ({ request }) => {

    const baseUrl = 'https://reqres.in/api/';

    const response = await request.delete(`${baseUrl}users/2`);

    expect(response.status()).toBe(204);
  });
});