import { DTIN_URL, DTIV_URL, DTIVH_URL, DTIVR_URL, DTOB_URL } from '@/constants/urls'

export interface MenuItem {
  title: string
  url?: string
  children?: MenuItem[]
}

export const MENUS: MenuItem[] = [
  { title: '입고현황', url: DTIN_URL },
  { title: '출고현황', url: DTOB_URL },
  {
    title: '재고현황',
    children: [
      { title: '실시간', url: DTIVR_URL },
      { title: '일자별', url: DTIV_URL },
      { title: '기간별 IN/OUT 내역', url: DTIVH_URL },
    ],
  },
]

export function findMenuPath(pathname: string, items: MenuItem[] = MENUS): MenuItem[] {
  for (const item of items) {
    if (item.url === pathname) return [item]
    if (item.children) {
      const found = findMenuPath(pathname, item.children)
      if (found.length) return [item, ...found]
    }
  }
  return []
}
