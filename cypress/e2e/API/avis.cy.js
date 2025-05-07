// Tests API - Avis
// Cette catégorie regroupe les tests liés à la gestion des avis produits (endpoint /reviews)

describe("Tests API - Avis", () => {
  let authToken;
  before(() => {
    // Connexion pour récupérer le token
    cy.request("POST", "http://localhost:8081/login", {
      username: "test2@test.fr",
      password: "testtest",
    }).then((response) => {
      authToken = response.body.token;
    });
  });

  it("POST /reviews - ajouter un avis", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/reviews",
      headers: { Authorization: `Bearer ${authToken}` },
      body: {
        title: "Test avis",
        comment: "Ceci est un avis de test.",
        rating: 5
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
    });
  });

  it("POST /reviews - ajouter un avis sans titre", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/reviews",
      headers: { Authorization: `Bearer ${authToken}` },
      body: {
        // titre manquant
        comment: "Avis sans titre.",
        rating: 4
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect([400, 422]).to.include(response.status);
    });
  });

  it("POST /reviews - ajouter un avis avec une note invalide", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/reviews",
      headers: { Authorization: `Bearer ${authToken}` },
      body: {
        title: "Test avis note invalide",
        comment: "Note trop élevée.",
        rating: 10
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect([400, 422]).to.include(response.status);
    });
  });

  // ATTENTION : Ce test échoue actuellement car l'API accepte le commentaire dangereux (status 200)
  // Il signale une faille de sécurité potentielle (pas de filtre XSS côté backend)
  it("POST /reviews - ajouter un avis avec un commentaire dangereux (XSS)", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/reviews",
      headers: { Authorization: `Bearer ${authToken}` },
      body: {
        title: "Test XSS",
        comment: '<script>alert("xss")</script>',
        rating: 3
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect([400, 422]).to.include(response.status);
    });
  });
});
