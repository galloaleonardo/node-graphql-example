import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
]

const todos = [
  { id: 1, text: 'Buy milk', completed: false, userId: 1 },
  { id: 2, text: 'Do laundry', completed: true, userId: 2 },
]

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!,
    todos: [Todo]
  }

  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
    user: User!
  }

  type Query {
    users: [User]
    todos: [Todo]
    todoById(id: ID!): Todo
    todoCompleted(completed: Boolean!): [Todo]
  }

  type Mutation {
    addTodo(
      text: String!
      completed: Boolean!
      userId: ID!
    ): Todo
    setTodoCompleted(
      id: ID!
      completed: Boolean!
    ): Todo
    updateTodo(
      id: ID!
      text: String
      completed: Boolean
      userId: ID
    ): Todo
    deleteTodo(
      id: ID!
    ): Todo 
  }
`

const resolvers = {
  Query: {
    users: () => users,
    todos: () => todos,
    todoById: (_, { id }) => todos.find(todo => todo.id === parseInt(id)),
    todoCompleted: (_, { completed }) => todos.filter(todo => todo.completed === completed)
  },
  User: {
    todos: (user) => todos.filter(todo => todo.userId === user.id)
  },
  Todo: {
    user: (todo) => users.find(user => user.id === todo.userId)
  },
  Mutation: {
    addTodo: (_, { text, completed, userId }) => {
      const todo = {
        id: todos.length + 1,
        text,
        completed,
        userId: parseInt(userId)
      }
      todos.push(todo)
      return todo
    },
    setTodoCompleted: (_, { id, completed }) => {
      const todo = todos.find(todo => todo.id === parseInt(id))

      if (!todo) throw new Error('Todo not found')

      todo.completed = completed
      return todo
    },
    updateTodo: (_, args) => {
      const todo = todos.find(todo => todo.id === parseInt(args.id))

      if (!todo) throw new Error('Todo not found')

      if (args.text) todo.text = args.text
      if (args.completed) todo.completed = args.completed
      if (args.userId) todo.userId = parseInt(args.userId)
      return todo
    },
    deleteTodo: (_, { id }) => {
      const todo = todos.find(todo => todo.id === parseInt(id))

      if (!todo) throw new Error('Todo not found')

      todos.splice(todos.indexOf(todo), 1)
      return todo
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);