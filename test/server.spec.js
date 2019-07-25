const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

//const app = require('/Users/admin/projects/my-portfolio/server.js');

describe("server module", function() {
  this.timeout(6500);
  beforeEach(() => {
  });
  it("GET / responds with a 200 response code", (done) => {
		chai.request('http://localhost:8080')
  		.get('/')
  		.end((err, res) => {
  			expect(res).to.have.status(200);
  			expect(err).to.be.null;
  			done();
  		})
    });
    it("POST / responds with a 200 response code", (done) => {
		chai.request('http://localhost:8080')
  		.post('/')
  		.end((err, res) => {
  			expect(res).to.have.status(200);
  			expect(err).to.be.null;
  			done();
  		})
    });
    it("Loads jQuery properly with 200 response code", (done) => {
		chai.request('http://localhost:8080')
  		.get('/jquery/jquery.min.js')
  		.end((err, res) => {
  			expect(res).to.have.status(200);
  			expect(err).to.be.null;
              done();
  		})
    });
    it("Loads up Bootstrap properly with 200 response code", (done) => {
		chai.request('http://localhost:8080')
  		.get('/bootstrap/js/bootstrap.bundle.min.js')
  		.end((err, res) => {
  			expect(res).to.have.status(200);
  			expect(err).to.be.null;
              done();
  		})
    });
    it("Loads up Freelancer Javascript properly with 200 response code", (done) => {
		chai.request('http://localhost:8080')
  		.get('/js/freelancer.min.js')
  		.end((err, res) => {
  			expect(res).to.have.status(200);
  			expect(err).to.be.null;
              done();
  		})
    });
});