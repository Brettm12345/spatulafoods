import {gql} from 'urql'

const PRODUCTS = gql`
  query Products {
    products {
      shopifyId
    }
  }
`

const FAQS = gql`
  query Faqs {
    faqs {
      id
      question
      answer
    }
  }
`
