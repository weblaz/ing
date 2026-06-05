import React from 'react';
    import { Link } from 'react-router-dom';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { AlertCircle, Home, ArrowLeft } from 'lucide-react';

    const NotFound: React.FC = () => {
      return (
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          
          <div className="flex-1 flex items-center justify-center px-4 py-20">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-2">404</h1>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Page non trouvée</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée. Vérifiez l'URL et réessayez.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/"
                  className="flex items-center space-x-2 bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Retour à l'accueil</span>
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center space-x-2 border border-blue-900 text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      );
    };

    export default NotFound;