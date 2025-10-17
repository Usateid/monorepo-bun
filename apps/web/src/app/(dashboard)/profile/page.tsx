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
import { StatCard } from "@/components/ui/stat-card";
import { getInitials, formatDate, getDaysSince } from "@/lib/utils";
import AdminView from "./admin-view";
import UserView from "./user-view";
export default async function ProfilePage() {
  const { user, isAuthenticated, isAdmin } = await getLoggedUser();

  // Pre-calcola i valori per evitare calcoli ripetuti nel JSX
  const userInitials = getInitials(user?.name);
  const registrationDate = formatDate(user?.createdAt);
  const daysActive = getDaysSince(user?.createdAt);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl mb-20">
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
                {"Benvenuto " + user?.name || "Nome non disponibile"}
              </CardTitle>
              <CardDescription className="text-base">
                {user?.role || "Ruolo non disponibile"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Grid con informazioni dettagliate */}
      {isAdmin ? <AdminView /> : <UserView />}

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
