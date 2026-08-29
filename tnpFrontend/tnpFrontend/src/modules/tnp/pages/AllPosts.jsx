import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverURL } from "../../../constant/constant";
import AnimatedPostCard from "../components/Posts/AnimatedPostCard";

const PostCardSkeleton = () => (
  <div className="p-4 border rounded-lg shadow animate-pulse bg-gray-100 space-y-4">
    <div className="h-20 bg-gray-300 rounded w-full"></div>
    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded w-full"></div>
    <div className="h-4 bg-gray-300 rounded w-full"></div>
  </div>
);

const SkeletonGrid = () => (
  <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl m-auto">
    {[1, 2, 3, 4, 5, 6].map((_, idx) => (
      <PostCardSkeleton key={idx} />
    ))}
  </div>
);

const AllPosts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${serverURL}/api/allposts`);
      setPosts(res.data);
      setFilteredPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredPosts(
      posts.filter((p) =>
        p.companyName.toLowerCase().startsWith(lower)
      )
    );
  }, [search, posts]);

  return (
    <div className="min-h-screen mt-30 md:mb-10 bg-white py-10 px-4">
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="🔍 Search by company name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl border-2 border-[#9B1C1C] rounded-full px-5 py-2 outline-none focus:ring-2 focus:ring-[#9B1C1C] transition shadow-sm"
        />
      </div>

      {/* Posts Grid */}
      {loading ? (
        <SkeletonGrid />
      ) : (
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl m-auto">
          {filteredPosts.map((post, index) => (
            <AnimatedPostCard key={post._id || index} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPosts;
