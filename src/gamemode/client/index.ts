import '@abraham/reflection'

RegisterCommand(
  'spawn',
  () => {
    exports.spawnmanager.setAutoSpawnCallback(() => {
      // spawnmanager has said we should spawn, let's spawn!
      exports.spawnmanager.spawnPlayer(
        {
          // this argument is basically an object containing the spawn location...
          x: -262.849,
          y: 793.404,
          z: 118.087
          // ... and the model to spawn as.
        },
        () => {
          /*
           * A callback to be called once the player is spawned in and the game is visible
           * in this case, we just send a message to the local chat box.
           */
          emit('chat:addMessage', {
            args: ['Welcome to the party!~']
          })
        }
      )
    })

    exports.spawnmanager.setAutoSpawn(true)
    exports.spawnmanager.forceRespawn()
  },
  false
)
