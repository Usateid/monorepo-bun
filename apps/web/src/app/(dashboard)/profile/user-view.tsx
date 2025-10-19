import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatCard } from "@/components/ui/stat-card";

export default function UserView() {
  return (
    <div className="grid gap-6 md:grid-cols-2 mb-6">
      {/* Card Informazioni Account */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informazioni Account</CardTitle>
        </CardHeader>
        {/* <CardContent className="space-y-4">
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
                <span className="text-green-600 dark:text-green-400">✓ Sì</span>
              ) : (
                <span className="text-orange-600 dark:text-orange-400">
                  In attesa
                </span>
              )}
            </dd>
          </div>
        </CardContent> */}
      </Card>

      {/* Card Statistiche */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Statistiche</CardTitle>
          <CardDescription>La tua attività sulla piattaforma</CardDescription>
        </CardHeader>
        {/* <CardContent className="space-y-4">
          <StatCard label="Sessioni" value={1} icon="🔐" />
          <StatCard label="Giorni attivo" value={daysActive} icon="📅" />
        </CardContent> */}
      </Card>
    </div>
  );
}
