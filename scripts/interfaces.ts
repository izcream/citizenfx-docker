export interface Resource {
  name: string
  srcPath: string
  buildPath: string
  entryServer: string
  entryClient: string
  config: ResourceConfig
}

export interface ResourceConfig {
  name: string
  fx_version: string
  game: string[]
  author: string
  description: string
  version: string
  client_scripts: string[]
  server_scripts: string[]
}
