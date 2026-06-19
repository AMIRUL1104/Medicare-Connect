"use client";

import { useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import ReviewCard from "./ReviewCard";

export default function ReviewsMarquee({ reviews }) {
  // Duplicate the array to create a seamless infinite loop
  const items = [...reviews, ...reviews];
  const controls = useAnimationControls();

  // Total width of one set: each card ~340px + 24px gap = 364px
  const singleSetWidth = reviews.length * 364;

  return (
    <div
      className="overflow-hidden w-full"
      aria-label="Patient testimonials carousel"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() =>
        controls.start({
          x: [-0, -singleSetWidth],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: reviews.length * 5,
              ease: "linear",
            },
          },
        })
      }
    >
      <motion.div
        className="flex gap-6 w-max"
        animate={controls}
        initial={{ x: 0 }}
        onViewportEnter={() =>
          controls.start({
            x: [0, -singleSetWidth],
            transition: {
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: reviews.length * 5,
                ease: "linear",
              },
            },
          })
        }
      >
        {items.map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`} review={review} />
        ))}
      </motion.div>
    </div>
  );
}
