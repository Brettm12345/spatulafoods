import {gql} from 'urql'

import {FAQ} from './fragments'

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
