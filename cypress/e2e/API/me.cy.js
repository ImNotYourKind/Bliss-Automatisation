describe('API - /me', () => {
  // ATTENTION : Ce test retourne actuellement une erreur 500 (Internal Server Error) au lieu d'une erreur d'authentification (401 ou 403).
  // Cela indique un bug côté back-end sur la gestion de l'accès non authentifié à /me.
  it("GET /me - échoue sans authentification", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/me",
      failOnStatusCode: false,
    }).then((response) => {
      expect([401, 403]).to.include(response.status);
    });
  });
});
