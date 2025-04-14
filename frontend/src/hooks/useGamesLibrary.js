import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gamesLibraryRequest } from '../reducers/games/gameSlice';
import { selectGamesByPage } from '../selectors/gameDataSelectors';

const useGamesLibrary = (page, genreList = [], categoriesList = []) => {
  const dispatch = useDispatch();

  const games = useSelector(state => selectGamesByPage(state, page));
  const pageMap = useSelector(state => state.gamesData.pageMap);
  const loading = useSelector(state => state.gamesData.loading);
  const error = useSelector(state => state.gamesData.error);
  const totalPages = useSelector(state => state.gamesData.totalPages);
  const gameLibraryLoaded = useSelector(state => state.gamesData.gameLibraryLoaded)

  useEffect(() => {
    if (!pageMap || !pageMap[page] || !gameLibraryLoaded) {
      dispatch(gamesLibraryRequest({ page, genreList, categoriesList, game_id: '' }));
    }
  }, [page, pageMap, dispatch]);

  return { games, loading, error, totalPages };
};

export default useGamesLibrary;
