import { gql } from "@apollo/client"
import { BOOK_DETAILS } from "graphql/fragments/fragments.gql"

export const BOOK_ADDED = gql`
  ${BOOK_DETAILS}
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
`
