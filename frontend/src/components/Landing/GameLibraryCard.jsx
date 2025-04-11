import { Box, Chip, Skeleton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import AppleIcon from "@mui/icons-material/Apple";
import ComputerIcon from "@mui/icons-material/Computer";

const GameLibraryCard = ({ game, loading }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#1c1c1c",
        borderRadius: "8px",
        padding: "6px",
        boxShadow: 3,
        mb: 1,
        alignItems: "center",
      }}
    >
      <Box sx={{ mr: 2 }}>
        {loading ? (
          <Skeleton variant="rectangular" width={200} height={100} />
        ) : (
          <img
            src={game?.header_image}
            alt={game?.name}
            style={{
              width: 200,
              height: 100,
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        )}
      </Box>

      <Box sx={{ flex: 1 }}>
        {loading ? (
          <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
        ) : (
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
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
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            {game?.windows && (
              <MicrosoftIcon fontSize="small" color="ashgray" />
            )}
            {game?.mac && <AppleIcon fontSize="small" color="ashgray" />}
            {game?.linux && <ComputerIcon fontSize="small" color="ashgray" />}
          </Box>
        )}

        {loading ? (
          <Skeleton
            variant="text"
            width="50%"
            height={20}
            sx={{ display: "flex", gap: 1, mb: 1 }}
          />
        ) : (
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            {game?.genres?.map((genre) => (
              <Chip label={genre} color="primary" size="small" key={genre} />
            ))}
          </Box>
        )}
        {loading ? (
          <Skeleton
            variant="text"
            width="50%"
            height={20}
            sx={{ display: "flex", gap: 1, mb: 1 }}
          />
        ) : (
          <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
            <Typography variant="body2" sx={{ color: "ashgray" }}>
              {game?.categories?.join(", ")}
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ textAlign: "right", ml: 2 }}>
        {loading ? (
          <Skeleton variant="text" width="30%" height={20} />
        ) : (
          <Typography
            color="secondary"
            variant="h6"
            sx={{ fontWeight: "bold" }}
          >
            {game?.price === 0 ? "Free" : `$${game?.price}`}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

GameLibraryCard.propTypes = {
  game: PropTypes.shape({
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
