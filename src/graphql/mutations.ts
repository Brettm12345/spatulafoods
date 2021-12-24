import {gql} from 'urql'

import {FAQ} from './fragments'

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($data: CreateProductInput!) {
    createProduct(data: $data) {
      id
    }
  }
`
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: Int!, $data: UpdateProductInput!) {
    updateProduct(id: $id, data: $data) {
      id
    }
  }
`
export const DELETE_FAQ = gql`
  mutation DeleteFaq($id: Int!) {
    deleteFaq(id: $id) {
      ...Faq
    }
  }
  ${FAQ}
`

export const UPDATE_FAQ = gql`
  mutation UpdateFaq($id: Int!, $data: UpdateFaqInput!) {
    updateFaq(id: $id, data: $data) {
      ...Faq
    }
  }
  ${FAQ}
`
export const CREATE_FAQ = gql`
  mutation CreateFaq($data: CreateFaqInput!) {
    createFaq(data: $data) {
      ...Faq
    }
  }
  ${FAQ}
`
