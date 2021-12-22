import {inputObjectType} from 'nexus'
import {Faq} from 'nexus-prisma'

export const CreateFaqInput = inputObjectType({
  name: 'CreateFaqInput',
  definition(t) {
    t.nullable.field('id', {type: 'Int'})
    t.field(Faq.question)
    t.field(Faq.answer)
  },
})
