<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { ArrowRight, Check, ChevronDown, ClipboardCheck, MessageCircle, ShoppingCart, Truck, Vote, Wallet } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const announcementBanner = ref<HTMLElement | null>(null)
const headerOffset = ref(128)
onMounted(() => {
  announcementBanner.value = document.getElementById('announcement-banner')
})
useResizeObserver(announcementBanner, () => {
  headerOffset.value = announcementBanner.value?.getBoundingClientRect().bottom ?? 128
})

const lineUrl = 'https://line.me/R/ti/p/@792nvftc'
const votingUrl = 'https://stockservices.tdcc.com.tw/evote/index.html?language=TW'
const sectionLinks = [
  { id: 'service-process', label: '完整流程' },
  { id: 'service-plans', label: '怎麼選方案' },
  { id: 'service-checklist', label: '資料準備' },
  { id: 'service-faq', label: '常見問題' },
]

const steps = [
  {
    number: '01',
    icon: Wallet,
    title: '準備證券戶，先確認適合的方案',
    description: '第一次接觸零股代領，可以先把現有開戶、持股情況告訴大倉，再確認當年度服務方式。已有證券戶的人，也先確認是否能搭配合作軟體。',
    tasks: [
      '尚未開戶：依券商要求準備開戶文件，完成證券戶與交割帳戶設定。',
      '已有帳戶：確認可以登入、交易零股，並備妥電子投票所需的身分驗證方式。',
      '加入大倉 LINE，說明想領生活用品、超商卡，或只需要部分公司代領。',
    ],
    help: '大倉協助說明全餐與散單差異，以及當年度合作軟體的使用方式；支援券商、設定與費用先確認後再開始。',
    reminder: '證券開戶、帳戶驗證與交易確認，請由本人依券商及軟體流程操作。',
  },
  {
    number: '02',
    icon: ShoppingCart,
    title: '確認名單與期限，再買進零股',
    description: '「一股全餐」是依模組名單持有多家公司的零股，再依各公司規定辦理紀念品代領。可以透過合作軟體批次掛單，省去逐檔輸入的時間。',
    tasks: [
      '確認當年度模組名單、自己已持有的股票，以及還需要補齊的公司。',
      '買進前確認最後買進日與領取條件，並在交割帳戶備妥股款及交易費用。',
      '掛單後查看成交結果；未成交、資金不足或已超過期限的公司，需另行確認。',
    ],
    help: '大倉提供一股全餐模組與合作軟體使用說明；實際名單及檔數依當年度更新。',
    reminder: '掛單不等於成交，模組檔數也不等於實際可領數量。領取資格以各公司當年度公告為準。',
  },
  {
    number: '03',
    icon: Vote,
    title: '完成電子投票，確認並保存紀錄',
    description: '電子投票是以網路參與股東會表決。採電投方式辦理代領時，須在各公司的投票期間內完成，並依領取要求保存紀錄。',
    tasks: [
      '依集保「股東 e 服務」或合作軟體指引登入，確認可投票的公司與截止時間。',
      '使用自動投票功能後，仍要檢查是否成功；失敗或尚未完成的項目需在期限內處理。',
      '需要提供電投圖時，保存完整投票紀錄，讓公司名稱、股東編號、投票權憑證與投票內容清晰可辨。',
    ],
    help: '大倉透過合作軟體提供自動投票服務。是否需要另外上傳電投圖，依您使用的軟體與承辦方式確認。',
    reminder: '完成電投後，仍須符合公司的紀念品領取條件；有些公司另有證件、文件或指定領取方式的要求。',
  },
  {
    number: '04',
    icon: Truck,
    title: '交付資料，核對代領與配送安排',
    description: '資料備齊後交由大倉確認受理，再依選定方案安排代領、整理、核對及配送。全餐與散單的收件及交貨安排不同，請先確認當年度公告。',
    tasks: [
      '全餐客戶：確認方案、資料交付方式，以及收件人、電話和配送地址。',
      '散單客戶：依指示上傳電投圖，並加 LINE 留下姓名、聯繫方式及上傳的公司名單。',
      '由大倉核對公司規則與收件期限；送貨前再確認分配內容與交貨安排。',
    ],
    help: '大倉依實際領取結果與方案規則處理後續分配及物流；全餐方案一提供全台免費送貨到府。',
    reminder: '上傳不代表已確認受理。散單需配合全餐行程，全餐代領期間無法處理散單寄運，請留意最新公告。',
  },
]

