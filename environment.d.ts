declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_SECRET: string
      AUTH0_ID: string
      AUTH0_ISSUER: string
      AUTH0_SECRET: string
      SHOPIFY_API_KEY: string
      SHOPIFY_SHOP_NAME: string
      SHOPIFY_PASSWORD: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
