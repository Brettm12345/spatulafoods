import {inputObjectType} from 'nexus'
import {Faq} from 'nexus-prisma'

export const UpdateFaqInput = inputObjectType({
  name: 'UpdateFaqInput',
  definition(t) {
    t.field(Faq.question)
    t.field(Faq.answer)
  },
})
