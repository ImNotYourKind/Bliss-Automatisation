// Tests API - Connexion
// Cette catégorie regroupe les tests liés à l'authentification (endpoint /login)

describe("Tests API - Connexion", () => {
  it("POST /login - échoue avec mauvais identifiants", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: "fakeuser@test.fr",
        password: "wrongpassword",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect([401, 403]).to.include(response.status);
    });
  });

  it("POST /login - succès avec bons identifiants", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
    });
  });
});
