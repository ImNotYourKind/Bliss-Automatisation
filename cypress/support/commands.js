// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('resetStocks', () => {
    return cy.exec(
      'type .\\data\\reset_stock.sql | docker exec -i testeurlogiciel_automatisez_des_tests_pour_une_boutique_en_ligne-mysql-1 mysql -uroot -pjardin jardin_actuel',
      { failOnNonZeroExit: false, shell: 'cmd.exe', log: true }
    ).then((result) => {
      // Log la sortie pour debug
      cy.log('stdout:', result.stdout);
      cy.log('stderr:', result.stderr);
    });
});