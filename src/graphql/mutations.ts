import {gql} from 'urql'

export const DELETE_FAQ = gql`
  mutation DeleteFaq($id: Int) {
    deleteFaq(id: $id) {
      id
      question
      answer
    }
  }
`

export const UPDATE_FAQ = gql`
  mutation UpdateFaq($id: Int, $data: UpdateFaqInput!) {
    updateFaq(id: $id, data: $data) {
      id
      question
      answer
    }
  }
`
export const CREATE_FAQ = gql`
  mutation CreateFaq($data: CreateFaqInput) {
    createFaq(data: $data) {
      id
      question
      answer
    }
  }
`
