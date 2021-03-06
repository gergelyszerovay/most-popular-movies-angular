import {createReducer, on} from '@ngrx/store';

import * as MovieGenresActions from './movie-genres.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {MovieGenresEntity} from "../../services/tmdb.resource.models";

export const MOVIEGENRES_FEATURE_KEY = 'movieGenres';

export interface MovieGenresState extends EntityState<MovieGenresEntity> {
  loading: boolean;
  errorMessage?: string | null; // last known error (if any)
}

export interface MovieGenresPartialState {
  readonly [MOVIEGENRES_FEATURE_KEY]: MovieGenresState;
}

export const movieGenresAdapter: EntityAdapter<MovieGenresEntity> = createEntityAdapter<MovieGenresEntity>();

export const movieGenresInitialState: MovieGenresState = movieGenresAdapter.getInitialState({
  // set initial required properties
  loading: false,
  errorMessage: null,
});

export const movieGenresReducer = createReducer(
  movieGenresInitialState,
  on(MovieGenresActions.loadMovieGenres, (state: MovieGenresState) => ({
    ...state,
    loading: true,
    errorMessage: null,
  })),
  on(MovieGenresActions.loadMovieGenresSuccess, (state: MovieGenresState, {movieGenres}) =>
    movieGenresAdapter.setAll(movieGenres, {
        ...state,
        errorMessage: null,
        loading: false
      }
    )),
  on(MovieGenresActions.loadMovieGenresFailure, (state: MovieGenresState, {errorMessage}) => ({
    ...state,
    errorMessage,
    loading: false
  }))
);
