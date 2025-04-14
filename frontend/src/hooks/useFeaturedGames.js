import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { featuredGamesRequest } from '../reducers/games/gameSlice';

const useFeaturedGames = () => {
    const dispatch = useDispatch();

    const { games, featuredGameLoaded, featuredGameLoading, featuredGameError } = useSelector(state => state.gamesData);

    useEffect(() => {
        if (!featuredGameLoaded) {
            dispatch(featuredGamesRequest());
        }
    }, [dispatch, games]);

    const featuredGames = useMemo(() => {
        return Object.values(games).filter(game => game.featured);
    }, [games]);

    return { featuredGames, featuredGameLoading, featuredGameError };
};

export default useFeaturedGames;
