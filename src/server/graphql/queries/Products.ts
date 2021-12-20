import {list, queryField} from 'nexus'
import {Context} from '../../context'

export const Products = queryField('products', {
  type: list('Product'),
  resolve: async (_root, _args, ctx) => ctx.prisma.product.findMany(),
})
