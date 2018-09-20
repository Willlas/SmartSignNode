export const swagger = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "SmartSign API",
    "description": "My REST API",
    "termsOfService": "https://example.com/terms/",
    "contact": {
      "name": "SmartSign"
    },
    "license": {
      "name": "MIT"
    }
  },
  "host": "localhost:3000",
  "basePath": "/api/v1",
  "schemes": [
    "http"
  ],
  "securityDefinitions": {
    "userId": {
      "type": "apiKey",
      "name": "X-User-Id",
      "in": "header"
    },
    "authToken": {
      "type": "apiKey",
      "name": "X-Auth-Token",
      "in": "header"
    }
  },
  "paths": {
    "/ethereum/transaction/{hash}": {
      "get": {
        "tags": [],
        "description": "Devuelve los valores introdicidos para una transación",
        "parameters": [
          {
            "name": "hash",
            "in": "path",
            "description": "Hash devuelto por la transación",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Hash"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Input Data"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/ethereum/allTransactions/{csv}": {
      "get": {
        "tags": [],
        "description": "Devuelve un bool en función del estado de la transaccion",
        "parameters": [
          {
            "name": "csv",
            "in": "path",
            "description": "csv devuelto por la transación",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Bool"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/ethereum/transactionStatus/{hash}": {
      "get": {
        "tags": [],
        "description": "Devuelve un bool en función del estado de la transaccion",
        "parameters": [
          {
            "name": "hash",
            "in": "path",
            "description": "Hash devuelto por la transación",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Hash"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Bool"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/ethereum/contract/method/setNewRegister": {
      "post": {
        "tags": [],
        "description": "Ejecuta elmétodo del contrato encargado de añadir un registro",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "description": "Datos a codificar",
            "required": false,
            "schema": {
              "type": "object",
              "properties": {
                "csv": { "type": "string" },
                "codedData": { "type": "string" }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Response"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/ethereum/contract/method/mappingSignRegister": {
      "post": {
        "tags": [],
        "description": "Devuelve el objeto con los datos codificados dados en una versión númerica",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "description": "Datos codificados de la acción realizada",
            "required": false,
            "schema": {
              "type": "object",
              "properties": {
                "hashData": { "type": "string" }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Response"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/ethereum/contract/method/mappingSignRegisterByCodedData": {
      "post": {
        "tags": [],
        "description": "Devuelve el objeto con los datos codificados dados",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "description": "Datos codificados de la acción realizada",
            "required": false,
            "schema": {
              "type": "object",
              "properties": {
                "codedData": { "type": "string" }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Response"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/ethereum/contract/method/mappingSignRegisterByCsv": {
      "post": {
        "tags": [],
        "description": "Devuelve el objeto con los datos codificados dados",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "description": "Datos codificados de la acción realizada",
            "required": false,
            "schema": {
              "type": "object",
              "properties": {
                "csv": { "type": "string" }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Response"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    }
  },
  "definitions": {
    "Hash": {
      "type": "string"
    }
  }
}