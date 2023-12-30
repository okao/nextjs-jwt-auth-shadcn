import { LayoutDashboard, ListTodo, Users } from 'lucide-react';
import { type NavItem } from '@/types';

export const NavItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    title: 'Users',
    icon: Users,
    href: '/users',
  },
  // {
  //   title: 'TodoList',
  //   icon: ListTodo,
  //   href: '/todolist',
  //   isChidren: true,
  //   children: [
  //     {
  //       title: 'children1',
  //       icon: ListTodo,
  //       color: 'text-pink-500',
  //       href: '/todolist/children1',
  //     },
  //     {
  //       title: 'children2',
  //       icon: ListTodo,
  //       color: 'text-pink-500',
  //       href: '/todolist/children2',
  //     },
  //     {
  //       title: 'children3',
  //       icon: ListTodo,
  //       color: 'text-pink-500',
  //       href: '/todolist/children3',
  //     },
  //   ],
  // },
  // {
  //   title: 'Settings',
  //   icon: ListTodo,
  //   href: '/settings',
  //   isChidren: true,
  //   children: [
  //     {
  //       title: 'children1',
  //       icon: ListTodo,
  //       href: '/settings/children1',
  //     },
  //     {
  //       title: 'children2',
  //       icon: ListTodo,
  //       href: '/settings/children2',
  //     },
  //     {
  //       title: 'children3',
  //       icon: ListTodo,
  //       href: '/settings/children3',
  //     },
  //   ],
  // },
];
