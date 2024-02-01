import SvgColor from 'src/components/svg-color';
// import agent from 'public/assets/icons/glass/agent icon.png';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'agents',
    path: '/agents',
    icon: icon('ic_user'),
  },
  {
    title: 'customers',
    path: '/customers',
    icon: icon('ic_user'),
  },
  {
    title: 'orders',
    path: '/orders',
    icon: icon('ic_cart'),
  },

  {
    title: 'products',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'users',
    path: '/users',
    icon: icon('ic_user'),
  },
  {
    title: 'permissions',
    path: '/permissions',
    icon: icon('ic_blog'),
  },
  {
    title: 'signOut',
    path: '/signOut',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
