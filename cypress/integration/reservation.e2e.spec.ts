describe('Reservations page', () => {
  it('should redirect home page to /reserve', () => {
    // Intercept the http request and return the locations.json as response
    cy.intercept('GET', 'http://localhost:8080/locations', { fixture: 'locations.json' }).as('getLocations');

    cy.visit('/')
    cy.url().should('include', 'reserve');
  });

  it('should error when no location is selected', () => {
    // Location step
    cy.get('#locationSelect').click();
    // Click away from select dropdown
    cy.get('body').click();
    cy.get('#location-next-button').click();
    cy.get('#mat-error-2').contains('Kies een locatie');
  });

  it('should search for available rooms if stepper form is valid', () => {
    // Intercept the http request and return the available-rooms.json as response
    // params used -> locationId=1, date=2021-12-01, start=12:35, end=14:45
    cy.intercept('GET', 'http://localhost:8080/rooms/availability?locationId=1&date=2021-12-01&start=12:35&end=14:35',
        { fixture: 'available-rooms.json' }).as('getAvailableRooms');

    // Location step
    cy.get('#locationSelect').click().get('mat-option').contains('Quintor Amersfoort').click();
    // Click away from select dropdown
    cy.get('#locationSelect').blur()
    cy.get('#location-next-button').click();

    // Date step
    cy.get('.mat-focus-indicator.mat-calendar-next-button.mat-icon-button.mat-button-base').click();
    cy.get('.mat-calendar-body-cell-content.mat-focus-indicator').contains(1).click();
    cy.get('#date-next-button').click();

    // Time step
    cy.get('#startTimeSelect').type('12:35');
    cy.get('#endTimeSelect').type('14:35');
    cy.get('#time-next-button').click();

    // Type step
    cy.get('#typeSelect').click().get('mat-option').contains('Ruimte').click();
    // Click away from select dropdown
    cy.get('#typeSelect').blur()
    cy.get('.search-button').click();

    // Validate that search checked for available workplaces
    cy.get('.card-title').contains('Ruimte');
    cy.get('#floor').contains('Verdieping');
    cy.get('#capacity').contains('Capaciteit');
  });

  xit('should error when time is invalid', () => {
    // Intercept the http request and return the available-rooms.json as response
    // params used -> locationId=1, date=2021-12-01, start=12:35, end=14:45
    cy.intercept('GET', 'http://localhost:8080/rooms/availability?locationId=1&date=2021-12-01&start=12:35&end=10:35',
        {
          statusCode: 422,
          body: {
            error: {
              status: 422,
              error: "The reservation start time cannot be after the end time!"
            }
          }

        }).as('getAvailableRooms');

    // Click on time step
    cy.get('#cdk-step-label-0-2').click();

    // Time step
    cy.get('#startTimeSelect').type('12:35');
    cy.get('#endTimeSelect').type('10:35');
    cy.get('#time-next-button').click();

    // Type step
    cy.get('.search-button').click();

    // Validate error message
    cy.get('.message')
  });

  it('should search for available rooms if stepper form is valid', () => {
    // Intercept the http request and return the available-rooms.json as response
    // params used -> locationId=1, date=2021-12-01, start=12:35, end=14:45
    cy.intercept('GET', 'http://localhost:8080/rooms/availability?locationId=1&date=2021-12-01&start=12:35&end=14:35',
        { fixture: 'available-rooms.json' }).as('getAvailableRooms');

    // Click on time step
    cy.get('#cdk-step-label-0-2').click();

    // Time step
    cy.get('#startTimeSelect').type('12:35');
    cy.get('#endTimeSelect').type('14:35');
    cy.get('#time-next-button').click();

    // Type step
    cy.get('#typeSelect').click().get('mat-option').contains('Ruimte').click();
    // Click away from select dropdown
    cy.get('#typeSelect').blur()
    cy.get('.search-button').click();

    // Validate that search checked for available workplaces
    cy.get('.card-title').contains('Ruimte');
    cy.get('#floor').contains('Verdieping');
    cy.get('#availability').should('not.exist');
    cy.get('#capacity').contains('Capaciteit');
  });

  it('should reserve room with capacity 6 with no recurrence', () => {
    // Room card should exist
    cy.get('#open-card-1').should('exist');

    // Reserve room
    cy.get('#book-button').click();
    cy.get('#confirm-booking').click();

    cy.writeFile('cypress/fixtures/available-rooms.json',
          {
            "id": 1,
            "floor": 0,
            "capacity": 6,
            "available": 6
          });

    cy.intercept('POST', 'http://localhost:8080/reservations/rooms', {
      statusCode: 200,
      body: {
        "date": "2021-12-01",
        "startTime": "12:35:00",
        "endTime": "14:35:00",
        "employeeId": 1,
        "roomId": 1,
        "recurrence": {
          "active": false
        }
      }
    });

    // Validate reservation
    cy.get('#open-card-1').should('not.exist');
  });


  after(() => {
    cy.writeFile('cypress/fixtures/available-rooms.json',
        [
          {
            "id": 1,
            "floor": 0,
            "capacity": 6,
            "available": 6
          },
          {
            "id": 2,
            "floor": 0,
            "capacity": 8,
            "available": 8
          }
        ]);
  })

})
