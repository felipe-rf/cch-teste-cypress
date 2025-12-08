describe("Character Form - Create Mode", () => {
  it("creates a new character", () => {
    cy.visit("http://felipe-rf.github.io/initiative-tracker/");
    cy.get('[data-testid="add-character-button"]').click();

    // Modal should appear
    cy.get('[data-testid="character-form"]').should("be.visible");

    // Title should be correct
    cy.get('[data-testid="character-form-title"]').should(
      "contain",
      "Create Character"
    );

    // Fill out form
    cy.get('[data-testid="input-name"]').type("Gimli");
    cy.get('[data-testid="input-currentHp"]').clear().type("22");
    cy.get('[data-testid="input-tempHp"]').clear().type("3");
    cy.get('[data-testid="input-maxHp"]').clear().type("30");
    cy.get('[data-testid="input-ac"]').clear().type("18");
    cy.get('[data-testid="input-initiative"]').clear().type("1");
    cy.get('[data-testid="input-link"]').type("https://dwarf.com");

    // Submit
    cy.get('[data-testid="btn-submit"]').click();

    // Dialog should close
    cy.get('[data-testid="character-form-dialog"]').should("not.exist");

    // New character should appear in UI
    cy.contains("Gimli").should("exist");
  });
});
