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

it('yields 7 from the task (recursive)', () => {
  const recurse = (commandsFn, checkFn) => {
    commandsFn().then((x) => {
      if (checkFn(x)) {
        cy.log('**NICE!**')
        return
      }

      recurse(commandsFn, checkFn)
    })
  }

  recurse(
    () => cy.task('randomNumber'),
    (n) => n === 7,
  )
})

it('yields 7 from the task (iteration count)', () => {
  const recurse = (commandsFn, checkFn, k = 1) => {
    cy.log(`iteration **${k}**`)

    commandsFn().then((x) => {
      if (checkFn(x)) {
        cy.log('**NICE!**')
        return
      }

      recurse(commandsFn, checkFn, k + 1)
    })
  }

  recurse(
    () => cy.task('randomNumber'),
    (n) => n === 7,
  )
})

it('yields 7 from the task (limit)', () => {
  const recurse = (commandsFn, checkFn, limit = 3) => {
    if (limit < 0) {
      throw new Error('Recursion limit reached')
    }
    cy.log(`remaining attempts **${limit}**`)

    commandsFn().then((x) => {
      if (checkFn(x)) {
        cy.log('**NICE!**')
        return
      }

      recurse(commandsFn, checkFn, limit - 1)
    })
  }

  recurse(
    () => cy.task('randomNumber'),
    (n) => n === 7,
    30,
  )
})

it('yields 7 from the task (time limit)', () => {
  const recurse = (commandsFn, checkFn, timeRemaining = 4000) => {
    const started = +new Date()
    if (timeRemaining < 0) {
      throw new Error('Max time limit reached')
    }
    cy.log(`time remaining **${timeRemaining}**`)

    commandsFn().then((x) => {
      if (checkFn(x)) {
        cy.log('**NICE!**')
        return
      }

      const finished = +new Date()
      const elapsed = finished - started
      recurse(commandsFn, checkFn, timeRemaining - elapsed)
    })
  }

  recurse(
    () => cy.task('randomNumber'),
    (n) => n === 7,
    10000,
  )
})
