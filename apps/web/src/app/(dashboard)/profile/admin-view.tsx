import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminView() {
  return (
    <div className="grid gap-6 md:grid-cols-2 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lista Utenti</CardTitle>
        </CardHeader>
        <CardContent>
          <dd>asd</dd>
        </CardContent>
      </Card>
    </div>
  );
}
