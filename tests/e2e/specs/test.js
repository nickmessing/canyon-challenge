// https://docs.cypress.io/api/introduction/api.html

describe('Initial data', () => {
  it('Data structure', () => {
    cy.visit('/')
    cy.get('.horizontal-list').children().should('have.length', 3)
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1)').children().should('have.length', 2)
    cy.get('.horizontal-list > :nth-child(2) > .v-list > :nth-child(1)').children().should('have.length', 1)
    cy.get('.horizontal-list > :nth-child(3) > .v-list > :nth-child(1)').children().should('have.length', 0)
  })
  it('Data values', () => {
    cy.visit('/')
    cy.get(
      '.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(1) .v-list-item__subtitle',
    ).contains('#1')
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(1) .v-list-item__title').contains(
      'My first matter',
    )
    cy.get(
      '.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(2) .v-list-item__subtitle',
    ).contains('#2')
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(2) .v-list-item__title').contains(
      'My second matter',
    )
    cy.get(
      '.horizontal-list > :nth-child(2) > .v-list > :nth-child(1) > :nth-child(1) .v-list-item__subtitle',
    ).contains('#3')
    cy.get('.horizontal-list > :nth-child(2) > .v-list > :nth-child(1) > :nth-child(1) .v-list-item__title').contains(
      'My third matter',
    )
  })
})

describe('Stages', () => {
  it('Should be able to create Stage', () => {
    cy.visit('/')
    cy.get('.horizontal-list').children().should('have.length', 3)
    cy.get('[data-testid="add-stage-input"]').type('foo{enter}')
    cy.get('.horizontal-list').children().should('have.length', 4)
    cy.get('.horizontal-list > :nth-child(4) .text-center').contains('foo')
  })
  it('Should be able to remove Stage', () => {
    cy.visit('/')
    cy.get('.horizontal-list').children().should('have.length', 3)
    cy.get('.horizontal-list > :nth-child(3) > .container > .row > :nth-child(3) > .v-btn__content > .v-icon').click()
    cy.get('.horizontal-list').children().should('have.length', 2)
  })
  it('Should be able to rename Stage', () => {
    cy.visit('/')
    cy.get('.horizontal-list').children().should('have.length', 3)
    cy.get('.horizontal-list > :nth-child(3) > .container > .row > :nth-child(2)').dblclick()
    cy.get('.horizontal-list > :nth-child(3) > .container > .row input').clear().type('new stage name{enter}')
    cy.get('.horizontal-list > :nth-child(3) > .container > .row > :nth-child(2)').contains('new stage name')
  })
  it('Should be able to cancel rename Stage', () => {
    cy.visit('/')
    cy.get('.horizontal-list').children().should('have.length', 3)
    cy.get('.horizontal-list > :nth-child(3) > .container > .row > :nth-child(2)').dblclick()
    cy.get('.horizontal-list > :nth-child(3) > .container > .row input').clear().type('new stage name{esc}')
    cy.get('.horizontal-list > :nth-child(3) > .container > .row > :nth-child(2)').contains('Done')
  })
  it('Should be able to reorder Stages', () => {
    cy.visit('/')
    cy.get('.horizontal-list > :nth-child(3) > .container > .row > :nth-child(2)').contains('Done')
    cy.get('.horizontal-list > :nth-child(3) > .container > .row .handle').drag('.horizontal-list > :nth-child(2)')
    cy.get('.horizontal-list > :nth-child(2) > .container > .row > :nth-child(2)').contains('Done')
    cy.get('.horizontal-list > :nth-child(3) > .container > .row > :nth-child(2)').contains('Doing')
  })
})

describe('Cards', () => {
  it('Should be able to create Card', () => {
    cy.visit('/')
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1)').children().should('have.length', 2)
    cy.get('.horizontal-list > :nth-child(1) [data-testid="add-card-button"]').click()
    cy.get('.horizontal-list > :nth-child(1) .color-picker.main > :nth-child(5)').click()
    cy.get('.horizontal-list > :nth-child(1) .color-picker.sub > :nth-child(3)').click()
    cy.get('.horizontal-list > :nth-child(1) input').type('new card{enter}')
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1)').children().should('have.length', 3)
    cy.get(
      '.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(3) .v-list-item__subtitle',
    ).contains('#4')
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(3) .v-list-item__title').contains(
      'new card',
    )
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(3)').should(
      'have.css',
      'border-top',
      '4px solid rgb(159, 168, 218)',
    )
  })
  it('Should be able to cancel create Card', () => {
    cy.visit('/')
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1)').children().should('have.length', 2)
    cy.get('.horizontal-list > :nth-child(1) [data-testid="add-card-button"]').click()
    cy.get('.horizontal-list > :nth-child(1) .color-picker.main > :nth-child(5)').click()
    cy.get('.horizontal-list > :nth-child(1) .color-picker.sub > :nth-child(3)').click()
    cy.get('.horizontal-list > :nth-child(1) input').type('new card{esc}')
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1)').children().should('have.length', 2)
  })
  it('Should be able to remove Card', () => {
    cy.visit('/')
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1)').children().should('have.length', 2)
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(2) .v-btn').click()
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1)').children().should('have.length', 1)
  })
  it('Should be able to rename Card', () => {
    cy.visit('/')
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(2) .v-list-item__title').contains(
      'My second matter',
    )
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(2) .v-list-item__title').dblclick()
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(2) .v-list-item__title input')
      .clear()
      .type('renamed card{enter}')
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(2) .v-list-item__title').contains(
      'renamed card',
    )
  })
  it('Should be able to cancel rename Card', () => {
    cy.visit('/')
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(2) .v-list-item__title').contains(
      'My second matter',
    )
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(2) .v-list-item__title').dblclick()
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(2) .v-list-item__title input')
      .clear()
      .type('renamed card{esc}')
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(2) .v-list-item__title').contains(
      'My second matter',
    )
  })
  it('Should be able to move Cards', () => {
    cy.visit('/')
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1)').children().should('have.length', 2)
    cy.get('.horizontal-list > :nth-child(2) > .v-list > :nth-child(1)').children().should('have.length', 1)
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(1) .v-list-item__title').contains(
      'My first matter',
    )
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(2) .v-list-item__title').contains(
      'My second matter',
    )
    cy.get('.horizontal-list > :nth-child(2) > .v-list > :nth-child(1) > :nth-child(1) .v-list-item__title').contains(
      'My third matter',
    )
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > .v-list-item:nth-child(2) .sub-handle').drag(
      '.horizontal-list > :nth-child(2) > .v-list > :nth-child(1)',
    )
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1)').children().should('have.length', 1)
    cy.get('.horizontal-list > :nth-child(2) > .v-list > :nth-child(1)').children().should('have.length', 2)
    cy.get('.horizontal-list > :nth-child(1) > .v-list > :nth-child(1) > :nth-child(1) .v-list-item__title').contains(
      'My first matter',
    )
    cy.get('.horizontal-list > :nth-child(2) > .v-list > :nth-child(1) > :nth-child(1) .v-list-item__title').contains(
      'My second matter',
    )
    cy.get('.horizontal-list > :nth-child(2) > .v-list > :nth-child(1) > :nth-child(2) .v-list-item__title').contains(
      'My third matter',
    )
  })
})
