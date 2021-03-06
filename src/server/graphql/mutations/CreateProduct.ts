import {arg, mutationField} from 'nexus'

export const CreateProduct = mutationField('createProduct', {
  type: 'Product',
  args: {
    data: arg({
      type: 'CreateProductInput',
    }),
  },
  authorize: async (_root, {data}, ctx) => {
    try {
      await ctx.shopify.product.get(data.shopifyId)
    } catch {
      return new Error('Product not found')
    }
    return !!ctx.user
  },
  resolve: async (
    _,
    {
      data: {
        cookingInstructions,
        shopifyId,
        servingSize,
        compoundNutritionFacts,
        nutritionFacts,
        ingredients,
        contains,
      },
    },
    ctx
  ) => {
    const product = await ctx.prisma.product.create({
      data: {
        cookingInstructions,
        shopifyId,
        ingredients,
        contains,
        servingSize: {
          create: servingSize,
        },
      },
      select: {
        id: true,
      },
    })
    const connectProduct = {
      product: {
        connect: {
          id: product.id,
        },
      },
    } as const
    await Promise.all(
      nutritionFacts.map(async ({ingredient, measurements, order}) => {
        await ctx.prisma.nutritionFact.create({
          data: {
            ...connectProduct,
            ingredient,
            order,
            measurements: {
              create: measurements,
            },
          },
        })
      })
    )
    await Promise.all(
      compoundNutritionFacts.map(
        async ({measurements, ingredient, ingredients, order}) => {
          const nutritionFact = await ctx.prisma.compoundNutritionFact.create({
            data: {
              ...connectProduct,
              ingredient,
              order,
              measurements: {
                create: measurements,
              },
            },
            select: {
              id: true,
            },
          })
          await Promise.all(
            ingredients.map(async ({ingredient, measurements, order}) => {
              await ctx.prisma.nutritionFact.create({
                data: {
                  ...connectProduct,
                  ingredient,
                  order,
                  compoundNutritionFact: {
                    connect: {
                      id: nutritionFact.id,
                    },
                  },
                  measurements: {
                    create: measurements,
                  },
                },
              })
            })
          )
        }
      )
    )
    return ctx.prisma.product.findFirst({where: {id: product.id}})
  },
})
