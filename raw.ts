import BigNumber from 'bignumber.js'

type ProfitRecord = {
 stake: BigNumber
 dailyProfit: BigNumber
 isVisited: boolean
}

const DAILY_RATE = new BigNumber(0.01)
const DEFAULT_STAKE = new BigNumber(100)
const DEFAULT_LV = 1

type User = {
 id: string
 LV: number
 stake?: number
 children?: User[]
}

type ChildInfo = {
 childId: string
 dailyProfit: BigNumber
 LV: number
}

function calculateChildProfitsWithLVCheck(
 rootUser: User,
 rewardRate: number = 1,
): {
 totalReward: BigNumber
 profitMap: Record<string, ProfitRecord>
 childMap: { [key: string]: any }
} {
 const profitMap: Record<string, ProfitRecord> = {}
 const childMap: { [key: string]: any } = {}

 function calculateProfits(user: User, parentLV: number): BigNumber {
  const currentLV = user.LV ?? DEFAULT_LV

  if (currentLV > parentLV) {
   return new BigNumber(0)
  }

  if (profitMap[user.id]?.isVisited) {
   return profitMap[user.id].dailyProfit
  }

  const stake = new BigNumber(user.stake ?? DEFAULT_STAKE)
  const dailyProfit = stake.multipliedBy(DAILY_RATE)

  profitMap[user.id] = {
   stake,
   dailyProfit,
   isVisited: true,
  }

  let total = dailyProfit
  const currentChildren: ChildInfo[] = []

  if (user.children) {
   for (const child of user.children) {
    const childLV = child.LV ?? DEFAULT_LV

    if (childLV <= currentLV) {
     const childStake = new BigNumber(child.stake ?? DEFAULT_STAKE)
     const childDailyProfit = childStake.multipliedBy(DAILY_RATE)

     currentChildren.push({
      childId: child.id,
      dailyProfit: childDailyProfit,
      LV: childLV,
     })

     total = total.plus(calculateProfits(child, currentLV))
    }
   }

   if (currentChildren.length > 0) {
    childMap[user.id] = currentChildren
    childMap[user.id].level = currentLV
   }
  }

  return total
 }

 let total = new BigNumber(0)
 const rootLV = rootUser.LV ?? DEFAULT_LV

 if (rootUser.children) {
  for (const child of rootUser.children) {
   total = total.plus(calculateProfits(child, rootLV))
  }
 }

 return {
  totalReward: total.multipliedBy(rewardRate),
  profitMap,
  childMap,
 }
}

// 🌳 Tạo cây user
const userTree: User = {
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
    ...Array.from({ length: 49 }, (_, i) => ({
     id: `A26X${i + 1}`,
     LV: 0,
    })),
   ],
  },
 ],
}

// ✅ Chạy tính toán
const { totalReward, profitMap, childMap } = calculateChildProfitsWithLVCheck(
 userTree,
 0.3,
)

const getTotalChildMap = (arr: any[], rate: number) => {
 return arr.reduce((acc, child) => {
  return acc.plus(child.dailyProfit.multipliedBy(rate))
 }, new BigNumber(0))
}

let totalChildMap = new BigNumber(0)
for (const key in childMap) {
 const children = childMap[key]
 const total = getTotalChildMap(children, childMap[key].level * 0.1)
 console.log(
  `User ${key} có ${children.length} con cháu và tổng daily profit là:`,
  total.toFixed(),
 )
 totalChildMap = totalChildMap.plus(total)
}

console.log(
 '🔥 30% total daily profit từ con cháu của A2:',
 totalReward.minus(totalChildMap).toFixed(),
 '$',
)

// console.log('🧾 CHILD MAP:', childMap)
