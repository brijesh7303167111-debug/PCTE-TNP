import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { motion, useAnimation } from 'framer-motion';

const CounterBox = ({ end, suffix, label }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          controls.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      className=" hover:scale-110 snap-center text-[#9B1C1C]  transition-transform duration-300 hover:bg-[#9B1C1C] hover:border-[#fff] hover:border-2 hover:text-white hover:shadow-xl border-2 transform border-[#9B1C1C] rounded-2xl shadow-lg p-6 text-center w-full sm:w-1/2 lg:w-1/4 "
      initial={{ opacity: 0, y: 0 }}
      animate={controls}
    >
      <div className="text-4xl font-bold ">
        {inView && <CountUp end={end} suffix={suffix} duration={2} />}
      </div>
      <div className=" text-sm font-medium">{label}</div>
    </motion.div>
  );
};

export default CounterBox;
