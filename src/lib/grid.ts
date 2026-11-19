// src/lib/grid.ts
import { tableFeatures, rowExpandingFeature } from '@tanstack/react-table'

// 공통 그리드가 쓰는 기능. 열 너비, 열 순서 등을 붙일 때 여기에 추가한다
export const gridFeatures = tableFeatures({ rowExpandingFeature })
