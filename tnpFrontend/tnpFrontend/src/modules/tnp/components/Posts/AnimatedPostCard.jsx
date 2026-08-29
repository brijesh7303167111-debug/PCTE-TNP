import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PostCard from './PostCard';


const AnimatedPostCard = ({ post, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.5, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.01 }}
    >
      <PostCard post={post} />
    </motion.div>
  );
};

export default AnimatedPostCard;
