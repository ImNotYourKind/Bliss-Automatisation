// Smoke tests pour l'application front-end eco.bliss.bath
// Vérifie la présence des champs/boutons sur les pages de connexion et inscription
// Vérifie la présence du bouton d'ajout au panier (connecté) et du champ de disponibilité produit

// Configuration pour baseUrl
Cypress.config('baseUrl', 'http://localhost:8080/#');

describe('Smoke tests - Authentification', () => {
  it('Vérifie les champs et boutons de connexion', () => {
    cy.visit('/login');
    cy.get('#username').should('exist');
    cy.get('#password').should('exist');
    cy.get('[data-cy="login-submit"]').should('exist');
    cy.get('[data-cy="nav-link-register"]').should('exist');
  });

  it('Vérifie les champs et boutons de la page inscription', () => {
    cy.visit('/register');
    cy.get('#lastname').should('exist');
    cy.get('#firstname').should('exist');
    cy.get('#email').should('exist');
    cy.get('#password').should('exist');
    cy.get('#confirm').should('exist');
    cy.get('[data-cy="register-submit"]').should('exist');
    cy.get('[data-cy="nav-link-login"]').should('exist');
  });
});

describe('Smoke tests - Accueil', () => {
  it('Vérifie que 3 produits sont affichés sur la page d\'accueil', () => {
    cy.visit('/');
    cy.get('[data-cy="product-home"]').should('have.length', 3);
    cy.get('[data-cy="product-home"]').each($el => {
      cy.wrap($el).should('be.visible');
    });
  });
});

describe('Smoke tests - Produits', () => {
  before(() => {
    // Connexion utilisateur
    cy.visit('/login');
    cy.get('#username').type('test2@test.fr');
    cy.get('#password').type('testtest');
    cy.get('[data-cy="login-submit"]').click();
    cy.url().should('not.include','/login');
  });

  it('Vérifie la présence du bouton "Ajouter au panier" + champs de disponibilité/stock sur la page produit', () => {
    cy.visit('/products');
    cy.get('[data-cy="product-link"]').first().click();
    cy.get('[data-cy="detail-product-add"]').should('exist');
    cy.get('[data-cy="detail-product-stock"]').should('exist');
    cy.get('[data-cy="detail-product-quantity"]').should('exist');
  });
});
