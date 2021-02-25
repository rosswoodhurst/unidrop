import Link from 'next/link';

// UI component for main post content

export default function CommentList({ post, comments }) {
    return comments ? comments.map((comment) => <CommentFeed comment={comment} />) : null;
}

function CommentFeed({ post, comment }) {

    return (
        <div className="card">
            <div className="comment-name">
                <h2>{comment.content}</h2>
                <p>by <span className="pink-text"><strong>{comment.user}</strong></span></p>
            </div>
        </div>
    );
}
