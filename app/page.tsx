'use client';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-black text-blue-900 mb-6">Chavez Dental Studio!</h1>
        <p className="text-xl text-gray-600 mb-10">Sonrisas perfectas, atención profesional. Dra. Katherine Chavez.</p>
        <Link href="/admin/dashboard" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 shadow-lg">
          Entrar al Sistema
        </Link>
      </div>
    </div>
  );
}