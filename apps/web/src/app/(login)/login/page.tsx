"use client";

import { useActionState, useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signInAction, signUpAction } from "./action";
import type { ActionState } from "@/lib/auth-validation";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    isSignUp ? signUpAction : signInAction,
    {}
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage-50 via-sage-100 to-sage-200 p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sage-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sage-400/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="backdrop-blur-sm bg-white/90 border-sage-200/50 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-sage-900">
              {isSignUp ? "Registrazione" : "Accedi"}
            </CardTitle>
            <CardDescription className="text-center text-sage-600">
              {isSignUp
                ? "Inserisci i tuoi dati per creare un account"
                : "Inserisci le tue credenziali per accedere"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              action={formAction}
              className="space-y-4"
              aria-describedby="page-description"
            >
              {isSignUp && (
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-sage-900"
                  >
                    Nome completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={isSignUp}
                    aria-required={isSignUp}
                    aria-invalid={state.error ? "true" : "false"}
                    aria-describedby={state.error ? "form-error" : undefined}
                    className="w-full px-4 py-3 rounded-lg border border-sage-300 bg-white text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:border-transparent transition-all"
                    placeholder="Mario Rossi"
                    defaultValue={state.name}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="email-address"
                  className="text-sm font-medium text-sage-900"
                >
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={state.error ? "true" : "false"}
                  aria-describedby={state.error ? "form-error" : undefined}
                  className="w-full px-4 py-3 rounded-lg border border-sage-300 bg-white text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:border-transparent transition-all"
                  placeholder="tu@esempio.it"
                  defaultValue={state.email}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-sage-900"
                  >
                    Password
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => {
                        // TODO: Implementare recupero password
                        console.log("Recupero password");
                      }}
                      className="text-xs text-sage-600 hover:text-sage-700 font-medium transition-colors underline focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2 rounded"
                    >
                      Password dimenticata?
                    </button>
                  )}
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  required
                  aria-required="true"
                  aria-invalid={state.error ? "true" : "false"}
                  aria-describedby={state.error ? "form-error" : undefined}
                  className="w-full px-4 py-3 rounded-lg border border-sage-300 bg-white text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  defaultValue={state.password}
                />
              </div>
              {isSignUp && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-sage-900"
                    >
                      Conferma password
                    </label>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="confirmPassword"
                    required
                    aria-required="true"
                    aria-invalid={state.error ? "true" : "false"}
                    aria-describedby={state.error ? "form-error" : undefined}
                    className="w-full px-4 py-3 rounded-lg border border-sage-300 bg-white text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    defaultValue={state.confirmPassword}
                  />
                </div>
              )}
              {state.error && (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>{state.message}</AlertTitle>
                </Alert>
              )}
              <Button
                type="submit"
                disabled={pending}
                aria-busy={pending}
                aria-live="polite"
                className="w-full bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 shadow-md hover:shadow-lg transition-all duration-200 h-11"
              >
                {pending ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Caricamento...
                  </span>
                ) : (
                  <span>{isSignUp ? "Crea account" : "Accedi"}</span>
                )}
              </Button>

              <div className="relative my-6" aria-hidden="true">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-sage-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-sage-600">oppure</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                }}
                aria-label={
                  isSignUp
                    ? "Passa alla modalità di accesso"
                    : "Passa alla modalità di registrazione"
                }
                className="w-full border-sage-300 text-sage-700 bg-sage-50 hover:bg-sage-100 hover:text-sage-900 transition-all"
              >
                {isSignUp
                  ? "Hai già un account? Accedi"
                  : "Non hai un account? Registrati"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-sage-600">
          <p>
            Continuando, accetti i nostri{" "}
            <button
              type="button"
              onClick={() => {
                // TODO: Implementare link ai termini
                console.log("Termini di servizio");
              }}
              className="font-medium hover:text-sage-700 underline focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2 rounded"
            >
              Termini di servizio
            </button>{" "}
            e la{" "}
            <button
              type="button"
              onClick={() => {
                // TODO: Implementare link alla privacy policy
                console.log("Privacy Policy");
              }}
              className="font-medium hover:text-sage-700 underline focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2 rounded"
            >
              Privacy Policy
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
}
