import {list, queryField} from 'nexus'

export const Faqs = queryField('faqs', {
  type: list('Faq'),
  resolve: async (_root, _args, ctx) => ctx.prisma.faq.findMany(),
})
