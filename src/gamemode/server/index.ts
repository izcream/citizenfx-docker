import '@abraham/reflection'

console.log('Gamemode Started')

onNet('playerJoining', (name) => {
  console.log(`player ${name} joined the server`)
})
onNet('test_event', (args: any) => {
  console.log('receive event', args)
})
