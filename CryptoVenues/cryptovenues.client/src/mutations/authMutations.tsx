import { gql } from '@apollo/client';

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      username
      token
      tokenExpiry
    }
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      username
      token
      tokenExpiry
    }
  }
`;