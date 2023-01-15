import { gql } from "@apollo/client";

export const GET_ME = gql`
{
    me {
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
        }
    }

}
`;