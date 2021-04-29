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
  it("Can directly navigate to Accounts Page", () => {
    cy.visit("http://localhost:3000/account");
  });
  it("Automatically redirects to account/login", () => {
    cy.visit("http://localhost:3000/account");
    cy.url().should("match", /login/);
  });
  it('highlights "login button" by default', () => {
    cy.visit("http://localhost:3000/account");
    cy.url().should("match", /login/);
    cy.get("div.btn-group")
      .contains(/login/i)
      .should("have.class", "btn-primary");
  });
  it('Highlights "Register button" when switching to the registration form', () => {
    cy.visit("http://localhost:3000/account");
    cy.url().should("match", /login/);
    cy.get("div.btn-group")
      .contains(/login/i)
      .should("have.class", "btn-primary");

    cy.get("div.btn-group")
      .contains(/register/i)
      .should("have.class", "btn-secondary")
      .click();

    cy.url().should("match", /register/);
    cy.get("div.btn-group")
      .contains(/register/i)
      .should("have.class", "btn-primary")
      .click();
  });

  it("prevents user from submitting blank form", () => {
    cy.visit("http://localhost:3000/account");
    cy.url().should("match", /login/);
    cy.get("div.btn-group")
      .contains(/register/i)
      .should("have.class", "btn-secondary")
      .click();

    cy.get("div.col.text-center")
      .contains(/register/i)
      .should("have.attr", "disabled");
  });

  it('Only enables the "Register" button when all fields have values', () => {
    cy.visit("http://localhost:3000/account");
    cy.url().should("match", /login/);
    cy.get("div.btn-group")
      .contains(/register/i)
      .should("have.class", "btn-secondary")
      .click();

    cy.get("input#first").type("Jason");
    cy.get("div.col.text-center")
      .contains(/register/i)
      .should("have.attr", "disabled");

    cy.get("input#last").type("Nordheim");
    cy.get("div.col.text-center")
      .contains(/register/i)
      .should("have.attr", "disabled");

    cy.get("input#birthday").invoke("val", "1993-12-11").trigger("change");
    cy.get("div.col.text-center")
      .contains(/register/i)
      .should("have.attr", "disabled");

    cy.get("input#email").type("jason.nordheim@gmail.com");
    cy.get("div.col.text-center")
      .contains(/register/i)
      .should("have.attr", "disabled");

    cy.get("input#username").type("jnordheim");
    cy.get("div.col.text-center")
      .contains(/register/i)
      .should("have.attr", "disabled");

    cy.get("input#password").type("password");
    cy.get("div.col.text-center")
      .contains(/register/i)
      .should("not.have.attr", "disabled");
  });

  it.only("redirects to login when the form is filled in and submitted", () => {
    cy.visit("http://localhost:3000/account");
    cy.url().should("match", /login/);
    cy.get("div.btn-group")
      .contains(/register/i)
      .should("have.class", "btn-secondary")
      .click();

    const testUser = createTestUser();
    console.log(testUser);

    // fill in the fields
    cy.get("input#first").type(testUser.first);
    cy.get("input#last").type(testUser.last);
    cy.get("input#birthday").invoke("val", testUser.birthday).trigger("change");
    cy.get("input#email").type(testUser.email);
    cy.get("input#username").type(testUser.username);
    cy.get("input#password").type(testUser.password);

    // button no longer disabled
    cy.get("div.col.text-center")
      .contains(/register/i)
      .should("not.have.attr", "disabled");

    // click the button
    cy.get("div.col.text-center")
      .contains(/register/i)
      .click();

    cy.wait(500);

    cy.get("div.container").contains(/Welcome/i);
  });
  it.skip("displays error message if submitted with incorrect values", () => {});
});
