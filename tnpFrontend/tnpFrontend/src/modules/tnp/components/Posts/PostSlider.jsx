import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { serverURL } from '../../../../constant/constant';
import AnimatedPostCard from './AnimatedPostCard';

const PostSlider = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const limit = window.innerWidth >= 1024 ? 6 : 4;
        const res = await axios.get(`${serverURL}/api/allposts?limit=${limit}`);
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <div className="md:max-w-5xl w-[100%] mx-auto px-4 py-10">
        {posts.length === 0 && (
          <p className="text-center text-white">No posts available. :(</p>
        )}

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <AnimatedPostCard key={post._id || index} post={post} index={index} />
            ))}
          </div>
        )}
      </div>

      <section className="flex justify-center mt-6 md:mt-6 md:mb-20 animate-slide-in delay-300">
        <div className="p-[0.01px] inline-flex justify-center bg-[#9B1C1C] rounded-2xl">
          <Link to="/allposts">
            <div className="flex justify-center w-full">
              <a className="bg-[#9B1C1C] m-[3px] text-white font-bold text-sm md:text-base px-6 py-3 rounded-2xl transition duration-300 shadow-lg hover:bg-white hover:text-[#9B1C1C] border-2 border-white">
                <span>View All Posts</span>
              </a>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default PostSlider;
