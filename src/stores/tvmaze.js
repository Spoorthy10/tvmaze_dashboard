import { defineStore } from 'pinia'
import axios from 'axios'

export const useTvMazeStore = defineStore('tvmazestore', {
    state: () => ({
        allShows: [],
        showsByGenre: {},
        allGenres: [],
        showbyID:{},
        searched_tvshow:[],
        error: ''
    }),
    actions: {
        //to get all tv shows of the particular genre and sort it based on the rating provided
        async get_tvShows(id=0) {
            try {
                if(id == 0){
                const response = await axios.get(`https://api.tvmaze.com/shows`)
                this.allShows = response.data
                // get unique generes and group shows
                    const genreMap = this.allShows.reduce((acc, show) => {
                        show.genres.forEach(genre => {
                            if (!acc[genre]) {
                            acc[genre] = []
                            }
                            acc[genre].push(show)
                        })
                        return acc
                    }, {})               

                // sorting shows based on rating
                    Object.keys(genreMap).forEach(genre => {
                    genreMap[genre].sort(
                        (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)
                    )
                    })

                // final values
                    this.showsByGenre = genreMap //showsByGenre holds all the shows of the particular genre
                    this.allGenres = Object.keys(genreMap) //allGenres holds the list of unique genre
                }
                else{
                    const response = await axios.get(`https://api.tvmaze.com/shows/${id}`)
                    this.showbyID = response.data
                }
            } 
            catch (err) {
                this.error = err
                console.error(err)
            }
        },

        //to search tv shows based on the filters provided
        async get_tvShow_onSearch(filters='') {
            try {
                const response = await axios.get(`https://api.tvmaze.com/search/shows?${filters}`)
                this.searched_tvshow = response.data
            } 
            catch (err) {
                this.error = err
                console.error(err)
            }
        },
    }
})