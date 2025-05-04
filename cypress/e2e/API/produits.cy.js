// Tests API - Produits
// Cette catégorie regroupe les tests liés à la récupération des produits (endpoints /products)

describe("Tests API - Produits", () => {
  it("GET /products - récupère tous les produits", () => {
    cy.request("http://localhost:8081/products").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
      if (res.body.length > 0) {
        expect(res.body[0]).to.include.all.keys(
          "id",
          "name",
          "availableStock",
          "skin",
          "aromas",
          "ingredients",
          "description",
          "price",
          "picture",
          "varieties"
        );
      }
    });
  });

  it("GET /products/random - récupère 3 produits aléatoires", () => {
    cy.request("http://localhost:8081/products/random").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.length(3);
    });
  });
});