const plans = [
  {
    name: '全餐方案一',
    title: '以生活用品為主',
    description: '適合想收到實體紀念品、家中有收納空間的人。',
    points: ['依實際領到的公司數量均分，可自選當年度熱門物品。', '以物品為主，不能選超商卡；其餘分配依方案規則辦理。', '不收代領服務費，全台免費送貨到府。'],
  },
  {
    name: '全餐方案二',
    title: '以超商卡為主',
    description: '適合租屋族，或不方便收取大量生活用品的人。',
    points: ['採審核機制，依各倉庫容納程度確認可受理人數。', '只分配當年度 7-11 與全家超商卡，不取實體物品。', '申請前先確認是否可受理，以及當年度分配與交付安排。'],
  },
  {
    name: '全餐方案三',
    title: '全領、不挑物',
    description: '適合希望依模組領取、不另外挑選物品的人。',
    points: ['模組內紀念品全領、全取不挑物，實際仍依領取結果。', '需綁定大倉物流，安排送貨到府。', '方案列有代領費 10 元、物流費 5 元；計費單位與總額請先確認。'],
  },
]

const checklist = [
  { title: '聯絡與服務需求', text: '姓名、聯繫方式、想選的全餐方案或散單需求，以及是否已有證券戶、持股與電投紀錄。' },
  { title: '公司名單與電投圖', text: '需要代領的公司名稱或代號；需上傳時，提供清晰完整的投票紀錄，支援 JPG、PNG、PDF，單檔建議不超過 5MB。' },
  { title: '個別公司要求的文件', text: '依公司公告及大倉確認的方式準備；是否需要通知書、身分證明或其他文件，各公司可能不同。' },
  { title: '配送及最後核對資料', text: '確認收件人、電話、地址與方案內容。散單上傳後務必再用 LINE 告知對應的公司，方便核對。' },
]

const faqs = [
  { question: '買一股就一定能領到紀念品嗎？', answer: '不一定。各公司的發放條件不同，還要確認最後買進日、股東資格、電投要求及領取期限。一股全餐是持股與代領的安排方式，不代表名單內每家公司都保證發放或領取成功。' },
  { question: '「免費代領」代表完全不用準備費用嗎？', answer: '不是。買股票的股款與券商交易費用，和代領服務費是不同項目。全餐方案一不收代領服務費並免費配送；方案三另列代領與物流費，散單也有收費。合作軟體是否另計費用、適用條件及總額，請開始前一併確認。' },
  { question: '已經有股票，還需要重新買一整份全餐嗎？', answer: '先提供目前持股情況，確認哪些公司已在名單內、哪些需要補齊，不要直接重複購買。如果只想處理部分公司的紀念品，可詢問散單代領及當年度收件安排。' },
  { question: '沒有收到紙本開會通知，也可以辦理嗎？', answer: '先查詢是否有該公司的股東資格與可用投票紀錄，再核對公司公告的應備文件。部分公司接受電投紀錄或其他證明，但不能一概認定都免紙本、免證件，請先讓大倉確認。' },
  { question: '上傳電投圖後，還需要做什麼？', answer: '請加 LINE @792nvftc，留下姓名、聯繫方式及上傳的公司名單，讓大倉核對是否符合規則、是否仍在收件與印單期限內。上傳成功只是完成資料交付，不代表已確認受理或代領成功。' },
  { question: '紀念品什麼時候送到？', answer: '各公司的發放時間不同，還需配合實際領取、整理與方案分配作業，無法統一承諾股東會後幾天到貨。請以當年度公告及大倉確認的交貨安排為準；散單需另確認行程與寄運時間。' },
  { question: '如果公司改發電子紀念品 eGift 呢？', answer: '若公司採用集保 eGift，符合該公司領取條件的股東，可依規定在指定期間透過股東 e 服務領取。零股是否適用、是否需自行操作及後續如何與代領方案銜接，請依公司公告並向大倉確認，不要直接套用實體紀念品的流程。' },
]
</script>

