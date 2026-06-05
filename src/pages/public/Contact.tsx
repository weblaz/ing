import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success('Message envoyé ! Nous vous répondrons sous 24h.');
    setForm({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-blue-200 text-lg">Notre équipe est disponible pour répondre à vos questions</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'contact@ingi-synertran.com' },
                { icon: Phone, label: 'Téléphone', value: '+33 1 23 45 67 89' },
                { icon: MapPin, label: 'Adresse', value: '75 Avenue des Champs-Élysées, 75008 Paris, France' },
              ].map((item) => (
                <div key={item.label} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-blue-900" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{item.label}</p>
                    <p className="text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Envoyer un message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="jean@entreprise.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nom de votre entreprise"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Décrivez votre besoin..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Envoi...' : 'Envoyer le message'}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;