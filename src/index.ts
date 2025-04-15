import { User } from './models/User'
import { RewardCalculator } from './services/RewardCalculator'
import * as fs from 'fs'

// Create the example tree structure
function createExampleTree(): User {
 // Create A2
 const a2 = new User('A2', 100)

 // Create A21-A26
 const a21 = new User('A21', 100)
 const a22 = new User('A22', 100)
 const a23 = new User('A23', 100)
 const a24 = new User('A24', 100)
 const a25 = new User('A25', 100)
 const a26 = new User('A26', 100)

 // Add A21-A26 as children of A2
 a2.addChild(a21)
 a2.addChild(a22)
 a2.addChild(a23)
 a2.addChild(a24)
 a2.addChild(a25)
 a2.addChild(a26)

 // Add 10 children each to A21-A24
 ;[a21, a22, a23, a24].forEach((parent, parentIndex) => {
  for (let i = 1; i <= 10; i++) {
   const childId = `A2${parentIndex + 1}${i.toString().padStart(2, '0')}`
   parent.addChild(new User(childId, 100))
  }
 })

 // Add 50 children to A25
 for (let i = 1; i <= 50; i++) {
  const childId = `A25${i.toString().padStart(2, '0')}`
  a25.addChild(new User(childId, 100))
 }

 // Add 50 children to A26, with A2601 having 50 more children
 const a2601 = new User('A2601', 100)
 a26.addChild(a2601)

 // Add 50 children to A2601
 for (let i = 1; i <= 50; i++) {
  const childId = `A26010${i.toString().padStart(2, '0')}`
  a2601.addChild(new User(childId, 100))
 }

 // Add remaining 49 children to A26
 for (let i = 2; i <= 50; i++) {
  const childId = `A26${i.toString().padStart(2, '0')}`
  a26.addChild(new User(childId, 100))
 }

 return a2
}

// Run the example
const a2 = createExampleTree()

const user = a2.getChildren()[5]
const reward = RewardCalculator.calculateReward(user)
console.log(`Tree structure analysis for ${user.id}:`)
console.log(`Direct referrals: ${user.getDirectReferralCount()}`)
console.log(`Total team size: ${user.getTotalTeamSize()}`)
console.log(`Level achieved: ${user.getLevel()}`)
console.log(`Daily reward: $${reward}`)

// // Print children's levels
// const logData: string[] = []

// a2
//  .getChildren()[1]
//  .getChildren()
//  .forEach((child) => {
//   const analysis = `
// ${child.id} analysis:
// Direct referrals: ${child.getDirectReferralCount()}
// Total team size: ${child.getTotalTeamSize()}
// Level achieved: ${child.getLevel()}
// Daily profit: $${child.getDailyProfit()}
// Daily reward: $${RewardCalculator.calculateReward(child).toFixed(2)}
// `
//   console.log(analysis)
//   logData.push(analysis)
//  })

// fs.writeFileSync('log.txt', logData.join('\n'), 'utf-8')
