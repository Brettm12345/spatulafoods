import {inputObjectType} from 'nexus'
import {Measurement} from 'nexus-prisma'

export const MeasurementInput = inputObjectType({
  name: 'MeasurementInput',
  definition(t) {
    t.field(Measurement.type)
    t.field(Measurement.value)
  },
})
