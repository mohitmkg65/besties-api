const AuthApiDoc = {
    "/auth/signup": {
        post: {
            summary: "Register a new user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                fullname: { type: "string" },
                                email: { type: "string" },
                                mobile: { type: "string" },
                                password: { tyee : "string" }
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
                                    message: {type: "string", example: "Signup success"}
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
        }
    },
    
    "/auth/login": {
        post: {
            summary: "Sign in a user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string" },
                                password: { tyee : "string" }
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
                                    message: {type: "string", example: "Login success"},
                                    accessToken: {type: "string", example: "Valid for 10 minute http only mode"},
                                    refreshToken: {type: "string", example: "Valid for 7 days http only mode"}
                                }
                            }
                        }
                    }
                },
                401: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Invalid credential, email or password is incorrect" }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "User not found, please try to signup first" }
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
        }
    },

    "/auth/logout": {
        post: {
            summary: "Logout a user",
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Logout success" },
                                    accessToken: { type: "string", example: "Auto removed from browser cookies" },
                                    refreshToken: { type: "string", example: "Auto removed from browser cookies" },
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
        }
    },

    "/auth/refresh-token": {
        get: {
            summary: "Getting new access and refresh token",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                refreshToken: { type: "string", example: "Sent automatically from http only cookie" },
                                password: { tyee : "string" }
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
                                    message: {type: "string", example: "Token refreshed"},
                                    accessToken: {type: "string", example: "Valid for 10 minute http only mode"},
                                    refreshToken: {type: "string", example: "Valid for 7 days http only mode"}
                                }
                            }
                        }
                    }
                },
                401: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Failed to refresh the token" }
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
        }
    },
    
    "/auth/session": {
        get: {
            summary: "Getting user info from token",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                refreshToken: { type: "string", example: "Sent automatically from http only cookie" },
                                password: { tyee : "string" }
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
                                   id: { type: "string" },
                                   fullname: { type: "string" },
                                   email: { type: "string" },
                                   mobile: { type: "string" },
                                   image: { type: "string" },
                                }
                            }
                        }
                    }
                },
                401: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Invalid session" }
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
        }
    },

    "/auth/profile-picture": {
        put: {
            summary: "Update profile picture",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                accessToken: { type: "string", example: "Sent automatically from http only cookie" },
                                image: { tyee : "string", example: "your image public url" }
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
                                   image: { type: "string", example: "image url" },
                                }
                            }
                        }
                    }
                },
                401: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Invalid session" }
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
        }
    },
}

export default AuthApiDoc