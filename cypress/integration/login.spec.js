import { AppName } from "../../src/config/app.config";

const VIEWPORT = {
  IPHONE_X: {
    W: 375,
    H: 800,
  },
};

context("Home Page Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  describe("NavBar", () => {
    it("Is properly defined", () => {
      cy.get("nav")
        .should("have.attr", "role", "navigation")
        .should("have.class", "navbar")
        .should("be.visible");
    });
    it("Has Brand", () => {
      // correct position and classes
      cy.get("nav")
        .children()
        .first()
        .children()
        .first()
        .should("have.class", "navbar-brand")
        .should("have.text", AppName)
        .should("be.visible");
    });
    it("Hides navigation menu on iPhone X by default", () => {
      cy.viewport(VIEWPORT.IPHONE_X.W, VIEWPORT.IPHONE_X.H);
      cy.get(".navbar-nav").should("not.be.be.visible");
    });
    it("Shows toggler on iPhone X", () => {
      cy.viewport(VIEWPORT.IPHONE_X.W, VIEWPORT.IPHONE_X.H);

      // has aria label (accessibility)
      cy.get("nav")
        .should("be.visible")
        .children()
        .first()
        .children()
        .eq(1)
        .should("be.visible")
        .should("have.attr", "aria-label");

      // has correct bootstrap classes
      cy.get("nav")
        .should("be.visible")
        .children()
        .first()
        .children()
        .eq(1)
        .should("be.visible")
        .should("have.class", "navbar-toggler");

      // not collapsed by default
      cy.get("nav")
        .children()
        .first()
        .children()
        .eq(1)
        .should("be.visible")
        .should("not.have.class", "collapse");
    });

    it("Shows links on iPhone X after click ", () => {
      cy.viewport(VIEWPORT.IPHONE_X.W, VIEWPORT.IPHONE_X.H);
      cy.get(".navbar-toggler").should("to.be.visible").click();
      cy.get(".navbar-nav")
        .find("li")
        .should("be.visible")
        .should("have.class", "nav-item");
    });

    it("Shows closes the NavMenu after selecting a link on iPhone X", () => {
      cy.viewport(VIEWPORT.IPHONE_X.W, VIEWPORT.IPHONE_X.H);
      cy.get(".navbar-toggler").should("to.be.visible").click();
      cy.get(".navbar-nav")
        .find("li")
        .should("be.visible")
        .should("have.class", "nav-item")
        .children()
        .eq(1)
        .click();
      cy.get(".navbar-nav").find("li").should("not.be.visible");
    });
  });
});
