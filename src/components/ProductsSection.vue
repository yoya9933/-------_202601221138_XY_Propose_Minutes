<script setup lang="ts">
import { ShoppingBag, Loader2 } from 'lucide-vue-next'
import { useSupabaseProductManager } from '@/composables/useSupabaseProductManager'
import { onMounted, computed } from 'vue'

const { products, loading, fetchProducts } = useSupabaseProductManager()

// 初始化載入資料
onMounted(() => {
  fetchProducts()
})

// 只顯示上架的產品
const availableProducts = computed(() => products.value.filter(p => p.available))
</script>

<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 text-emerald-700 font-semibold">
          <ShoppingBag class="w-6 h-6" />
          商品區
        </div>
        <h2 class="mt-2 text-3xl md:text-4xl font-bold text-gray-900">精選禮品與伴手禮</h2>
        <p class="mt-4 text-gray-600 max-w-2xl mx-auto">
          嚴選優質商品，為您的股東紀念品代領服務增添特色選項。
        </p>
      </div>

      <!-- Products list -->
      <div v-if="loading" class="flex justify-center py-12">
        <Loader2 class="w-8 h-8 animate-spin text-emerald-600" />
      </div>
      <div v-else-if="availableProducts.length === 0" class="text-center py-12 text-gray-500">
        目前沒有商品
      </div>
      <div v-else class="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8">
        <ul class="list-disc pl-5 space-y-4 text-gray-700">
          <li v-for="product in availableProducts" :key="product.id" class="leading-relaxed">
            <span class="font-semibold text-gray-900">{{ product.name }}</span>
            <span class="text-gray-500">（{{ product.category }}）</span>
            <span class="text-emerald-700 font-semibold">－ ${{ product.price }}</span>
            <p v-if="product.description" class="mt-1 text-sm text-gray-600">{{ product.description }}</p>
          </li>
        </ul>

        <p class="mt-6 text-sm text-gray-600">
          如需代領與商品相關說明，請聯絡 LINE：<span class="font-semibold">@792nvftc</span> 或電話 <span class="font-semibold">0982-571-134</span>
        </p>
      </div>
    </div>
  </section>
</template>
