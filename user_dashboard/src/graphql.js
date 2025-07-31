import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      age
      phone
      created_at
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUser!) {
    createUser(input: $input) {
      id
      name
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUser!) {
    updateUser(id: $id, input: $input) {
      id
      name
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
