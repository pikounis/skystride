import React from 'react';
import { Box } from "@mui/material";
import RankingCard from "../RankingCard/RankingCard";


function Podium({podium}) {

    return (
        <div>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-end"
                gap="20px"
                sx={{
                    marginTop: "50px",
                    width: "100%",
                    height: "40vh",
                    "@media (max-width:1200px)": {
                        height: "40vw",
                    },
                }}
            >
                {/* Second Place */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "15%",
                        height: "100%",
                        justifyContent: "flex-end",
                        "@media (max-width:1200px)": {
                            width: "28%",
                        },
                    }}
                >
                    <RankingCard
                        rank={2}
                        teamName={podium.second.name}
                        points={podium.second.points}
                        profileImage={podium.second.img}
                    />
                    <Box
                        sx={{
                            height: "15%",
                            width: "90%",
                            backgroundColor: "silver",
                            borderRadius: "10px",
                        }}
                    />
                </Box>

                {/* First Place */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "15%",
                        height: "100%",
                        justifyContent: "flex-end",
                        "@media (max-width:1200px)": {
                            width: "28%",
                        },
                    }}
                >
                    <RankingCard
                        rank={1}
                        teamName={podium.first.name}
                        points={podium.first.points}
                        profileImage={podium.first.img}
                    />

                    <Box
                        sx={{
                            height: "23%",
                            width: "90%",
                            backgroundColor: "gold",
                            borderRadius: "10px",
                        }}
                    />
                </Box>

                {/* Third Place */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "15%",
                        height: "100%",
                        justifyContent: "flex-end",
                        "@media (max-width:1200px)": {
                            width: "28%",
                        },
                    }}
                >
                    <RankingCard
                        rank={3}
                        teamName={podium.third.name}
                        points={podium.third.points}
                        profileImage={podium.first.img}
                    />
                    <Box
                        sx={{
                            height: "7%",
                            width: "90%",
                            backgroundColor: "brown",
                            borderRadius: "10px",
                        }}
                    />
                </Box>
            </Box>
        </div>
    )
}

export default Podium;