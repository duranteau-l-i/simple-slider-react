describe('SLider test', function() {
  it('Visits localhost', function() {
    cy.visit('http://localhost:3000/');
  });

  it('should get 9 elements', function() {
    cy.get('.card').should('have.length', 9);
  });

  it('should first element contains text and 4th element hidden', function() {
    cy.get('.slider_cards')
      .first()
      .contains(
        'We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite.',
      );
    cy.get('.card')
      .eq(2)
      .should('be.visible');
    cy.get('.card')
      .eq(3)
      .should('not.be.visible');
  });

  it('should 3th element contains text and 6th element hidden', function() {
    cy.get('.right').click();
    cy.get('.card')
      .eq(2)
      .should('be.visible');
    cy.get('.card')
      .eq(2)
      .contains(
        'Nothing is sacred, from our habits to our rituals, to our enviroment. Change is a natural part of the human life, and we prefer to embrace it.',
      );
    cy.get('.card')
      .eq(4)
      .should('not.be.visible');
  });

  it('should 5th element contains text and 7th element hidden', function() {
    cy.get('.right').click();
    cy.get('.card')
      .eq(4)
      .should('be.visible');
    cy.get('.card')
      .eq(4)
      .contains(
        'You’re given an incredible amount of freedom and autonomy at 31 solutions. That goes for everyone.',
      );
    cy.get('.card')
      .eq(6)
      .should('not.be.visible');
  });

  it('should 3th element to be visible and 6th element hidden', function() {
    cy.get('.left').click();
    cy.get('.card')
      .eq(2)
      .should('be.visible');
    cy.get('.card')
      .eq(5)
      .should('not.be.visible');
  });

  it('should first element to be visible and 4th element hidden', function() {
    cy.get('.left').click();
    cy.get('.card')
      .eq(0)
      .should('be.visible');
    cy.get('.card')
      .eq(3)
      .should('not.be.visible');
  });

  it('should change url after click on card', function() {
    cy.get('.card')
      .first()
      .click();
    cy.url().should('eq', 'https://www.31-solutions.com/');
  });
});
