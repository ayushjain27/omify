// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Login',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: '/register',
      icon: icons.ProfileOutlined,
      target: true
    },
    {
      id: 'verify1',
      title: 'Verify',
      type: 'item',
      url: '/verify',
      icon: icons.ProfileOutlined,
      target: true
    },
    {
      id: 'contentPage1',
      title: 'contentPage',
      type: 'item',
      url: '/contentPage',
      icon: icons.ProfileOutlined,
      target: true
    },
    {
      id: 'telegramLink1',
      title: 'telegramLink',
      type: 'item',
      url: '/telegramLink',
      icon: icons.ProfileOutlined,
      target: true
    },
  ]
};

export default pages;
