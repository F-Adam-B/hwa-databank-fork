import { useState, KeyboardEvent, MouseEvent, Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const SideBar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 500 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Sample1', 'Sample2', 'Sample3'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemText>{text}</ListItemText>{' '}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Additional Data1', 'Additional Data2'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemText>{text}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {/* {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => ( */}
      <Fragment>
        {/* <Button onClick={toggleDrawer('right', true)}>{anchor}</Button> */}
        <Drawer
          anchor={'right'}
          open={open}
          onClose={toggleDrawer('right', false)}
        >
          {list('right')}
        </Drawer>
      </Fragment>
      {/* ))} */}
    </div>
  );
};

export default SideBar;
