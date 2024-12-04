function getCredentials() {
    const filePath = './key.json'
    if (fs.existsSync(filePath)) {
      return require(filePath)
    }
    if (process.env.CREDENTIALS) {
      return JSON.parse(process.env.CREDENTIALS)
    }
    throw new Error('Unable to load credentials')
  }
  
  async function getDrive() {
    const credentials = getCredentials()
    const client = await google.auth.getClient({
      credentials,
      scopes: 'https://www.googleapis.com/auth/drive.file',
    })
  
    return google.drive({
      version: 'v3',
      auth: client,
    })
  }
  getDrive().files.create({
    requestBody: {
      name: 'Test',
      mimeType: 'text/plain',
      parents: '1s_Ig9E-n0JF3OeLoe3uupoXLkbF8OJ8y',
    },
    media: {
      mimeType: 'text/plain',
      body: 'Hello World',
    },
}).catch(e => console.error(e))