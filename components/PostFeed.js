import Link from 'next/link';

export default function PostFeed({ posts, admin }) {
  return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

function PostItem({ post, admin = false }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="card">
      <div className="card-logo-user">
        <div className="post-logo">
          <img src={post.photo || '/hacker.png'} />
        </div>
        <div className="card-container">
          <div className="post-user">
            <Link href={`/${post.username}/${post.slug}`}>
              <h2 className="post-title">
                <a>{post.title}</a>
              </h2>
            </Link>
            <Link href={`/${post.username}`}>
              <a>
                <strong>By </strong><span className="pink-text"><strong>@{post.displayname ? post.displayname : post.username}</strong></span>
              </a>
            </Link>
          </div>
        </div>
        <span className="push-left"> {post.heartCount || 0} {post.heartCount == 1 ? 'Like' : 'Likes'} 🚀</span>
      </div>
      <div className="card-snippet">
        <Link href={`/${post.username}/${post.slug}`}>
          <a>{post.content.substring(0, 140)}...</a>
        </Link>
      </div>
      <div className='card-footer'>
        <p>{wordCount} words 📰</p>
        <p>{minutesToRead} min read 👀</p>
      </div>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className="btn-trans">Edit</button>
            </h3>
          </Link>

          {post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
        </>
      )}
    </div>
  );
}
