import {arg, mutationField} from 'nexus'

export const CreateFaq = mutationField('createFaq', {
  type: 'Faq',
  authorize: (_root, _args, ctx) => !!ctx.user,
  args: {
    data: arg({
      type: 'CreateFaqInput',
    }),
  },
  resolve: (_, {data}, ctx) => ctx.prisma.faq.create({data}),
})
