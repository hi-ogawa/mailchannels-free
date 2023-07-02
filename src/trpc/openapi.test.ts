import { describe, expect, it } from "vitest";
import { openapiDocument } from "./openapi";

describe("openapi", () => {
  it("basic", () => {
    expect(openapiDocument).toMatchInlineSnapshot(`
      {
        "info": {
          "title": "@hiogawa/cloudflare-mailchannels-example",
          "version": "0.0.0",
        },
        "openapi": "3.0.0",
        "paths": {
          "/trpc/sendMail": {
            "post": {
              "requestBody": {
                "content": {
                  "application/json": {
                    "schema": {
                      "additionalProperties": false,
                      "properties": {
                        "input": {
                          "additionalProperties": false,
                          "properties": {
                            "content": {
                              "items": {
                                "additionalProperties": false,
                                "properties": {
                                  "type": {
                                    "type": "string",
                                  },
                                  "value": {
                                    "type": "string",
                                  },
                                },
                                "required": [
                                  "type",
                                  "value",
                                ],
                                "type": "object",
                              },
                              "type": "array",
                            },
                            "from": {
                              "additionalProperties": false,
                              "properties": {
                                "email": {
                                  "type": "string",
                                },
                                "name": {
                                  "type": "string",
                                },
                              },
                              "required": [
                                "email",
                                "name",
                              ],
                              "type": "object",
                            },
                            "personalizations": {
                              "items": {
                                "additionalProperties": false,
                                "properties": {
                                  "to": {
                                    "items": {
                                      "additionalProperties": false,
                                      "properties": {
                                        "email": {
                                          "type": "string",
                                        },
                                        "name": {
                                          "type": "string",
                                        },
                                      },
                                      "required": [
                                        "email",
                                        "name",
                                      ],
                                      "type": "object",
                                    },
                                    "type": "array",
                                  },
                                },
                                "required": [
                                  "to",
                                ],
                                "type": "object",
                              },
                              "type": "array",
                            },
                            "subject": {
                              "type": "string",
                            },
                          },
                          "required": [
                            "subject",
                            "content",
                            "from",
                            "personalizations",
                          ],
                          "type": "object",
                        },
                      },
                      "required": [
                        "input",
                      ],
                      "type": "object",
                    },
                  },
                },
              },
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "additionalProperties": false,
                        "properties": {
                          "output": {
                            "additionalProperties": false,
                            "properties": {
                              "ok": {
                                "type": "boolean",
                              },
                              "value": {},
                            },
                            "required": [
                              "ok",
                            ],
                            "type": "object",
                          },
                        },
                        "required": [
                          "output",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "",
                },
              },
            },
          },
        },
        "servers": [
          {
            "description": "production",
            "url": "https://mailchannels-free-hiro18181.vercel.app",
          },
          {
            "description": "development",
            "url": "http://localhost:5173",
          },
        ],
      }
    `);
  });
});
