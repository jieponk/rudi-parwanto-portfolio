const {authed,json}=require("./_auth");
const cats=require("./data/shopee-fees.json");
const cap=(v,max)=>Math.min(v,max);
exports.handler=async(event)=>{
 if(!authed(event))return json(401,{error:"Login diperlukan"});
 if(event.httpMethod!=="POST")return json(405,{error:"Method not allowed"});
 let b={};try{b=JSON.parse(event.body||"{}")}catch{}
 const price=Number(b.price)||0,cost=Number(b.cost)||0,supplierCashback=Math.max(0,Number(b.supplierCashback)||0);
 if(price<=0)return json(400,{error:"Harga jual harus diisi."});
 let fees=[],normalExtra=0,affiliate=0,categoryFee=0;
 if(b.market==="shopee"||b.market==="gearnest"){
   const c=cats[Number(b.shopeeCategoryIndex)||0]; if(!c)return json(400,{error:"Kategori Shopee tidak valid."});
   categoryFee=price*c.fee; fees.push({label:`Fee kategori ${(c.fee*100).toLocaleString("id-ID")}%`,amount:categoryFee});
   const feemax=cap(price*0.055,40000); fees.push({label:"FeeMax 5,5% (maks Rp40.000)",amount:feemax});
   const xtra=b.market==="shopee"?cap(price*0.065,80000):cap(price*0.045,60000); fees.push({label:b.market==="shopee"?"XTRA 6,5% (maks Rp80.000)":"XTRA 4,5% (maks Rp60.000)",amount:xtra});
   const pack=1600,premi=price*0.005;fees.push({label:"PACK",amount:pack},{label:"PREMI 0,5%",amount:premi});
   normalExtra=feemax+xtra+pack+premi;
   if(b.market==="shopee"){const dapat=price*0.005;fees.push({label:"DAPAT 0,5%",amount:dapat});normalExtra+=dapat}
   affiliate=b.campaign?price*0.01*1.11:0;fees.push({label:"Campaign / Affiliate 1% × 1,11",amount:affiliate,off:!b.campaign});
 } else if(b.market==="tiktok"){
   const rate=(b.tiktokCategory==="audio"||b.tiktokCategory==="accessory")?0.095:0.0775;categoryFee=price*rate;fees.push({label:`Fee kategori ${(rate*100).toLocaleString("id-ID")}%`,amount:categoryFee});
   const feemax=cap(price*0.03,60000),xtra=cap(price*0.02,100000),premi=1250;fees.push({label:"FeeMax 3% (maks Rp60.000)",amount:feemax},{label:"XTRA 2% (maks Rp100.000)",amount:xtra},{label:"Premi",amount:premi});
   normalExtra=feemax+xtra+premi;
   const mall=b.mall?cap(price*0.018,50000):0;fees.push({label:"TikTok Mall 1,8% (maks Rp50.000)",amount:mall,off:!b.mall});normalExtra+=mall;
   affiliate=b.campaign?price*0.01:0;fees.push({label:"Campaign 1%",amount:affiliate,off:!b.campaign});
 } else if(b.market==="blibli"){
   categoryFee=price*0.0575;fees.push({label:"Fee 5,75%",amount:categoryFee});
   const feemax=cap(price*0.025,30000),xtra=cap(price*0.06,500000),pack=cap(price*0.018,50000),premi=1250;fees.push({label:"FeeMax 2,5% (maks Rp30.000)",amount:feemax},{label:"XTRA 6% (maks Rp500.000)",amount:xtra},{label:"PACK 1,8% (maks Rp50.000)",amount:pack},{label:"Premi",amount:premi});normalExtra=feemax+xtra+pack+premi;affiliate=b.campaign?price*0.01:0;fees.push({label:"Campaign 1%",amount:affiliate,off:!b.campaign});
 } else return json(400,{error:"Marketplace tidak valid."});
 const totalFees=categoryFee+normalExtra,net=price-totalFees,profit=net-cost,promoNet=net-affiliate,promoProfit=promoNet-cost,promoMargin=cost?promoProfit/cost*100:0;
 const finalProfit=profit+supplierCashback,finalPromoProfit=promoProfit+supplierCashback,finalPromoMargin=cost?finalPromoProfit/cost*100:0;
 return json(200,{price,cost,supplierCashback,fees,totalFees,net,profit,finalProfit,promoNet,promoProfit,promoMargin,finalPromoProfit,finalPromoMargin});
};