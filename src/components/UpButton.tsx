import { useEffect, useState } from "react";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Return to top script
  useEffect(() => {
    const handleScroll = () => {
      const halfPage = window.innerHeight / 1;
      setShowButton(window.scrollY > halfPage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          key="scrollToTopButton"
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.7 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 1,
            mass: 2,
          }}
          className="fixed bottom-4 right-4 z-50"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4.5 py-3 lg:px-5.5 lg:py-4 text-2xl rounded-2xl duration-200 z-50 cursor-pointer 
            bg-neutral-900 text-white shadow-inner dark:shadow-neutral-700 hover:shadow-neutral-400 "
            aria-label="Scroll to top"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpButton;
