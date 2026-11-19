export type DtinStatus = 'PLAN' | 'STANDBY' | 'WORK' | 'COMPLETED' | 'CANCELED' | 'UNKNOW'

export interface DtinProduct {
  sku: string
  productName: string
  expQty: number
  qty: number
  excQty: number
  unit: string
}

export interface DtinItem {
  idx: number
  wmsId: number
  wmsLinkId: number
  wmsLinkName: string
  statusOriginalCode: string
  status: DtinStatus
  ganNo: string
  clntName: string
  cntyCd: string
  reqDt: number // epoch ms
  sipDt: number
  etaDt: number
  arvDt: number
  prodList: DtinProduct[]
  prodQty: number
  contactName: string
  contactTel: string
  dataId: string
  dataRegDt: number
  dataUpdDt: number
  regDt: number
  updDt: number
}
