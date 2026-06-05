import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Building2, Calendar, CheckCircle } from 'lucide-react';

const Demo: React.FC = () => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', organization: '',
    sector: '', country: '', companySize: '', message: '', consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      toast.error('Veuillez accepter la politique de confidentialité');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('demo_requests').insert([{
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        organization: form.organization,
        sector: form.sector || null,
        country: form.country || null,
        company_size: form.companySize || null,
        message: form.message || null,
        status: 'pending',
      }]);
      if (error) throw error;
      setSubmitted(true);
      toast.success('Demande de démo envoyée avec succès !');
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-24 px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Demande reçue !</h2>
            <p className="text-gray-600 mb-6">Notre équipe vous contactera dans les 24 heures pour planifier votre démonstration personnalisée.</p>
            <Link to="/" className="bg-blue-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-800 transition-colors">
              Retour à l'accueil
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Demander une démonstration</h1>
          <p className="text-blue-200 text-lg">Découvrez la plateforme en 30 minutes avec un expert</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Formulaire de demande</h2>
                <p className="text-sm text-gray-500">Tous les champs marqués * sont obligatoires</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                  <input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jean" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <input required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Dupont" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email professionnel *</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="jean@entreprise.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organisation *</label>
                <input required value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nom de votre organisation" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secteur</label>
                  <select value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Sélectionner</option>
                    <option value="oil-gas">Pétrole & Gaz</option>
                    <option value="btp">BTP & Infrastructure</option>
                    <option value="mining">Mines & Ressources</option>
                    <option value="energy">Énergie</option>
                    <option value="government">Gouvernement</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Taille entreprise</label>
                  <select value={form.companySize} onChange={(e) => setForm({ ...form, companySize: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Sélectionner</option>
                    <option value="1-10">1-10 employés</option>
                    <option value="11-50">11-50 employés</option>
                    <option value="51-200">51-200 employés</option>
                    <option value="201-1000">201-1000 employés</option>
                    <option value="1000+">1000+ employés</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="France" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Décrivez votre besoin..." />
              </div>
              <div className="flex items-start space-x-2">
                <input type="checkbox" id="consent" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-0.5 rounded border-gray-300" />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  J'accepte que mes données soient utilisées pour traiter ma demande de démonstration conformément à la politique de confidentialité.
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Envoi en cours...' : 'Demander une démonstration'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Demo;