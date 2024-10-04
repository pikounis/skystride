import { Box, SvgIcon, Typography, Table, TableBody, TableRow, TableCell, Avatar, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Proptype from 'prop-types';
import styles from "./LeaderboardTable.module.css";

const LeaderboardTable = ({ team, skyUserId }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ width: 1.0, height: '100%' }} className={styles.tableBackground}>
            {/* Top bar with team name and images */}
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
            }}>
                <img className={styles.teamImg} src={team.imageURL} alt="" />
                <Typography variant={isMobile ? "h4" : "h3"} sx={{ padding: "30px", fontWeight: "bold" }}>{team.name}</Typography>
                {/* <img className={styles.teamImg} src={team.imgPath} alt="" /> */}
            </Box>

            {/* table */}
            <Table
                sx={{
                    width: '100%',
                    height: '100%',
                    borderCollapse: 'collapse', // No border separation
                    tableLayout: 'auto'
                }} 
            >
                <TableBody>
                    {team.members.map((person, i) => (
                        <TableRow className={styles.tableRow} sx={{ display: 'flex', width: '100%', borderBottom: 'none', backgroundColor: skyUserId === person.id ? 'rgba(0, 0, 0, 0.05)' : 'transparent' }}>
                            <TableCell
                                sx={{ alignItems: 'center', justifyContent: 'center', fontSize: "2vh", textAlign: "center", fontWeight: "bold", flex: '1', width: 'auto', height: '100%' }}
                            >
                                {i === 0 ? ( // Render crown image for the first row
                                                    // <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                                        // <Avatar
                                                        //     src="https://cdn-icons-png.flaticon.com/512/3763/3763864.png" // Crown image
                                                        //     sx={{
                                                        //         width: '87%',
                                                        //         height: 'auto',
                                                        //         }}
                                                        //     className={styles.crownAnimation}
                                                        //     alt={person.name}
                                                        // />
                                                        i + 1 
                                                    // </Box>
                                                ) : (
                                                    i + 1 // Render just the position text for other rows
                                                )}
                            </TableCell>

                            <TableCell
                                sx={{ fontSize: "2vh", textAlign: "center", fontWeight: "bold", flex: '2', width: '100%' }}
                            >
                                {isMobile ? person.firstName : `${person.firstName} ${person.lastName[0]}.`}
                            </TableCell>

                            <TableCell
                                sx={{ fontSize: "2vh", textAlign: "center", fontWeight: "bold", flex: '2', width: '100%' }}
                            >
                                {/* Format the office string */}
                                {person.office
                                    .toLowerCase() // Make all lowercase first
                                    .split('_')    // Split by underscores
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
                                    .join(' ')}   
                            </TableCell>

                            <TableCell
                                sx={{ fontSize: "2vh", textAlign: "center", fontWeight: "bold", flex: '2', width: '100%' }}
                                className={styles.points}>
                                {person.points}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}

LeaderboardTable.propType = {
    // a single team
    team: Proptype.shape({
        name: Proptype.string,
        imgPath: Proptype.string,
        // list of people
        leaderboard: Proptype.arrayOf(Proptype.shape({
            position: Proptype.number,
            name: Proptype.string,
            office: Proptype.string,
            points: Proptype.number,
            imgPath: Proptype.string
        }))
    })
}

export default LeaderboardTable;