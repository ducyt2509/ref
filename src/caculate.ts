import BigNumber from 'bignumber.js'
import {
 ChildInfo,
 DAILY_RATE,
 DEFAULT_LV,
 DEFAULT_STAKE,
 ProfitRecord,
 User,
 userTree,
} from './userTree'

export function calculateChildProfitsWithLVCheck(
 rootUser: User,
 rewardRate: number = 1,
): {
 totalReward: BigNumber
 profitMap: Record<string, ProfitRecord>
 childMap: { [key: string]: any }
} {
 const profitMap: Record<string, ProfitRecord> = {}
 const childMap: { [key: string]: any } = {}

 let total = new BigNumber(0)
 const rootLV = rootUser.LV ?? DEFAULT_LV

 if (rootUser.children) {
  for (const child of rootUser.children) {
   if (child.LV == rootUser.LV) {
    const childStake = new BigNumber(child.stake ?? DEFAULT_STAKE)
    const childDailyProfit = childStake.multipliedBy(DAILY_RATE)
    console.log('PEER :' + child.id + ' $' + childDailyProfit)
    total = total.plus(childDailyProfit)
   } else if (child.LV < rootUser.LV) {
    total = total.plus(calculateProfits(child, rootLV, profitMap, childMap))
   } else {
   }
  }
 }

 return {
  totalReward: total.multipliedBy(rewardRate),
  profitMap,
  childMap,
 }
}

function calculateProfits(
 user: User,
 parentLV: number,
 profitMap: Record<string, ProfitRecord>,
 childMap: { [key: string]: any },
): BigNumber {
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

    total = total.plus(calculateProfits(child, currentLV, profitMap, childMap))
   }
  }

  if (currentChildren.length > 0) {
   childMap[user.id] = currentChildren
   childMap[user.id].level = currentLV
  }
 }

 return total
}
