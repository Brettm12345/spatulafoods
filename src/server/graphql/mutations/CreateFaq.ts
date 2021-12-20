import {arg, mutationField} from 'nexus'

export const CreateFaq = mutationField('createFaq', {
  type: 'Faq',
  args: {
    data: arg({
      type: 'CreateFaqInput',
    }),
  },
  resolve: (_, {data}, ctx) => ctx.prisma.faq.create({data}),
})
