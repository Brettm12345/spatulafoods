import {arg, intArg, mutationField} from 'nexus'

export const UpdateFaq = mutationField('updateFaq', {
  type: 'Faq',
  authorize: (_root, _args, ctx) => !!ctx.user,
  args: {
    id: intArg(),
    data: arg({type: 'UpdateFaqInput'}),
  },
  resolve: (_, {id, data}, ctx) => ctx.prisma.faq.update({where: {id}, data}),
})
