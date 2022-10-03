console.log('client started')

on('onClientGameTypeStart', () => {
  exports.spawnmanager.setAutoSpawnCallback(() => {
    exports.spawnmanager.spawnPlayer(
      {
        x: 686.245,
        y: 577.95,
        z: 130.461,
        model: 'a_m_m_skater_01'
      },
      () => {
        emit('chat:addMessage', {
          args: ['Hi, there!']
        })
      }
    )
  })

  exports.spawnmanager.setAutoSpawn(true)
  exports.spawnmanager.forceRespawn()
})
