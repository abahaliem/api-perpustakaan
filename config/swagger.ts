import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'


export default {

	uiEnabled: true, //disable or enable swaggerUi route
	uiUrl: 'https://api-perpustakaan.up.railway.app/docs', // url path to swaggerUI
	specEnabled: true, //disable or enable swagger.json route
	specUrl: '/swagger.json',
	


	middleware: [], // middlewares array, for protect your swagger docs and spec endpoints

	options: {
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'Restful Perpustakaan App',
				version: '1.0.0',
				description: 'Nodejs Backend Dev With Adonis'
			},
			components: {
				
				validatorUrl: null,
				securitySchemes: {
					bearerAuth: {
						type: 'https',
						scheme: 'bearer'
					}
				}
					
			}
		},

		apis: [
			'app/**/*.ts',
			'docs/swagger/**/*.yml',
			'start/routes.ts'
		],
		basePath: '/api/v1'
	},
	mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  specFilePath: 'docs/swagger.json'
} as SwaggerConfig