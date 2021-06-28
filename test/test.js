// import index module
let server = require("../index");

// import test modules
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion 
chai.should();
chai.use(chaiHttp);


//Test encode end point
describe("POST /encode", () => {
    it("It should POST a long url", (done) => {
        const task = {
            originalUrl: "https://www.rankia.com/foros/seguros/temas/495026-como-cancelar-seguro-medico-antes-vencimiento"
        };
        chai.request(server)
            .post("/encode")
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message').eql('Original Url Already Exist');
                done();
            });
    });

    it("It should not encode a long url without the originalUrl property", (done) => {
        const task = {
            originalUrl: "https://www.rankia.com/foros/seguros/temas/495026-como-cancelar-seguro-medico-antes-vencimiento",
        };
        chai.request(server)
            .post("/encode")
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            });
    });

});



//Test decode end point
describe("POST /decode", () => {
    it("It should POST a shortened url", (done) => {
        const task = {
            shortenedUrl: "http://localhost:8080/tDGUFWgqB"
        };
        chai.request(server)
            .post("/decode")
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message').eql('Shortened Url Decoded Successfully');
                done();
            });
    });

    it("It should not deccode a short url without the shortenedUrl property", (done) => {
        const task = {
            shortenedUrl: "http://localhost:8080/tDGUFWgqB"
        };
        chai.request(server)
            .post("/decode")
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            });
    });

});




//Test decode end point
describe("POST /decode", () => {
    it("It should POST a shortened url", (done) => {
        const task = {
            shortenedUrl: "http://localhost:8080/tDGUFWgqB"
        };
        chai.request(server)
            .post("/decode")
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message').eql('Shortened Url Decoded Successfully');
                done();
            });
    });

    it("It should not deccode a short url without the shortenedUrl property", (done) => {
        const task = {
            shortenedUrl: "http://localhost:8080/tDGUFWgqB"
        };
        chai.request(server)
            .post("/decode")
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            });
    });

});


// Test /statistic/:code end point
describe("GET /statistic/:code", () => {
    it("It should return basic statistics of a short url path by shortenedUrlCode", (done) => {
        const shortenedUrlCode = 'tDGUFWgqB';
        chai.request(server)
            .get("/statistic/" + shortenedUrlCode)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.data.should.have.property('_id');
                response.body.data.should.have.property('originalUrl');
                response.body.data.should.have.property('shortenedUrl');
                response.body.data.should.have.property('shortenedUrlCode');
                response.body.data.should.have.property('date');
                done();
            });
    });

    it("It should not return basic statistics of a short url path when shortenedUrlCode is empty ", (done) => {
        const shortenedUrlCode = '';
        chai.request(server)
            .get("/statistic/" + shortenedUrlCode)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('message').eql('Shortened Url Not Found.');
                done();
            });
    });

});


