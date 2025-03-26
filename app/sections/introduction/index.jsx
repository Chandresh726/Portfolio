"use client";

import { useEffect, useState, useRef } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "utils";
import GreetingLottie from "./DisplayLottie";

const fadeInLeft = {
  initial: { x: -200, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.9, ease: [0.17, 0.55, 0.55, 1], delay: 0.5 }
};

const fadeInUp = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.9, ease: [0.17, 0.55, 0.55, 1], delay: 0.5 }
};

export function WelcomeSection() {
  const ref = useRef(null);
  const introRef = useRef(null);
  const isTabletUp = useMediaQuery("min-width: 768px");

  let [count, setCount] = useState(0);
  const [text] = useState([
    "Software Engineer",
    "Freelancer",
    "Web3 Enthusiast",
    "Gamer",
    "Traveller"
  ]);

  useEffect(() => {
    let interval = setInterval(() => {
      setCount(count + 1);

      if (count === 4) {
        setCount(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <LazyMotion features={domAnimation}>
      <section id="intro" className="section" ref={introRef}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] lg:grid-cols-[1fr_0.7fr] gap-4 items-center">
          <div className="py-5 md:py-10">
            <m.h1
              tabIndex="0"
              ref={ref}
              className="text-3xl md:text-5xl xl:text-6xl font-bold"
              {...fadeInLeft}
            >
              <p>
                Hi, I&apos;m <mark>Chandresh Kumar</mark>
              </p>
            </m.h1>

            <div className="mt-5 relative flex flex-col overflow-hidden">
              <m.p
                ref={ref}
                className="text-[17px] md:text-2xl transform-none opacity-100"
                {...fadeInLeft}
              >
                -
                <AnimatePresence mode="wait">
                  <m.span
                    key={count}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute left-[13px]"
                  >
                    <mark>{text[count]}</mark>
                  </m.span>
                </AnimatePresence>
              </m.p>
            </div>

            <m.p
              tabIndex="0"
              ref={ref}
              className="mt-3 mb-10 text-gray-500 text-xl"
              {...fadeInLeft}
            >
              Hang out and check out what I&apos;ve been working on.
            </m.p>

            <m.div ref={ref} {...fadeInUp}>
              <a
                href={process.env.NEXT_PUBLIC_RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex="0"
                className="btn"
                aria-label="view resume"
              >
                View Resume
              </a>
            </m.div>
          </div>

          {isTabletUp && <GreetingLottie animationPath="/lottie/coding.json" />}
        </div>
      </section>
    </LazyMotion>
  );
}
