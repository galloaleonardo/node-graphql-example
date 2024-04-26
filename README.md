# NODE API GRAPHQL

This is a simple API using Node.js, Apollo Server and GraphQL.

## Getting Started

### Prerequisites

- Node.js
- Yarn

### Installing

1. Install the dependencies
```sh
yarn
```

2. Run the server
```sh
yarn start
```

3. Access the GraphQL Playground
```sh
http://localhost:4000/
```

### Querying

Its possible to query the users, todos and todo by id.  
Change the query to get the data you want.

```graphql
query GetUsers {
  users {
    name,
    todos {
      text
    }
  }
}

query GetTodos {
  todos {
    id
    text
    completed
    user {
      name,
    }
  }
}

query GetTodoById {
  todoById(id: 1) {
    id
    text
    completed
    user {
      id
      name
    }
  }
}

query GetCompletedTodo {
  todoCompleted(completed: true) {
    text
    user {
      name
    }
  }
}
```

### Mutations

Its possible to create, update, delete and set a todo as completed.  
Change the mutation to get the data you want.

```graphql
mutation CreateTodo {
  addTodo(text: "Wash car", completed: false, userId: 1) {
    text
  }
}

mutation SetTodoCompleted {
  setTodoCompleted(id: 1, completed: true) {
    text
    completed
  }
}

mutation UpdateTodo {
  updateTodo(id: 1, text: "Changed Todo") {
    text
  }
}

mutation DeleteTodo {
  deleteTodo(id: 1) {
    id
  }
}
```
