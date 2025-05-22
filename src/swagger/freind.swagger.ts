const FreindApiDoc = {
    "/freind": {
        post: {
            summary: "Send a freind request",
            description: "Access token required",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                freind: { type: "string", example: "your freind id"},
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {type: "string", example: "Freind request sent"}
                                }
                            }
                        }
                    }
                },
                401: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {type: "string", example: "Invalid token"}
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string" }
                                }
                            }
                        }
                    }
                }
            }
        },

        get: {
            summary: "Fetch your freinds",
            description: "Access token required",
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        freind: {
                                            type: "object",
                                            properties: {
                                                fullname: { type: "string" },
                                                email: { type: "string" },
                                                mobile: { type: "string" },
                                                image: { type: "string" },
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {type: "string", example: "Invalid token"}
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string" }
                                }
                            }
                        }
                    }
                }
            }
        },
    },

    "/freind/{id}": {
        put: {
            summary: "Accept freind request",
            description: "Access token required",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    default: 0,
                    schema: { type: "string" }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: { type: "string", example: "accepted"},
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {type: "string", example: "Freind request accepted"}
                                }
                            }
                        }
                    }
                },
                401: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {type: "string", example: "Invalid token"}
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string" }
                                }
                            }
                        }
                    }
                }
            }
        },
        
        delete: {
            summary: "Unfreind or reject freind request",
            description: "Access token required",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    default: 0,
                    schema: { type: "string" }
                }
            ],
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {type: "string", example: "Freind deleted"}
                                }
                            }
                        }
                    }
                },
                401: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {type: "string", example: "Invalid token"}
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string" }
                                }
                            }
                        }
                    }
                }
            }
        },
    },

    "/freind/suggestion": {
        get: {
            summary: "Get freind suggestion",
            description: "Access token required",
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        fullname: { type: "string" },
                                        email: { type: "string" },
                                        mobile: { type: "string" },
                                        image: { type: "string" },
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {type: "string", example: "Invalid token"}
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string" }
                                }
                            }
                        }
                    }
                }
            }
        },
    },
    
    "/freind/request": {
        get: {
            summary: "Get freind request received",
            description: "Access token required",
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        fullname: { type: "string" },
                                        email: { type: "string" },
                                        mobile: { type: "string" },
                                        image: { type: "string" },
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {type: "string", example: "Invalid token"}
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string" }
                                }
                            }
                        }
                    }
                }
            }
        },
    },
}

export default FreindApiDoc