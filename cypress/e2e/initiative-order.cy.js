describe("Initiative Order with Multiple Characters", () => {
  beforeEach(() => {
    cy.visit("http://felipe-rf.github.io/initiative-tracker/");
  });

  it("creates multiple characters and checks initiative order", () => {
    const characters = [
      { name: "Alice", initiative: 15 },
      { name: "Bob", initiative: 20 },
      { name: "Charlie", initiative: 10 },
      { name: "Diana", initiative: 18 },
      { name: "Eve", initiative: 12 },
      { name: "Frank", initiative: 25 },
    ];

    // Create characters
    characters.forEach((char) => {
      cy.get('[data-testid="add-character-button"]').click();

      cy.get('[data-testid="input-name"]').type(char.name);
      cy.get('[data-testid="input-currentHp"]').clear().type("10");
      cy.get('[data-testid="input-tempHp"]').clear().type("0");
      cy.get('[data-testid="input-maxHp"]').clear().type("10");
      cy.get('[data-testid="input-ac"]').clear().type("10");
      cy.get('[data-testid="input-initiative"]')
        .clear()
        .type(`${char.initiative}`);

      cy.get('[data-testid="btn-submit"]').click();

      cy.contains(char.name).should("exist");
    });

    // Wait for the UI to update
    cy.wait(500);

    // Grab all character cards in DOM order and get initiatives
    cy.get('[data-testid^="character-card-"]').then(($cards) => {
      const initiatives = [];

      $cards.each((_, el) => {
        const initiativeText = el
          .querySelector("p")
          ?.innerText.match(/\d+/)?.[0];
        if (initiativeText) initiatives.push(Number(initiativeText));
      });

      // Assert initiatives are sorted descending
      const sorted = [...initiatives].sort((a, b) => b - a);
      expect(initiatives).to.deep.equal(sorted);
    });
  });
});
