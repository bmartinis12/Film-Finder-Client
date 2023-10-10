import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {
    const response = await fetch(`https://film-finder-api.onrender.com/search/movie/${term}`)
        .then(res => res.json())
        .then(data => data);
    return response;
});

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term) => {
    const response = await fetch(`https://film-finder-api.onrender.com/search/show/${term}`)
        .then(res => res.json())
        .then(data => data);
    return response;
});

export const fetchAsyncDetail = createAsyncThunk('movies/fetchAsyncDetail', async (id) => {
    const response = await fetch(`https://film-finder-api.onrender.com/detail/${id}`)
        .then(res => res.json())
        .then(data => data);

    if (response.Type === 'movie') {
        await fetch('https://film-finder-api.onrender.com/trending/movies', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imdbID: response.imdbID,
                title: response.Title,
                year: response.Year,
                poster: response.Poster
            })
        }).then((res) => res.text())
            .then((text) => text);
    } else if (response.Type === 'series') {
        await fetch('https://film-finder-api.onrender.com/trending/shows', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imdbID: response.imdbID,
                title: response.Title,
                year: response.Year,
                poster: response.Poster
            })
        }).then((res) => res.text())
            .then((text) => text);
    }
    return response;
});

export const fetchAsyncReviews = createAsyncThunk('movies/fetchAsyncReviews', async (id) => {
    const response = await fetch(`https://film-finder-api.onrender.com/detail/${id}/review`)
        .then(res => res.json())
        .then(data => data);
    return response;
});


const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow: {},
    reviews: {},
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload
        },
        removeSelectedMovieOrShow: (state) => {
            state.selectedMovieOrShow = {};
        },
        removeReviews: (state) => {
            state.reviews = {};
        },
        removeMoviesAndShows: (state) => {
            state.movies = {};
            state.shows = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
            return { ...state, movies: payload };
        });
        builder.addCase(fetchAsyncMovies.rejected, () => {
            return console.log('Rejected');
        });
        builder.addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
            return { ...state, shows: payload };
        });
        builder.addCase(fetchAsyncDetail.fulfilled, (state, { payload }) => {
            return { ...state, selectedMovieOrShow: payload };
        });
        builder.addCase(fetchAsyncReviews.fulfilled, (state, { payload }) => {
            return { ...state, reviews: payload };
        });
    }
});

export const { removeSelectedMovieOrShow, removeMoviesAndShows, removeReviews, setReviews } = moviesSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export const getReviews = (state) => state.movies.reviews;
export default moviesSlice.reducer;