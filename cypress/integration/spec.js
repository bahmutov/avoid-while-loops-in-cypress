/// <reference types="cypress" />

// https://github.com/NoriSte/cypress-wait-until
import 'cypress-wait-until'

it.skip('yields 7 from the task (mostly fails)', () => {
  cy.task('randomNumber').should('equal', 7)
})

it('yields 7 from the task (recursion)', () => {
  const getNumber = () => {
    cy.task('randomNumber').then(n => {
      if (n === 7) {
        cy.log('lucky **7**')
        return
      }
      cy.log(`got **${n}**`)
      getNumber()
    })

  }

  getNumber()
})

it('yields 7 from the task (reusable recursion)', () => {
  const recurse = (commandsFn, checkFn, options = {}) => {
    commandsFn().then(x => {
      if (options.log) {
        if (typeof options.log === 'function') {
          options.log(x)
        } else {
          cy.log(`checking **${x}**`)
        }
      }

      if (checkFn(x)) {
        cy.log('check passed')
        return
      }
      recurse(commandsFn, checkFn, options)
    })
  }

  recurse(
    () => cy.task('randomNumber'),
    (n) => n === 7,
    {
      log: true
    }
  )
})

it('yields 7 from the task (cypress-wait-until)', () => {
  cy.waitUntil(() => cy.task('randomNumber').then(n => n === 7))
})
