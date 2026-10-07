const {authed,json}=require("./_auth");
const cats=require("./data/shopee-fees.json");
const tiktokCats=require("./data/tiktok-fees.json");
const blibliCats=require("./data/blibli-fees.json");
const cap=(v,max)=>Math.min(v,max);
const pctLabel=r=>(r*100).toLocaleString("id-ID",{maximumFractionDigits:2})+"%";
const PPH_RATE=.005;

function detectBlibli(text){
 const q=String(text||"").toLowerCase();
 let best=null,score=0;
 for(const c of blibliCats){
   for(const k of (c.keywords||[])){
     const key=String(k).toLowerCase();
     if(key&&q.includes(key)&&key.length>score){best=c;score=key.length}
   }
 }
 return best||blibliCats.find(x=>x.id==="camera_body")||blibliCats[0];
}

exports.handler=async(event)=>{
 if(!authed(event))return json(401,{error:"Login diperlukan"});
 if(event.httpMethod!=="POST")return json(405,{error:"Method not allowed"});
 let b={};try{b=JSON.parse(event.body||"{}")}catch{}
 const price=Number(b.price)||0,cost=Number(b.cost)||0,supplierCashback=Math.max(0,Number(b.supplierCashback)||0);
 if(price<=0)return json(400,{error:"Harga jual harus diisi."});
 let fees=[],totalFees=0,affiliate=0;
 const pph=price*PPH_RATE;
 if(b.market==="shopee"||b.market==="gearnest"){
   const c=cats[Number(b.shopeeCategoryIndex)||0]; if(!c)return json(400,{error:"Kategori Shopee tidak valid."});
   const categoryFee=price*c.fee; fees.push({label:`Fee kategori ${pctLabel(c.fee)}`,amount:categoryFee});
   const feemax=cap(price*.055,40000); fees.push({label:"FeeMax 5,5% (maks Rp40.000)",amount:feemax});
   const xtra=b.market==="shopee"?cap(price*.065,80000):cap(price*.045,60000); fees.push({label:b.market==="shopee"?"XTRA Plus 6,5% (maks Rp80.000)":"XTRA 4,5% (maks Rp60.000)",amount:xtra});
   const pack=1600,premi=price*.005,dapat=price*.005;
   fees.push({label:"Packing",amount:pack},{label:"Premi 0,5%",amount:premi},{label:"DAPAT 0,5%",amount:dapat});
   affiliate=b.campaign?price*.01*1.11:0; fees.push({label:"Campaign / Affiliate 1% × 1,11",amount:affiliate,off:!b.campaign});
   fees.push({label:"PPh 0,5%",amount:pph});
   totalFees=categoryFee+feemax+xtra+pack+premi+dapat+affiliate+pph;
 } else if(b.market==="tiktok"){
   const c=tiktokCats[Number(b.tiktokCategoryIndex)||0]; if(!c)return json(400,{error:"Kategori TikTok tidak valid."});
   const rate=b.tiktokSellerType==="mall"?Number(c.mallFee)||0:Number(c.nonMallFee)||0;
   const categoryFee=price*rate,dynamicRate=Number(c.dynamicFee)||0,dynamic=cap(price*dynamicRate,60000);
   const mallAddon=b.tiktokSellerType==="mall"?cap(price*.018,50000):0,pack=1250,service=4000,growth=b.gmvExtra?cap(price*.02,100000):0;
   fees.push({label:`Komisi Platform ${b.tiktokSellerType==="mall"?"Mall":"Non-Mall"} — ${pctLabel(rate)}`,amount:categoryFee});
   fees.push({label:`Komisi Dinamis ${pctLabel(dynamicRate)} (maks Rp60.000)`,amount:dynamic});
   fees.push({label:"TikTok Mall Add On 1,8% (maks Rp50.000)",amount:mallAddon,off:b.tiktokSellerType!=="mall"});
   fees.push({label:"Packing",amount:pack},{label:"Biaya Layanan",amount:service},{label:"Growth Xtra 2% (maks Rp100.000)",amount:growth,off:!b.gmvExtra},{label:"PPh 0,5%",amount:pph});
   totalFees=categoryFee+dynamic+mallAddon+pack+service+growth+pph;
   affiliate=0;
 } else if(b.market==="blibli"){
   const c=detectBlibli(`${b.sku||""}`),regular=price*(Number(c.fee)||0),flagship=cap(price*.018,50000),shipping=cap(price*(Number(c.shippingRate)||.02),Number(c.shippingCap)||30000),extra=cap(price*.0575,500000);
   affiliate=b.campaign?price*.01:0;
   fees.push({label:`Reguler Margin FS ${pctLabel(Number(c.fee)||0)} — ${c.subcategory||c.category}`,amount:regular},{label:"Add On Flagship 1,8% (maks Rp50.000)",amount:flagship},{label:`Add On Pengiriman ${pctLabel(Number(c.shippingRate)||.02)} (maks Rp30.000)`,amount:shipping},{label:"Extra Kerja Sama 5,75% (maks Rp500.000)",amount:extra},{label:"Campaign 1%",amount:affiliate,off:!b.campaign},{label:"PPh 0,5%",amount:pph});
   totalFees=regular+flagship+shipping+extra+affiliate+pph;
 } else return json(400,{error:"Marketplace tidak valid."});
 const net=price-totalFees,profit=net-cost,promoNet=net,promoProfit=profit,promoMargin=price?promoProfit/price*100:0;
 const finalProfit=profit+supplierCashback,finalPromoProfit=promoProfit+supplierCashback,finalPromoMargin=price?finalPromoProfit/price*100:0;
 return json(200,{price,cost,supplierCashback,fees,totalFees,pph,net,profit,finalProfit,promoNet,promoProfit,promoMargin,finalPromoProfit,finalPromoMargin});
};
