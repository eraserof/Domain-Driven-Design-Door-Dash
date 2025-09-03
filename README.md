## Overview of the project:
  The goal of this project is to explore Domain-Driven Design (DDD) by applying the concepts to a Door Dash "clone"

## Overview of DDD
  Domain-Driven Design is about modeling bussiness objects to match the domain in question by utilizing domain experts and developers. The main goal is create a model that both stake-holders will be able to easily understand and to communicate through. I will brefly go over the Domain Driven Layers, and then I will demonstrate using Door Dash. For a far better writeup, checkout [herbertograca](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/) 

  ### Layers:
    There are 4 main layers: Domain, Application, Infrastructure, and Interface.  The idea is to keep each layer seprate from the other layer as to allow for extensiblity and change to the system
    #### Domain
      This is the core of our system and where all of the business logic lives. The domain layer utitlizes: entites, value objects, domain services, and domain events, this layer should not have any dependencies, databases (or connections) this layer should only have plain code, and business logic
    #### Application
      This is next step up of the domain layer, it depends on the domain layer and orchestrates the domain and even multiple domains within the domain layer.
    #### Infrastructure
      This layer is the step up from the application layer, and lives on the same layer as the Interface. It deals with persistence (databases) external APIs, and messages. How external systems interact with the system
    #### Interface
      This layer is on the same layer as the Infrastructure layer where the user can interact with the system. This is where we implement all the ways we want people to interact with our system: Rest Controllers, cli, Graph, ect.  

<img width="1600" height="1094" alt="080-explicit-architecture-svg" src="https://github.com/user-attachments/assets/22fafae9-f0bb-4d04-8b31-fe7cde246d5e" />
[herbertograca](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)

The above diagram is from [herbertograca](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/) and ilistrates the different layers: Starting with the outer most layer, the Interface layer where we have the different ways to interact with the system, and the Infrastructure layer where the external systems are interacting with the system. The Application Core: where the Application Layer and the Domain Layer live. 

## Door Dash:
  ### Possible Domains/SubDomains:
    - Resturant
    - Customer
    - Recommendations
    - Payments
    - Dashers
    - Order Management
    - Vendor
    For this example we will be looking at Order-Management and Vendor
      For the Order-Management will only be looking at two sub-domains: Order and Cart. We can break down some business rules for these domains:
        Cart:
          - Can only modify the car if there its still in draft status. Once the cart has been payed for we cannot modify the cart, so the user is not allowed to add/remove items.
          - When checking out, we need to calculate the total and apply any cupons or dicounts (I will not be implementing this)
        Order:
          - Order has several statuses:
            - PLACED
              - Can only place an order once it has been payed for
            - ACCEPTED
              - The Resturant has accepted the order
              - A dasher gets assigned
            - PREPARED
              - The Resturant has started preparing the order
              - Notify the customer that the order is being worked on
            - PICKEDUP
              - The dasher has picked up the order
              - Can only picked up if the order has been prepared
            - DELIVERED
              - The dasher has delivered the order
              - Can only deliever an order if it has been picked up
            - CANCELED
              - The order was canceled
              - can only cancle if the order hasnt been prepared yet.
          Vendor:
            - 
  ### Application
    This is where service will live and call the models for their business logic 
   
  ### Infrastructure:
    All the tables will be in memory, and I will not be using postgres or another database. Implementing the databases are beyond the scope of this project
  ### Interface:
    In this example i will only be implmenting some of the Controllers, but we can easily see how we can extend this to include a cli or something else.
  
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
