import {arg, mutationField} from 'nexus'

export const CreateProduct = mutationField('create_product', {
  type: 'Product',
  args: {
    input: arg({
      type: 'CreateProductInput',
    }),
  },
  authorize: async (_root, {input}, ctx) => {
    try {
      await ctx.shopify.product.get(input.shopifyId)
    } catch {
      return new Error('Product not found')
    }
    return !!ctx.user
  },
  resolve: async (
    _,
    {
      input: {
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
      nutritionFacts.map(async ({ingredient, measurements}) => {
        await ctx.prisma.nutritionFact.create({
          data: {
            ...connectProduct,
            ingredient,
            measurements: {
              create: measurements,
            },
          },
        })
      })
    )
    await Promise.all(
      compoundNutritionFacts.map(
        async ({measurements, ingredient, ingredients}) => {
          const nutritionFact = await ctx.prisma.compoundNutritionFact.create({
            data: {
              ...connectProduct,
              ingredient,
              measurements: {
                create: measurements,
              },
            },
            select: {
              id: true,
            },
          })
          await Promise.all(
            ingredients.map(async ({ingredient, measurements}) => {
              await ctx.prisma.nutritionFact.create({
                data: {
                  ...connectProduct,
                  ingredient,
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
