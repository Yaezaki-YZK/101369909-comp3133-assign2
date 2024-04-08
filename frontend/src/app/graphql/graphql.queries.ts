import { gql } from "apollo-angular";

const login = gql`
mutation Login {
    login (
      email: "gojosatoru@gmail.com",
      password: "honoredone"
    )
  }
`;
const register = gql`
mutation signUp {
    addUser(username: "gojo satoru", email:"gojosatoru@gmail.com",password: "honoredone"){
      _id
      username
      email
    }
  }
  `;
export { login } ;
export { register } ;
