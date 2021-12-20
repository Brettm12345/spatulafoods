import {arg, intArg, mutationField} from 'nexus'

export const UpdateMeasurement = mutationField('updateMeasurement', {
  type: 'Measurement',
  args: {
    id: intArg(),
    set: arg({
      type: 'UpdateMeasurementInput',
    }),
  },
  authorize: (_root, _args, ctx) => !!ctx.user,
  resolve: async (_, {id, set}, ctx) =>
    ctx.prisma.measurement.update({where: {id}, data: set}),
})
