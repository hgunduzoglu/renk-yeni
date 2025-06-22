import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Image from 'next/image';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateCartItem, clearCart, isLoading } = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    customerSurname: '',
    customerPhone: '',
    customerEmail: '',
    deliveryAddress: '',
  });

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
    } else {
      await updateCartItem(productId, newQuantity);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...orderForm,
          sessionId: localStorage.getItem('cart_session_id'),
        }),
      });

      if (response.ok) {
        const order = await response.json();
        alert(`Siparişiniz alınmıştır! Sipariş No: ${order.orderNumber}`);
        setShowCheckoutForm(false);
        setOrderForm({
          customerName: '',
          customerSurname: '',
          customerPhone: '',
          customerEmail: '',
          deliveryAddress: '',
        });
        onClose();
      } else {
        throw new Error('Sipariş oluşturulamadı');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyiniz.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">
              Sepetim ({cart.itemCount} ürün)
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5 1.5m0 0L11 17h6M7 13v4a2 2 0 002 2h8a2 2 0 002-2v-4" />
                </svg>
                <p className="text-lg">Sepetiniz boş</p>
                <p className="text-sm">Ürün eklemek için ürün sayfalarını ziyaret edin</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.product.coverImage}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.product.category.name}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        ₺{Number(item.product.price).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                          disabled={isLoading}
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                          disabled={isLoading}
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-500 hover:text-red-700 text-sm transition-colors"
                        disabled={isLoading}
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t bg-gray-50 p-4 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Toplam:</span>
                <span>₺{cart.totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {!showCheckoutForm ? (
                  <>
                    <button
                      onClick={() => setShowCheckoutForm(true)}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-lg transition-colors"
                      disabled={isLoading}
                    >
                      Teklif Al
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                      disabled={isLoading}
                    >
                      Sepeti Boşalt
                    </button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">Teklif Formu</h3>
                    <form onSubmit={handleCheckout} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Ad"
                          value={orderForm.customerName}
                          onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                          className="border border-gray-300 rounded px-3 py-2 text-sm"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Soyad"
                          value={orderForm.customerSurname}
                          onChange={(e) => setOrderForm({ ...orderForm, customerSurname: e.target.value })}
                          className="border border-gray-300 rounded px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <input
                        type="tel"
                        placeholder="Telefon"
                        value={orderForm.customerPhone}
                        onChange={(e) => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        required
                      />
                      <input
                        type="email"
                        placeholder="E-posta"
                        value={orderForm.customerEmail}
                        onChange={(e) => setOrderForm({ ...orderForm, customerEmail: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        required
                      />
                      <textarea
                        placeholder="Teslimat Adresi"
                        value={orderForm.deliveryAddress}
                        onChange={(e) => setOrderForm({ ...orderForm, deliveryAddress: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-20 resize-none"
                        required
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition-colors"
                          disabled={isLoading}
                        >
                          Teklif Gönder
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowCheckoutForm(false)}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          İptal
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 