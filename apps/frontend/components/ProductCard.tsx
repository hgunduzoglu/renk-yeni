// PATH: apps/frontend/components/ProductCard.tsx
import Link from "next/link";

export default function ProductCard({ category }: { category: any }) {
  return (
    <Link
      href={`/${category.slug}`}
      className="group block shadow hover:shadow-lg transition overflow-hidden rounded-lg"
    >
      <img
        src={category.coverImage || category.products[0]?.coverImage}
        alt={category.name}
        className="h-56 w-full object-cover group-hover:scale-105 transition-transform"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <p className="text-sm text-gray-500">
          {category.products.length} ürün
        </p>
      </div>
    </Link>
  );
}
