## Overview of the project:
  The goal of this project is to explore Domain-Driven Design (DDD) by applying its concepts to a simplified DoorDash “clone.”

## Overview of DDD
  Domain-Driven Design is about modeling business concepts in code so they accurately reflect the real-world domain. This is done by working closely with domain experts and developers to create a shared model that both technical and non-technical stakeholders can understand and use to communicate.
I will briefly go over the layers of Domain-Driven Design and then demonstrate how they can be applied to DoorDash. For a more in-depth exploration, check out [herbertograca](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/) 

  ### Layers:
    There are 4 main layers: Domain, Application, Infrastructure, and Interface.  The idea is to keep each layer seprate from the other layer as to allow for extensiblity and change to the system
    #### Domain
      - The core of the system, where all the business rules live.
        - Contains:
          - Entities
          - Value Objects
          - Domain Services
          - Domain Events
      - The Domain layer should not depend on any technical details (databases, frameworks, UI). It should only contain plain code that models business logic.
    #### Application
      - Orchestrates use cases by coordinating domain objects.
      - Depends on the domain layer but does not implement business rules itself.
      - Examples: PlaceOrderService, CancelOrderService, AssignDasherService.
      - May also handle transactions and security checks.
    #### Infrastructure
      - Provides technical details to support the domain and application layers.
      - Handles persistence (databases), messaging, external APIs, and repositories.
      - How external systems interact with the system.
    #### Interface
      - The presentation layer — how users interact with the application.
      - Examples:
        - REST or GraphQL controllers
        - CLI interfaces
        - gRPC endpoints
      - Should be thin and delegate work to the application layer.

<img width="1600" height="1094" alt="080-explicit-architecture-svg" src="https://github.com/user-attachments/assets/22fafae9-f0bb-4d04-8b31-fe7cde246d5e" />
[herbertograca](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)

The above diagram is from [herbertograca](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/) and ilistrates the different layers: 
   - Interface layer where we have the different ways to interact with the system,
   - Infrastructure layer where the external systems are interacting with the system.
   - The Application Core: where the Application Layer and the Domain Layer live. 

## Door Dash:
  ### Possible Domains/SubDomains:
    - Resturant
    - Customer
    - Recommendations
    - Payments
    - Dashers
    - Order Management
    - Vendor
    For this project, I’ll focus on Order Management and Vendor.
    ### Order Management Subdomains
        - Cart
          - A cart can only be modified if it is still in draft status.
          - Once the cart has been paid for, items cannot be added or removed.
          - During checkout, the total is calculated and discounts/coupons applied.
        - Order
          - Orders have the following statuses, each with rules:
          - PLACED: can only be placed if the cart has been paid.
          - ACCEPTED: restaurant accepts the order, and a dasher is assigned.
          - PREPARED: restaurant starts preparing the order → notify the customer.
          - PICKED_UP: dasher picks up the order → only possible if order is prepared.
          - DELIVERED: dasher delivers the order → only possible if order is picked up.
          - CANCELED: only possible if the order has not been prepared yet.
        - Vendor
          - (To be expanded — e.g., vendor manages menus, availability, etc.)
  ### Application
    This layer will contain services that coordinate use cases, such as placing an order or checking out a cart. These services call into the domain models to enforce business logic.
   
  ### Infrastructure:
    For simplicity, all persistence will be in memory. No external database (like Postgres) will be used for this project, since persistence concerns are not the main focus here.
  ### Interface:
    For this example, I’ll implement only a few REST controllers. However, the design would allow easily adding other interfaces (e.g., CLI, GraphQL, or gRPC) later.
  
## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
