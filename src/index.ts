import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function save() {
  await prisma.user.create({
    data :{
      name: 'JoJo',
      email: 'jojo@joaogomes.dev',
      Post: {
        create: [
          {title: 'Post 1', content: 'Hello'},
          {title: 'Post 2', content: 'World'}
        ]
      }
    }
  })

  console.log("Saved");
}

async function list() {
  const allUsers = await prisma.user.findMany({
    include: {
      Post: true
    }
  });
  console.log(allUsers);
}

save()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

list()
.catch((e) => {
  throw e
})
.finally(async () => {
  await prisma.$disconnect()
})
  


