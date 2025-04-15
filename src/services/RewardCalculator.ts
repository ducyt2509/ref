import { User, Level } from '../models/User'
import * as fs from 'fs'

export class RewardCalculator {
 private static readonly REWARD_RATES: Record<Level, number> = {
  V0: 10,
  V1: 10, // 10%
  V2: 20, // 20%
  V3: 30, // 30%
  V4: 40, // 40%
  V5: 50, // 50%
  V6: 60, // 60%
  V7: 70, // 70%
 }

 static calculateReward(user: User): number {
  console.log('Calculating reward for user:', user.id)
  const children = user.getChildren()
  const userLevel = user.getLevel()

  let totalReward = 0

  for (const child of children) {
   if (this.getLevelValue(child.getLevel()) > this.getLevelValue(userLevel)) {
    continue
   }

   const childProfit = child.getDailyProfit()
   const rewardRate = RewardCalculator.REWARD_RATES[userLevel]
   const directReward = childProfit * rewardRate

   const childrenReward = this.calculateReward(child)

   const logData = JSON.stringify(
    {
     userId: user.id,
     childId: child.id,
     directReward,
     childrenReward,
     rewardRate,
     totalReward: directReward + (childrenReward * rewardRate) / 100,
    },
    null,
    2,
   )

   fs.writeFileSync('log.txt', logData, 'utf-8')

   totalReward += directReward + (childrenReward * rewardRate) / 100
  }

  return totalReward / 100
 }

 private static getLevelValue(level: Level): number {
  return parseInt(level.substring(1))
 }
}
