// <reference types="cypress"/>

describe("créer un compte, puis se connecter", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });
  it("création du compte", () => {
    cy.get('[data-cy="nav-link-register"]').click();
    cy.get("#lastname").type("pascal");
    cy.get("#firstname").type("lebon");
    cy.get("#email").type("pascalleo@gmail.com");
    cy.get("#password").type("password");
    cy.get("#confirm").type("password");
    cy.get('[data-cy="register-submit"]').click();
    cy.get("[data-cy='nav-link-logout']").should("be.visible");
  });

  it("création du compte avec erreur", () => {
    cy.get('[data-cy="nav-link-register"]').click();
    cy.get("#lastname").type("pascal");
    cy.get("#firstname").type("lebon");
    cy.get("#email").type("pascallebogmail.com");
    cy.get("#password").type("password");
    cy.get("#confirm").type("password");
    cy.get('[data-cy="register-submit"]').click();
    cy.get("[data-cy='register-errors']").should("be.visible");
  });
});
