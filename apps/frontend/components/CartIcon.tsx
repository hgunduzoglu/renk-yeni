import { useRouter } from 'next/router';
import { useCart } from '../contexts/CartContext';

export default function CartIcon() {
  const router = useRouter();
  const { cart } = useCart();

  const handleCartClick = () => {
    router.push('/cart');
  };

  return (
    <button
      onClick={handleCartClick}
      className="relative p-2 hover:text-yellow-400 transition-colors"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5 1.5m0 0L11 17h6M7 13v4a2 2 0 002 2h8a2 2 0 002-2v-4" />
      </svg>
      {cart.itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
          {cart.itemCount}
        </span>
      )}
    </button>
  );
} 