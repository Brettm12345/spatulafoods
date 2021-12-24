import {floatArg, queryField} from 'nexus'

export const ProductByShopifyId = queryField('productByShopifyId', {
  type: 'Product',
  args: {
    shopifyId: floatArg(),
  },
  resolve: async (_, {shopifyId}, ctx) =>
    ctx.prisma.product.findFirst({where: {shopifyId}}),
})
