// 입고현황 테스트용 더미 데이터. API를 붙이면 이 파일 대신 응답을 쓴다
import type { DtinItem, DtinProduct, DtinStatus } from '@/types/dtin'

const DAY = 24 * 60 * 60 * 1000
const BASE = new Date('2026-11-01T09:00:00+09:00').getTime()

const WMS_LINKS = [
  { id: 1, name: 'ETON 01' },
  { id: 2, name: 'ETON 02' },
  { id: 3, name: 'CJ 이천' },
]
const STATUSES: DtinStatus[] = ['PLAN', 'STANDBY', 'WORK', 'COMPLETED', 'COMPLETED', 'CANCELED']
const CLIENTS = ['REVE', 'ONDA', 'MUSE']
const COUNTRIES = ['VN', 'KR', 'CN', 'US']
const CONTACTS = [
  { name: '김민수', tel: '010-1234-5678' },
  { name: '이지은', tel: '010-2345-6789' },
  { name: '박서준', tel: '010-3456-7890' },
]
const PRODUCTS = [
  { sku: '3215211401601', productName: 'apple', unit: 'Pcs' },
  { sku: '3215211401602', productName: 'banana', unit: 'Pcs' },
  { sku: '3215211401603', productName: 'cherry', unit: 'Box' },
  { sku: '3215211401604', productName: 'grape', unit: 'Box' },
  { sku: '3215211401605', productName: 'lemon', unit: 'Pcs' },
]

// 상품 1~3개. 완료된 건만 실제 수량(qty)과 차이(excQty)가 있다
function makeProducts(i: number, status: DtinStatus): DtinProduct[] {
  const count = (i % 3) + 1
  return Array.from({ length: count }, (_, j) => {
    const p = PRODUCTS[(i + j) % PRODUCTS.length]
    const expQty = 100 * ((i + j) % 7) + 50
    const done = status === 'COMPLETED'
    const excQty = done ? (i + j) % 4 : 0
    return { ...p, expQty, qty: done ? expQty - excQty : 0, excQty }
  })
}

export const DTIN_DUMMY: DtinItem[] = Array.from({ length: 30 }, (_, i) => {
  const status = STATUSES[i % STATUSES.length]
  const wms = WMS_LINKS[i % WMS_LINKS.length]
  const contact = CONTACTS[i % CONTACTS.length]
  const prodList = makeProducts(i, status)
  const reqDt = BASE + i * 0.5 * DAY
  const arrived = status === 'WORK' || status === 'COMPLETED'

  return {
    idx: i + 1,
    wmsId: 1,
    wmsLinkId: wms.id,
    wmsLinkName: wms.name,
    statusOriginalCode: status,
    status,
    ganNo: `GAN${String(20261101 + i).padStart(8, '0')}`,
    clntName: CLIENTS[i % CLIENTS.length],
    cntyCd: COUNTRIES[i % COUNTRIES.length],
    reqDt,
    sipDt: reqDt + 1 * DAY,
    etaDt: reqDt + 3 * DAY,
    arvDt: arrived ? reqDt + 3 * DAY + 2 * 60 * 60 * 1000 : 0, // 도착 전이면 0
    prodList,
    prodQty: prodList.length, // 품목 수로 가정. API 확인 필요
    contactName: contact.name,
    contactTel: contact.tel,
    dataId: `DATA-${i + 1}`,
    dataRegDt: reqDt,
    dataUpdDt: reqDt + DAY,
    regDt: reqDt,
    updDt: reqDt + DAY,
  }
})
