import {objectType} from 'nexus'
import {Measurement} from 'nexus-prisma'

export const MeasurementModel = objectType({
  name: Measurement.$name,
  description: Measurement.$description,
  definition(t) {
    t.field(Measurement.id)
    t.field(Measurement.type)
    t.field(Measurement.value)
  },
})
