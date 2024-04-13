module.exports = {
  devServer: {
     proxy: {
       '/gtfsmap-realtime': {
         target: 'https://maps.trilliumtransit.com',
         changeOrigin: true,
         pathRewrite: {
           '^/gtfsmap-realtime': '/gtfsmap-realtime'
         }
       }
   }
  }
};