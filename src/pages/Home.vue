<template>
  <div class="p-8">
    <!-- Page Loader -->
    <Loader :show="isloading" v-if="isloading" title="Loading TV Shows..." subTitle="This may take a few seconds, please wait to view the shows."/>

    <div v-else>
      <!--Search field, search and clear button-->
      <div class="flex flex-col md:flex-row gap-2 mb-6">
        <input
          v-model="search_show_name"
          type="text"
          placeholder="Search TV shows..."
          class="w-full md:flex-1 p-2 rounded-lg bg-gray-200 text-black" @keydown.enter="searchShow"
          @keydown.esc="clearFilters"
        />

        <div class="flex gap-2">
    <button
      class="px-4 py-2 bg-blue-600 text-gray-300 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-70 whitespace-nowrap"
      @click="searchShow"
      :disabled="!search_show_name"
    >
      Search
    </button>

    <button
      class="px-4 py-2 bg-gray-500 text-gray-800 rounded-lg font-medium hover:bg-red-500 whitespace-nowrap"
      @click="clearFilters"
    >
      Clear
    </button>
  </div>
      </div>
      <!--when filters is not applied-->
      <div v-if="searched_tvshow?.length == 0">
          <div
          v-for="(shows, genre) in showsByGenre"
          :key="genre"
          class="mb-5 bg-gray-200 p-3 rounded-xl"
          >
          <h2 class="text-xl font-bold mb-4 text-teal-500 text-left">
              {{ genre }}
          </h2>

          <div class="flex gap-4 overflow-x-auto">
              <div
              v-for="show in shows"
              :key="show.id"
              class="min-w-[180px] cursor-pointer transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl rounded-lg"
              @click="goToShow(show.id)"
              >
              <img
                  :src="show.image?.medium"
                  alt=""
                  class="rounded"
              />
              <p class="font-semibold">{{ show.name }}</p>
              <p class="text-sm flex gap-1">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-5 h-5 text-yellow-400"
                      >
                      <path d="M12 2l2.94 6.63L22 9.24l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.11 2 9.24l7.06-0.61L12 2z"/>
                  </svg>
                  {{ show.rating?.average ?? 'No Rating' }}</p>
              </div>
          </div>
          </div>
      </div>
      <div v-else> <!--when tv shows are filtered by their name -->
          <div
          class="mb-8 bg-gray-200 p-3 rounded-xl"
          >
          <h2 class="text-xl font-bold mb-4 text-teal-600 capitalize text-start">
              Shows you searched for
          </h2>

          <div class="flex gap-4 overflow-x-auto">
              <div
              v-for="show in searched_tvshow"
              :key="show.id"
              class="min-w-[180px] cursor-pointer transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              @click="goToShow(show.show.id)"
              >
              <img
                  :src="show.show.image?.medium"
                  :alt="show.show.name"
                  class="rounded"
              />
              <p class="font-semibold">{{ show.show.name }}</p>
              <p class="text-sm flex gap-1">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-5 h-5 text-yellow-400"
                      >
                      <path d="M12 2l2.94 6.63L22 9.24l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.11 2 9.24l7.06-0.61L12 2z"/>
                  </svg>
                  {{ show.show.rating?.average ?? 'No Rating' }}</p>
              </div>
          </div>
          </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, computed,ref } from 'vue'
import Loader from '../components/Loader.vue'
import { useTvMazeStore } from '../stores/tvmaze'
const tvmazeStore = useTvMazeStore()
import { useRouter } from 'vue-router'
const router = useRouter()
const isloading = ref(false)

//to filter the tv shows
const search_show_name = ref('')
const searched_tvshow = computed(()=> tvmazeStore.searched_tvshow)
const searchShow=async()=>{
  isloading.value = true
    let searchdata = ''
    if(search_show_name.value!=''){
        searchdata+="q=" +search_show_name.value
        await tvmazeStore.get_tvShow_onSearch(searchdata)
    }
  isloading.value = false
}

//to clear the applied filters
const clearFilters=async()=>{
  isloading.value = true
    search_show_name.value = ''
    tvmazeStore.searched_tvshow = []
    await tvmazeStore.get_tvShows()
  isloading.value = false
}

//to navigate to the particular show information
const goToShow = (id) => {
  router.push(`/show/${id}`)
}

//tvshows computed value
const showsByGenre = computed(() => tvmazeStore.showsByGenre)

onBeforeMount(async() => {
  isloading.value = true
  //to fetch the tv shows
  await tvmazeStore.get_tvShows()
  isloading.value = false
})
</script>