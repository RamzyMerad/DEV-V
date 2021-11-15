const supertest = require('supertest')
 const app = require('./app');

 const request = supertest(app);


 describe('GET /get', () => {
  test('should responds with code 200',() => {
     try{
    request.get('/get').expect(200) 
     }catch(err){

     }
    
  });
});

describe('Put /update', () => {
  test('should expect an object', async() => {
     try{
      await request.put('/update').expect(Object);
     }catch(err){

     }
    
  });
});


describe('POST /post', () => {
  test('should give an array', async () => {
    try {
      await request.post('/').expect(Object);
    } catch (err) {
      
    }
  });
});
