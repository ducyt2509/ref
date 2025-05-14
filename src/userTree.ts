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
   LV: 2,
   children: [
    {
     id: 'A261',
     LV: 2,
     children: Array.from({ length: 50 }, (_, i) => ({
      id: `A261${i + 1}`,
      LV: 0,
     })),
    },
    {
     id: 'A262',
     LV: 0,
     children: Array.from({ length: 0 }, (_, i) => ({
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

// ✅ Hàm tìm các nhánh con cùng level
export function findEqualLevelBranches(root: User): User[] {
 const results: User[] = []

 function dfs(node: User): boolean {
  if (!node.children || node.children.length === 0) return false

  const validChildren: User[] = []

  for (const child of node.children) {
   if (child.LV === node.LV) {
    const hasDeeper = dfs(child)
    if (!hasDeeper) {
     validChildren.push({
      id: child.id,
      LV: child.LV,
      children: [],
     })
    }
   } else {
    dfs(child)
   }
  }

  if (validChildren.length > 0) {
   results.push({
    id: node.id,
    LV: node.LV,
    children: validChildren,
   })
   return true
  }

  return false
 }

 dfs(root)
 return results
}

// ✅ Test thử
const result = findEqualLevelBranches(userTree)
console.log(JSON.stringify(result, null, 2))
