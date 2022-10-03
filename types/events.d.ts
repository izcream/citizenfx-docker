type ClientEventNames =
  | 'CEventName'
  | 'entityDamaged'
  | 'gameEventTriggered'
  | 'mumbleConnected'
  | 'mumbleDisconnected'
  | 'onClientResourceStart'
  | 'onClientResourceStop'
  | 'onResourceStart'
  | 'onResourceStarting'
  | 'onResourceStop'
  | 'populationPedCreating'
type ServerEventNames =
  | 'entityCreated'
  | 'entityCreating'
  | 'entityRemoved'
  | 'onResourceListRefresh'
  | 'onResourceStart'
  | 'onResourceStarting'
  | 'onResourceStop'
  | 'onServerResourceStart'
  | 'onServerResourceStop'
  | 'playerConnecting'
  | 'playerEnteredScope'
  | 'playerJoining'
  | 'playerLeftScope'
  | 'ptFxEvent'
  | 'removeAllWeaponsEvent'
  | 'startProjectileEvent'
  | 'weaponDamageEvent'

//server events
declare function onNet(eventName: ServerEventNames, callback: Function): void
declare function onNet(eventName: string, callback: Function): void
//client events
declare function on(eventName: ClientEventNames, callback: Function): void
declare function on(eventName: string, callback: Function): void
