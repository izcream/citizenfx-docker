import ResourceBuilder from './resource-builder'

async function buildResource() {
  const builder = new ResourceBuilder()
  await builder.analyze()
  builder.build()
}

buildResource()
