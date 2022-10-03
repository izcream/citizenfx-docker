/// <reference types="@citizenfx/server"/>
/// <reference types="@citizenfx/client"/>
/// <reference path="events.d.ts"/>

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
