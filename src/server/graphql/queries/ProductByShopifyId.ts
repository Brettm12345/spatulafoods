import {intArg, queryField, queryType} from 'nexus'

export const ProductByShopifyId = queryField('productByShopifyId', {
  type: 'Product',
  args: {
    shopifyId: intArg(),
  },
  resolve: async (_, {shopifyId}, ctx) =>
    ctx.prisma.product.findFirst({where: {shopifyId}}),
})
