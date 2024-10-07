import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdHome,
  MdLock,
  MdPublic,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import MapData from 'views/admin/marketplace';
import HistoricalDataTables from 'views/admin/dataTables';
// import RTL from 'views/admin/rtl';

// // Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'Map Data View',
    layout: '/admin',
    path: '/map',
    icon: (
      <Icon
  as={MdPublic} // Change to globe icon
  width="20px"
  height="20px"
  color="inherit"
/>
    ),
    component: <MapData />,
    secondary: true,
  },
  // {
  //   name: 'Historical Data',
  //   layout: '/admin',
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: '/historical-data',
  //   component: <HistoricalDataTables />,
  // },

  // {
  //   name: 'Sign In',
  //   layout: '/auth',
  //   path: '/sign-in',
  //   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  //   component: <SignInCentered />,
  // },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: '/rtl-default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: <RTL />,
  // },
];

export default routes;
