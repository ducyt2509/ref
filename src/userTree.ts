import BigNumber from 'bignumber.js'

export type ProfitRecord = {
 stake: BigNumber
 dailyProfit: BigNumber
 isVisited: boolean
}

export type User = {
 id: string
 LV: number
 stake?: number
 children?: User[]
}

export type ChildInfo = {
 childId: string
 dailyProfit: BigNumber
 LV: number
}

export const DAILY_RATE = new BigNumber(0.01)
export const DEFAULT_STAKE = new BigNumber(100)
export const DEFAULT_LV = 0

// 🌳 Tạo cây user
export const userTree: User = {
 id: 'A2',
 LV: 3,
 children: [
  {
   id: 'A21',
   LV: 1,
   children: Array.from({ length: 10 }, (_, i) => ({
    id: `A21${i + 1}`,
    LV: 0,
   })),
  },
  {
   id: 'A22',
   LV: 1,
   children: Array.from({ length: 10 }, (_, i) => ({
    id: `A22${i + 1}`,
    LV: 0,
   })),
  },
  {
   id: 'A23',
   LV: 1,
   children: Array.from({ length: 10 }, (_, i) => ({
    id: `A23${i + 1}`,
    LV: 0,
   })),
  },
  {
   id: 'A24',
   LV: 1,
   children: Array.from({ length: 10 }, (_, i) => ({
    id: `A24${i + 1}`,
    LV: 0,
   })),
  },
  {
   id: 'A25',
   LV: 2,
   children: Array.from({ length: 50 }, (_, i) => ({
    id: `A25${i + 1}`,
    LV: 0,
   })),
  },
  {
   id: 'A26',
   LV: 3,
   children: [
    {
     id: 'A261',
     LV: 2,
     children: Array.from({ length: 50 }, (_, i) => ({
      id: `A261${i + 1}`,
      LV: 0,
     })),
    },
    ...Array.from({ length: 49 }, (_, i) => ({
     id: `A26X${i + 1}`,
     LV: 0,
    })),
   ],
  },
 ],
}
