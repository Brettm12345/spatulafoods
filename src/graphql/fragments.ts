import {gql} from 'urql'

export const FAQ = gql`
  fragment Faq on Faq {
    id
    question
    answer
  }
`
