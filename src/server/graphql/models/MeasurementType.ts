import {enumType} from 'nexus'
import {MeasurementType} from 'nexus-prisma'

export const MeasurementTypeModel = enumType({
  name: MeasurementType.name,
  description: MeasurementType.description,
  members: MeasurementType.members,
})
