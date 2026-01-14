
import React from 'react';
import { Page } from '../types';

interface TermsProps {
  onNavigate: (page: Page) => void;
}

const Terms: React.FC<TermsProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-surface-border shadow-2xl">
        <h1 className="text-4xl font-black mb-4">Términos y Condiciones</h1>
        <p className="text-slate-500 text-sm mb-12">Última actualización: 15 de Octubre, 2023</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-bold flex items-center gap-3">
              <span className="text-primary">01.</span> Propiedad Intelectual
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
              Todo el contenido incluido en este sitio, como texto, gráficos, logotipos, archivos digitales y compilaciones de datos, es propiedad exclusiva de STLMAS o de sus respectivos diseñadores y está protegido por leyes de propiedad intelectual internacionales.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/20">
            <h2 className="text-xl font-bold text-orange-600 dark:text-orange-400 flex items-center gap-3">
              <span className="material-symbols-outlined">warning</span>
              02. Uso de Archivos STL (Licencia Personal)
            </h2>
            <div className="mt-4 space-y-4 text-slate-600 dark:text-slate-300">
              <p>Al comprar un archivo STL, usted adquiere una licencia de <strong>Uso Personal Estricto</strong>.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Usted <strong>PUEDE</strong> imprimir los archivos para su uso personal.</li>
                <li>Usted <strong>NO PUEDE</strong> revender o distribuir el archivo digital.</li>
                <li>Usted <strong>NO PUEDE</strong> vender impresiones físicas sin una licencia comercial explícita.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center gap-3">
              <span className="text-primary">03.</span> Reembolsos
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
              Debido a la naturaleza digital de nuestros productos, todas las ventas son finales. Una vez que un archivo ha sido descargado, no podemos ofrecer reembolsos o cambios, salvo que el archivo esté técnicamente corrupto.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-surface-border text-center space-y-4">
          <p className="text-slate-500 font-medium">¿Tienes alguna duda sobre nuestros términos?</p>
          <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all">
            Contactar Soporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
