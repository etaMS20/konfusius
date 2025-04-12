"use strict";(self.webpackChunkkonfusius=self.webpackChunkkonfusius||[]).push([[938],{10724:(y,l,o)=>{Object.defineProperty(l,"__esModule",{value:!0}),l.shouldPolyfill=function c(a){if(void 0===a&&(a="en"),!("RelativeTimeFormat"in Intl)||!function t(a){if(!a)return!0;var e=Array.isArray(a)?a:[a];return Intl.RelativeTimeFormat.supportedLocalesOf(e).length===e.length}(a)||!function v(a){try{return"numberingSystem"in new Intl.RelativeTimeFormat(a||"en",{numeric:"auto"}).resolvedOptions()}catch{return!1}}(a))return(0,n.match)([a],s.supportedLocales,"en")};var n=o(89647),s=o(40902)},24260:(y,l,o)=>{Object.defineProperty(l,"__esModule",{value:!0}),l.MakePartsList=function s(t,v,c){for(var e=[],r=0,f=(0,n.PartitionPattern)(t);r<f.length;r++){var i=f[r];if("literal"===i.type)e.push({type:"literal",value:i.value});else{(0,n.invariant)("0"===i.type,"Malformed pattern ".concat(t));for(var u=0,d=c;u<d.length;u++){var p=d[u];e.push({type:p.type,value:p.value,unit:v})}}}return e};var n=o(47097)},26214:(y,l,o)=>{Object.defineProperty(l,"__esModule",{value:!0}),l.InitializeRelativeTimeFormat=function v(c,a,e,r){var i=r.availableLocales,u=r.relevantExtensionKeys,d=r.localeData,p=r.getDefaultLocale,m=(0,r.getInternalSlots)(c);m.initializedRelativeTimeFormat=!0;var g=(0,n.CanonicalizeLocaleList)(a),h=Object.create(null),b=(0,n.CoerceOptionsToObject)(e),T=(0,n.GetOption)(b,"localeMatcher","string",["best fit","lookup"],"best fit");h.localeMatcher=T;var L=(0,n.GetOption)(b,"numberingSystem","string",void 0,void 0);if(void 0!==L&&!t.test(L))throw new RangeError("Invalid numbering system ".concat(L));h.nu=L;var S=(0,s.ResolveLocale)(i,g,h,u,d,p),R=S.nu;m.locale=S.locale,m.style=(0,n.GetOption)(b,"style","string",["long","narrow","short"],"long"),m.numeric=(0,n.GetOption)(b,"numeric","string",["always","auto"],"always");var M=d[S.dataLocale];return(0,n.invariant)(!!M,"Missing locale data for ".concat(S.dataLocale)),m.fields=M,m.numberFormat=(0,n.createMemoizedNumberFormat)(a),m.pluralRules=(0,n.createMemoizedPluralRules)(a),m.numberingSystem=R,c};var n=o(47097),s=o(89647),t=/^[a-z0-9]{3,8}(-[a-z0-9]{3,8})*$/i},39348:(y,l,o)=>{Object.defineProperty(l,"__esModule",{value:!0}),l.SingularRelativeTimeUnit=function s(t){if((0,n.invariant)("String"===(0,n.Type)(t),"unit must be a string"),"seconds"===t)return"second";if("minutes"===t)return"minute";if("hours"===t)return"hour";if("days"===t)return"day";if("weeks"===t)return"week";if("months"===t)return"month";if("quarters"===t)return"quarter";if("years"===t)return"year";if("second"!==t&&"minute"!==t&&"hour"!==t&&"day"!==t&&"week"!==t&&"month"!==t&&"quarter"!==t&&"year"!==t)throw new RangeError("invalid unit");return t};var n=o(47097)},40902:(y,l)=>{Object.defineProperty(l,"__esModule",{value:!0}),l.supportedLocales=void 0,l.supportedLocales=["af","af-NA","agq","ak","am","ar","ar-AE","ar-BH","ar-DJ","ar-DZ","ar-EG","ar-EH","ar-ER","ar-IL","ar-IQ","ar-JO","ar-KM","ar-KW","ar-LB","ar-LY","ar-MA","ar-MR","ar-OM","ar-PS","ar-QA","ar-SA","ar-SD","ar-SO","ar-SS","ar-SY","ar-TD","ar-TN","ar-YE","as","asa","ast","az","az-Cyrl","az-Latn","bas","be","be-tarask","bem","bez","bg","bm","bn","bn-IN","bo","bo-IN","br","brx","bs","bs-Cyrl","bs-Latn","ca","ca-AD","ca-ES-valencia","ca-FR","ca-IT","ccp","ccp-IN","ce","ceb","cgg","chr","ckb","ckb-IR","cs","cy","da","da-GL","dav","de","de-AT","de-BE","de-CH","de-IT","de-LI","de-LU","dje","doi","dsb","dua","dyo","dz","ebu","ee","ee-TG","el","el-CY","en","en-001","en-150","en-AE","en-AG","en-AI","en-AS","en-AT","en-AU","en-BB","en-BE","en-BI","en-BM","en-BS","en-BW","en-BZ","en-CA","en-CC","en-CH","en-CK","en-CM","en-CX","en-CY","en-DE","en-DG","en-DK","en-DM","en-ER","en-FI","en-FJ","en-FK","en-FM","en-GB","en-GD","en-GG","en-GH","en-GI","en-GM","en-GU","en-GY","en-HK","en-IE","en-IL","en-IM","en-IN","en-IO","en-JE","en-JM","en-KE","en-KI","en-KN","en-KY","en-LC","en-LR","en-LS","en-MG","en-MH","en-MO","en-MP","en-MS","en-MT","en-MU","en-MW","en-MY","en-NA","en-NF","en-NG","en-NL","en-NR","en-NU","en-NZ","en-PG","en-PH","en-PK","en-PN","en-PR","en-PW","en-RW","en-SB","en-SC","en-SD","en-SE","en-SG","en-SH","en-SI","en-SL","en-SS","en-SX","en-SZ","en-TC","en-TK","en-TO","en-TT","en-TV","en-TZ","en-UG","en-UM","en-VC","en-VG","en-VI","en-VU","en-WS","en-ZA","en-ZM","en-ZW","eo","es","es-419","es-AR","es-BO","es-BR","es-BZ","es-CL","es-CO","es-CR","es-CU","es-DO","es-EA","es-EC","es-GQ","es-GT","es-HN","es-IC","es-MX","es-NI","es-PA","es-PE","es-PH","es-PR","es-PY","es-SV","es-US","es-UY","es-VE","et","eu","ewo","fa","fa-AF","ff","ff-Adlm","ff-Adlm-BF","ff-Adlm-CM","ff-Adlm-GH","ff-Adlm-GM","ff-Adlm-GW","ff-Adlm-LR","ff-Adlm-MR","ff-Adlm-NE","ff-Adlm-NG","ff-Adlm-SL","ff-Adlm-SN","ff-Latn","ff-Latn-BF","ff-Latn-CM","ff-Latn-GH","ff-Latn-GM","ff-Latn-GN","ff-Latn-GW","ff-Latn-LR","ff-Latn-MR","ff-Latn-NE","ff-Latn-NG","ff-Latn-SL","fi","fil","fo","fo-DK","fr","fr-BE","fr-BF","fr-BI","fr-BJ","fr-BL","fr-CA","fr-CD","fr-CF","fr-CG","fr-CH","fr-CI","fr-CM","fr-DJ","fr-DZ","fr-GA","fr-GF","fr-GN","fr-GP","fr-GQ","fr-HT","fr-KM","fr-LU","fr-MA","fr-MC","fr-MF","fr-MG","fr-ML","fr-MQ","fr-MR","fr-MU","fr-NC","fr-NE","fr-PF","fr-PM","fr-RE","fr-RW","fr-SC","fr-SN","fr-SY","fr-TD","fr-TG","fr-TN","fr-VU","fr-WF","fr-YT","fur","fy","ga","ga-GB","gd","gl","gsw","gsw-FR","gsw-LI","gu","guz","gv","ha","ha-GH","ha-NE","haw","he","hi","hr","hr-BA","hsb","hu","hy","ia","id","ig","ii","is","it","it-CH","it-SM","it-VA","ja","jgo","jmc","jv","ka","kab","kam","kde","kea","kgp","khq","ki","kk","kkj","kl","kln","km","kn","ko","ko-KP","kok","ks","ks-Arab","ksb","ksf","ksh","ku","kw","ky","lag","lb","lg","lkt","ln","ln-AO","ln-CF","ln-CG","lo","lrc","lrc-IQ","lt","lu","luo","luy","lv","mai","mas","mas-TZ","mer","mfe","mg","mgh","mgo","mi","mk","ml","mn","mni","mni-Beng","mr","ms","ms-BN","ms-ID","ms-SG","mt","mua","my","mzn","naq","nb","nb-SJ","nd","nds","nds-NL","ne","ne-IN","nl","nl-AW","nl-BE","nl-BQ","nl-CW","nl-SR","nl-SX","nmg","nn","nnh","no","nus","nyn","om","om-KE","or","os","os-RU","pa","pa-Arab","pa-Guru","pcm","pl","ps","ps-PK","pt","pt-AO","pt-CH","pt-CV","pt-GQ","pt-GW","pt-LU","pt-MO","pt-MZ","pt-PT","pt-ST","pt-TL","qu","qu-BO","qu-EC","rm","rn","ro","ro-MD","rof","ru","ru-BY","ru-KG","ru-KZ","ru-MD","ru-UA","rw","rwk","sa","sah","saq","sat","sat-Olck","sbp","sc","sd","sd-Arab","sd-Deva","se","se-FI","se-SE","seh","ses","sg","shi","shi-Latn","shi-Tfng","si","sk","sl","smn","sn","so","so-DJ","so-ET","so-KE","sq","sq-MK","sq-XK","sr","sr-Cyrl","sr-Cyrl-BA","sr-Cyrl-ME","sr-Cyrl-XK","sr-Latn","sr-Latn-BA","sr-Latn-ME","sr-Latn-XK","su","su-Latn","sv","sv-AX","sv-FI","sw","sw-CD","sw-KE","sw-UG","ta","ta-LK","ta-MY","ta-SG","te","teo","teo-KE","tg","th","ti","ti-ER","tk","to","tr","tr-CY","tt","twq","tzm","ug","uk","und","ur","ur-IN","uz","uz-Arab","uz-Cyrl","uz-Latn","vai","vai-Latn","vai-Vaii","vi","vun","wae","wo","xh","xog","yav","yi","yo","yo-BJ","yrl","yrl-CO","yrl-VE","yue","yue-Hans","yue-Hant","zgh","zh","zh-Hans","zh-Hans-HK","zh-Hans-MO","zh-Hans-SG","zh-Hant","zh-Hant-HK","zh-Hant-MO","zu"]},61259:(y,l)=>{Object.defineProperty(l,"__esModule",{value:!0}),l.default=function n(s){var t=o.get(s);return t||o.set(s,t=Object.create(null)),t};var o=new WeakMap},65938:(y,l,o)=>{Object.defineProperty(l,"__esModule",{value:!0});var s=o(5482).__importDefault(o(86485));(0,o(10724).shouldPolyfill)()&&Object.defineProperty(Intl,"RelativeTimeFormat",{value:s.default,writable:!0,enumerable:!1,configurable:!0})},86485:(y,l,o)=>{Object.defineProperty(l,"__esModule",{value:!0});var n=o(5482),s=o(47097),t=o(26214),v=o(97249),c=n.__importDefault(o(61259)),a=function(){function e(r,f){if(!(this&&this instanceof e?this.constructor:void 0))throw new TypeError("Intl.RelativeTimeFormat must be called with 'new'");return(0,t.InitializeRelativeTimeFormat)(this,r,f,{getInternalSlots:c.default,availableLocales:e.availableLocales,relevantExtensionKeys:e.relevantExtensionKeys,localeData:e.localeData,getDefaultLocale:e.getDefaultLocale})}return e.prototype.format=function(r,f){if("object"!=typeof this)throw new TypeError("format was called on a non-object");if(!(0,c.default)(this).initializedRelativeTimeFormat)throw new TypeError("format was called on a invalid context");return(0,v.PartitionRelativeTimePattern)(this,Number(r),(0,s.ToString)(f),{getInternalSlots:c.default}).map(function(u){return u.value}).join("")},e.prototype.formatToParts=function(r,f){if("object"!=typeof this)throw new TypeError("formatToParts was called on a non-object");if(!(0,c.default)(this).initializedRelativeTimeFormat)throw new TypeError("formatToParts was called on a invalid context");return(0,v.PartitionRelativeTimePattern)(this,Number(r),(0,s.ToString)(f),{getInternalSlots:c.default})},e.prototype.resolvedOptions=function(){if("object"!=typeof this)throw new TypeError("resolvedOptions was called on a non-object");var r=(0,c.default)(this);if(!r.initializedRelativeTimeFormat)throw new TypeError("resolvedOptions was called on a invalid context");return{locale:r.locale,style:r.style,numeric:r.numeric,numberingSystem:r.numberingSystem}},e.supportedLocalesOf=function(r,f){return(0,s.SupportedLocales)(e.availableLocales,(0,s.CanonicalizeLocaleList)(r),f)},e.__addLocaleData=function(){for(var r=[],f=0;f<arguments.length;f++)r[f]=arguments[f];for(var i=0,u=r;i<u.length;i++){var d=u[i],p=d.data,m=d.locale,g=new Intl.Locale(m).minimize().toString();e.localeData[m]=e.localeData[g]=p,e.availableLocales.add(g),e.availableLocales.add(m),e.__defaultLocale||(e.__defaultLocale=g)}},e.getDefaultLocale=function(){return e.__defaultLocale},e.localeData={},e.availableLocales=new Set,e.__defaultLocale="",e.relevantExtensionKeys=["nu"],e.polyfilled=!0,e}();l.default=a;try{typeof Symbol<"u"&&Object.defineProperty(a.prototype,Symbol.toStringTag,{value:"Intl.RelativeTimeFormat",writable:!1,enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype.constructor,"length",{value:0,writable:!1,enumerable:!1,configurable:!0}),Object.defineProperty(a.supportedLocalesOf,"length",{value:1,writable:!1,enumerable:!1,configurable:!0})}catch{}},97249:(y,l,o)=>{Object.defineProperty(l,"__esModule",{value:!0}),l.PartitionRelativeTimePattern=function v(c,a,e,r){var f=r.getInternalSlots;if((0,n.invariant)("Number"===(0,n.Type)(a),"value must be number, instead got ".concat(typeof a),TypeError),(0,n.invariant)("String"===(0,n.Type)(e),"unit must be number, instead got ".concat(typeof a),TypeError),isNaN(a)||!isFinite(a))throw new RangeError("Invalid value ".concat(a));var i=(0,s.SingularRelativeTimeUnit)(e),u=f(c),d=u.fields,p=u.style,m=u.numeric,g=u.pluralRules,h=u.numberFormat,b=i;"short"===p?b="".concat(i,"-short"):"narrow"===p&&(b="".concat(i,"-narrow")),b in d||(b=i);var T=d[b];if("auto"===m&&(0,n.ToString)(a)in T)return[{type:"literal",value:T[(0,n.ToString)(a)]}];var L="future";((0,n.SameValue)(a,-0)||a<0)&&(L="past");var S=T[L],w="function"==typeof h.formatToParts?h.formatToParts(Math.abs(a)):[{type:"literal",value:h.format(Math.abs(a)),unit:e}],R=g.select(a);return(0,t.MakePartsList)(S[R],i,w)};var n=o(47097),s=o(39348),t=o(24260)}}]);