import swaggerJSDoc from 'swagger-jsdoc'
import { SwaggerUiOptions } from 'swagger-ui-express'

const option : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description:'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.JS / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec= swaggerJSDoc(option)
//  const swaggerUIOptions : SwaggerUiOptions= {
//      customCss: `
//          .topbar-wrapper .link {
//              content: url('Ruta de logotipo');
//              height: 120px;
//              width: auto;
//          }
//      `,
//     customSiteTitle: 'Documentacion  REST API Express / Typescript'
//  }

export default swaggerSpec
// export {swaggerUIOptions}

