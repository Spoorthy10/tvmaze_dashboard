<template>
  <div
    class="min-w-[180px] cursor-pointer transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl rounded-lg"
  >
    <img :src="show.image?.medium" class="rounded" />
    <p class="font-semibold">{{ show.name }}</p>

    <p class="text-sm flex gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-5 h-5 text-yellow-400"
      >
        <path
          d="M12 2l2.94 6.63L22 9.24l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.11 2 9.24l7.06-.61L12 2z"
        />
      </svg>
      {{ show.rating?.average ?? 'No Rating' }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  show: Object
})
</script>
