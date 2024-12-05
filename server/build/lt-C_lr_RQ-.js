import{g6 as P}from"./strapi-cA7cPHO_.js";var A={exports:{}};const v="2.0.0",d=256,j=Number.MAX_SAFE_INTEGER||9007199254740991,y=16,H=d-6,V=["major","premajor","minor","preminor","patch","prepatch","prerelease"];var G={MAX_LENGTH:d,MAX_SAFE_COMPONENT_LENGTH:y,MAX_SAFE_BUILD_LENGTH:H,MAX_SAFE_INTEGER:j,RELEASE_TYPES:V,SEMVER_SPEC_VERSION:v,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2},O={ADMIN_PATH:"/admin",STRAPI_ADMIN_BACKEND_URL:"",STRAPI_TELEMETRY_DISABLED:"false"};const k=typeof process=="object"&&O&&O.NODE_DEBUG&&/\bsemver\b/i.test(O.NODE_DEBUG)?(...i)=>console.error("SEMVER",...i):()=>{};var F=k;(function(i,e){const{MAX_SAFE_COMPONENT_LENGTH:E,MAX_SAFE_BUILD_LENGTH:n,MAX_LENGTH:a}=G,I=F;e=i.exports={};const _=e.re=[],C=e.safeRe=[],s=e.src=[],r=e.t={};let X=0;const $="[a-zA-Z0-9-]",w=[["\\s",1],["\\d",a],[$,n]],U=c=>{for(const[R,l]of w)c=c.split(`${R}*`).join(`${R}{0,${l}}`).split(`${R}+`).join(`${R}{1,${l}}`);return c},t=(c,R,l)=>{const b=U(R),L=X++;I(c,L,R),r[c]=L,s[L]=R,_[L]=new RegExp(R,l?"g":void 0),C[L]=new RegExp(b,l?"g":void 0)};t("NUMERICIDENTIFIER","0|[1-9]\\d*"),t("NUMERICIDENTIFIERLOOSE","\\d+"),t("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${$}*`),t("MAINVERSION",`(${s[r.NUMERICIDENTIFIER]})\\.(${s[r.NUMERICIDENTIFIER]})\\.(${s[r.NUMERICIDENTIFIER]})`),t("MAINVERSIONLOOSE",`(${s[r.NUMERICIDENTIFIERLOOSE]})\\.(${s[r.NUMERICIDENTIFIERLOOSE]})\\.(${s[r.NUMERICIDENTIFIERLOOSE]})`),t("PRERELEASEIDENTIFIER",`(?:${s[r.NUMERICIDENTIFIER]}|${s[r.NONNUMERICIDENTIFIER]})`),t("PRERELEASEIDENTIFIERLOOSE",`(?:${s[r.NUMERICIDENTIFIERLOOSE]}|${s[r.NONNUMERICIDENTIFIER]})`),t("PRERELEASE",`(?:-(${s[r.PRERELEASEIDENTIFIER]}(?:\\.${s[r.PRERELEASEIDENTIFIER]})*))`),t("PRERELEASELOOSE",`(?:-?(${s[r.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${s[r.PRERELEASEIDENTIFIERLOOSE]})*))`),t("BUILDIDENTIFIER",`${$}+`),t("BUILD",`(?:\\+(${s[r.BUILDIDENTIFIER]}(?:\\.${s[r.BUILDIDENTIFIER]})*))`),t("FULLPLAIN",`v?${s[r.MAINVERSION]}${s[r.PRERELEASE]}?${s[r.BUILD]}?`),t("FULL",`^${s[r.FULLPLAIN]}$`),t("LOOSEPLAIN",`[v=\\s]*${s[r.MAINVERSIONLOOSE]}${s[r.PRERELEASELOOSE]}?${s[r.BUILD]}?`),t("LOOSE",`^${s[r.LOOSEPLAIN]}$`),t("GTLT","((?:<|>)?=?)"),t("XRANGEIDENTIFIERLOOSE",`${s[r.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),t("XRANGEIDENTIFIER",`${s[r.NUMERICIDENTIFIER]}|x|X|\\*`),t("XRANGEPLAIN",`[v=\\s]*(${s[r.XRANGEIDENTIFIER]})(?:\\.(${s[r.XRANGEIDENTIFIER]})(?:\\.(${s[r.XRANGEIDENTIFIER]})(?:${s[r.PRERELEASE]})?${s[r.BUILD]}?)?)?`),t("XRANGEPLAINLOOSE",`[v=\\s]*(${s[r.XRANGEIDENTIFIERLOOSE]})(?:\\.(${s[r.XRANGEIDENTIFIERLOOSE]})(?:\\.(${s[r.XRANGEIDENTIFIERLOOSE]})(?:${s[r.PRERELEASELOOSE]})?${s[r.BUILD]}?)?)?`),t("XRANGE",`^${s[r.GTLT]}\\s*${s[r.XRANGEPLAIN]}$`),t("XRANGELOOSE",`^${s[r.GTLT]}\\s*${s[r.XRANGEPLAINLOOSE]}$`),t("COERCE",`(^|[^\\d])(\\d{1,${E}})(?:\\.(\\d{1,${E}}))?(?:\\.(\\d{1,${E}}))?(?:$|[^\\d])`),t("COERCERTL",s[r.COERCE],!0),t("LONETILDE","(?:~>?)"),t("TILDETRIM",`(\\s*)${s[r.LONETILDE]}\\s+`,!0),e.tildeTrimReplace="$1~",t("TILDE",`^${s[r.LONETILDE]}${s[r.XRANGEPLAIN]}$`),t("TILDELOOSE",`^${s[r.LONETILDE]}${s[r.XRANGEPLAINLOOSE]}$`),t("LONECARET","(?:\\^)"),t("CARETTRIM",`(\\s*)${s[r.LONECARET]}\\s+`,!0),e.caretTrimReplace="$1^",t("CARET",`^${s[r.LONECARET]}${s[r.XRANGEPLAIN]}$`),t("CARETLOOSE",`^${s[r.LONECARET]}${s[r.XRANGEPLAINLOOSE]}$`),t("COMPARATORLOOSE",`^${s[r.GTLT]}\\s*(${s[r.LOOSEPLAIN]})$|^$`),t("COMPARATOR",`^${s[r.GTLT]}\\s*(${s[r.FULLPLAIN]})$|^$`),t("COMPARATORTRIM",`(\\s*)${s[r.GTLT]}\\s*(${s[r.LOOSEPLAIN]}|${s[r.XRANGEPLAIN]})`,!0),e.comparatorTrimReplace="$1$2$3",t("HYPHENRANGE",`^\\s*(${s[r.XRANGEPLAIN]})\\s+-\\s+(${s[r.XRANGEPLAIN]})\\s*$`),t("HYPHENRANGELOOSE",`^\\s*(${s[r.XRANGEPLAINLOOSE]})\\s+-\\s+(${s[r.XRANGEPLAINLOOSE]})\\s*$`),t("STAR","(<|>)?=?\\s*\\*"),t("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$"),t("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")})(A,A.exports);var x=A.exports;const B=Object.freeze({loose:!0}),z=Object.freeze({}),Y=i=>i?typeof i!="object"?B:i:z;var Z=Y;const T=/^[0-9]+$/,M=(i,e)=>{const E=T.test(i),n=T.test(e);return E&&n&&(i=+i,e=+e),i===e?0:E&&!n?-1:n&&!E?1:i<e?-1:1},K=(i,e)=>M(e,i);var q={compareIdentifiers:M,rcompareIdentifiers:K};const h=F,{MAX_LENGTH:m,MAX_SAFE_INTEGER:p}=G,{safeRe:f,t:S}=x,J=Z,{compareIdentifiers:N}=q;let Q=class o{constructor(e,E){if(E=J(E),e instanceof o){if(e.loose===!!E.loose&&e.includePrerelease===!!E.includePrerelease)return e;e=e.version}else if(typeof e!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>m)throw new TypeError(`version is longer than ${m} characters`);h("SemVer",e,E),this.options=E,this.loose=!!E.loose,this.includePrerelease=!!E.includePrerelease;const n=e.trim().match(E.loose?f[S.LOOSE]:f[S.FULL]);if(!n)throw new TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+n[1],this.minor=+n[2],this.patch=+n[3],this.major>p||this.major<0)throw new TypeError("Invalid major version");if(this.minor>p||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>p||this.patch<0)throw new TypeError("Invalid patch version");n[4]?this.prerelease=n[4].split(".").map(a=>{if(/^[0-9]+$/.test(a)){const I=+a;if(I>=0&&I<p)return I}return a}):this.prerelease=[],this.build=n[5]?n[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(h("SemVer.compare",this.version,this.options,e),!(e instanceof o)){if(typeof e=="string"&&e===this.version)return 0;e=new o(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof o||(e=new o(e,this.options)),N(this.major,e.major)||N(this.minor,e.minor)||N(this.patch,e.patch)}comparePre(e){if(e instanceof o||(e=new o(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let E=0;do{const n=this.prerelease[E],a=e.prerelease[E];if(h("prerelease compare",E,n,a),n===void 0&&a===void 0)return 0;if(a===void 0)return 1;if(n===void 0)return-1;if(n===a)continue;return N(n,a)}while(++E)}compareBuild(e){e instanceof o||(e=new o(e,this.options));let E=0;do{const n=this.build[E],a=e.build[E];if(h("prerelease compare",E,n,a),n===void 0&&a===void 0)return 0;if(a===void 0)return 1;if(n===void 0)return-1;if(n===a)continue;return N(n,a)}while(++E)}inc(e,E,n){switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",E,n);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",E,n);break;case"prepatch":this.prerelease.length=0,this.inc("patch",E,n),this.inc("pre",E,n);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",E,n),this.inc("pre",E,n);break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{const a=Number(n)?1:0;if(!E&&n===!1)throw new Error("invalid increment argument: identifier is empty");if(this.prerelease.length===0)this.prerelease=[a];else{let I=this.prerelease.length;for(;--I>=0;)typeof this.prerelease[I]=="number"&&(this.prerelease[I]++,I=-2);if(I===-1){if(E===this.prerelease.join(".")&&n===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(a)}}if(E){let I=[E,a];n===!1&&(I=[E]),N(this.prerelease[0],E)===0?isNaN(this.prerelease[1])&&(this.prerelease=I):this.prerelease=I}break}default:throw new Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}};var g=Q;const u=g,W=(i,e,E=!1)=>{if(i instanceof u)return i;try{return new u(i,e)}catch(n){if(!E)return null;throw n}};var ee=W;const se=ee,re=(i,e)=>{const E=se(i,e);return E?E.version:null};var Ee=re;const Re=P(Ee),D=g,te=(i,e,E)=>new D(i,E).compare(new D(e,E));var ne=te;const ie=ne,ae=(i,e,E)=>ie(i,e,E)<0;var Ie=ae;const ce=P(Ie);export{G as a,Z as b,ne as c,F as d,Re as e,ce as f,q as i,Ie as l,ee as p,x as r,g as s,Ee as v};
