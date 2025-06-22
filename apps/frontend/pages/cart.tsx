import Layout from "@/components/Layout";
import Image from "next/image";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { useRouter } from "next/router";

export default function CartPage() {
  const { cart, updateCartItem, removeFromCart, clearCart, isLoading } = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    customerSurname: '',
    customerPhone: '',
    customerEmail: '',
    deliveryAddress: '',
  });
  const router = useRouter();

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
        router.push('/');
      } else {
        throw new Error('Sipariş oluşturulamadı');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyiniz.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                Sepetim ({cart.itemCount} ürün)
              </h1>
              <p className="text-white/90 mt-2 drop-shadow">Seçtiğiniz ürünler</p>
            </div>
          </div>

          {cart.items.length === 0 ? (
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 max-w-md mx-auto">
                <svg className="w-20 h-20 mb-6 mx-auto text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5 1.5m0 0L11 17h6M7 13v4a2 2 0 002 2h8a2 2 0 002-2v-4" />
                </svg>
                <h2 className="text-2xl font-bold text-white mb-4">Sepetiniz Boş</h2>
                <p className="text-white/80 mb-6">Ürün eklemek için ürün sayfalarını ziyaret edin</p>
                <button
                  onClick={() => router.push('/')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Alışverişe Devam Et
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6">Sepetinizdeki Ürünler</h2>
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <div key={item.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <Image
                              src={item.product.coverImage}
                              alt={item.product.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-white mb-1">
                              {item.product.name}
                            </h3>
                            <p className="text-white/70 text-sm mb-2">
                              {item.product.category.name}
                            </p>
                            <p className="text-2xl font-bold text-yellow-400">
                              ₺{Number(item.product.price).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs text-white/60">Temsili fiyat</p>
                          </div>

                          <div className="flex flex-col items-end gap-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                className="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white font-bold"
                                disabled={isLoading}
                              >
                                −
                              </button>
                              <span className="w-12 text-center font-bold text-white text-lg">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white font-bold"
                                disabled={isLoading}
                              >
                                +
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className="text-red-400 hover:text-red-300 font-medium transition-colors"
                              disabled={isLoading}
                            >
                              🗑️ Kaldır
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary & Checkout */}
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 sticky top-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Sipariş Özeti</h2>
                  
                  {/* Total */}
                  <div className="border-b border-white/20 pb-4 mb-6">
                    <div className="flex justify-between items-center text-2xl font-bold">
                      <span className="text-white">Toplam:</span>
                      <span className="text-yellow-400">₺{cart.totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <p className="text-xs text-white/60 mt-1">Temsili fiyat</p>
                  </div>

                  {/* Action Buttons */}
                  {!showCheckoutForm ? (
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowCheckoutForm(true)}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-6 rounded-lg transition-colors text-lg"
                        disabled={isLoading}
                      >
                        🛒 Teklif Al
                      </button>
                      <button
                        onClick={() => router.push('/')}
                        className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                      >
                        Alışverişe Devam Et
                      </button>
                      <button
                        onClick={clearCart}
                        className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 font-medium py-2 px-6 rounded-lg transition-colors"
                        disabled={isLoading}
                      >
                        Sepeti Boşalt
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white">Teklif Formu</h3>
                      <form onSubmit={handleCheckout} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Ad"
                            value={orderForm.customerName}
                            onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Soyad"
                            value={orderForm.customerSurname}
                            onChange={(e) => setOrderForm({ ...orderForm, customerSurname: e.target.value })}
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                          />
                        </div>
                        <input
                          type="tel"
                          placeholder="Telefon"
                          value={orderForm.customerPhone}
                          onChange={(e) => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          required
                        />
                        <input
                          type="email"
                          placeholder="E-posta"
                          value={orderForm.customerEmail}
                          onChange={(e) => setOrderForm({ ...orderForm, customerEmail: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          required
                        />
                        <textarea
                          placeholder="Teslimat Adresi"
                          value={orderForm.deliveryAddress}
                          onChange={(e) => setOrderForm({ ...orderForm, deliveryAddress: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 h-24 resize-none"
                          required
                        />
                        <div className="flex gap-3">
                          <button
                            type="submit"
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-lg transition-colors"
                            disabled={isLoading}
                          >
                            📧 Teklif Gönder
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowCheckoutForm(false)}
                            className="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                          >
                            İptal
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 