import { AppName } from "../../src/config/app.config";

const HOME = "http://localhost:3000/";

const VIEWPORT = {
  IPHONE_X: {
    W: 375,
    H: 800,
  },
  FULL_HD: {
    W: 1920,
    H: 1080,
  },
};

context("iPhone", () => {
  beforeEach(() => {
    cy.visit(HOME);
    cy.viewport(VIEWPORT.IPHONE_X.W, VIEWPORT.IPHONE_X.H);
  });

  describe("Has a functional NavBar", () => {
    it("with proper accessibility options", () => {
      cy.get("nav")
        .should("have.attr", "role", "navigation")
        .should("have.class", "navbar")
        .should("be.visible");
    });
    it("with a Brand containing the app name", () => {
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
  });
  describe("Navbar Brand", () => {
    it("Can be clikced", () => {
      cy.get(".navbar-brand").should("exist");
    });
  });
  describe("Displays on iPhone Correctly", () => {
    it("Shows toggler button", () => {
      // has aria label (accessibility)
      cy.get("button.navbar-toggler")
        .should("be.visible")
        .should("have.attr", "aria-expanded", "false")
        .find(".navbar-toggler-icon")
        .should("be.visible");
    });
    it("Is collapsed by default", () => {
      cy.get("button.navbar-toggler")
        .should("be.visible")
        .should("have.attr", "aria-expanded", "false");
    });

    it("Hides navigation links by default", () => {
      cy.get("div.collapse.navbar-collapse").should("not.be.be.visible");
    });
  });
});

context("Full HD", () => {
  beforeEach(() => {
    cy.visit(HOME);
    cy.viewport(VIEWPORT.FULL_HD.W, VIEWPORT.FULL_HD.H);
  });
  describe("Navbar is visible and functional", () => {
    it("with proper accessibility options", () => {
      cy.get("nav")
        .should("have.attr", "role", "navigation")
        .should("have.class", "navbar")
        .should("be.visible");
    });
    it("with a Brand containing the app name", () => {
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
  });
  describe("Navbar Brand", () => {
    it("Can be clikced", () => {
      cy.get(".navbar-brand").should("exist").click();
    });
  });
  describe("Hides on Toggle Correctly", () => {
    it("Hides toggler button", () => {
      // has aria label (accessibility)
      cy.get("button.navbar-toggler").should("not.be.visible");
    });
    it("Shows website links", () => {
      cy.get("button.navbar-toggler")
        .should("be.visible")
        .should("have.attr", "aria-expanded", "false");
    });
    it("Shows site links by default", () => {
      cy.get("nav.navbar").should("be.visible");
    });
  });
});

//   // has correct bootstrap classes
//   cy.get("nav")
//     .should("be.visible")
//     .children()
//     .first()
//     .children()
//     .eq(1)
//     .should("be.visible")
//     .should("have.class", "navbar-toggler");

//   // not collapsed by default
//   cy.get("nav")
//     .children()
//     .first()
//     .children()
//     .eq(1)
//     .should("be.visible")
//     .should("not.have.class", "collapse");
// });

// it("Shows links on iPhone X after click ", () => {
//   cy.viewport(VIEWPORT.IPHONE_X.W, VIEWPORT.IPHONE_X.H);
//   cy.get(".navbar-toggler").should("to.be.visible").click();
//   cy.get(".navbar-nav")
//     .find("li")
//     .should("be.visible")
//     .should("have.class", "nav-item");
// });

// it("Shows closes the NavMenu after selecting a link on iPhone X", () => {
//   cy.viewport(VIEWPORT.IPHONE_X.W, VIEWPORT.IPHONE_X.H);
//   cy.get(".navbar-toggler").should("to.be.visible").click();
//   cy.get(".navbar-nav")
//     .find("li")
//     .should("be.visible")
//     .should("have.class", "nav-item")
//     .children()
//     .eq(1)
//     .click();
//   cy.get(".navbar-nav").find("li").should("not.be.visible");
// });
