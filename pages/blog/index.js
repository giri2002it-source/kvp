// BlogList.jsx - 3 CARDS PER ROW with WRAPPING (1 2 3 / 4 5 6)
import { Calendar, Clock, User, ChevronRight } from "lucide-react";
import StoreLayout from "@/components/layout/Layout";
import Link from "next/link";
export default function BlogList() {
  const blogs = [
    {
      id: 1,
      title: "How to Drape a Saree Perfectly: A Complete...",
      excerpt: "Master the art of draping a saree with our step-by-step guide. Learn different styles and techniques for the perfect drape ever...",
      image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80",
      author: "Priya Sharma",
      read_time: 8,
      published_at: "2026-02-14",
    },
    {
      id: 2,
      title: "The Timeless Elegance of Kanchipuram Sarees",
      excerpt: "Discover the rich heritage and craftsmanship behind the iconic Kanchipuram silk sarees.",
      image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80",
      author: "Anjali Sharma",
      read_time: 5,
      published_at: "2024-01-15",
    },
    {
      id: 3,
      title: "5 Modern Ways to Style a Saree",
      excerpt: "Explore creative draping styles and accessories to give your saree a contemporary twist.",
      image_url: "https://images.unsplash.com/photo-1583391733956-6c6f9f03c5f6?auto=format&fit=crop&w=300&q=80",
      author: "Priya Mehta",
      read_time: 4,
      published_at: "2024-02-10",
    },
    {
      id: 4,
      title: "Choosing the Perfect Wedding Saree",
      excerpt: "A complete guide to selecting the perfect saree for your big day with bridal tips.",
      image_url: "https://images.unsplash.com/photo-1610189001467-6f5b18a2e0f6?auto=format&fit=crop&w=300&q=80",
      author: "Ritika Kapoor",
      read_time: 6,
      published_at: "2024-03-05",
    },
    {
      id: 5,
      title: "Silk Saree Care and Maintenance Guide",
      excerpt: "Learn essential tips to preserve the beauty and longevity of your precious silk sarees.",
      image_url: "https://images.unsplash.com/photo-1583394838334-acd977736f90?auto=format&fit=crop&w=300&q=80",
      author: "Neha Reddy",
      read_time: 7,
      published_at: "2026-02-01",
    },
    {
      id: 6,
      title: "Summer Saree Collection 2026 Trends",
      excerpt: "Latest lightweight cotton and chiffon sarees perfect for summer weddings and parties.",
      image_url: "https://images.unsplash.com/photo-1661963516625-98c5721f1e58?auto=format&fit=crop&w=300&q=80",
      author: "Sneha Patel",
      read_time: 5,
      published_at: "2026-02-12",
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <StoreLayout>
      <div className="blog-container">
        {/* Header */}
        <div className="blog-header">
          <h1>Saree Stories</h1>
          <p>Discover the elegance and timeless beauty of sarees</p>
        </div>

        {/* 3 PER ROW WITH WRAPPING: 1 2 3 / 4 5 6 */}
        <div className="blog-grid">
          {blogs.map((blog) => (
            <article key={blog.id} className="blog-card">
              {/* Image Section */}
              <div className="card-image">
                <img src={blog.image_url} alt={blog.title} />
              </div>

              {/* Content */}
              <div className="card-content">
                <h2 className="card-title">{blog.title}</h2>
                <p className="card-excerpt">{blog.excerpt}</p>

                {/* Meta Info */}
                <div className="card-meta">
                  <div className="meta-row">
                    <div className="meta-author">
                      <User size={14} />
                      <span>{blog.author}</span>
                    </div>
                    <div className="meta-time">
                      <Clock size={14} />
                      <span>{blog.read_time} min</span>
                    </div>
                  </div>
                  
                  <div className="meta-bottom">
                    <div className="meta-date">
                      <Calendar size={14} />
                      <span>{formatDate(blog.published_at)}</span>
                    </div>
                  <Link href={`/blogDetailspage/${blog.id}`} className="read-more">
  Read More
  <ChevronRight size={14} />
</Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </StoreLayout>
  );
}
