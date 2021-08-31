import json from 'co-body'
import axios from 'axios'


export async function oms(ctx: Context, next: () => Promise<any>) {

  const { OrderId } = await json(ctx.req)
  const {clientProfileData: { email: userId }} = await ctx.clients.oms.order(OrderId)

  const data:any = await ctx.clients.masterdata.searchDocuments({
    dataEntity:'CL',
    where:`email=${userId?.split("-",1)}`,
    fields:['email','firstName','lastName','phone'],
    pagination:{
      pageSize:1,
      page:1
    }
  })



  if(!data){
    throw new Error("MasterData not Found")
  }

  axios.put(
    "https://zq7fojw450.execute-api.us-east-2.amazonaws.com/type",{email:data[0].email}
  ).catch((e)=>{ axios.put("https://zq7fojw450.execute-api.us-east-2.amazonaws.com/leads",{email:data[0].email,name:data[0].firstName +" "+ data[0].lastName,phone:data[0].phone,type:'Client'}) })




  // try{
  //   const awsPut = await axios.put(
  //     "https://zq7fojw450.execute-api.us-east-2.amazonaws.com/type",{email:data[0].email}
  //   )
  //   return awsPut
  // }catch(err){
  //   console.log(err)
  //   const awsPost = await axios.put(
  //     "https://zq7fojw450.execute-api.us-east-2.amazonaws.com/leads",{email:data[0].email,name:data[0].firstName +" "+ data[0].lastName,phone:data[0].phone}
  //   )
  //   return awsPost
  // }


// key
// AXMOCLJXVSZMSUTCAMQAEFQZMGYUCSZZWJHQKNIHANHNPPJEFKUFFYWVHMBWNOVCSZPIMCSMDJZRXCKWXTPRYTUYNMJYLMTMSEVPAARDSIBWZFXFBFYTZDEYFRVATTAR
// vtexappkey-hiringcoders202106-ZXITRC

}
