import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function TeamCard({
  teamName,
  date,
  imageUrl,
  teamDescription,
  teamMembers,
  isExpanded, // Received from parent component
  onExpandClick, // Received from parent component
}) {
  return (
    <Card
      sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', height: isExpanded ? 'auto' : '450px' }} // Conditional height
    >
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={teamName}
        subheader={date}
      />
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: 'cover' }}
        image={imageUrl}
        alt={teamName}
      />
      <CardContent sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '100px' }}>
        <Typography variant="body2" color="text.secondary">
          {teamDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ marginTop: 'auto' }}>
        <Button>Join Team</Button>
        <ExpandMore
          expand={isExpanded} // Control the icon's rotation
          onClick={onExpandClick} // Toggle the expansion
          aria-expanded={isExpanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Team Members:</Typography>
          <ul>
            {teamMembers.map((member, index) => (
              <li key={index}>
                <Typography variant="body2" color="text.secondary">
                  {member}
                </Typography>
              </li>
            ))}
          </ul>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default TeamCard;
