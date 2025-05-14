const users = []
function buildReferralTreesWithBranches(users: any) {
 const nodeMap = new Map()

 // Bước 1: Khởi tạo node với children rỗng
 for (const user of users) {
  nodeMap.set(user._id, { ...user, children: [] })
 }

 // Bước 2: Gắn node vào cây cha
 for (const user of users) {
  if (!user.parentPath) continue

  const childId = user._id
  const parentIds = user.parentPath.split('|').filter(Boolean)
  const parentId = parentIds[parentIds.length - 1]

  const parentNode = nodeMap.get(parentId)
  if (parentNode) {
   parentNode.children.push(nodeMap.get(childId))
  }
 }

 // Bước 3: Lấy các root node có children
 const treesWithBranches = []
 for (const user of users) {
  if (!user.parentPath) {
   const root = nodeMap.get(user._id)
   if (root.children.length > 0) {
    treesWithBranches.push(root)
   }
  }
 }

 return treesWithBranches
}

// Thực thi test
const result = buildReferralTreesWithBranches(users)
console.dir(result, { depth: null })
