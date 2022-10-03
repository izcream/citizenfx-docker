import { config } from 'dotenv'
import { build } from 'esbuild'
import fs from 'fs-extra'
import glob from 'tiny-glob'

import { Resource } from './interfaces'

config()
const SRC_PATH = process.env.SRC_PATH
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

class ResourceBuilder {
  private resources: Resource[]
  private cleanupFolders: string[] = []
  public async analyze() {
    const files = await glob('src/**/*/fxmanifest.json')
    if (files.length <= 0) {
      throw new Error('⛔ not found any fxmanifest.json')
    }
    this.resources = files.map((file) => this.prepareResource(file))
  }
  public async build() {
    await this.cleanup()
    console.time('⏱️ time\u001b[34m')
    for (const resource of this.resources) {
      await this.buildServer(resource)
      await this.buildClient(resource)
      this.generateFxManifest(resource)
      console.log(`✅ builded: \u001b[32m${resource.name}\u001b[0m`)
    }
    console.timeEnd('⏱️ time\u001b[34m')
  }

  private buildServer(resource: Resource) {
    return build({
      entryPoints: [`${resource.srcPath}/server/index.ts`],
      outfile: `${resource.buildPath}/server.js`,
      platform: 'node',
      target: ['node16'],
      format: 'cjs',
      minify: IS_PRODUCTION,
      watch: process.argv.includes('--watch')
    })
  }
  private buildClient(resource: Resource) {
    return build({
      entryPoints: [`${resource.srcPath}/client/index.ts`],
      outfile: `${resource.buildPath}/client.js`,
      platform: 'browser',
      target: ['chrome93'],
      format: 'iife',
      minify: IS_PRODUCTION,
      watch: process.argv.includes('--watch')
    })
  }
  private prepareResource(resourceJsonFile: string): Resource {
    const config = fs.readJSONSync(resourceJsonFile)
    this.cleanupFolders.push(config.name)
    return {
      config,
      name: config.name,
      srcPath: `${SRC_PATH}/${config.name}`,
      buildPath: `resources/[local]/${config.name}`,
      entryClient: `${SRC_PATH}/${config.name}/client/index.ts`,
      entryServer: `${SRC_PATH}/${config.name}/server/index.ts`
    }
  }
  private cleanup() {
    fs.readdirSync(`resources`).forEach((folder) => {
      if (fs.existsSync(`resources/[local]/${folder}`)) {
        fs.rmSync(`resources/[local]/${folder}`, { recursive: true })
        console.log(`🗑️ removed:\u001b[31mresources/[local]/${folder}\u001b[0m`)
      }
    })
    for (const folder of this.cleanupFolders) {
      fs.removeSync(`resources/[local]/${folder}`)
    }
  }
  private generateFxManifest(resource: Resource) {
    let manifest = ''
    for (const c in resource.config) {
      const value: string | string[] = resource.config[c]
      if (typeof value === 'object') {
        manifest += `${c} { '${value.join("','")}' }\n`
      } else {
        manifest += `${c} '${resource.config[c]}'\n`
      }
    }
    manifest += `rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'`
    if (!fs.existsSync(`${resource.buildPath}/fxmanifest.lua`)) {
      fs.createFileSync(`${resource.buildPath}/fxmanifest.lua`)
    }
    fs.writeFileSync(`${resource.buildPath}/fxmanifest.lua`, manifest, {
      encoding: 'utf8'
    })
  }
}
export default ResourceBuilder
