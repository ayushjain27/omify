// assets
import { 
  DashboardOutlined, 
  ChromeOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  ChromeOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'MAIN NAVIGATION',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
      badge: 'PRO',
      badgeColor: 'linear-gradient(90deg, #8B5CF6, #EC4899)'
    },
    {
      id: 'payment',
      title: 'Payment',
      type: 'collapse',
      icon: icons.RocketOutlined,
      children: [
        {
          id: 'payment-overview',
          title: 'Overview',
          type: 'item',
          url: '/payment/overview',
          new: true
        },
        {
          id: 'payment-page',
          title: 'Payment Page',
          type: 'item',
          url: '/payment-page',
        },
        {
          id: 'transactions',
          title: 'Transactions',
          type: 'item',
          url: '/payment/transactions',
          badge: '12',
          badgeColor: '#3B82F6'
        }
      ]
    },
    {
      id: 'telegram',
      title: 'Telegram',
      type: 'item',
      url: '/telegram-page',
      icon: icons.ThunderboltOutlined,
      breadcrumbs: false,
      badge: 'HOT',
      badgeColor: 'linear-gradient(90deg, #EF4444, #F59E0B)'
    },
    {
      id: 'security',
      title: 'Security',
      type: 'item',
      url: '/security',
      icon: icons.SafetyCertificateOutlined,
      breadcrumbs: false,
    }
  ]
};

export default dashboard;