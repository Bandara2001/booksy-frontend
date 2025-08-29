import React, { useEffect, useRef, useState } from "react";
import "./Home.css";

function Home() {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = 3;

  //Automatic Sliding
  useEffect(() => {
    const slider = sliderRef.current;
    let scrollAmount = 0;

    const slideInterval = setInterval(() => {
      if (!slider) return;

      const slideWidth = slider.offsetWidth;
      scrollAmount += slideWidth;

      if (scrollAmount >= slider.scrollWidth) {
        scrollAmount = 0;
      }

      slider.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });

      // Update active dot index
      setActiveIndex(Math.floor(scrollAmount / slideWidth));
    }, 3000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="home-container">
        {/* Sliding Images Section */}
        <div className="slider" ref={sliderRef}>
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
            alt="Books"
            className="slide"
          />
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
            alt="Library"
            className="slide"
          />
          <img
            src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d"
            alt="Reading"
            className="slide"
          />
        </div>

        {/* Dot Indicators */}
        <div className="dot-container">
          {Array.from({ length: slideCount }).map((_, index) => (
            <div
              key={index}
              className={`dot ${activeIndex === index ? "active" : ""}`}
            ></div>
          ))}
        </div>

        {/* Welcome Message */}
        <div className="welcome-section">
          <h1>Welcome to Booksy Admin Panel</h1>
          <p1>Hi Admin!</p1>
          <p>
            Booksy is your all-in-one digital book management system. Easily
            add, edit, delete, or search through books, all from a clean and
            friendly dashboard designed just for you.
          </p>
          <p>
            Use the navigation menu to manage your collection or explore new
            entries. Let's keep your book world organized and beautiful!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
