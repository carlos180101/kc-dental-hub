'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../../../lib/supabase';

export default function Expediente({ params }: { params: { id: string } }) {
  const [paciente, setPaciente] = useState<any>(null);
  const [tratamientos, setTratamientos] = useState<any[]>([]);
  const [diente, setDiente] = useState<number | null>(null);
  const [diagnostico, setDiagnostico] = useState('');
  
  const dientes = [18,17,16,15,14,13,12,11, 21,22,23,24,25,26,27,28];

  useEffect(() => { cargarDatos(); }, []);

  const cargarDatos = async () => {
    const { data: pac } = await supabase.from('pacientes').select('*').eq('id', params.id).single();
    const { data: trat } = await supabase.from('tratamientos').select('*').eq('paciente_id', params.id).order('fecha', { ascending: false });
    if (pac) setPaciente(pac);
    if (trat) setTratamientos(trat);
  };

  const guardarTratamiento = async () => {
    if (!diente || !diagnostico) return alert('Faltan datos');
    await supabase.from('tratamientos').insert([{ paciente_id: params.id, diente, diagnostico }]);
    setDiente(null); setDiagnostico('');
    cargarDatos();
  };

  if (!paciente) return <div className="p-8">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Link href="/admin/dashboard" className="text-blue-600 font-bold mb-4 block">← Volver a Pacientes</Link>
      <h1 className="text-2xl font-black mb-6">Expediente: {paciente.nombre}</h1>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="font-bold mb-4">Seleccionar Diente</h2>
          <div className="flex gap-1 flex-wrap mb-6">
            {dientes.map(t => (
              <button key={t} onClick={() => setDiente(t)} className={`w-10 h-12 border-2 font-bold rounded ${diente === t ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>{t}</button>
            ))}
          </div>
          <h2 className="font-bold mb-2">Diagnóstico</h2>
          <select className="w-full border p-2 mb-4 rounded" value={diagnostico} onChange={e => setDiagnostico(e.target.value)}>
            <option value="">Seleccionar...</option>
            <option value="Caries">Caries</option>
            <option value="Resina">Resina</option>
            <option value="Extracción">Extracción</option>
          </select>
          <button onClick={guardarTratamiento} className="w-full bg-blue-600 text-white py-2 rounded font-bold">Guardar en Historial</button>
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="font-bold mb-4">Historial de Tratamientos</h2>
          <div className="space-y-2">
            {tratamientos.map(t => (
              <div key={t.id} className="border p-3 rounded bg-gray-50">
                <p className="font-bold text-blue-900">Diente {t.diente} - {t.diagnostico}</p>
              </div>
            ))}
            {tratamientos.length === 0 && <p>No hay tratamientos registrados.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}