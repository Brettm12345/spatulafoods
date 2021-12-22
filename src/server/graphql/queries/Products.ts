import {list, queryField} from 'nexus'

export const Products = queryField('products', {
  type: list('Product'),
  resolve: async (_root, _args, ctx) => ctx.prisma.product.findMany(),
})
