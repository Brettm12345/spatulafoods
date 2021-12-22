module.exports = {
  client: {
    excludes: ['*/generated/*'],
    service: {
      name: 'spatulafoods',
      localSchemaFile: './src/generated/schema.graphql',
    },
  },
}
