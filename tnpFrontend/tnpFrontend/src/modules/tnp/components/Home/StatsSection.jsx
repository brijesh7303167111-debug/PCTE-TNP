import React from 'react';
import CounterBox from './Counter';

const StatsSection = () => {
  return (
    <section className="   md:py-0 px-10 md:px-0">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 ">
        <CounterBox end={1000} suffix="+" label="Recruiters" />
        <CounterBox end={4800} suffix="+" label="Students Placed" />
        {/* <CounterBox end={20} suffix="+" label="Countries In Placed" /> */}
       <CounterBox end={20} suffix="+" label="Courses Offered" className="hidden md:block" />
     
      </div>
    </section>
  );
};

export default StatsSection;
