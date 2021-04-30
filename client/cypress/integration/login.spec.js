/* eslint-disable no-undef */
// register.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

import { createTestUser } from "../helpers";

describe("Unauthenticated User", () => {
  // beforeAll(() => {});

  it("User can login", () => {
    cy.clearLocalStorage(); // make sure we don't have any saved tokens
    const testUser = createTestUser();

    // register user
    cy.visit("http://localhost:3000/account");
    cy.url().should("match", /login/);
    cy.get("div.btn-group")
      .contains(/register/i)
      .should("have.class", "btn-secondary")
      .click();
    // fill in the fields
    cy.get("input#first").type(testUser.first);
    cy.get("input#last").type(testUser.last);
    cy.get("input#birthday").invoke("val", testUser.birthday);
    cy.get("input#email").type(testUser.email);
    cy.get("input#username").type(testUser.username);
    cy.get("input#password").type(testUser.password);

    cy.get("div.col.text-center")
      .contains(/register/i)
      .click();

    cy.get("div.container").contains(/my information/i);
    // cy.visit("http://localhost:3000/account");
  });
});
