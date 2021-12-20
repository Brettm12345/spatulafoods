import {intArg, mutationField} from 'nexus'

export const DeleteFaq = mutationField('deleteFaq', {
  type: 'Faq',
  args: {
    id: intArg(),
  },
  resolve: (_, where, ctx) => ctx.prisma.faq.delete({where}),
})
