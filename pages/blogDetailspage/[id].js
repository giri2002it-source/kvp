import Blog from "@/components/blog/BlogPage";
import StoreLayout from "@/components/layout/Layout";
import BlogPage from "@/pages/blogDetailspage/blogPage";
export default function BlogDetails({ params }) {
  // const { id } = params;

  return (
    <StoreLayout>
      <div style={{ padding: "40px" }}>
       {/* <BlogPage blogId={parseInt(id)} /> */}
<BlogPage />
      </div>
    </StoreLayout>
  );
}