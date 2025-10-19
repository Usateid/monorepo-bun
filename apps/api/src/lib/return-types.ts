const TokenErrors = {
  UNAUTHORIZED: {
    success: false,
    error: "Unauthorized - No authorization header",
    status: 401,
  },
  INVALID_FORMAT: {
    success: false,
    error: "Unauthorized - Invalid authorization header format",
    status: 401,
  },
  NO_TOKEN: {
    success: false,
    error: "Unauthorized - No token provided",
    status: 401,
  },
  JWKS_ERROR: {
    success: false,
    error: "Internal server error - JWKS not available",
    status: 500,
  },
  INVALID_PAYLOAD: {
    success: false,
    error: "Unauthorized - Invalid token payload",
    status: 401,
  },
};

export { TokenErrors };
