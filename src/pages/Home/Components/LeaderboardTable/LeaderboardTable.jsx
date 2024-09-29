import { Box, SvgIcon, Typography, Table, TableBody, TableRow, TableCell, Avatar } from "@mui/material";
import React from "react";
import Proptype from 'prop-types';
import styles from "./LeaderboardTable.module.css";

const LeaderboardTable = ({ team }) => {
    return (
        <Box sx={{ width: 1.0, height: '100%' }}>
            {/* Top bar with team name and images */}
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
            }}>
                <img className={styles.teamImg} src={team.imgPath} alt="" />
                <Typography variant="h3" sx={{padding: "0px 30px 0px 20px", fontWeight: "bold"}}>{team.name}</Typography>
                {/* <img className={styles.teamImg} src={team.imgPath} alt="" /> */}
            </Box>

            {/* table */}
            <Table
                sx={{
                    width: '100%',
                    borderCollapse: 'collapse', // No border separation
                }} 
            >
<TableBody>
    {team.leaderboard.map((person, index) => (
        <TableRow
            key={index} // Always provide a unique key for each row
            sx={{ borderBottom: 'none' }}
            className={styles.tableRow}
        >
            <TableCell
                sx={{ fontSize: "2vh", textAlign: "center", fontWeight: "bold" }}
            >
                {person.position}
            </TableCell>
            <TableCell
                sx={{ fontSize: "2vh", textAlign: "center", fontWeight: "bold" }}
            >
                {person.name}
            </TableCell>
            <TableCell
                sx={{ fontSize: "2vh", textAlign: "center", fontWeight: "bold" }}
            >
                {person.office}
            </TableCell>
            <TableCell
                sx={{ fontSize: "2vh", textAlign: "center", fontWeight: "bold" }}
            >
                {person.points}
            </TableCell>
            <TableCell
                sx={{
                    borderBottom: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {index === 0 ? (
                    // Special Icon for the first row
                    <Avatar
                        src="https://cdn-icons-png.flaticon.com/512/3763/3763864.png" // Crown image to replace Avatar for first row
                        sx={{
                            width: 80, // Larger size for first row
                            height: 'auto',
                            borderRadius: '50%',
                            
                        }} className={styles.crownAnimation}
                        alt={person.name}
                    />
                ) : (
                    // Default Avatar for all other rows
                    <Avatar
                        src={person.imgPath}
                        sx={{
                            width: 65,
                            height: 'auto',
                            borderRadius: '50%',
                        }}
                        alt={person.name}
                    />
                )}
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