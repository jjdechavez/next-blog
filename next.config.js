module.exports = {
  env: {
    serverBaseURL: process.env.SERVER_HOST
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
         {
            key: 'x-custom-header',
            value: 'my custom header value',
          },
          {
            key: 'x-another-custom-header',
            value: 'my other custom header value',
          },
        ]
      }
    ]
  }
}
