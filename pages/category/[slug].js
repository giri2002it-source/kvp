// pages/category/[slug].jsx
import CategoryFilters from "@/components/filter/categoryFilter";
import ProductCard from "@/components/product/ProductCard";
import { Box, Grid, Pagination } from "@mui/material";
import { productData } from "..";
import StoreLayout from "@/components/layout/Layout";
import SectionTitle from "@/components/generic/SectionTitle";
import { getAllCategories } from "@/services/product-lisiting-services";
import { getAllProducts } from "@/services/product-services";
import { slugify } from "@/utils/slugify";
import Link from "next/link";

export default function CategoryPage({ categoryName, filters, products, categories }) {
    return (
        <StoreLayout categories={categories}>
            <Box className="container" sx={{ mt: 2, mb: 8 }}>
                <SectionTitle title={categoryName} />

                <Box className="d-flex gap-4">

                    <div className="d-none d-md-flex">
                        {/* LEFT FILTERS */}
                        <CategoryFilters filters={filters} /></div>

                    {/* RIGHT GRID */}
                    <Box sx={{ flex: 1 }}>
                        <div className="row row-cols-1 row-cols-md-3 ">
                            {products.map((item) => (
                              <Link
                                href={`/products/${item.id}-${slugify(item.productTitle)}`}
                                style={{ textDecoration: "none" }}
                              >

                                <Grid item xs={12} sm={6} md={4} key={item.id} className='mb-3'>
                                  <ProductCard item={item} />
                                </Grid>
                              </Link>
                            ))}
                        </div>

                        <Box className="d-flex justify-content-center mt-4">
                            <Pagination count={10} shape="rounded" />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </StoreLayout>
    );
}

/* ------------------------ STATIC GENERATION ------------------------ */


export async function getStaticPaths() {
  const categories = (await getAllCategories()) || [];

  const paths = categories.map(cat => ({
    params: {
      slug: `${cat.id}-${slugify(cat.name)}`
    }
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const extractCategoryId = (value) => {
    const parts = value.split("-");
    return parts.slice(0, 5).join("-"); // UUID safe
  };

  const categoryId = extractCategoryId(params.slug);

  const products = (await getAllProducts()) || [];

  const filtered = products.filter(
    p => p.categoryId === categoryId 
    &&  p.status == "Active"
  );

  const categories = (await getAllCategories()) || [];


  return {
    props: {
      products: filtered,
      categoryName: filtered[0]?.categoryName || "",
      filters: [], 
      categories: categories
    },
    revalidate: 60,
  };
}


