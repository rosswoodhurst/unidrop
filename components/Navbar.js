import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';
import Unilogo from '../components/Unilogo'

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
    router.push("/")
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" passHref>
            <Unilogo />
          </Link>
        </li>
        <li>

        </li>
        <li>
          <Link href="/about">
            <button className="btn-about">about</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className="btn-trans">
              <button className="btn-signout" onClick={signOut}>sign out</button>
            </li>
            <li>
              <Link href="/admin">
                <button className="btn-shitpost">shit post</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL || '/hacker.png'} />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-login">log in / sign up</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
