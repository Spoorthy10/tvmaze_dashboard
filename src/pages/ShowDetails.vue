<template>
  <div class="p-3 max-w-5xl mx-auto rounded-xl bg-gray-200 border border-gray-300 text-black">
    <!-- Show details -->
    <div v-if="!loading" class="flex flex-col md:flex-row items-start gap-6">
      
      <!-- Image with lazy loading and alt text -->
      <div class="relative w-full md:w-80 h-64 md:h-96">
        <img
          v-if="show.image?.original"
          :src="show.image.original"
          :alt="`${show.name}`"
          class="w-full h-full object-cover rounded-xl"
          loading="lazy"
        />
        <!-- Skeleton loader if image not loaded -->
        <div v-else class="w-full h-full bg-gray-500 animate-pulse rounded-xl"></div>
      </div>

      <!-- Text details -->
      <div class="flex-1 self-start w-full text-left" >
        <h1 class="text-3xl font-bold mb-3">{{ show.name }}</h1>

        <p class="mb-2 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-yellow-400">
            <path d="M12 2l2.94 6.63L22 9.24l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.11 2 9.24l7.06-0.61L12 2z"/>
          </svg>
          {{ show.rating?.average ?? 'No Rating' }}
        </p>

        <p class="mb-2">
          <strong>Genres:</strong>
          <span v-if="show.genres" class="m-1">{{ show.genres.join(', ') }}</span>
        </p>

        <p class="mb-2">
          <strong>Status:</strong> {{ show.status }}
        </p>

        <p class="mb-2">
          <strong>Language:</strong> {{ show.language }}
        </p>

        <div class="mt-4 text-sm leading-relaxed" v-html="show.summary"></div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-300 opacity-75 flex flex-col items-center justify-center">
      <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-600 h-12 w-12 mb-4"></div>
      <h2 class="text-center text-black text-xl font-semibold">Loading...</h2>
      <p class="w-1/3 text-center text-black">This may take a few seconds, please wait.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
import { useTvMazeStore } from '../stores/tvmaze'
const tvmazeStore = useTvMazeStore()

const show = computed(()=> tvmazeStore.showbyID)
const loading = ref(false)

onMounted(async () => {
    loading.value = true
  // api call to fetch show details by its id
  await tvmazeStore.get_tvShows(route.params.id)
    loading.value = false

})
</script>