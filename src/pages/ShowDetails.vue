<template>
  <div
    class="p-6 max-w-5xl mx-auto rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 text-black shadow-xl"
  >
    <!-- Show details -->
    <div v-if="!loading" class="flex flex-col md:flex-row items-start gap-8">
      
      <!-- Image -->
      <div class="relative w-full md:w-80 h-64 md:h-[420px] group">
        <img
          v-if="show.image?.original"
          :src="show.image.original"
          :alt="show.name"
          class="w-full h-full object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div v-else class="w-full h-full bg-gray-400 animate-pulse rounded-2xl"></div>
      </div>

      <!-- Details -->
      <div class="flex-1 w-full text-left space-y-4">
        <!-- Title -->
        <h1 class="text-4xl font-extrabold tracking-tight">
          {{ show.name }}
        </h1>

        <!-- Rating -->
        <div class="flex items-center gap-2">
          <span
            class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold"
          >
            ⭐ {{ show.rating?.average ?? 'No Rating' }}
          </span>
        </div>

        <!-- Meta info -->
        <div class="flex flex-wrap gap-4 text-sm text-gray-700">
          <p><strong>Status:</strong> {{ show.status }}</p>
          <p><strong>Language:</strong> {{ show.language }}</p>
        </div>

        <!-- Genres -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="genre in show.genres"
            :key="genre"
            class="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium"
          >
            {{ genre }}
          </span>
        </div>

        <!-- Summary -->
        <div
          class="mt-4 text-sm leading-relaxed text-gray-800 border-l-4 border-teal-400 pl-4"
          v-html="show.summary"
        ></div>
      </div>
    </div>

    <!-- Loading -->
    <div
      v-else
      class="fixed inset-0 z-50 bg-gray-300/70 flex flex-col items-center justify-center"
    >
      <div class="animate-spin rounded-full border-4 border-gray-600 border-t-transparent h-12 w-12 mb-4"></div>
      <h2 class="text-xl font-semibold">Loading...</h2>
      <p class="text-sm text-gray-700">Fetching show details</p>
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