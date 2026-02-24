import BlogCard from "@/components/blog/BlogCard";
import { useRef, useEffect } from "react";

export default function BlogSection() {
  const blogScrollRef = useRef(null);

  // 1. Auto-scroll Logic (Left to Right)
  useEffect(() => {
    const scrollContainer = blogScrollRef.current;
    if (!scrollContainer) return;

    const autoScroll = setInterval(() => {
      // If we reach the end, scroll back to the start
      if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 3000); // Moves every 3 seconds

    return () => clearInterval(autoScroll);
  }, []);

  const scrollLeft = () => {
    blogScrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    blogScrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="container py-5 position-relative">
      {/* Title */}
      <div className="d-flex align-items-center justify-content-center my-4">
        <div style={{ width: "60px", height: "1px", backgroundColor: "#000", marginRight: "15px" }}></div>
        <h5 style={{ margin: 0, fontWeight: "700", letterSpacing: "2px", fontSize: "20px", fontFamily: "serif" }}>
          OUR BLOG
        </h5>
        <div style={{ width: "60px", height: "1px", backgroundColor: "#000", marginLeft: "15px" }}></div>
      </div>

      {/* 2. Side Aligned Buttons */}
      <button
        onClick={scrollLeft}
        style={buttonStyle(true)}
      >
        &#x2039;
      </button>

      <button
        onClick={scrollRight}
        style={buttonStyle(false)}
      >
        &#x203A;
      </button>

      {/* 3. Horizontal Scroll Blog List (No Scrollbar) */}
      <div
        ref={blogScrollRef}
        className="hide-scrollbar"
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "20px",
          padding: "10px 0",
          scrollBehavior: "smooth",
          msOverflowStyle: "none",  /* IE and Edge */
          scrollbarWidth: "none",   /* Firefox */
        }}
      >
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari and Opera */
          }
        `}</style>

        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ minWidth: "300px" }}>
            <BlogCard
              image="/assets/images/blog.png"
              date="April 15, 2025"
              title="Kuppadam Silk Cotton Sarees – A Blend of Heritage and Elegance"
              description="Kuppadam silk cotton sarees are a beautiful fusion of tradition and comfort..."
              link={`/blog/kuppadam-${i}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper for button styling
const buttonStyle = (isLeft) => ({
  position: "absolute",
  top: "60%",
  [isLeft ? "left" : "right"]: "-10px",
  transform: "translateY(-50%)",
  zIndex: 10,
  border: "none",
  width: "40px",
  height: "40px",
  background: "#CEB666",
  color: "white",
  cursor: "pointer",
  borderRadius: "50%",
  fontSize: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
});