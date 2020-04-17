const handler = async event => {
  console.log(`this is a test event: ${event}`)
  return event
}

export { handler }
