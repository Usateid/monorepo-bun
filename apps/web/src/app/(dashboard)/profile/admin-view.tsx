import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function AdminView() {
  return (
    <div className="grid gap-6 md:grid-cols-2 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Menu Rapido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            Lista Utenti
            <Button asChild variant="outline">
              <Link href="/profile/users">Lista utenti</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
