import {list, queryField} from 'nexus'

export const ShopifyProducts = queryField('shopifyProducts', {
  type: list('ShopifyProduct'),
  resolve: async (_root, _args, ctx) => {
    const data = await ctx.shopify.product.list()
    return data.map(({title, image, id}) => ({name: title, image, id}))
  },
})
