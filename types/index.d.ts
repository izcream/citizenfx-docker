/// <reference types="@citizenfx/server"/>
/// <reference types="@citizenfx/client"/>
declare namespace NodeJS {
  interface Process {
    /**
     * @deprecated Use `typeof window` instead
     */
    readonly browser: boolean
  }

  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly DB_HOST: string
    readonly DB_PORT: string
    readonly DB_USERNAME: string
    readonly DB_PASSWORD: string
    readonly DB_DATABASE: string
  }
}

//override citizenfx types events
interface ServerEvent {
  entityCreated: (handle: number) => void
  entityCreating: (handle: number) => void
  entityRemoved: (handle: number) => void
  onResourceListRefresh: () => void
  onResourceStart: (resource: string) => void
  onResourceStarting: (resource: string) => void
  onResourceStop: (resource: string) => void
  onServerResourceStart: (resource: string) => void
  onServerResourceStop: (resource: string) => void
  playerConnecting: (
    playerName: string,
    setKickReason: (reason: string) => void,
    deferrals: { defer: any; done: any; handover: any; presentCard: any; update: any },
    source: string
  ) => void
  playerEnteredScope(data: { for: string; player: string }): void
  playerJoining(source: string, oldID: string): void
  playerLeftScope(data: { for: string; player: string }): void
  ptFxEvent(
    sender: number,
    data: {
      assetHash: number
      axisBitset: number
      effectHash: number
      entityNetId: number
      f100: number
      f105: number
      f106: number
      f107: number
      f109: boolean
      f110: boolean
      f111: boolean
      f92: number
      isOnEntity: boolean
      offsetX: number
      offsetY: number
      offsetZ: number
      posX: number
      posY: number
      posZ: number
      rotX: number
      rotY: number
      rotZ: number
      scale: number
    }
  ): void
  removeAllWeaponsEvent(sender: number, data: { pedId: number }): void
  startProjectileEvent(
    sender: number,
    data: {
      commandFireSingleBullet: boolean
      effectGroup: number
      firePositionX: number
      firePositionY: number
      firePositionZ: number
      initialPositionX: number
      initialPositionY: number
      initialPositionZ: number
      ownerId: number
      projectileHash: number
      targetEntity: number
      throwTaskSequence: number
      unk10: number
      unk11: number
      unk12: number
      unk13: number
      unk14: number
      unk15: number
      unk16: number
      unk3: number
      unk4: number
      unk5: number
      unk6: number
      unk7: number
      unk9: number
      unkX8: number
      unkY8: number
      unkZ8: number
      weaponHash: number
    }
  ): void
  weaponDamageEvent(
    sender: number,
    data: {
      actionResultId: number
      actionResultName: number
      damageFlags: number
      damageTime: number
      damageType: number
      f104: number
      f112: boolean
      f112_1: number
      f120: number
      f133: boolean
      hasActionResult: boolean
      hasImpactDir: boolean
      hasVehicleData: boolean
      hitComponent: number
      hitEntityWeapon: boolean
      hitGlobalId: number
      hitGlobalIds: number[]
      hitWeaponAmmoAttachment: boolean
      impactDirX: number
      impactDirY: number
      impactDirZ: number
      isNetTargetPos: boolean
      localPosX: number
      localPosY: number
      localPosZ: number
      overrideDefaultDamage: boolean
      parentGlobalId: number
      silenced: boolean
      suspensionIndex: number
      tyreIndex: number
      weaponDamage: number
      weaponType: number
      willKill: boolean
    }
  ): void
}
interface ClientEvent {
  CEventName(entities: number[], eventEntity: number, data: any[]): void
  entityDamaged(victim: number, culprit: number, weapon: number, baseDamage: number): void
  gameEventTriggered(name: string, data: number[]): void
  mumbleConnected(address: string, reconnecting: boolean): void
  mumbleDisconnected(address: string): void
  onClientResourceStart(resource: string): void
  onClientResourceStop(resource: string): void
  onResourceStart(resource: string): void
  onResourceStarting(resource: string): void
  onResourceStop(resource: string): void
  populationPedCreating(
    x: number,
    y: number,
    z: number,
    model: number,
    overrideCalls: { setModel: any; setPosition: any }
  ): void
}
//server events
declare function onNet<K extends keyof ServerEvent>(
  eventName: K,
  listener: (...args: Parameters<ServerEvent[K]>) => void
): void
declare function onNet(eventName: string, callback: Function): void

//client events
declare function on<K extends keyof ClientEvent>(
  eventName: K,
  listener: (...args: Parameters<ClientEvent[K]>) => void
): void
declare function on(eventName: string, callback: Function): void
