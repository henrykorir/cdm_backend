import supertest from "supertest"
import assert from 'assert';
import App from '../src/App'

describe('App', function() {
  describe('GET /', function() {
    it('should get criteria records', function(done) {
		supertest(App)
		.get("/")
		.expect(200)
		.end((err, res) =>{
			if (err) 
				done(err);
			done();
		});
	});
  })
	describe('GET /patients', function() {
		it('should get patients record', function(done) {
			supertest(App)
			.get("/patients")
			.expect(200)
			.end((err, res) =>{
				if (err) 
					done(err);
				done();
			});
		});
	});
	describe('GET /patients/hypertensive/new', function() {
		it('should get patients with new hypertensive status', function(done) {
			supertest(App)
			.get("/patients/hypertensive/new")
			.expect(200)
			.end((err, res) =>{
				if (err) 
					done(err);
				done();
			});
		});
	})
	describe('GET /patients/hypertensive/new/?location=Location 4', function() {
		it('should get patients with new hypertensive status at specific location', function(done) {
			supertest(App)
			.get("/patients/hypertensive/new/?location=Location 4")
			.expect(200)
			.end((err, res) =>{
				if (err) 
					done(err);
				done();
			});
		});
	});
	describe('GET /patients/hypertensive/known', function() {
		it('should get patients with known hypertensive status', function(done) {
			supertest(App)
			.get("/patients/hypertensive/known")
			.expect(200)
			.end((err, res) =>{
				if (err) 
					done(err);
				done();
			});
		});
	});
	describe('GET /patients/diabetic/new', function() {
		it('should get patients with new diabetic status', function(done) {
			supertest(App)
			.get("/patients/diabetic/new")
			.expect(200)
			.end((err, res) =>{
				if (err) 
					done(err);
				done();
			});
		});
	});
	describe('GET /patients/diabetic/known', function() {
		it('should get patients with known diabetic status', function(done) {
			supertest(App)
			.get("/patients/diabetic/new")
			.expect(200)
			.end((err, res) =>{
				if (err) 
					done(err);
				done();
			});
		});
	});
	
});
