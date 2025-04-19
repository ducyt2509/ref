import BigNumber from 'bignumber.js'
import { userTree } from './userTree'
import { calculateChildProfitsWithLVCheck } from './caculate'

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
