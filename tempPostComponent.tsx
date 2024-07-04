import React, { useState, useEffect } from 'react';
import Linkify from 'react-linkify';

interface PostComponentProps {
  post_id: number;
  title: string;
  description: string;
  imageUrl: string[];
  like_count: number;
  created_at: string;
  user_id: number;
}

const PostPage: React.FC<PostComponentProps> = ({
  post_id,
  title,
  description,
  imageUrl,
  like_count,
  created_at,
  user_id,
}) => {
  const [likesCount, setLikesCount] = useState(like_count);
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setLikesCount(like_count);
  }, [like_count]);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(likesCount + (liked ? -1 : 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrl.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imageUrl.length) % imageUrl.length,
    );
  };

  const linkDecorator = (href: string, text: string, key: number) => (
    <a
      href={href}
      key={key}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400"
    >
      {text}
    </a>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white max-w-2xl w-full lg:max-w-6xl rounded-lg p-4">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button
              className="absolute top-5 right-5 bg-gray-600 bg-opacity-50 text-white p-1 rounded-full flex items-center justify-center"
              style={{ width: '30px', height: '30px', lineHeight: '30px' }}
              onClick={() => window.history.back()}
              aria-label="Close Post"
            >
              &#x2715;
            </button>
          </div>
          <img
            src={`https://qteefmlwxyvxjvehgjvp.supabase.co/storage/v1/object/public/profile-pic/citalelogo.jpg`}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-5"
          />
        </div>

        <div className="post-container lg:flex lg:space-x-4">
          <div className="image-container w-full mb-4 lg:w-1/2 lg:mb-0 lg:h-auto">
            {imageUrl.length > 0 && (
              <img
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${imageUrl[currentImageIndex]}`}
                alt={title}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            {imageUrl.length > 1 && (
              <div className="flex justify-between items-center mt-2">
                <button
                  className="bg-gray-600 text-white px-2 py-1 rounded-lg"
                  onClick={handlePrevious}
                  aria-label="Previous Image"
                >
                  &lt;
                </button>
                <button
                  className="bg-gray-600 text-white px-2 py-1 rounded-lg"
                  onClick={handleNext}
                  aria-label="Next Image"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>

          <div className="content-container lg:w-1/2 p-4">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <div className="preformatted-text text-gray-400 mb-4">
              <Linkify componentDecorator={linkDecorator}>
                {description}
              </Linkify>
            </div>
            <p className="text-gray-500">{created_at}</p>

            <div className="flex items-center justify-between p-4 border-t border-gray-700">
              <button
                className="flex items-center space-x-2"
                onClick={handleLike}
              >
                {liked ? (
                  <svg
                    fill="red"
                    stroke="red"
                    viewBox="0 0 24 24"
                    className="icon"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                    className="icon"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
                <span className="icon-text text-white">{likesCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .icon {
          width: 23px;
          height: 23px;
          margin-right: 8px;
          stroke-width: 1.25;
          flex-shrink: 0;
          transition: fill 0.2s;
        }
        .icon-text {
          font-size: 12px;
          display: inline-block;
          width: 30px;
          text-align: center;
        }
        .preformatted-text {
          white-space: pre-wrap;
          font-size: 15px;
        }
        @media (min-width: 1024px) {
          .post-container {
            max-width: 1200px;
            margin: auto;
          }
          .image-container {
            flex: 1;
            height: auto;
            max-height: 600px;
          }
          .content-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .image-container img {
            height: 100%;
            object-fit: cover;
          }
        }
      `}</style>
    </div>
  );
};

export default PostPage;
