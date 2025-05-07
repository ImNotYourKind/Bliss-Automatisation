// Tests API - Panier
// Cette catégorie regroupe les tests liés à la gestion du panier (endpoints /orders, /orders/add)

describe("Tests API - Panier", () => {
  // --- Partie 1 : Non connecté ---
  it("GET /orders - échoue sans authentification", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      failOnStatusCode: false,
    }).then((response) => {
      expect([401, 403]).to.include(response.status);
    });
  });

  // --- Partie 2 : Connecté ---
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

  it("GET /orders - récupère le panier", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      headers: { Authorization: `Bearer ${authToken}` },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        expect(response.body).to.have.property("orderLines");
        expect(response.body.orderLines).to.be.an("array");
        if (response.body.orderLines.length > 0) {
          expect(response.body.orderLines[0]).to.have.property("product");
          const product = response.body.orderLines[0].product;
          expect(product).to.include.all.keys(
            "id",
            "name",
            "description",
            "price",
            "picture"
          );
        }
      } else if (response.status === 404) {
        expect(response.status).to.eq(404);
      }
    });
  });

  // PUT /orders/add - ajouter un produit disponible (ajouter ce test en /post)
  it("PUT /orders/add - ajouter un produit disponible au panier (id 5)", () => {
    cy.request({
      method: "PUT",
      url: "http://localhost:8081/orders/add",
      headers: { 
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      body: { product: 5, quantity: 1 },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("orderLines");
    });
  });

  it("POST /orders/add - ajouter un produit disponible au panier (id 5)", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/orders/add",
      headers: { 
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      body: { product: 5, quantity: 1 },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("orderLines");
    });
  });

  // ATTENTION : Ce test échoue car l'API accepte l'ajout d'un produit en rupture de stock (id 3) et retourne 200 au lieu de 400/409.
  // Cela révèle un bug ou une absence de contrôle métier côté serveur.(ajouter ce test en /post)
  it("PUT /orders/add - ajouter un produit en rupture de stock (id 3)", () => {
    cy.request({
      method: "PUT",
      url: "http://localhost:8081/orders/add",
      headers: { 
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      body: { product: 3, quantity: 10 },
      failOnStatusCode: false,
    }).then((response) => {
      expect([400, 409]).to.include(response.status);
    });
  });

  it("POST /orders/add - ajouter un produit en rupture de stock (id 3)", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/orders/add",
      headers: { 
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      body: { product: 3, quantity: 10 },
      failOnStatusCode: false,
    }).then((response) => {
      expect([400, 409]).to.include(response.status);
    });
  });

  it("PUT /orders/add - ajouter un produit avec une quantité négative", () => {
    cy.request({
      method: "PUT",
      url: "http://localhost:8081/orders/add",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      body: { product: 5, quantity: -2 },
      failOnStatusCode: false,
    }).then((response) => {
      expect([400, 422]).to.include(response.status);
    });
  });
});