<template>
  <div class="bg-gray-50" :style="{ paddingTop: `${headerOffset}px`, '--service-scroll-offset': `${headerOffset + 16}px` }">
    <section class="px-4 pt-12 pb-10 sm:px-6 lg:px-8" aria-labelledby="services-title">
      <div class="max-w-4xl mx-auto text-center">
        <p class="text-emerald-700 font-semibold tracking-wide">大倉代領 · 服務介紹</p>
        <h1 id="services-title" class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">從第一股，到收到股東紀念品</h1>
        <p class="mt-5 text-lg leading-relaxed text-gray-600">開戶、買進零股、電子投票、代領配送，一次看懂怎麼開始。<br class="hidden sm:block" />先確認您要準備的資料，再把後續代領與整理交給大倉。</p>
        <div class="mt-7 flex flex-col sm:flex-row justify-center gap-3">
          <Button as-child size="lg" class="bg-emerald-700 hover:bg-emerald-800">
            <a :href="lineUrl" target="_blank" rel="noopener noreferrer"><MessageCircle class="size-5" aria-hidden="true" />加入 LINE，確認適合的方案</a>
          </Button>
          <Button as-child size="lg" variant="outline">
            <RouterLink :to="{ path: '/services', hash: '#service-process' }">先看完整流程<ArrowRight class="size-5" aria-hidden="true" /></RouterLink>
          </Button>
        </div>
        <p class="mt-4 text-sm text-gray-600">已有持股或電投圖，也可以直接詢問全餐或散單代領。</p>
      </div>
      <nav aria-label="服務介紹章節" class="max-w-4xl mx-auto mt-10 flex flex-wrap justify-center gap-2">
        <RouterLink v-for="link in sectionLinks" :key="link.id" :to="{ path: '/services', hash: `#${link.id}` }" class="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:border-emerald-600 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">{{ link.label }}</RouterLink>
      </nav>
    </section>

    <section id="service-process" class="scroll-mt-[var(--service-scroll-offset)] max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="process-title">
      <div class="mb-8">
        <p class="text-sm font-semibold text-emerald-700">從準備到交貨，分成四步</p>
        <h2 id="process-title" class="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">第一次使用，照著流程走</h2>
      </div>
      <ol class="space-y-6">
        <li v-for="step in steps" :key="step.number" class="rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
          <div class="flex items-start gap-4">
            <span class="shrink-0 flex size-12 items-center justify-center rounded-xl bg-emerald-100 text-xl font-bold text-emerald-800">{{ step.number }}</span>
            <div class="min-w-0">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900">{{ step.title }}</h3>
              <p class="mt-3 text-gray-600 leading-relaxed">{{ step.description }}</p>
            </div>
          </div>
          <div class="mt-6 grid gap-6 lg:grid-cols-3">
            <div class="lg:col-span-2">
              <h4 class="font-semibold text-gray-900">您需要做的事</h4>
              <ul class="mt-3 space-y-3">
                <li v-for="task in step.tasks" :key="task" class="flex items-start gap-2 text-gray-700 leading-relaxed"><Check class="mt-1 size-5 shrink-0 text-emerald-700" aria-hidden="true" /><span>{{ task }}</span></li>
              </ul>
            </div>
            <div class="rounded-xl bg-emerald-50 p-5">
              <h4 class="flex items-center gap-2 font-semibold text-emerald-900"><component :is="step.icon" class="size-5 shrink-0" aria-hidden="true" />大倉協助的部分</h4>
              <p class="mt-3 leading-relaxed text-emerald-950">{{ step.help }}</p>
            </div>
          </div>
          <p class="mt-5 border-t border-gray-100 pt-4 text-sm leading-relaxed text-gray-600"><span class="font-semibold text-gray-800">這一步請留意：</span>{{ step.reminder }}</p>
        </li>
      </ol>
      <div class="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <a :href="votingUrl" target="_blank" rel="noopener noreferrer" class="font-semibold text-emerald-800 underline underline-offset-4">前往集保股東 e 服務（官方）</a>
        <RouterLink to="/announcements" class="font-semibold text-emerald-800 underline underline-offset-4">查看當年度收件與代領公告</RouterLink>
      </div>
    </section>

    <section id="service-plans" class="scroll-mt-[var(--service-scroll-offset)] bg-white px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="plans-title">
      <div class="max-w-6xl mx-auto">
        <h2 id="plans-title" class="text-2xl sm:text-3xl font-bold text-gray-900">想收物品、超商卡，還是全部代領？</h2>
        <p class="mt-3 text-gray-600 leading-relaxed">先依想收到的內容選方向，再確認方案資格、費用與交貨安排。</p>
        <div class="mt-8 grid gap-5 lg:grid-cols-3">
          <article v-for="plan in plans" :key="plan.name" class="rounded-2xl border border-gray-200 p-6">
            <p class="font-semibold text-emerald-700">{{ plan.name }}</p>
            <h3 class="mt-2 text-xl font-bold text-gray-900">{{ plan.title }}</h3>
            <p class="mt-3 text-gray-600 leading-relaxed">{{ plan.description }}</p>
            <ul class="mt-5 space-y-3 border-t border-gray-100 pt-5">
              <li v-for="point in plan.points" :key="point" class="flex gap-2 text-sm leading-relaxed text-gray-700"><Check class="mt-0.5 size-4 shrink-0 text-emerald-700" aria-hidden="true" /><span>{{ point }}</span></li>
            </ul>
          </article>
        </div>
        <div class="mt-6 rounded-xl bg-gray-50 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div><h3 class="font-bold text-gray-900">只需要部分公司？也有傳統散單代領</h3><p class="mt-2 text-sm leading-relaxed text-gray-600">依紀念品價值級距收取代領費，並需先確認公司規則、收件期限與行程。</p></div>
          <Button as-child variant="outline" class="mt-4 sm:mt-0 shrink-0"><RouterLink to="/plans">查看完整方案與收費<ArrowRight class="size-4" aria-hidden="true" /></RouterLink></Button>
        </div>
        <p class="mt-5 text-sm leading-relaxed text-gray-600">買股股款、券商交易費用與代領服務費分開計算；合作軟體是否另收費，請使用前確認。實際領取及分配依當年度公告與方案規則辦理。</p>
      </div>
    </section>

    <section id="service-checklist" class="scroll-mt-[var(--service-scroll-offset)] max-w-6xl mx-auto px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="checklist-title">
      <h2 id="checklist-title" class="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-gray-900"><ClipboardCheck class="size-7 shrink-0 text-emerald-700" aria-hidden="true" />聯繫前，先準備這些資料</h2>
      <p class="mt-3 text-gray-600">初次諮詢先說明需求，確認辦理方式後，再依指示提交所需文件。</p>
      <dl class="mt-8 grid gap-4 md:grid-cols-2">
        <div v-for="item in checklist" :key="item.title" class="rounded-xl border border-gray-200 bg-white p-6"><dt class="font-bold text-gray-900">{{ item.title }}</dt><dd class="mt-3 leading-relaxed text-gray-600">{{ item.text }}</dd></div>
      </dl>
      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <Button as-child class="bg-emerald-700 hover:bg-emerald-800"><RouterLink to="/upload">查看電投圖規格與上傳方式<ArrowRight class="size-4" aria-hidden="true" /></RouterLink></Button>
        <Button as-child variant="outline"><a :href="lineUrl" target="_blank" rel="noopener noreferrer">已上傳？加 LINE 留資料核對</a></Button>
      </div>
    </section>

    <section id="service-faq" class="scroll-mt-[var(--service-scroll-offset)] bg-white px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="faq-title">
      <div class="max-w-4xl mx-auto">
        <h2 id="faq-title" class="text-2xl sm:text-3xl font-bold text-gray-900">開始前，您可能還想知道</h2>
        <div class="mt-8 space-y-3">
          <details v-for="faq in faqs" :key="faq.question" class="group rounded-xl border border-gray-200 bg-white open:border-emerald-300 open:bg-emerald-50/40">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl p-5 font-semibold text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 [&::-webkit-details-marker]:hidden"><span>{{ faq.question }}</span><ChevronDown class="size-5 shrink-0 text-emerald-700 transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
            <p class="px-5 pb-5 leading-relaxed text-gray-700">{{ faq.answer }}</p>
          </details>
        </div>
        <p class="mt-6 text-sm leading-relaxed text-gray-600">股東資格、應備文件與領取期間，請核對各公司或股務代理機構公告；電子投票與 eGift 操作可查閱<a :href="votingUrl" target="_blank" rel="noopener noreferrer" class="ml-1 text-emerald-800 underline underline-offset-4">集保股東 e 服務</a>。</p>
      </div>
    </section>

    <section class="px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="contact-title">
      <div class="max-w-6xl mx-auto rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 p-7 sm:p-10 text-white">
        <h2 id="contact-title" class="text-2xl sm:text-3xl font-bold">告訴我們您目前做到哪一步</h2>
        <p class="mt-4 max-w-3xl leading-relaxed text-emerald-50">「還沒開戶」、「已經有零股」或「已完成電投，想請大倉代領」，都可以直接詢問。我們會依您的情況說明接下來的資料與辦理方式。</p>
        <div class="mt-7 flex flex-col sm:flex-row gap-3">
          <Button as-child size="lg" class="bg-white text-emerald-900 hover:bg-emerald-50"><a :href="lineUrl" target="_blank" rel="noopener noreferrer"><MessageCircle class="size-5" aria-hidden="true" />LINE 諮詢 @792nvftc</a></Button>
          <Button as-child size="lg" class="border border-white/60 bg-transparent text-white hover:bg-white/10"><a href="tel:0982571134">致電贊哥 0982-571-134</a></Button>
        </div>
      </div>
    </section>
  </div>
</template>
