describe("Test de la connexion", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("Vérifie que l'utilisateur est connecté en affichant le lien du panier", () => {
    cy.get('[data-cy="nav-link-login"]').click();
    cy.get("#username").type("test2@test.fr");
    cy.get("#password").type("testtest");
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="nav-link-cart"]').should("be.visible");
  });

  it("Vérification de l'échec de la procédure de connexion", () => {
    cy.get('[data-cy="nav-link-login"]').click();
    cy.get("#username").type("wrong@test.fr");
    cy.get("#password").type("wrongpassword");
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="login-errors"]')
      .should("be.visible")
      .and("contain", "Identifiants incorrects");
  });
});
