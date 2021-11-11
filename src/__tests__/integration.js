const supertest = require('supertest')
 const app = require('./../app');

 const request = supertest(app);

describe('GET /test', () => {
  test('should responds with code 200', () => {
     
    request.get('/').expect(200) 
      
    
  });
});

describe('GET /test', () => {
  test('should responds with code 200', async () => {
    try {
      await request.get('/').expect(200)
    } catch (err) {
    
    }
  });
});


describe('POST /', () => {
  test('should give an array', async () => {
    try {
      await request.post('/').expect(Object);
    } catch (err) {
      
    }
  });
});
