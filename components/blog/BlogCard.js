import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function BlogCard({ image, date, title, description, id }) {
  return (
    <div
      className="blog-card bg-white rounded shadow-sm"
      style={{ overflow: "hidden", cursor: "pointer" }}
    >
      {/* IMAGE */}
      <div style={{ width: "100%", height: "320px", position: "relative" }}>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-3" style={{ backgroundColor: "#FFF8F0" }}>
        <p className="text-muted mb-1" style={{ fontSize: "14px", color: "#999999", fontWeight: 400 }}>
          {date}
        </p>

        <h6 className="fw-semibold mb-2" style={{ fontSize: "16px" }}>
          {title}
        </h6>

        {/* TWO-LINE DESCRIPTION */}
        <p
          className="text-muted"
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            marginBottom: "10px",

            display: "-webkit-box",
            WebkitLineClamp: 2,       // SHOW ONLY 2 LINES
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </p>

                 <Link href={`/blogDetailspage/${id}`} className="read-more">
  Read More
  <ChevronRight size={14} />
</Link>
      </div>
    </div>
  );
}