import {gql} from 'urql'

import {FAQ} from './fragments'

const FAQS = gql`
  query Faqs {
    faqs {
      ...Faq
    }
  }
  ${FAQ}
`
