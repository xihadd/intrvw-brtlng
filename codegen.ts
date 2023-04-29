import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'https://demo.saleor.io/graphql/',
  documents: ['graphql/**/*.graphql'],
  ignoreNoDocuments: true,
  overwrite: true,
  generates: {
    './src/gql/saleor.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo', 'typescript-apollo-client-helpers'],
      config: {
        withHooks: true
      }
    }
  },
}
 
export default config