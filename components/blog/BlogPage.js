import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "Welcome to Our Blog!",
    subtitle: "Discover the Art of Kuppadam Silk Cotton Sarees",
    date: "April 15, 2025",
    content:
      "Kuppadam silk cotton sarees are a perfect harmony of tradition, craftsmanship, and comfort. Woven in the Kuppadam region of Andhra Pradesh, these sarees combine the richness of silk with the breathability of cotton. Their signature interlock weaving technique and intricate zari borders make them a prized choice for festive and formal wear. These sarees not only celebrate Indian heritage but also cater to modern tastes with their elegant appeal and lightweight texture.",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=350&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&h=350&fit=crop",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300&h=350&fit=crop",
      "https://images.unsplash.com/photo-1585128792020-803d29415281?w=300&h=350&fit=crop",
    ],
  },
  {
    id: 2,
    title: "The Legacy of Handloom Weaving",
    subtitle: "A Journey Through Generations of Artistry",
    date: "May 02, 2025",
    content:
      "Handloom weaving is more than just a craft — it is a living legacy passed down through generations of skilled artisans. Each thread tells a story of patience, precision, and cultural pride. From the vibrant Banarasi silks of Uttar Pradesh to the delicate Chanderi weaves of Madhya Pradesh, India's handloom heritage represents an unmatched diversity of technique and artistry. Supporting handloom means sustaining livelihoods and preserving irreplaceable traditions for future generations.",
    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=350&fit=crop",
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&h=350&fit=crop",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&h=350&fit=crop",
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300&h=350&fit=crop",
    ],
  },
];

export default function Blog() {
  const [selected, setSelected] = useState(blogPosts[0]);

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .blog-card:hover {
          background: #f9f4ef !important;
          cursor: pointer;
        }

        .blog-img {
          transition: transform 0.35s ease;
        }
        .blog-img:hover {
          transform: scale(1.04);
        }
      `}</style>

      <div style={styles.container}>
        {/* Section Header */}
        <div style={styles.sectionHeader}>
          <div style={styles.headerLine} />
          <h2 style={styles.sectionTitle}>Our Blog Details</h2>
          <div style={styles.headerLine} />
        </div>

        {/* Blog Selector Tabs */}
        <div style={styles.tabs}>
          {blogPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => setSelected(post)}
              style={{
                ...styles.tab,
                borderBottom: selected.id === post.id ? "2px solid #8b5e3c" : "2px solid transparent",
                color: selected.id === post.id ? "#8b5e3c" : "#999",
                fontWeight: selected.id === post.id ? "600" : "400",
              }}
            >
              {post.title}
            </button>
          ))}
        </div>

        {/* Blog Content */}
        <div style={styles.blogContent}>
          {/* Title */}
          <h1 style={styles.blogTitle}>{selected.title}</h1>

          {/* Subtitle */}
          {selected.subtitle && (
            <p style={styles.blogSubtitle}>{selected.subtitle}</p>
          )}

          {/* Date */}
          <p style={styles.blogDate}>{selected.date}</p>

          {/* Body Text */}
          <p style={styles.blogText}>{selected.content}</p>

          {/* Image Grid */}
          <div style={styles.imageGrid}>
            {selected.images.map((src, i) => (
              <div key={i} style={styles.imageWrapper}>
                <img
                  src={src}
                  alt={`Blog image ${i + 1}`}
                  className="blog-img"
                  style={styles.image}
                  onError={(e) => {
                    e.target.src = `https://placehold.co/300x350/e8d5c4/8b5e3c?text=Image+${i + 1}`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff",
    fontFamily: "'Jost', sans-serif",
    padding: "40px 16px",
  },
  container: {
    maxWidth: "860px",
    margin: "0 auto",
    background: "#fff",
  },

  /* Section Header */
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    justifyContent: "center",
    marginBottom: "28px",
  },
  headerLine: {
    flex: 1,
    height: "1px",
    background: "#ccc",
    maxWidth: "120px",
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "20px",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#1a1a1a",
    whiteSpace: "nowrap",
  },

  /* Tabs */
  tabs: {
    display: "flex",
    gap: "24px",
    borderBottom: "1px solid #e8e0d8",
    marginBottom: "28px",
    overflowX: "auto",
    paddingBottom: "0",
  },
  tab: {
    background: "none",
    border: "none",
    padding: "10px 4px",
    fontSize: "13px",
    letterSpacing: "0.5px",
    fontFamily: "'Jost', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },

  /* Blog Content */
  blogContent: {
    animation: "none",
  },
  blogTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: "6px",
    textTransform: "capitalize",
  },
  blogSubtitle: {
    fontSize: "14px",
    color: "#7a6a5a",
    fontStyle: "italic",
    marginBottom: "6px",
  },
  blogDate: {
    fontSize: "13px",
    color: "#999",
    marginBottom: "16px",
    fontWeight: "300",
  },
  blogText: {
    fontSize: "14.5px",
    lineHeight: "1.8",
    color: "#333",
    marginBottom: "28px",
  },

  /* Image Grid */
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "0",
    borderRadius: "4px",
    overflow: "hidden",
  },
  imageWrapper: {
    overflow: "hidden",
    aspectRatio: "3/4",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
};