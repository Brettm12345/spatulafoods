import {objectType} from 'nexus'

export const Image = objectType({
  name: 'Image',
  definition(t) {
    t.string('created_at')
    t.int('id')
    t.float('position')
    t.int('product_id')
    t.list.int('variant_ids')
    t.string('src')
    t.float('width')
    t.float('height')
    t.string('updated_at')
    t.nullable.string('alt')
  },
})
