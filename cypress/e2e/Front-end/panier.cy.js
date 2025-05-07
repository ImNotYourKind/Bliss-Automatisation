
// Vérifie l'ajout, la présence et la suppression d'un produit dans le panier

Cypress.config('baseUrl', 'http://localhost:8080/#');

describe('Panier - Fonctionnalités principales', () => {
  beforeEach(() => {
    // Reset les stocks avant chaque test
    cy.resetStocks();
    // Connexion utilisateur avant chaque test
    cy.visit('/login');
    cy.get('#username').type('test2@test.fr');
    cy.get('#password').type('testtest');
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="nav-link-cart"]').should('be.visible');
  });

  it('Ajouter un produit et le retrouver dans le panier', () => {
    cy.visit('/');
    cy.get('[data-cy="product-home-link"]').should('be.visible').first().click();
    cy.get('[data-cy="detail-product-add"]')
      .should('be.visible')
      .and('not.be.disabled')
      .then(($btn) => {
        cy.url().then((oldUrl) => {
          cy.wrap($btn).click();
          cy.url({ timeout: 5000 }).then((newUrl) => {
            if (newUrl === oldUrl) {
              cy.wrap($btn).click();
              cy.url({ timeout: 5000 }).should('include', '/cart');
            } else {
              expect(newUrl).to.include('/cart');
            }
          });
        });
      });
    cy.get('.product-quantity').should('have.length.at.least', 1).and('be.visible');
  });

  it('Modifie la quantité d\'un produit dans le panier', () => {
    cy.visit('/products');
    cy.get('[data-cy="product-link"]').should('be.visible').first().click();
    cy.get('[data-cy="detail-product-add"]').should('be.visible').click();
    cy.get('[data-cy="nav-link-cart"]').should('be.visible').click();
    cy.get('input[data-cy="cart-line-quantity"]').should('be.visible').first().type('{selectall}2');
    cy.get('input[data-cy="cart-line-quantity"]').first().should('have.value', '2');
  });

  it('Refuse une quantité négative dans le panier', () => {
    cy.visit('/products');
    cy.get('[data-cy="product-link"]').should('be.visible').first().click();
    cy.get('[data-cy="detail-product-add"]').should('be.visible').click();
    cy.get('[data-cy="nav-link-cart"]').should('be.visible').click();
    cy.get('input[data-cy="cart-line-quantity"]').should('be.visible').first().type('{selectall}-2');
    cy.get('input[data-cy="cart-line-quantity"]').first().should('have.value', '1');
  });

  // BUG : Le champ de quantité n'est pas limité à 20. 
  // Si l'utilisateur saisit une valeur supérieure (ex : 99999), la valeur reste à 99999 au lieu d'être bloquée à 20.
  // Ce comportement doit être corrigé côté front-end pour empêcher toute saisie supérieure à la limite autorisée.

  it('Refuse une quantité supérieure à 20 dans le panier', () => {
    cy.visit('/products');
    cy.get('[data-cy="product-link"]').should('be.visible').first().click();
    cy.get('[data-cy="detail-product-add"]').should('be.visible').click();
    cy.get('[data-cy="nav-link-cart"]').should('be.visible').click();
    cy.get('input[data-cy="cart-line-quantity"]').should('be.visible').first().type('{selectall}99999');
    cy.get('input[data-cy="cart-line-quantity"]').first().should('have.value', '20');
  });

  it('Supprime tous les produits du panier', () => {
    cy.visit('/cart');
    cy.wait(1000);

    function deleteAllProducts() {
      cy.get('body').then($body => {
        if ($body.find('[data-cy="cart-line-delete"]').length > 0) {
          cy.get('[data-cy="cart-line-delete"]').first().click();
          cy.wait(500);
          deleteAllProducts();
        }
      });
    }
    deleteAllProducts();
    cy.get('[data-cy="cart-empty"]').should('be.visible');
    cy.contains('Votre panier est vide.');
  });


});
