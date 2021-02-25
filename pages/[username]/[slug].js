import styles from '../../styles/Post.module.css';
import PostContent from '../../components/PostContent';
import Comment from '../../components/Comment';
import HeartButton from '../../components/HeartButton';
import AuthCheck from '../../components/AuthCheck';
import Metatags from '../../components/Metatags';
import { UserContext } from '../../lib/context';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';

import Link from 'next/link';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useContext } from 'react';
import CommentList from '../../components/CommentList';

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;
  let thecomments;
  let comments = [];

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;

    await postRef.collection('comment').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        comments.push(doc.data());
      });
    });

  }

  return {
    props: { post, path, comments },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking',
  };
}

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;
  const comments = props.comments

  const { user: currentUser } = useContext(UserContext);

  return (
    <main className={styles.container}>
      <Metatags title={post.title} description={post.title} />

      <section>
        <PostContent post={post} />

        <AuthCheck>
          <Comment postRef={postRef} />
        </AuthCheck>

        <CommentList post={post} comments={comments} />

      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🚀</strong>
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>🚀 Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>

        {currentUser?.uid === post.uid && (
          <Link href={`/admin/${post.slug}`}>
            <button className="btn-pink">Edit Post</button>
          </Link>
        )}
      </aside>
    </main>
  );
}
