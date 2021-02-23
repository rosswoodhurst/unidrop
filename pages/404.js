import Link from 'next/link';

export default function Custom404() {
  return (
    <main>
      <div className='cent'>
        <h1>404 - That page does not exist...</h1>
        <iframe
          src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
          width="480"
          height="362"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <Link href="/">
          <button className="btn-trans">Go home</button>
        </Link>
      </div>
    </main>
  );
}
