// assets
import { DashboardOutlined, ChromeOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  ChromeOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'payment-page',
      title: 'Payment Page',
      type: 'item',
      url: '/payment-page',
      icon: icons.ChromeOutlined,
      breadcrumbs: false
    },
    {
      id: 'telegram-page',
      title: 'Telegram Page',
      type: 'item',
      url: '/telegram-page',
      icon: icons.ChromeOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
