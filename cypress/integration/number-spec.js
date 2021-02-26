/// <reference types="cypress" />

it.skip('yields 7 from the task (mostly fails)', () => {
  cy.task('randomNumber').should('equal', 7)
})

it.skip('yields 7 from the task (crashes)', () => {
  let found
  while (!found) {
    cy.task('randomNumber').then((n) => {
      if (n === 7) {
        found = true
      }
    })
  }
})

it('yields 7 from the task', () => {
  const checkNumber = () => {
    cy.task('randomNumber').then((n) => {
      cy.log(`**${n}**`)
      if (n === 7) {
        cy.log('**NICE!**')
        return
      }
      checkNumber()
    })
  }

  checkNumber()
})