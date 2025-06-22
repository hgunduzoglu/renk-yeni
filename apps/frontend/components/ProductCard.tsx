// PATH: apps/frontend/components/ProductCard.tsx
import Link from "next/link";

export default function ProductCard({ item, type }: { item: any; type: "product" | "category" }) {
  const isCategory = type === "category";

  const coverImage = item.coverImage || (isCategory && item.products?.[0]?.coverImage) || "/placeholder.jpg";
  const name = item.name;
  const link = isCategory ? `/${item.slug}` : `/product/${item.slug}`;
  const subtext = isCategory ? `${item._count?.products ?? 0} ürün` : item.category?.name;

  return (
    <Link
      href={link}
      className="group block transition-all duration-300 overflow-hidden rounded-xl"
    >
      <div className="overflow-hidden h-56 rounded-xl">
        <img
          src={coverImage}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg group-hover:text-yellow-300 transition-colors">{name}</h3>
        <p className="text-white/80 text-sm drop-shadow">
          {subtext}
        </p>
      </div>
    </Link>
  );
}
