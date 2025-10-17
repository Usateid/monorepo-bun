const errorMessages: Record<string, Record<string, string>> = {
  IT: {
    INVALID_EMAIL_OR_PASSWORD: "Credenziali non valide",
    DEFAULT: "Errore sconosciuto",
  },
};

export type ErrorResponse = {
  status: number;
  body: { code: string; message: string };
  headers: Record<string, string>;
  statusCode: number;
};

export default function errorHandler(error: ErrorResponse): {
  message: string;
  statusCode: number;
} {
  const locale = "IT";

  const { body, statusCode } = error as unknown as ErrorResponse;
  return {
    statusCode,
    message: errorMessages[locale][body.code] || errorMessages[locale].DEFAULT,
  };
}
