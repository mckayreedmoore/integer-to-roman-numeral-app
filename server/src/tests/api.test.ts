import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../server';

describe('Integration Tests - /romannumeral API', () => {
  test('should return correct Roman numeral', async () => {
    const res = await request(app).get('/romannumeral?query=10');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ input: '10', output: 'X' });
  });

  test('should return 400 for invalid input', async () => {
    const res = await request(app).get('/romannumeral?query=abc');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Input invalid. Submit number between 1 and 3999.');
  });

  test('should return 400 for invalid input', async () => {
    const res = await request(app).get('/romannumeral?query=NaN');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Input invalid. Submit number between 1 and 3999.');
  });

  test('should return 400 for numbers out of range', async () => {
    const res = await request(app).get('/romannumeral?query=0');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Number outside of range. Please select number between 1 and 3999');
  });

  test('should return 400 for numbers out of range', async () => {
    const res = await request(app).get('/romannumeral?query=-100');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Number outside of range. Please select number between 1 and 3999');
  });

  test('should return 400 for numbers out of range', async () => {
    const res = await request(app).get('/romannumeral?query=4000');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Number outside of range. Please select number between 1 and 3999');
  });
});
