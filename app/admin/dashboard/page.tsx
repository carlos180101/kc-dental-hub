'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';

export default function Dashboard() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');

  useEffect(() => { cargarPacientes(); }, []);

  const cargarPacientes = async () => {
    const { data } = await supabase.from('pacientes').select('*').order('created_at', { ascending: false });
    if (data) setPacientes(data);
  };

  const agregarPaciente = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('pacientes').insert([{ nombre, edad: parseInt(edad) }]);
    setNombre(''); setEdad('');
    cargarPacientes();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-black text-blue-900 mb-8">Clínica Dental - Katherine Chavez</h1>
      
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="font-bold mb-4">Registrar Nuevo Paciente</h2>
        <form onSubmit={agregarPaciente} className="flex gap-4">
          <input required placeholder="Nombre Completo" className="border p-2 rounded flex-1" value={nombre} onChange={e => setNombre(e.target.value)} />
          <input required type="number" placeholder="Edad" className="border p-2 rounded w-24" value={edad} onChange={e => setEdad(e.target.value)} />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold">Guardar Paciente</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">Lista de Pacientes</h2>
        <div className="space-y-2">
          {pacientes.map(p => (
            <div key={p.id} className="flex justify-between items-center p-3 bg-gray-50 border rounded">
              <span><strong>{p.nombre}</strong> ({p.edad} años)</span>
              <Link href={`/admin/pacientes/${p.id}`} className="bg-green-600 text-white px-4 py-1 rounded text-sm font-bold">Abrir Odontograma</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}