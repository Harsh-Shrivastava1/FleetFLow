export function badRequest(message: string) {
  return { status: 400 as const, message };
}

export function unauthorized(message = "Unauthorized") {
  return { status: 401 as const, message };
}

export function forbidden(message = "Forbidden") {
  return { status: 403 as const, message };
}

export function notFound(message = "Not found") {
  return { status: 404 as const, message };
}

