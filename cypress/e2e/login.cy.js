describe("Route Login Testing", () => {
  it("Should user can login", () => {
    cy.request('POST', "http://localhost:3000/login", {
      username: "admin01",
      password: "admin01",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
    });
  });

  it("Should user can't login", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/login",
      failOnStatusCode: false,
      body:{
        username: "admin01",
        password: "admin02"
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("message");
    });
  });
});
