import {objectType} from 'nexus'
import {Faq} from 'nexus-prisma'

export const FaqModel = objectType({
  name: Faq.$name,
  description: Faq.$description,
  definition(t) {
    t.field(Faq.id)
    t.field(Faq.question)
    t.field(Faq.answer)
  },
})
