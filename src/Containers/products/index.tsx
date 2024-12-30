import PageTitle from "@/components/shared/PageTitle";
import AllProducts from "./products-table";
import ProductActions from "@/Containers/products/ProductActions";
import ProductFilters from "@/Containers/products/ProductFilters";

export default function Products() {
  return (
    <section>
      <PageTitle>Products</PageTitle>

      <ProductActions />
      <ProductFilters />
      <AllProducts />
    </section>
  );
}
