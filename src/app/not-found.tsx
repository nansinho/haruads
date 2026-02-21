import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page introuvable",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <p className="text-8xl font-serif font-bold text-accent mb-4">404</p>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Page introuvable
          </h1>
          <p className="text-text-secondary mb-8 text-lg">
            La page que vous recherchez n&apos;existe pas, a été déplacée ou
            supprimée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-zinc-700 text-text-primary font-semibold rounded-lg hover:border-accent hover:text-accent transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
