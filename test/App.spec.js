import supertest from "supertest"
import assert from 'assert';
import App from '../src/App'

describe('App', () => {
  describe('GET /', () => {
    it('should make a successful request', (done) => {
		supertest(App)
		.get("/")
		.expect(200)
		.end((err, res) =>{
			if (err) 
				done(err);
			done();
		});
	});
  });
});
