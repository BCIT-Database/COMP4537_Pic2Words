import { Outlet } from 'react-router-dom';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { useAuth } from '@/contexts/AuthContext';


const Layout = () => {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* <Header user={user} /> */}
      <Header user={user} onLogout={logout} />
      <main className="container mx-auto flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;