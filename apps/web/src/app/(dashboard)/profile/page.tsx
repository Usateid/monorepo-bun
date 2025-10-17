import { getLoggedUser } from "@/app/hooks/logged-user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout-button";
import { StatusBadge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { getInitials, formatDate, getDaysSince } from "@/lib/utils";

export default async function ProfilePage() {
  const { user, isAuthenticated } = await getLoggedUser();

  // Pre-calcola i valori per evitare calcoli ripetuti nel JSX
  const userInitials = getInitials(user?.name);
  const registrationDate = formatDate(user?.createdAt);
  const daysActive = getDaysSince(user?.createdAt);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl mb-20">
      {/* Header della pagina */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Profilo
        </h1>
        <p className="text-muted-foreground">
          Gestisci le tue informazioni personali
        </p>
      </div>

      {/* Card principale con info utente */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <Avatar className="h-24 w-24 md:h-32 md:w-32 ring-4">
              <AvatarFallback className="text-2xl md:text-3xl font-bold bg-primarytext-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            {/* Info base */}
            <div className="flex-1 text-center md:text-left">
              <CardTitle className="text-2xl md:text-3xl mb-2">
                {user?.name || "Nome non disponibile"}
              </CardTitle>
              <CardDescription className="text-base">
                {user?.email || "Email non disponibile"}
              </CardDescription>

              {/* Badge stato */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <StatusBadge showDot variant="info">
                  {isAuthenticated ? "Autenticato" : "Non autenticato"}
                </StatusBadge>
                {user?.emailVerified && (
                  <StatusBadge variant="info">✓ Email verificata</StatusBadge>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <LogoutButton />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Grid con informazioni dettagliate */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Card Informazioni Account */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informazioni Account</CardTitle>
            <CardDescription>Dettagli del tuo account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                ID Utente
              </dt>
              <dd className="text-sm font-mono bg-muted px-2 py-1 rounded">
                {user?.id || "N/A"}
              </dd>
            </div>
            <Separator />
            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                Data di registrazione
              </dt>
              <dd className="text-sm">{registrationDate}</dd>
            </div>
            <Separator />
            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                Email verificata
              </dt>
              <dd className="text-sm">
                {user?.emailVerified ? (
                  <span className="text-green-600 dark:text-green-400">
                    ✓ Sì
                  </span>
                ) : (
                  <span className="text-orange-600 dark:text-orange-400">
                    In attesa
                  </span>
                )}
              </dd>
            </div>
          </CardContent>
        </Card>

        {/* Card Statistiche */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statistiche</CardTitle>
            <CardDescription>La tua attività sulla piattaforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <StatCard label="Sessioni" value={1} icon="🔐" />
            <StatCard label="Giorni attivo" value={daysActive} icon="📅" />
          </CardContent>
        </Card>
      </div>

      {/* Card Azioni */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Azioni Account</CardTitle>
          <CardDescription>
            Gestisci le impostazioni del tuo account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1">
              Modifica profilo
            </Button>
            <Button variant="outline" className="flex-1">
              Cambia password
            </Button>
            <LogoutButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
