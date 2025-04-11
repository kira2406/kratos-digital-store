import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { featuredGamesRequest } from '../reducers/games/gameSlice';

const useFeaturedGames = () => {
    const dispatch = useDispatch();

    const { games, featuredGameLoading, featuredGameError } = useSelector(state => state.gamesData);

    useEffect(() => {
        if (!Object.keys(games).length) {
            dispatch(featuredGamesRequest());
        }
    }, [dispatch, games]);

    const featuredGames = useMemo(() => {
        return Object.values(games).filter(game => game.featured);
    }, [games]);

    return { featuredGames, featuredGameLoading, featuredGameError };
};

export default useFeaturedGames;
