import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Heart,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 via-white to-sage-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 md:pt-20 pb-20 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 rounded-full text-sage-700 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Trova il tuo equilibrio interiore</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-sage-900 leading-tight">
                Trasforma il tuo corpo e la tua mente con{" "}
                <span className="text-sage-600 relative">
                  Serenity Yoga
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,6 Q50,0 100,6 T200,6"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-sage-300"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-sage-600 max-w-2xl mx-auto md:mx-0">
                Scopri la pratica millenaria dello yoga con i nostri insegnanti
                certificati. Lezioni per tutti i livelli, dalla principiante
                all&apos;avanzata.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Link href="/dashboard">
                  <Button className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto">
                    Inizia Ora
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button
                    variant="outline"
                    className="border-2 border-sage-300 text-sage-700 hover:bg-sage-50 px-8 py-6 text-lg rounded-xl transition-all duration-300 w-full sm:w-auto"
                  >
                    Scopri di Più
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 md:pt-12">
                <div className="text-center md:text-left">
                  <div className="text-3xl sm:text-4xl font-bold text-sage-900">
                    500+
                  </div>
                  <div className="text-sm text-sage-600 mt-1">Studenti</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl sm:text-4xl font-bold text-sage-900">
                    50+
                  </div>
                  <div className="text-sm text-sage-600 mt-1">Classi</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl sm:text-4xl font-bold text-sage-900">
                    10+
                  </div>
                  <div className="text-sm text-sage-600 mt-1">Insegnanti</div>
                </div>
              </div>
            </div>

            {/* Right Image/Visual */}
            <div className="relative hidden md:block">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-sage-200 to-sage-100 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-sage-300 opacity-50">
                    <svg
                      className="w-64 h-64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v12M6 12h12" />
                      <circle cx="12" cy="12" r="5" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-sage-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sage-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sage-900 mb-4">
              Perché scegliere Serenity Yoga?
            </h2>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              Offriamo un&apos;esperienza completa per il tuo benessere fisico e
              mentale
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-sage-50 to-white border border-sage-100 hover:border-sage-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-sage-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-sage-900 mb-3">
                Benessere Totale
              </h3>
              <p className="text-sage-600 leading-relaxed">
                Migliora la tua salute fisica e mentale con pratiche yoga
                personalizzate per ogni esigenza.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-sage-50 to-white border border-sage-100 hover:border-sage-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-sage-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-sage-900 mb-3">
                Insegnanti Certificati
              </h3>
              <p className="text-sage-600 leading-relaxed">
                Apprendi dalle migliori menti del settore con anni di esperienza
                e certificazioni internazionali.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-sage-50 to-white border border-sage-100 hover:border-sage-300 hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-sage-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-sage-900 mb-3">
                Orari Flessibili
              </h3>
              <p className="text-sage-600 leading-relaxed">
                Prenota le tue lezioni quando vuoi con il nostro sistema di
                booking online disponibile 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left - Image Placeholder */}
            <div className="order-2 md:order-1">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-sage-100 to-sage-200 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-sage-300 opacity-30">
                    <svg
                      className="w-48 h-48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Benefits List */}
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sage-900 mb-8">
                Benefici della Pratica Yoga
              </h2>

              <div className="space-y-4">
                {[
                  "Riduzione dello stress e dell'ansia",
                  "Miglioramento della flessibilità e forza",
                  "Aumento della concentrazione",
                  "Migliore qualità del sonno",
                  "Postura corretta e salute della colonna",
                  "Equilibrio emotivo e pace interiore",
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-sage-50 transition-colors duration-200"
                  >
                    <CheckCircle2 className="w-6 h-6 text-sage-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-sage-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage-600 to-sage-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Inizia il tuo viaggio oggi
          </h2>
          <p className="text-xl text-sage-100 mb-10 max-w-2xl mx-auto">
            Unisciti alla nostra community e scopri come lo yoga può trasformare
            la tua vita
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button className="bg-white text-sage-700 hover:bg-sage-50 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto">
                Prenota la Tua Prima Lezione
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl transition-all duration-300 w-full sm:w-auto"
              >
                Leggi il Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Padding for Mobile Tabs */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
}
