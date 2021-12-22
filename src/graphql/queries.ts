import {gql} from 'urql'

import {FAQ} from './fragments'

export const FAQS = gql`
  query Faqs {
    faqs {
      ...Faq
    }
  }
  ${FAQ}
`
