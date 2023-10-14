import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { NavLink } from 'react-router-dom';

import styles from './layout.module.css'


type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Sidebar = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
            <NavLink to={'/'}  className={({ isActive }) => isActive ? `${styles.navlinkActive}` : `${styles.navLink}`}>
              <ListItemButton>
                  <ListItemText primary={'Productos'} />
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem disablePadding>
            <NavLink to={'/historial'}  className={({ isActive }) => isActive ? `${styles.navlinkActive}` : `${styles.navLink}`}>
              <ListItemButton>
                  <ListItemText primary={'Historial de Stock'} />
              </ListItemButton>
            </NavLink>
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem disablePadding>
            <NavLink to={'/proveedores'}  className={({ isActive }) => isActive ? `${styles.navlinkActive}` : `${styles.navLink}`}>
              <ListItemButton>
                <ListItemText primary={'Proveedores'} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        {['Categorias', 'Unidades'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div style={{ position : 'fixed', top: '50vh', width: '20px', height : '100vh'}} onMouseEnter={toggleDrawer('left', true)}>
        <React.Fragment key={'left'}>
          <ArrowForwardIosIcon fontSize='large' onClick={toggleDrawer('left', true)}></ArrowForwardIosIcon>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

export default Sidebar