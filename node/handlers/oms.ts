import json from 'co-body'


export async function oms(ctx: Context, next: () => Promise<any>) {

  const { OrderId } = await json(ctx.req)
  const {clientProfileData: { email: userId }} = await ctx.clients.oms.order(OrderId)
  console.log(OrderId)
  console.log(userId)



  ctx.status = 200
  ctx.set('Cache-Control', 'no-cache no-store')

  // const data = await oms.order("")
  ctx.body = "ok"
  await next()


// key
// AXMOCLJXVSZMSUTCAMQAEFQZMGYUCSZZWJHQKNIHANHNPPJEFKUFFYWVHMBWNOVCSZPIMCSMDJZRXCKWXTPRYTUYNMJYLMTMSEVPAARDSIBWZFXFBFYTZDEYFRVATTAR
// vtexappkey-hiringcoders202106-ZXITRC

}
