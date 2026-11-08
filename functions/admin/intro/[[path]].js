// Owner-only gate: no credentials in client-side code. Requires Cloudflare Access.
const deny=(status)=>new Response(status===503?'Owner Access nu este configurat.':'Acces rezervat Owner.',{status,headers:{'content-type':'text/plain; charset=utf-8','cache-control':'no-store','x-robots-tag':'noindex, nofollow'}});
function b64(s){const v=s.replace(/-/g,'+').replace(/_/g,'/');return Uint8Array.from(atob(v+'='.repeat((4-v.length%4)%4)),x=>x.charCodeAt(0));}
function obj(s){return JSON.parse(new TextDecoder().decode(b64(s)))}
export async function onRequest({request,env,next}){
 const domain=String(env.ETALON_ACCESS_TEAM_DOMAIN||'').trim().toLowerCase(),aud=String(env.ETALON_ACCESS_AUD||'').trim(),owner=String(env.ETALON_OWNER_EMAIL||'').trim().toLowerCase();
 if(!/^[a-z0-9.-]+\.cloudflareaccess\.com$/.test(domain)||!aud||!owner)return deny(503);
 const parts=(request.headers.get('cf-access-jwt-assertion')||'').split('.');
 if(parts.length!==3)return deny(403);
 try{
  const header=obj(parts[0]),payload=obj(parts[1]),now=Math.floor(Date.now()/1000);
  if(header.alg!=='RS256'||!header.kid||payload.iss!=='https://'+domain||!Array.isArray(payload.aud)||!payload.aud.includes(aud)||String(payload.email||'').toLowerCase()!==owner||!Number.isFinite(payload.exp)||payload.exp<=now||!Number.isFinite(payload.iat)||payload.iat>now+60)return deny(403);
  const response=await fetch('https://'+domain+'/cdn-cgi/access/certs');
  if(!response.ok)return deny(503);
  const certs=await response.json(),jwk=(certs.keys||[]).find(x=>x.kid===header.kid&&x.kty==='RSA');
  if(!jwk)return deny(403);
  const key=await crypto.subtle.importKey('jwk',jwk,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['verify']);
  if(!await crypto.subtle.verify('RSASSA-PKCS1-v1_5',key,b64(parts[2]),new TextEncoder().encode(parts[0]+'.'+parts[1])))return deny(403);
  const result=await next(),h=new Headers(result.headers);h.set('cache-control','private,no-store');h.set('x-robots-tag','noindex,nofollow');h.set('x-content-type-options','nosniff');
  return new Response(result.body,{status:result.status,statusText:result.statusText,headers:h});
 }catch{return deny(403)}
}