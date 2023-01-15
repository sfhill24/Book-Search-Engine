import { gql } from "@apollo/client";


export const LOGIN_USER = gql`
    mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        user {
            email
        }
        token
    }
}
`;

export const ADD_USER = gql`
    mutation ($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      user {
        _id
        username
        email
        bookCount
      }
      token
    }
  }
  `;

export const SAVE_BOOK = gql`
    mutation saveBook ($book: saveBookInput!){
    saveBook(book: $book) {
        bookCount
   } 
}
`;


export const REMOVE_USER = gql`
  mutation($bookId: String!)  {
    removeBook(bookId: $bookId) {
      bookCount
      
    }
}
  `;






export default 'gql';