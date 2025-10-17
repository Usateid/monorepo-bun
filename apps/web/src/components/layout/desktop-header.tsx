import Link from "next/link";
const navigation = [{ name: "Blogs", href: "/blog" }];

export default async function DesktopHeader({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <header className="hidden md:block sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sage-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sage-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">Y</span>
            </div>
            <span className="text-xl font-semibold text-sage-900">
              Serenity Yoga
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sage-700 hover:text-sage-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="text-sage-700 hover:text-sage-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Profilo
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sage-700 hover:text-sage-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
