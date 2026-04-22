import { Box, Chip, Skeleton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import AppleIcon from "@mui/icons-material/Apple";
import ComputerIcon from "@mui/icons-material/Computer";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import "./GameLibraryCard.css";

const GameLibraryCard = ({ game, loading }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = () => {
    if (!loading) {
      navigate(`/games/${game?._id}`);
    }
  };

  return (
    <Box
      onClick={handleClick}
      className={`game-library-card ${loading ? "loading" : ""}`}
      style={{
        "--card-bg": "#1c1c1c",
        "--card-text": theme.palette.common.white,
        "--card-muted": theme.palette.grey[400],
        "--card-price": theme.palette.secondary.main,
      }}
    >
      <Box className="game-library-card-image-wrapper">
        {loading ? (
          <Skeleton
            variant="rectangular"
            className="game-library-card-image-skeleton"
          />
        ) : (
          <img
            src={game?.header_image}
            alt={game?.name}
            className="game-library-card-image"
          />
        )}
      </Box>

      <Box className="game-library-card-content">
        {loading ? (
          <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
        ) : (
          <Typography variant="h6" className="game-library-card-title">
            {game?.name}
          </Typography>
        )}

        {loading ? (
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <Skeleton variant="circular" width={12} height={12} />
            <Skeleton variant="circular" width={12} height={12} />
            <Skeleton variant="circular" width={12} height={12} />
          </Box>
        ) : (
          <Box className="game-library-card-platforms">
            {game?.windows && <MicrosoftIcon fontSize="small" />}
            {game?.mac && <AppleIcon fontSize="small" />}
            {game?.linux && <ComputerIcon fontSize="small" />}
          </Box>
        )}

        {loading ? (
          <Skeleton variant="text" width="50%" height={20} sx={{ mb: 1 }} />
        ) : (
          <Box className="game-library-card-genres">
            {game?.genres?.map((genre) => (
              <Chip label={genre} color="primary" size="small" key={genre} />
            ))}
          </Box>
        )}

        {loading ? (
          <Skeleton variant="text" width="70%" height={20} sx={{ mb: 1 }} />
        ) : (
          <Box className="game-library-card-categories">
            <Typography variant="body2" className="game-library-card-categories-text">
              {game?.categories?.slice(0, 5).join(", ")}
            </Typography>
          </Box>
        )}
      </Box>

      <Box className="game-library-card-price-wrapper">
        {loading ? (
          <Skeleton variant="text" width={60} height={28} />
        ) : (
          <Typography variant="h6" className="game-library-card-price">
            {game?.price === 0 ? "Free" : `$${game?.price}`}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

GameLibraryCard.propTypes = {
  game: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    header_image: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    windows: PropTypes.bool.isRequired,
    mac: PropTypes.bool.isRequired,
    linux: PropTypes.bool.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
};

export default GameLibraryCard;