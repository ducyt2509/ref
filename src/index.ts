import BigNumber from 'bignumber.js'
import { findEqualLevelBranches, userTree } from './userTree'
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
console.log(childMap)
// const arr = findEqualLevelBranches(userTree)
// console.log(JSON.stringify(arr))

const arr2 = [
 {
  id: 'A26',
  LV: 2,
  children: [
   { id: 'A261', LV: 2, children: [] },
   { id: 'A26X1', LV: 2, children: [] },
   { id: 'A26X2', LV: 2, children: [] },
   { id: 'A26X3', LV: 2, children: [] },
   { id: 'A26X4', LV: 2, children: [] },
   { id: 'A26X5', LV: 2, children: [] },
   { id: 'A26X6', LV: 2, children: [] },
   { id: 'A26X7', LV: 2, children: [] },
   { id: 'A26X8', LV: 2, children: [] },
   { id: 'A26X9', LV: 2, children: [] },
   { id: 'A26X10', LV: 2, children: [] },
   { id: 'A26X11', LV: 2, children: [] },
   { id: 'A26X12', LV: 2, children: [] },
   { id: 'A26X13', LV: 2, children: [] },
   { id: 'A26X14', LV: 2, children: [] },
   { id: 'A26X15', LV: 2, children: [] },
   { id: 'A26X16', LV: 2, children: [] },
   { id: 'A26X17', LV: 2, children: [] },
   { id: 'A26X18', LV: 2, children: [] },
   { id: 'A26X19', LV: 2, children: [] },
   { id: 'A26X20', LV: 2, children: [] },
   { id: 'A26X21', LV: 2, children: [] },
   { id: 'A26X22', LV: 2, children: [] },
   { id: 'A26X23', LV: 2, children: [] },
   { id: 'A26X24', LV: 2, children: [] },
   { id: 'A26X25', LV: 2, children: [] },
   { id: 'A26X26', LV: 2, children: [] },
   { id: 'A26X27', LV: 2, children: [] },
   { id: 'A26X28', LV: 2, children: [] },
   { id: 'A26X29', LV: 2, children: [] },
   { id: 'A26X30', LV: 2, children: [] },
   { id: 'A26X31', LV: 2, children: [] },
   { id: 'A26X32', LV: 2, children: [] },
   { id: 'A26X33', LV: 2, children: [] },
   { id: 'A26X34', LV: 2, children: [] },
   { id: 'A26X35', LV: 2, children: [] },
   { id: 'A26X36', LV: 2, children: [] },
   { id: 'A26X37', LV: 2, children: [] },
   { id: 'A26X38', LV: 2, children: [] },
   { id: 'A26X39', LV: 2, children: [] },
   { id: 'A26X40', LV: 2, children: [] },
   { id: 'A26X41', LV: 2, children: [] },
   { id: 'A26X42', LV: 2, children: [] },
   { id: 'A26X43', LV: 2, children: [] },
   { id: 'A26X44', LV: 2, children: [] },
   { id: 'A26X45', LV: 2, children: [] },
   { id: 'A26X46', LV: 2, children: [] },
   { id: 'A26X47', LV: 2, children: [] },
   { id: 'A26X48', LV: 2, children: [] },
   { id: 'A26X49', LV: 2, children: [] },
  ],
 },
 { id: 'A2', LV: 2, children: [{ id: 'A25', LV: 2, children: [] }] },
]
