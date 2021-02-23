import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <div className="content">
        <Component {...pageProps} />
        <Toaster />
      </div>
    </UserContext.Provider>
  );
}

export default MyApp;
