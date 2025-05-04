
// Vérifie l'ajout, la présence et la suppression d'un produit dans le panier

Cypress.config('baseUrl', 'http://localhost:8080/#');

describe('Panier - Fonctionnalités principales', () => {
  beforeEach(() => {
    // Connexion utilisateur avant chaque test
    cy.visit('/login');
    cy.get('#username').type('test2@test.fr');
    cy.get('#password').type('testtest');
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="nav-link-cart"]').should('be.visible');
  });

  it('Ajoute un produit au panier et le retrouve dans le panier', () => {
    // Vérifie que le reset fonctionne bien : le stock doit être à 1 avant chaque test
    // Si ce n'est pas le cas, vérifier le script SQL et la commande Docker
    cy.visit('/products');
    cy.get('[data-cy="product-link"]', { timeout: 5000 }).should('be.visible').first().click();
    cy.get('[data-cy="detail-product-add"]', { timeout: 5000 }).should('be.visible').click();

    // Optionnel : attendre une notification ou badge sur le panier (à adapter si dispo)
    // cy.get('[data-cy="nav-link-cart-badge"]', { timeout: 3000 }).should('contain', '1');

    cy.get('[data-cy="nav-link-cart"]', { timeout: 5000 }).should('be.visible').click();

    // Screenshot pour debug si jamais le panier est vide
    cy.screenshot('panier_apres_ajout');
    cy.get('.product-quantity', { timeout: 5000 }).should('have.length.at.least', 1).and('be.visible');
  });

  it('Modifie la quantité d\'un produit dans le panier', () => {
    cy.visit('/products');
    cy.get('[data-cy="product-link"]', { timeout: 5000 }).should('be.visible').first().click();
    cy.get('[data-cy="detail-product-add"]', { timeout: 5000 }).should('be.visible').click();
    cy.get('[data-cy="nav-link-cart"]', { timeout: 5000 }).should('be.visible').click();
    cy.get('input[data-cy="cart-line-quantity"]', { timeout: 5000 }).should('be.visible').type('{selectall}2');
    cy.get('input[data-cy="cart-line-quantity"]').should('have.value', '2');
  });

  it('Refuse une quantité négative dans le panier', () => {
    cy.visit('/products');
    cy.get('[data-cy="product-link"]', { timeout: 5000 }).should('be.visible').first().click();
    cy.get('[data-cy="detail-product-add"]', { timeout: 5000 }).should('be.visible').click();
    cy.get('[data-cy="nav-link-cart"]', { timeout: 5000 }).should('be.visible').click();
    cy.get('input[data-cy="cart-line-quantity"]', { timeout: 5000 }).should('be.visible').type('{selectall}-2');
    cy.get('input[data-cy="cart-line-quantity"]').should('have.value', '1');
  });

  it('Supprime un produit du panier', () => {
    cy.visit('/cart');
    cy.wait(1000);
    cy.get('[data-cy="cart-line-delete"]').click();
    // Vérifie que le produit n'est plus dans le panier (ou que le panier est vide)
    cy.get('.product-quantity').should('have.length.lte', 0);
  });

  // BUG : Le champ de quantité n'est pas limité à 20. 
  // Si l'utilisateur saisit une valeur supérieure (ex : 99999), la valeur reste à 99999 au lieu d'être bloquée à 20.
  // Ce comportement doit être corrigé côté front-end pour empêcher toute saisie supérieure à la limite autorisée.

  it('Refuse une quantité supérieure à 20 dans le panier', () => {
    cy.visit('/products');
    cy.get('[data-cy="product-link"]').should('be.visible').eq(1).click();
    cy.get('[data-cy="detail-product-add"]').should('be.visible').click();
    cy.get('[data-cy="nav-link-cart"]').should('be.visible').click();
    // Tente de saisir une quantité supérieure à 20
    cy.get('input[data-cy="cart-line-quantity"]').should('be.visible').type('{selectall}99999');
    // Le champ doit être limité à 20
    cy.get('input[data-cy="cart-line-quantity"]').should('have.value', '20');
  });

  it('Test manuel du reset stock', () => {
    cy.resetStocks();
  });
});
