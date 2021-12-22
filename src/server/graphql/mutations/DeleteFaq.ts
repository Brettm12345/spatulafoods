import {intArg, mutationField} from 'nexus'

export const DeleteFaq = mutationField('deleteFaq', {
  type: 'Faq',
  args: {
    id: intArg(),
  },
  authorize: (_root, _args, ctx) => !!ctx.user,
  resolve: (_, where, ctx) => ctx.prisma.faq.delete({where}),
})
