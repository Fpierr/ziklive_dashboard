"use client";

import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-neutral-400 border-t border-neutral-800 hover:bg-gray-900
     transition-transform duration-500 ease-in-out transform hover:scale-105">
      
      {/* Section principale */}
      <div className="max-w-7xl mx-20 px-6 py-32 grid grid-cols-1 md:grid-cols-12 gap-16">
        
        {/* Logo & description */}
        <div className="md:col-span-4">
          <h2 className="text-white text-2xl font-semibold mb-6 tracking-wide">Ziklive</h2>
          <p className="text-[12px] leading-relaxed text-neutral-300 mb-8">
            Plateforme innovante pour découvrir et vivre des expériences musicales uniques.
            Promouvoir vos événements n’a jamais été aussi simple.
          </p>
          <div className="flex space-x-6">
            <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={20} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter size={20} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Société */}
        <div className="md:col-span-2">
          <h3 className="text-white text-sm font-semibold mb-6 tracking-wide">Société</h3>
          <ul className="space-y-4 text-[11px]">
            <li><a href="#" className="hover:text-white">À propos</a></li>
            <li><a href="#" className="hover:text-white">Carrières</a></li>
            <li><a href="#" className="hover:text-white">Communiqués</a></li>
            <li><a href="#" className="hover:text-white">Partenariats</a></li>
          </ul>
        </div>

        {/* Ressources */}
        <div className="md:col-span-3">
          <h3 className="text-white text-sm font-semibold mb-6 tracking-wide">Ressources</h3>
          <ul className="space-y-4 text-[11px]">
            <li><a href="#" className="hover:text-white">Centre d’aide</a></li>
            <li><a href="#" className="hover:text-white">Support technique</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">API & Docs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-3">
          <h3 className="text-white text-sm font-semibold mb-6 tracking-wide">Contact</h3>
          <ul className="space-y-5 text-[11px]">
            <li className="flex items-center space-x-2">
              <Phone size={16} />
              <span>+1 (000) 000-0000</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={16} />
              <span>support@ziklive.com</span>
            </li>
            <li><a href="#" className="hover:text-white">Nous joindre</a></li>
          </ul>
        </div>

      </div>

      {/* Bas du footer */}
      <div className="border-t border-neutral-800 mt-12 py-8 text-center text-[12px] text-neutral-500 tracking-wide">
        <a href="#" className="hover:text-white">Politique de confidentialité</a> &nbsp;|&nbsp;
        <a href="#" className="hover:text-white">Conditions d’utilisation</a> &nbsp;|&nbsp;
        <a href="#" className="hover:text-white">En savoir plus</a> &nbsp;|&nbsp;
        <a href="#" className="hover:text-white">Nous contacter</a> &nbsp;|&nbsp;
        <a href="#" className="hover:text-white">Actualités</a>
      </div>

    </footer>
  );
}
