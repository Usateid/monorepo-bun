import DesktopHeader from "@/components/layout/desktop-header";
import MobileBottomTabs from "@/components/layout/mobile-bottom-tabs";
import { getLoggedUser } from "@/app/hooks/logged-user";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verifica sessione server-side
  const { isAuthenticated } = await getLoggedUser();

  return (
    <div className="min-h-screen">
      <DesktopHeader isAuthenticated={isAuthenticated} />
      {children}
      <MobileBottomTabs isAuthenticated={isAuthenticated} />
    </div>
  );
}
