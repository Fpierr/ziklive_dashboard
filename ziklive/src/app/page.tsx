"use client";
import Layout from "../components/layout";
import Hero from "../components/hero";
import ArtistCarousel from "../components/ScrollVideos/ArtistSectionHomeCarousel";
import UpcomingEvents from "@/components/UpcomingEvents";
import getCurrentYear from "@/components/FooterDate";
import Footer from "@/components/Footer";
import BackgroundVideoSection from "@/components/ScrollVideos/BackgroundVideoSection";


export default function Home() {
  return (
    <Layout>
      {/* HERO HEADER */}
      <Hero />

      

      {/* SECTION: À PROPOS */}
      <section className="py-24 px-6 bg-white text-black text-center mt-8 md:mt-0">
        <h2 className="text-3xl font-semibold mb-4">Pourquoi ZikLive ?</h2>
        <p className="max-w-2xl mx-auto mb-12 text-lg">
          ZikLive est la plateforme qui connecte artistes, fans et professionnels autour de la scène Kompa. Concerts, coaching, billetterie — tout est centralisé pour une expérience musicale unique.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-base">
          <div>
            <h3 className="text-xl font-bold mb-2">Pour les artistes</h3>
            <p>Organisez vos concerts, gérez votre billetterie et développez votre visibilité facilement.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Pour les fans</h3>
            <p>Ne manquez plus jamais un concert : suivez vos artistes préférés et vibrez en live.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Pour les partenaires</h3>
            <p>Rejoignez une scène Kompa dynamique et en pleine croissance. Collaborez avec les talents d’aujourd’hui et de demain.</p>
          </div>
        </div>
      </section>

      {/* SECTION: ÉVÉNEMENTS */}
      <section className="flex flex-wrap justify-start gap-4">
        <BackgroundVideoSection>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-left">Événements à venir</h2>
          <p className="text-base text-left text-neutral-300 mb-10">
            Restez à jour sur les prochains concerts et expériences musicales près de chez vous.
          </p>
          <UpcomingEvents />
        </BackgroundVideoSection>
      </section>
      
      
      {/* SECTION: ARTISTES */}
      <section className="py-36 px-6 bg-gray-300 text-white bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-900">
        <h2 className="text-3xl font-semibold mb-6">Nos artistes en vedette</h2>
        {/* Composant Carousel artists */}
        <ArtistCarousel />
        <p className="text-base">Découvrez les talents qui font vibrer la scène Kompa. Performances, nouveautés et plus encore.</p>
      </section>

      {/* SECTION: AVIS / TESTIMONIAUX */}
      <section className="py-20 px-6 bg-gray-50 text-center text-black">
        <h2 className="text-3xl font-semibold mb-6">Ce qu’ils disent de nous</h2>
        <div className="grid md:grid-cols-3 gap-8 text-base">
          <p className="italic">"Avec ZikLive, j’ai rempli ma salle en seulement trois jours. Un vrai boost !"</p>
          <p className="italic">"Un outil incontournable pour suivre mes artistes préférés sans rien rater."</p>
          <p className="italic">"Une plateforme professionnelle, fluide et agréable à utiliser. Bravo à l’équipe ZikLive."</p>
        </div>
      </section>

      {/* SECTION: CALL TO ACTION */}
      <section className="py-20 px-6 bg-black hover:bg-pink-700 text-white text-center transition-transform duration-500 ease-in-out transform hover:scale-105">
        <h2 className="text-4xl font-bold mb-4">Prêt à vivre le Kompa autrement ?</h2>
        <p className="mb-6 text-lg">Rejoignez dès aujourd’hui la communauté ZikLive : artistes, fans et partenaires vous attendent.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 btn">
          <a href="/signup" className="bg-white text-black px-6 py-3 rounded-full font-semibold">Créer un compte</a>
          <a href="/events" className="border border-white px-6 py-3 rounded-full font-semibold">Voir les événements</a>
        </div>
      </section>

      {/* FOOTER */}
      <div className='-mt-1'>
        <Footer/>
      </div>
      <footer className="mt-0 py-9 px-6 bg-black hover:bg-gray-900 text-gray-400 text-[10px] text-center text-sm tracking-wide transition-transform duration-500 ease-in-out transform hover:scale-105">
        <p className='text-[12px]'>&copy; { getCurrentYear() } ZikLive. Tous droits réservés.</p>
        <div className="mt-4 flex justify-center text-neutral-500 gap-6">
          {/* <a href="/about" className="hover:text-white text-[12px]">En savoir plus</a>
          // <a href="/contact" className="hover:text-white text-[12px]">Nous contacter</a>
          <a href="/blog" className="hover:text-white text-[12px]">Actualités</a> */}
        </div>
      </footer>
    </Layout>
  );
}
