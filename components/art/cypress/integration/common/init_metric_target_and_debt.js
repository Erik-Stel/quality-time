import {Given} from "cypress-cucumber-preprocessor/steps";

Given(/^I make sure the Metric debt target is (.+), Metric target is (.+) and Accept technical debt (.+)$/, (debt, metric, technicalDebt) => {
    cy.get("#root > div > div.ui.fluid.container > table > tbody > tr:nth-child(3)").within(() => {
        cy.get('td.collapsing > i.caret.right').click();
    });

    cy.get("#root > div > div.ui.fluid.container > table > tbody > tr:nth-child(4)").within(() => {
        cy.get('.tabbutton').contains('Metric').click();
        cy.get('td > div > div.ui.bottom.attached.segment.active.tab > div.ui.stackable.grid > div:nth-child(2)').within(() => {
            cy.get('div:nth-child(1) > form > div > div').within( () => {
                cy.get('div > input[type=number]')
                    .clear()
                    .type(metric);
            })
        })

        cy.get('td > div > div.ui.bottom.attached.segment.active.tab > div.ui.stackable.grid > div:nth-child(3)').within(() => {
            cy.get('div:nth-child(2) > form > div > div').within( () => {
                cy.get('div > input[type=number]')
                    .clear()
                    .type(debt);
            });
            cy.get('div:nth-child(1) > form > div > div').within(() => {
                cy.get('i').click();
                cy.get(`div.visible.menu.transition > div:nth-child(${technicalDebt})`).click();
            })
        });
    });
});