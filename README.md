# avoid-while-loops-in-cypress
> A small example showing how to use recursion to avoid JavaScript loops in Cypress

In the [plugins file](./cypress/plugins/index.js) we have a task that returns a random digit after 1 second delay. We want to call `cy.task` until it returns 7. See several solutions in the [cypress/integration/spec.js](./cypress/integration/spec.js) file.

![Repeating cy.task command until we get number 7](./images/number7.png)

I have explained the solution to this problem and refactored it several times to add more features, see the following videos

1. [Call cy task until it returns an expected value](https://youtu.be/r8_hFwYAo5c)
2. [Reusable recursive function](https://www.youtube.com/watch?v=Q_7-gRQLLMA)
3. [Reusable function with attempts limit](https://www.youtube.com/watch?v=I1oNKD6NNjg)
4. [Recursion function with time limit](https://www.youtube.com/watch?v=Cn8Ubhd49Gw)

## See also

- The recipe ["Page reloads"](https://github.com/cypress-io/cypress-example-recipes#testing-the-dom) reloads the page until it shows the number 7
