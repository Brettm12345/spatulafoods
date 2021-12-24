import {objectType} from 'nexus'

export const ShopifyProductModel = objectType({
  name: 'ShopifyProduct',
  definition(t) {
    // Shopify uses big ids and theres no bigint in nexus
    t.float('id')
    t.field('image', {type: 'Image'})
    t.string('name')
  },
})
