import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: '차트',
    href: '/',
    icon: 'ChartArea',
    label: '차트',
  },
  {
    title: '캘린더',
    href: '/calendar',
    icon: 'Calendar',
    label: '캘린더'
  },
  {
    title: '파일 업로드',
    href: '/file-upload',
    icon: 'FileUpload',
    label: '파일 업로드',
    submenu: [
      {
        title: '갤러리',
        href: '/file-upload/gallery',
        label: '갤러리'
      },
      {
        title: '대용량 파일 업로드',
        href: '/file-upload/big-file',
        label: '대용량 파일 업로드'
      }
    ]
  },
  {
    title: '채팅',
    href: '/chatting',
    icon: 'Chatting',
    label: '채팅'
  },
  {
    title: '스트리밍',
    href: '/streaming',
    icon: 'Streaming',
    label: '스트리밍'
  },
  {
    title: '게시판',
    href: '/student',
    icon: 'BookText',
    label: '게시판'
  },
  {
    title: '무한스크롤',
    href: '/infinity-scroll',
    icon: 'SquareArrowDown',
    label: '무한스크롤'
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number;
  latitude?: number;
  job: string;
  profile_picture?: string | null;
};
