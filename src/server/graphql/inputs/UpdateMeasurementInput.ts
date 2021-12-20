import {inputObjectType} from 'nexus'
import {Measurement} from 'nexus-prisma'

export const UpdateMeasurementInput = inputObjectType({
  name: 'UpdateMeasurementInput',
  definition(t) {
    t.nullable.field(Measurement.type)
    t.nullable.field(Measurement.value)
  },
})
