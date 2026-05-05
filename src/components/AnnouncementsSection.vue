<script setup lang="ts">
import { Megaphone, Loader2 } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { useSupabaseAnnouncementManager } from '@/composables/useSupabaseAnnouncementManager'
import { computed, onMounted } from 'vue'
import type { Announcement } from '@/lib/database.types'

const { announcements, loading, fetchAnnouncements, subscribeToChanges } = useSupabaseAnnouncementManager()

// 初始化載入資料和訂閱實時更新
onMounted(() => {
  fetchAnnouncements()
  subscribeToChanges()
})

// 優化：按類型分組並排序，減少DOM重排
// 這樣可以更有效地利用瀏覽器的批量更新
const groupedAnnouncements = computed(() => {
  const groups: Record<'important' | 'new' | 'info', Announcement[]> = {
    important: [],
    new: [],
    info: []
  }
  
  announcements.value.forEach((ann: Announcement) => {
    groups[ann.type as 'important' | 'new' | 'info'].push(ann)
  })
  
  // 每個分組內按日期降序排序（最新的在前）
  Object.keys(groups).forEach(key => {
    groups[key as keyof typeof groups].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  })
  
  return groups
})

// 計算是否為空狀態
const isEmpty = computed(() => announcements.value.length === 0)

const splitContent = (content: string) => {
  return content
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
}
</script>

<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 text-emerald-700 font-semibold">
          <Megaphone class="w-6 h-6" />
          公告區
        </div>
        <h2 class="mt-2 text-3xl md:text-4xl font-bold text-gray-900">最新通知與服務更新</h2>
        <p class="mt-4 text-gray-600 max-w-2xl mx-auto">
          提供近期服務時程、方案調整、文件上傳注意事項等重要訊息。
        </p>
      </div>

      <!-- Announcements list -->
      <div v-if="loading" class="flex justify-center py-12">
        <Loader2 class="w-8 h-8 animate-spin text-emerald-600" />
      </div>
      <div v-else-if="isEmpty" class="text-center py-12 text-gray-500">
        目前沒有公告
      </div>
      <!-- 優化渲染：按優先級分組顯示，重要公告優先 -->
      <div v-else class="space-y-8">
        <!-- 重要公告（條列式） -->
        <div v-if="groupedAnnouncements.important.length > 0">
          <h3 class="text-lg font-bold text-red-600 mb-4">🔴 重要公告</h3>
          <ul class="space-y-4">
            <li v-for="item in groupedAnnouncements.important" :key="item.id" class="bg-red-50/60 border border-red-100 rounded-lg p-4">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <h4 class="text-lg font-semibold text-gray-900">{{ item.title }}</h4>
                    <time class="text-sm text-gray-500">{{ item.date }}</time>
                  </div>
                  <ul class="mt-2 list-disc pl-5 space-y-1 text-gray-700">
                    <li v-for="(line, index) in splitContent(item.content)" :key="`${item.id}-important-${index}`">
                      {{ line }}
                    </li>
                  </ul>
                  <div class="mt-3 flex flex-wrap gap-2">
                    <Badge v-for="tag in item.tags" :key="tag" variant="default">{{ tag }}</Badge>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- 新消息（條列式） -->
        <div v-if="groupedAnnouncements.new.length > 0">
          <h3 class="text-lg font-bold text-blue-600 mb-4">🟢 新消息</h3>
          <ul class="space-y-3">
            <li v-for="item in groupedAnnouncements.new" :key="item.id" class="bg-blue-50/60 border border-blue-100 rounded-lg p-3">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <h4 class="text-md font-medium text-gray-900">{{ item.title }}</h4>
                    <time class="text-sm text-gray-500">{{ item.date }}</time>
                  </div>
                  <ul class="mt-1 list-disc pl-5 space-y-1 text-gray-700">
                    <li v-for="(line, index) in splitContent(item.content)" :key="`${item.id}-new-${index}`">
                      {{ line }}
                    </li>
                  </ul>
                  <div class="mt-2 flex flex-wrap gap-2">
                    <Badge v-for="tag in item.tags" :key="tag" variant="default">{{ tag }}</Badge>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- 一般資訊（條列式） -->
        <div v-if="groupedAnnouncements.info.length > 0">
          <h3 class="text-lg font-bold text-gray-600 mb-4">ℹ️ 一般資訊</h3>
          <ul class="space-y-3">
            <li v-for="item in groupedAnnouncements.info" :key="item.id" class="bg-white/80 border rounded-lg p-3">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <h4 class="text-md font-medium text-gray-900">{{ item.title }}</h4>
                    <time class="text-sm text-gray-500">{{ item.date }}</time>
                  </div>
                  <ul class="mt-1 list-disc pl-5 space-y-1 text-gray-700">
                    <li v-for="(line, index) in splitContent(item.content)" :key="`${item.id}-info-${index}`">
                      {{ line }}
                    </li>
                  </ul>
                  <div class="mt-2 flex flex-wrap gap-2">
                    <Badge v-for="tag in item.tags" :key="tag" variant="default">{{ tag }}</Badge>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
