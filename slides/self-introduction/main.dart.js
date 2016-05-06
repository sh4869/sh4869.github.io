(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
return y.__proto__&&y.__proto__.p===z.prototype.p}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isb=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isf)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="b"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="m"){processStatics(init.statics[b1]=b2.m,b3)
delete b2.m}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.ca"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.ca"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.ca(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.br=function(){}
var dart=[["","",,H,{"^":"",jU:{"^":"b;a"}}],["","",,J,{"^":"",
l:function(a){return void 0},
bu:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bs:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cf==null){H.iX()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.dy("Return interceptor for "+H.c(y(a,z))))}w=H.j6(a)
if(w==null){if(typeof a=="function")return C.K
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.P
else return C.Q}return w},
f:{"^":"b;",
p:function(a,b){return a===b},
gA:function(a){return H.a8(a)},
k:["cT",function(a){return H.bd(a)}],
"%":"Blob|DOMError|DOMImplementation|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|Range|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedRect|SVGAnimatedString"},
fy:{"^":"f;",
k:function(a){return String(a)},
gA:function(a){return a?519018:218159},
$isc9:1},
fA:{"^":"f;",
p:function(a,b){return null==b},
k:function(a){return"null"},
gA:function(a){return 0}},
bK:{"^":"f;",
gA:function(a){return 0},
k:["cV",function(a){return String(a)}],
$isfB:1},
h_:{"^":"bK;"},
aU:{"^":"bK;"},
aO:{"^":"bK;",
k:function(a){var z=a[$.$get$cx()]
return z==null?this.cV(a):J.U(z)}},
aL:{"^":"f;",
c7:function(a,b){if(!!a.immutable$list)throw H.d(new P.N(b))},
aE:function(a,b){if(!!a.fixed$length)throw H.d(new P.N(b))},
u:function(a,b){var z
this.aE(a,"addAll")
for(z=J.ap(b);z.l();)a.push(z.gn())},
E:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(new P.B(a))}},
a1:function(a,b){return H.h(new H.aQ(a,b),[null,null])},
J:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.c(a[x])
if(x>=z)return H.a(y,x)
y[x]=w}return y.join(b)},
C:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
cS:function(a,b,c){if(b<0||b>a.length)throw H.d(P.S(b,0,a.length,"start",null))
c=a.length
if(b===c)return H.h([],[H.a_(a,0)])
return H.h(a.slice(b,c),[H.a_(a,0)])},
cR:function(a,b){return this.cS(a,b,null)},
gca:function(a){if(a.length>0)return a[0]
throw H.d(H.b8())},
gK:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.d(H.b8())},
en:function(a,b,c){this.aE(a,"removeRange")
P.bV(b,c,a.length,null,null,null)
a.splice(b,c-b)},
aw:function(a,b,c,d,e){var z,y,x
this.c7(a,"set range")
P.bV(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.r(P.S(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.d(H.fw())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.a(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.a(d,x)
a[b+y]=d[x]}},
cL:function(a,b,c,d){return this.aw(a,b,c,d,0)},
a9:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.d(new P.B(a))}return!1},
e2:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.u(a[z],b))return z
return-1},
e1:function(a,b){return this.e2(a,b,0)},
t:function(a,b){var z
for(z=0;z<a.length;++z)if(J.u(a[z],b))return!0
return!1},
k:function(a){return P.b7(a,"[","]")},
gq:function(a){return new J.ev(a,a.length,0,null)},
gA:function(a){return H.a8(a)},
gj:function(a){return a.length},
sj:function(a,b){this.aE(a,"set length")
if(b<0)throw H.d(P.S(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.v(a,b))
if(b>=a.length||b<0)throw H.d(H.v(a,b))
return a[b]},
i:function(a,b,c){if(!!a.immutable$list)H.r(new P.N("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.v(a,b))
if(b>=a.length||b<0)throw H.d(H.v(a,b))
a[b]=c},
$isav:1,
$isi:1,
$asi:null,
$isk:1},
jT:{"^":"aL;"},
ev:{"^":"b;a,b,c,d",
gn:function(){return this.d},
l:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(H.K(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aM:{"^":"f;",
aF:function(a,b){var z
if(typeof b!=="number")throw H.d(H.I(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbg(b)
if(this.gbg(a)===z)return 0
if(this.gbg(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbg:function(a){return a===0?1/a<0:a<0},
br:function(a,b){return a%b},
w:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(new P.N(""+a))},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gA:function(a){return a&0x1FFFFFFF},
af:function(a,b){if(typeof b!=="number")throw H.d(H.I(b))
return a+b},
F:function(a,b){return(a|0)===a?a/b|0:this.w(a/b)},
c1:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ah:function(a,b){if(typeof b!=="number")throw H.d(H.I(b))
return a<b},
ag:function(a,b){if(typeof b!=="number")throw H.d(H.I(b))
return a>b},
$isb1:1},
cQ:{"^":"aM;",$isb1:1,$iso:1},
fz:{"^":"aM;",$isb1:1},
aN:{"^":"f;",
Y:function(a,b){if(b<0)throw H.d(H.v(a,b))
if(b>=a.length)throw H.d(H.v(a,b))
return a.charCodeAt(b)},
dH:function(a,b,c){H.q(b)
H.dZ(c)
if(c>b.length)throw H.d(P.S(c,0,b.length,null,null))
return new H.iq(b,a,c)},
dG:function(a,b){return this.dH(a,b,0)},
as:function(a,b,c){var z,y
if(c>b.length)throw H.d(P.S(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.Y(b,c+y)!==this.Y(a,y))return
return new H.dh(c,b,a)},
af:function(a,b){if(typeof b!=="string")throw H.d(P.bB(b,null,null))
return a+b},
dV:function(a,b){var z,y
H.q(b)
z=b.length
y=a.length
if(z>y)return!1
return b===this.aQ(a,y-z)},
aI:function(a,b,c){H.q(c)
return H.z(a,b,c)},
cP:function(a,b,c){var z
H.dZ(c)
if(c>a.length)throw H.d(P.S(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.eq(b,a,c)!=null},
aP:function(a,b){return this.cP(a,b,0)},
a4:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)H.r(H.I(b))
if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.r(H.I(c))
if(b<0)throw H.d(P.aR(b,null,null))
if(typeof c!=="number")return H.O(c)
if(b>c)throw H.d(P.aR(b,null,null))
if(c>a.length)throw H.d(P.aR(c,null,null))
return a.substring(b,c)},
aQ:function(a,b){return this.a4(a,b,null)},
eu:function(a){return a.toLowerCase()},
ez:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.Y(z,0)===133){x=J.fC(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.Y(z,w)===133?J.fD(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
dL:function(a,b,c){if(b==null)H.r(H.I(b))
if(c>a.length)throw H.d(P.S(c,0,a.length,null,null))
return H.je(a,b,c)},
aF:function(a,b){var z
if(typeof b!=="string")throw H.d(H.I(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gA:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.v(a,b))
if(b>=a.length||b<0)throw H.d(H.v(a,b))
return a[b]},
$isav:1,
$isj:1,
m:{
cR:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 6158:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
fC:function(a,b){var z,y
for(z=a.length;b<z;){y=C.e.Y(a,b)
if(y!==32&&y!==13&&!J.cR(y))break;++b}return b},
fD:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.e.Y(a,z)
if(y!==32&&y!==13&&!J.cR(y))break}return b}}}}],["","",,H,{"^":"",
aW:function(a,b){var z=a.ao(b)
if(!init.globalState.d.cy)init.globalState.f.at()
return z},
ea:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isi)throw H.d(P.bA("Arguments to main must be a List: "+H.c(y)))
init.globalState=new H.i9(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$cN()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.hO(P.bO(null,H.aV),0)
y.z=H.h(new H.a6(0,null,null,null,null,null,0),[P.o,H.c2])
y.ch=H.h(new H.a6(0,null,null,null,null,null,0),[P.o,null])
if(y.x===!0){x=new H.i8()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fp,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.ia)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.h(new H.a6(0,null,null,null,null,null,0),[P.o,H.be])
w=P.H(null,null,null,P.o)
v=new H.be(0,null,!1)
u=new H.c2(y,x,w,init.createNewIsolate(),v,new H.ad(H.bw()),new H.ad(H.bw()),!1,!1,[],P.H(null,null,null,null),null,null,!1,!0,P.H(null,null,null,null))
w.v(0,0)
u.bH(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.b_()
x=H.an(y,[y]).W(a)
if(x)u.ao(new H.jc(z,a))
else{y=H.an(y,[y,y]).W(a)
if(y)u.ao(new H.jd(z,a))
else u.ao(a)}init.globalState.f.at()},
ft:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.fu()
return},
fu:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.d(new P.N("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.d(new P.N('Cannot extract URI from "'+H.c(z)+'"'))},
fp:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bj(!0,[]).Z(b.data)
y=J.J(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bj(!0,[]).Z(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bj(!0,[]).Z(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.h(new H.a6(0,null,null,null,null,null,0),[P.o,H.be])
p=P.H(null,null,null,P.o)
o=new H.be(0,null,!1)
n=new H.c2(y,q,p,init.createNewIsolate(),o,new H.ad(H.bw()),new H.ad(H.bw()),!1,!1,[],P.H(null,null,null,null),null,null,!1,!0,P.H(null,null,null,null))
p.v(0,0)
n.bH(0,o)
init.globalState.f.a.T(new H.aV(n,new H.fq(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.at()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.ar(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.at()
break
case"close":init.globalState.ch.O(0,$.$get$cO().h(0,a))
a.terminate()
init.globalState.f.at()
break
case"log":H.fo(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ax(["command","print","msg",z])
q=new H.ak(!0,P.aB(null,P.o)).I(q)
y.toString
self.postMessage(q)}else P.bv(y.h(z,"msg"))
break
case"error":throw H.d(y.h(z,"msg"))}},
fo:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ax(["command","log","msg",a])
x=new H.ak(!0,P.aB(null,P.o)).I(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.A(w)
z=H.M(w)
throw H.d(P.b5(z))}},
fr:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.d7=$.d7+("_"+y)
$.d8=$.d8+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.ar(f,["spawned",new H.bk(y,x),w,z.r])
x=new H.fs(a,b,c,d,z)
if(e===!0){z.c4(w,w)
init.globalState.f.a.T(new H.aV(z,x,"start isolate"))}else x.$0()},
iC:function(a){return new H.bj(!0,[]).Z(new H.ak(!1,P.aB(null,P.o)).I(a))},
jc:{"^":"e:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
jd:{"^":"e:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
i9:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",m:{
ia:function(a){var z=P.ax(["command","print","msg",a])
return new H.ak(!0,P.aB(null,P.o)).I(z)}}},
c2:{"^":"b;a,b,c,e6:d<,dM:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
c4:function(a,b){if(!this.f.p(0,a))return
if(this.Q.v(0,b)&&!this.y)this.y=!0
this.ba()},
em:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.O(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.a(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.a(v,w)
v[w]=x
if(w===y.c)y.bM();++y.d}this.y=!1}this.ba()},
dF:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.p(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.a(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
el:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.p(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.r(new P.N("removeRange"))
P.bV(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cK:function(a,b){if(!this.r.p(0,a))return
this.db=b},
dX:function(a,b,c){var z=J.l(b)
if(!z.p(b,0))z=z.p(b,1)&&!this.cy
else z=!0
if(z){J.ar(a,c)
return}z=this.cx
if(z==null){z=P.bO(null,null)
this.cx=z}z.T(new H.i3(a,c))},
dW:function(a,b){var z
if(!this.r.p(0,a))return
z=J.l(b)
if(!z.p(b,0))z=z.p(b,1)&&!this.cy
else z=!0
if(z){this.bh()
return}z=this.cx
if(z==null){z=P.bO(null,null)
this.cx=z}z.T(this.ge8())},
dY:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bv(a)
if(b!=null)P.bv(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.U(a)
y[1]=b==null?null:J.U(b)
for(x=new P.aA(z,z.r,null,null),x.c=z.e;x.l();)J.ar(x.d,y)},
ao:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.A(u)
w=t
v=H.M(u)
this.dY(w,v)
if(this.db===!0){this.bh()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.ge6()
if(this.cx!=null)for(;t=this.cx,!t.gG(t);)this.cx.cn().$0()}return y},
bj:function(a){return this.b.h(0,a)},
bH:function(a,b){var z=this.b
if(z.c9(a))throw H.d(P.b5("Registry: ports must be registered only once."))
z.i(0,a,b)},
ba:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.i(0,this.a,this)
else this.bh()},
bh:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.ab(0)
for(z=this.b,y=z.gcz(z),y=y.gq(y);y.l();)y.gn().de()
z.ab(0)
this.c.ab(0)
init.globalState.z.O(0,this.a)
this.dx.ab(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.a(z,v)
J.ar(w,z[v])}this.ch=null}},"$0","ge8",0,0,2]},
i3:{"^":"e:2;a,b",
$0:function(){J.ar(this.a,this.b)}},
hO:{"^":"b;a,b",
dP:function(){var z=this.a
if(z.b===z.c)return
return z.cn()},
cr:function(){var z,y,x
z=this.dP()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.c9(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gG(y)}else y=!1
else y=!1
else y=!1
if(y)H.r(P.b5("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gG(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ax(["command","close"])
x=new H.ak(!0,H.h(new P.dK(0,null,null,null,null,null,0),[null,P.o])).I(x)
y.toString
self.postMessage(x)}return!1}z.ej()
return!0},
bY:function(){if(self.window!=null)new H.hP(this).$0()
else for(;this.cr(););},
at:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bY()
else try{this.bY()}catch(x){w=H.A(x)
z=w
y=H.M(x)
w=init.globalState.Q
v=P.ax(["command","error","msg",H.c(z)+"\n"+H.c(y)])
v=new H.ak(!0,P.aB(null,P.o)).I(v)
w.toString
self.postMessage(v)}}},
hP:{"^":"e:2;a",
$0:function(){if(!this.a.cr())return
P.hs(C.j,this)}},
aV:{"^":"b;a,b,c",
ej:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ao(this.b)}},
i8:{"^":"b;"},
fq:{"^":"e:0;a,b,c,d,e,f",
$0:function(){H.fr(this.a,this.b,this.c,this.d,this.e,this.f)}},
fs:{"^":"e:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.b_()
w=H.an(x,[x,x]).W(y)
if(w)y.$2(this.b,this.c)
else{x=H.an(x,[x]).W(y)
if(x)y.$1(this.b)
else y.$0()}}z.ba()}},
dB:{"^":"b;"},
bk:{"^":"dB;b,a",
aM:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbQ())return
x=H.iC(b)
if(z.gdM()===y){y=J.J(x)
switch(y.h(x,0)){case"pause":z.c4(y.h(x,1),y.h(x,2))
break
case"resume":z.em(y.h(x,1))
break
case"add-ondone":z.dF(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.el(y.h(x,1))
break
case"set-errors-fatal":z.cK(y.h(x,1),y.h(x,2))
break
case"ping":z.dX(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.dW(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.v(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.O(0,y)
break}return}y=init.globalState.f
w="receive "+H.c(b)
y.a.T(new H.aV(z,new H.ic(this,x),w))},
p:function(a,b){if(b==null)return!1
return b instanceof H.bk&&J.u(this.b,b.b)},
gA:function(a){return this.b.gb3()}},
ic:{"^":"e:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbQ())z.d9(this.b)}},
c3:{"^":"dB;b,c,a",
aM:function(a,b){var z,y,x
z=P.ax(["command","message","port",this,"msg",b])
y=new H.ak(!0,P.aB(null,P.o)).I(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
p:function(a,b){if(b==null)return!1
return b instanceof H.c3&&J.u(this.b,b.b)&&J.u(this.a,b.a)&&J.u(this.c,b.c)},
gA:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cM()
y=this.a
if(typeof y!=="number")return y.cM()
x=this.c
if(typeof x!=="number")return H.O(x)
return(z<<16^y<<8^x)>>>0}},
be:{"^":"b;b3:a<,b,bQ:c<",
de:function(){this.c=!0
this.b=null},
d9:function(a){if(this.c)return
this.dn(a)},
dn:function(a){return this.b.$1(a)},
$ish1:1},
ho:{"^":"b;a,b,c",
d4:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.T(new H.aV(y,new H.hq(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aF(new H.hr(this,b),0),a)}else throw H.d(new P.N("Timer greater than 0."))},
m:{
hp:function(a,b){var z=new H.ho(!0,!1,null)
z.d4(a,b)
return z}}},
hq:{"^":"e:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
hr:{"^":"e:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
ad:{"^":"b;b3:a<",
gA:function(a){var z=this.a
if(typeof z!=="number")return z.eC()
z=C.d.c1(z,0)^C.d.F(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
p:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ad){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ak:{"^":"b;a,b",
I:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.i(0,a,z.gj(z))
z=J.l(a)
if(!!z.$isd_)return["buffer",a]
if(!!z.$isbR)return["typed",a]
if(!!z.$isav)return this.cG(a)
if(!!z.$isfn){x=this.gcD()
w=a.gU()
w=H.bb(w,x,H.E(w,"y",0),null)
w=P.aP(w,!0,H.E(w,"y",0))
z=z.gcz(a)
z=H.bb(z,x,H.E(z,"y",0),null)
return["map",w,P.aP(z,!0,H.E(z,"y",0))]}if(!!z.$isfB)return this.cH(a)
if(!!z.$isf)this.cv(a)
if(!!z.$ish1)this.au(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbk)return this.cI(a)
if(!!z.$isc3)return this.cJ(a)
if(!!z.$ise){v=a.$static_name
if(v==null)this.au(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isad)return["capability",a.a]
if(!(a instanceof P.b))this.cv(a)
return["dart",init.classIdExtractor(a),this.cF(init.classFieldsExtractor(a))]},"$1","gcD",2,0,1],
au:function(a,b){throw H.d(new P.N(H.c(b==null?"Can't transmit:":b)+" "+H.c(a)))},
cv:function(a){return this.au(a,null)},
cG:function(a){var z=this.cE(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.au(a,"Can't serialize indexable: ")},
cE:function(a){var z,y,x
z=[]
C.a.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.I(a[y])
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
cF:function(a){var z
for(z=0;z<a.length;++z)C.a.i(a,z,this.I(a[z]))
return a},
cH:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.au(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.I(a[z[x]])
if(x>=y.length)return H.a(y,x)
y[x]=w}return["js-object",z,y]},
cJ:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cI:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gb3()]
return["raw sendport",a]}},
bj:{"^":"b;a,b",
Z:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.d(P.bA("Bad serialized message: "+H.c(a)))
switch(C.a.gca(a)){case"ref":if(1>=a.length)return H.a(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.a(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.h(this.am(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return H.h(this.am(x),[null])
case"mutable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return this.am(x)
case"const":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.h(this.am(x),[null])
y.fixed$length=Array
return y
case"map":return this.dS(a)
case"sendport":return this.dT(a)
case"raw sendport":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.dR(a)
case"function":if(1>=a.length)return H.a(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.a(a,1)
return new H.ad(a[1])
case"dart":y=a.length
if(1>=y)return H.a(a,1)
w=a[1]
if(2>=y)return H.a(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.am(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.d("couldn't deserialize: "+H.c(a))}},"$1","gdQ",2,0,1],
am:function(a){var z,y,x
z=J.J(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.O(x)
if(!(y<x))break
z.i(a,y,this.Z(z.h(a,y)));++y}return a},
dS:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w=P.a2()
this.b.push(w)
y=J.ep(y,this.gdQ()).bu(0)
for(z=J.J(y),v=J.J(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.a(y,u)
w.i(0,y[u],this.Z(v.h(x,u)))}return w},
dT:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
if(3>=z)return H.a(a,3)
w=a[3]
if(J.u(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bj(w)
if(u==null)return
t=new H.bk(u,x)}else t=new H.c3(y,w,x)
this.b.push(t)
return t},
dR:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.J(y)
v=J.J(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.O(t)
if(!(u<t))break
w[z.h(y,u)]=this.Z(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
iQ:function(a){return init.types[a]},
j5:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isaw},
c:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.U(a)
if(typeof z!=="string")throw H.d(H.I(a))
return z},
a8:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bU:function(a){var z,y,x,w,v,u,t,s
z=J.l(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.C||!!J.l(a).$isaU){v=C.l(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.e.Y(w,0)===36)w=C.e.aQ(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.e3(H.cd(a),0,null),init.mangledGlobalNames)},
bd:function(a){return"Instance of '"+H.bU(a)+"'"},
bT:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.I(a))
return a[b]},
d9:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.I(a))
a[b]=c},
O:function(a){throw H.d(H.I(a))},
a:function(a,b){if(a==null)J.L(a)
throw H.d(H.v(a,b))},
v:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a1(!0,b,"index",null)
z=J.L(a)
if(!(b<0)){if(typeof z!=="number")return H.O(z)
y=b>=z}else y=!0
if(y)return P.aK(b,a,"index",null,z)
return P.aR(b,"index",null)},
I:function(a){return new P.a1(!0,a,null,null)},
dZ:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(H.I(a))
return a},
q:function(a){if(typeof a!=="string")throw H.d(H.I(a))
return a},
d:function(a){var z
if(a==null)a=new P.d6()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.ec})
z.name=""}else z.toString=H.ec
return z},
ec:function(){return J.U(this.dartException)},
r:function(a){throw H.d(a)},
K:function(a){throw H.d(new P.B(a))},
A:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.jg(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.c1(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bL(H.c(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.c(y)+" (Error "+w+")"
return z.$1(new H.d5(v,null))}}if(a instanceof TypeError){u=$.$get$dm()
t=$.$get$dn()
s=$.$get$dp()
r=$.$get$dq()
q=$.$get$du()
p=$.$get$dv()
o=$.$get$ds()
$.$get$dr()
n=$.$get$dx()
m=$.$get$dw()
l=u.L(y)
if(l!=null)return z.$1(H.bL(y,l))
else{l=t.L(y)
if(l!=null){l.method="call"
return z.$1(H.bL(y,l))}else{l=s.L(y)
if(l==null){l=r.L(y)
if(l==null){l=q.L(y)
if(l==null){l=p.L(y)
if(l==null){l=o.L(y)
if(l==null){l=r.L(y)
if(l==null){l=n.L(y)
if(l==null){l=m.L(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.d5(y,l==null?null:l.method))}}return z.$1(new H.hv(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.df()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a1(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.df()
return a},
M:function(a){var z
if(a==null)return new H.dM(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dM(a,null)},
ja:function(a){if(a==null||typeof a!='object')return J.R(a)
else return H.a8(a)},
iP:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.i(0,a[y],a[x])}return b},
j_:function(a,b,c,d,e,f,g){switch(c){case 0:return H.aW(b,new H.j0(a))
case 1:return H.aW(b,new H.j1(a,d))
case 2:return H.aW(b,new H.j2(a,d,e))
case 3:return H.aW(b,new H.j3(a,d,e,f))
case 4:return H.aW(b,new H.j4(a,d,e,f,g))}throw H.d(P.b5("Unsupported number of arguments for wrapped closure"))},
aF:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.j_)
a.$identity=z
return z},
eK:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isi){z.$reflectionInfo=c
x=H.h3(z).r}else x=c
w=d?Object.create(new H.hc().constructor.prototype):Object.create(new H.bD(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.Y
$.Y=J.aG(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.ct(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.iQ,x)
else if(u&&typeof x=="function"){q=t?H.cs:H.bE
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.ct(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
eH:function(a,b,c,d){var z=H.bE
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
ct:function(a,b,c){var z,y,x,w,v,u
if(c)return H.eJ(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.eH(y,!w,z,b)
if(y===0){w=$.at
if(w==null){w=H.b3("self")
$.at=w}w="return function(){return this."+H.c(w)+"."+H.c(z)+"();"
v=$.Y
$.Y=J.aG(v,1)
return new Function(w+H.c(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.at
if(v==null){v=H.b3("self")
$.at=v}v=w+H.c(v)+"."+H.c(z)+"("+u+");"
w=$.Y
$.Y=J.aG(w,1)
return new Function(v+H.c(w)+"}")()},
eI:function(a,b,c,d){var z,y
z=H.bE
y=H.cs
switch(b?-1:a){case 0:throw H.d(new H.h4("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eJ:function(a,b){var z,y,x,w,v,u,t,s
z=H.eC()
y=$.cr
if(y==null){y=H.b3("receiver")
$.cr=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eI(w,!u,x,b)
if(w===1){y="return function(){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+");"
u=$.Y
$.Y=J.aG(u,1)
return new Function(y+H.c(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+", "+s+");"
u=$.Y
$.Y=J.aG(u,1)
return new Function(y+H.c(u)+"}")()},
ca:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isi){c.fixed$length=Array
z=c}else z=c
return H.eK(a,b,z,!!d,e,f)},
jb:function(a,b){var z=J.J(b)
throw H.d(H.eG(H.bU(a),z.a4(b,3,z.gj(b))))},
iZ:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.l(a)[b]
else z=!0
if(z)return a
H.jb(a,b)},
jf:function(a){throw H.d(new P.eS("Cyclic initialization for static "+H.c(a)))},
an:function(a,b,c){return new H.h5(a,b,c,null)},
b_:function(){return C.r},
bw:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
h:function(a,b){a.$builtinTypeInfo=b
return a},
cd:function(a){if(a==null)return
return a.$builtinTypeInfo},
e1:function(a,b){return H.eb(a["$as"+H.c(b)],H.cd(a))},
E:function(a,b,c){var z=H.e1(a,b)
return z==null?null:z[c]},
a_:function(a,b){var z=H.cd(a)
return z==null?null:z[b]},
ci:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.e3(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.b.k(a)
else return},
e3:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.ag("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.c(H.ci(u,c))}return w?"":"<"+H.c(z)+">"},
eb:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
iK:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.P(a[y],b[y]))return!1
return!0},
cb:function(a,b,c){return a.apply(b,H.e1(b,c))},
P:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.e2(a,b)
if('func' in a)return b.builtin$cls==="jO"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.ci(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.c(H.ci(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.iK(H.eb(v,z),x)},
dX:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.P(z,v)||H.P(v,z)))return!1}return!0},
iJ:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.P(v,u)||H.P(u,v)))return!1}return!0},
e2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.P(z,y)||H.P(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dX(x,w,!1))return!1
if(!H.dX(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.P(o,n)||H.P(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.P(o,n)||H.P(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.P(o,n)||H.P(n,o)))return!1}}return H.iJ(a.named,b.named)},
kO:function(a){var z=$.ce
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
kM:function(a){return H.a8(a)},
kL:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
j6:function(a){var z,y,x,w,v,u
z=$.ce.$1(a)
y=$.bq[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bt[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dW.$2(a,z)
if(z!=null){y=$.bq[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bt[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cg(x)
$.bq[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bt[z]=x
return x}if(v==="-"){u=H.cg(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.e6(a,x)
if(v==="*")throw H.d(new P.dy(z))
if(init.leafTags[z]===true){u=H.cg(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.e6(a,x)},
e6:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bu(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cg:function(a){return J.bu(a,!1,null,!!a.$isaw)},
j8:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bu(z,!1,null,!!z.$isaw)
else return J.bu(z,c,null,null)},
iX:function(){if(!0===$.cf)return
$.cf=!0
H.iY()},
iY:function(){var z,y,x,w,v,u,t,s
$.bq=Object.create(null)
$.bt=Object.create(null)
H.iT()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.e8.$1(v)
if(u!=null){t=H.j8(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
iT:function(){var z,y,x,w,v,u,t
z=C.D()
z=H.am(C.E,H.am(C.F,H.am(C.k,H.am(C.k,H.am(C.H,H.am(C.G,H.am(C.I(C.l),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.ce=new H.iU(v)
$.dW=new H.iV(u)
$.e8=new H.iW(t)},
am:function(a,b){return a(b)||b},
je:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.eg(b,C.e.aQ(a,c))
return!z.gG(z)}},
z:function(a,b,c){var z,y,x
H.q(c)
if(b==="")if(a==="")return c
else{z=a.length
for(y=c,x=0;x<z;++x)y=y+a[x]+c
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
h2:{"^":"b;a,b,c,d,e,f,r,x",m:{
h3:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.h2(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
ht:{"^":"b;a,b,c,d,e,f",
L:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
m:{
Z:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.ht(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bh:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
dt:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
d5:{"^":"F;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.c(this.a)
return"NullError: method not found: '"+H.c(z)+"' on null"}},
fF:{"^":"F;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.c(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.c(z)+"' ("+H.c(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.c(z)+"' on '"+H.c(y)+"' ("+H.c(this.a)+")"},
m:{
bL:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fF(a,y,z?null:b.receiver)}}},
hv:{"^":"F;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
jg:{"^":"e:1;a",
$1:function(a){if(!!J.l(a).$isF)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dM:{"^":"b;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
j0:{"^":"e:0;a",
$0:function(){return this.a.$0()}},
j1:{"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
j2:{"^":"e:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
j3:{"^":"e:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
j4:{"^":"e:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
e:{"^":"b;",
k:function(a){return"Closure '"+H.bU(this)+"'"},
gcA:function(){return this},
gcA:function(){return this}},
dj:{"^":"e;"},
hc:{"^":"dj;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bD:{"^":"dj;a,b,c,d",
p:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bD))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gA:function(a){var z,y
z=this.c
if(z==null)y=H.a8(this.a)
else y=typeof z!=="object"?J.R(z):H.a8(z)
z=H.a8(this.b)
if(typeof y!=="number")return y.eD()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.c(this.d)+"' of "+H.bd(z)},
m:{
bE:function(a){return a.a},
cs:function(a){return a.c},
eC:function(){var z=$.at
if(z==null){z=H.b3("self")
$.at=z}return z},
b3:function(a){var z,y,x,w,v
z=new H.bD("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
eF:{"^":"F;a",
k:function(a){return this.a},
m:{
eG:function(a,b){return new H.eF("CastError: Casting value of type "+H.c(a)+" to incompatible type "+H.c(b))}}},
h4:{"^":"F;a",
k:function(a){return"RuntimeError: "+H.c(this.a)}},
dd:{"^":"b;"},
h5:{"^":"dd;a,b,c,d",
W:function(a){var z=this.dj(a)
return z==null?!1:H.e2(z,this.ae())},
dj:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
ae:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$iskt)z.v=true
else if(!x.$iscD)z.ret=y.ae()
y=this.b
if(y!=null&&y.length!==0)z.args=H.dc(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.dc(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.e_(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].ae()}z.named=w}return z},
k:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.c(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.c(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.e_(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.c(z[s].ae())+" "+s}x+="}"}}return x+(") -> "+H.c(this.a))},
m:{
dc:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ae())
return z}}},
cD:{"^":"dd;",
k:function(a){return"dynamic"},
ae:function(){return}},
a6:{"^":"b;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gG:function(a){return this.a===0},
gU:function(){return H.h(new H.fI(this),[H.a_(this,0)])},
gcz:function(a){return H.bb(this.gU(),new H.fE(this),H.a_(this,0),H.a_(this,1))},
c9:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bI(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bI(y,a)}else return this.e3(a)},
e3:function(a){var z=this.d
if(z==null)return!1
return this.ar(this.P(z,this.aq(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.P(z,b)
return y==null?null:y.ga_()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.P(x,b)
return y==null?null:y.ga_()}else return this.e4(b)},
e4:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.P(z,this.aq(a))
x=this.ar(y,a)
if(x<0)return
return y[x].ga_()},
i:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.b5()
this.b=z}this.bD(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.b5()
this.c=y}this.bD(y,b,c)}else{x=this.d
if(x==null){x=this.b5()
this.d=x}w=this.aq(b)
v=this.P(x,w)
if(v==null)this.b8(x,w,[this.aT(b,c)])
else{u=this.ar(v,b)
if(u>=0)v[u].sa_(c)
else v.push(this.aT(b,c))}}},
O:function(a,b){if(typeof b==="string")return this.bE(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bE(this.c,b)
else return this.e5(b)},
e5:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.P(z,this.aq(a))
x=this.ar(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bF(w)
return w.ga_()},
ab:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
E:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(new P.B(this))
z=z.c}},
bD:function(a,b,c){var z=this.P(a,b)
if(z==null)this.b8(a,b,this.aT(b,c))
else z.sa_(c)},
bE:function(a,b){var z
if(a==null)return
z=this.P(a,b)
if(z==null)return
this.bF(z)
this.bK(a,b)
return z.ga_()},
aT:function(a,b){var z,y
z=new H.fH(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bF:function(a){var z,y
z=a.gda()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aq:function(a){return J.R(a)&0x3ffffff},
ar:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.u(a[y].gcd(),b))return y
return-1},
k:function(a){return P.fQ(this)},
P:function(a,b){return a[b]},
b8:function(a,b,c){a[b]=c},
bK:function(a,b){delete a[b]},
bI:function(a,b){return this.P(a,b)!=null},
b5:function(){var z=Object.create(null)
this.b8(z,"<non-identifier-key>",z)
this.bK(z,"<non-identifier-key>")
return z},
$isfn:1},
fE:{"^":"e:1;a",
$1:function(a){return this.a.h(0,a)}},
fH:{"^":"b;cd:a<,a_:b@,c,da:d<"},
fI:{"^":"y;a",
gj:function(a){return this.a.a},
gq:function(a){var z,y
z=this.a
y=new H.fJ(z,z.r,null,null)
y.c=z.e
return y},
E:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.d(new P.B(z))
y=y.c}},
$isk:1},
fJ:{"^":"b;a,b,c,d",
gn:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
iU:{"^":"e:1;a",
$1:function(a){return this.a(a)}},
iV:{"^":"e:7;a",
$2:function(a,b){return this.a(a,b)}},
iW:{"^":"e:8;a",
$1:function(a){return this.a(a)}},
G:{"^":"b;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
gds:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.C(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
D:function(a){var z=this.b.exec(H.q(a))
if(z==null)return
return new H.dL(this,z)},
e0:function(a){return this.b.test(H.q(a))},
di:function(a,b){var z,y,x,w
z=this.gds()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
x=y.length
w=x-1
if(w<0)return H.a(y,w)
if(y[w]!=null)return
C.a.sj(y,w)
return new H.dL(this,y)},
as:function(a,b,c){var z
if(!(c<0)){z=J.L(b)
if(typeof z!=="number")return H.O(z)
z=c>z}else z=!0
if(z)throw H.d(P.S(c,0,J.L(b),null,null))
return this.di(b,c)},
m:{
C:function(a,b,c,d){var z,y,x,w
H.q(a)
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.d(new P.f5("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
dL:{"^":"b;a,b",
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]}},
dh:{"^":"b;a,b,c",
h:function(a,b){if(b!==0)H.r(P.aR(b,null,null))
return this.c}},
iq:{"^":"y;a,b,c",
gq:function(a){return new H.ir(this.a,this.b,this.c,null)},
$asy:function(){return[P.fS]}},
ir:{"^":"b;a,b,c,d",
l:function(){var z,y,x,w,v,u,t
z=this.c
y=this.b
x=y.length
w=this.a
v=w.length
if(z+x>v){this.d=null
return!1}u=w.indexOf(y,z)
if(u<0){this.c=v+1
this.d=null
return!1}t=u+x
this.d=new H.dh(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gn:function(){return this.d}}}],["","",,H,{"^":"",
b8:function(){return new P.az("No element")},
fx:function(){return new P.az("Too many elements")},
fw:function(){return new P.az("Too few elements")},
aT:function(a,b,c,d){if(c-b<=32)H.hb(a,b,c,d)
else H.ha(a,b,c,d)},
hb:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.J(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.Q(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.i(a,w,y.h(a,v))
w=v}y.i(a,w,x)}},
ha:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.b.F(c-b+1,6)
y=b+z
x=c-z
w=C.b.F(b+c,2)
v=w-z
u=w+z
t=J.J(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.Q(d.$2(s,r),0)){n=r
r=s
s=n}if(J.Q(d.$2(p,o),0)){n=o
o=p
p=n}if(J.Q(d.$2(s,q),0)){n=q
q=s
s=n}if(J.Q(d.$2(r,q),0)){n=q
q=r
r=n}if(J.Q(d.$2(s,p),0)){n=p
p=s
s=n}if(J.Q(d.$2(q,p),0)){n=p
p=q
q=n}if(J.Q(d.$2(r,o),0)){n=o
o=r
r=n}if(J.Q(d.$2(r,q),0)){n=q
q=r
r=n}if(J.Q(d.$2(p,o),0)){n=o
o=p
p=n}t.i(a,y,s)
t.i(a,w,q)
t.i(a,x,o)
t.i(a,v,t.h(a,b))
t.i(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.u(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.l(i)
if(h.p(i,0))continue
if(h.ah(i,0)){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.cc(i)
if(h.ag(i,0)){--l
continue}else{g=l-1
if(h.ah(i,0)){t.i(a,k,t.h(a,m))
f=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
l=g
m=f
break}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.b2(d.$2(j,r),0)){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else if(J.Q(d.$2(j,p),0))for(;!0;)if(J.Q(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.b2(d.$2(t.h(a,l),r),0)){t.i(a,k,t.h(a,m))
f=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=f}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=g
break}}e=!1}h=m-1
t.i(a,b,t.h(a,h))
t.i(a,h,r)
h=l+1
t.i(a,c,t.h(a,h))
t.i(a,h,p)
H.aT(a,b,m-2,d)
H.aT(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.u(d.$2(t.h(a,m),r),0);)++m
for(;J.u(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.u(d.$2(j,r),0)){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else if(J.u(d.$2(j,p),0))for(;!0;)if(J.u(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.b2(d.$2(t.h(a,l),r),0)){t.i(a,k,t.h(a,m))
f=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=f}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=g
break}}H.aT(a,m,l,d)}else H.aT(a,m,l,d)},
ba:{"^":"y;",
gq:function(a){return new H.cW(this,this.gj(this),0,null)},
E:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.C(0,y))
if(z!==this.gj(this))throw H.d(new P.B(this))}},
J:function(a,b){var z,y,x,w,v
z=this.gj(this)
if(b.length!==0){if(z===0)return""
y=H.c(this.C(0,0))
if(z!==this.gj(this))throw H.d(new P.B(this))
x=new P.ag(y)
for(w=1;w<z;++w){x.a+=b
x.a+=H.c(this.C(0,w))
if(z!==this.gj(this))throw H.d(new P.B(this))}v=x.a
return v.charCodeAt(0)==0?v:v}else{x=new P.ag("")
for(w=0;w<z;++w){x.a+=H.c(this.C(0,w))
if(z!==this.gj(this))throw H.d(new P.B(this))}v=x.a
return v.charCodeAt(0)==0?v:v}},
av:function(a,b){return this.cU(this,b)},
a1:function(a,b){return H.h(new H.aQ(this,b),[H.E(this,"ba",0),null])},
bv:function(a,b){var z,y,x
z=H.h([],[H.E(this,"ba",0)])
C.a.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y){x=this.C(0,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
bu:function(a){return this.bv(a,!0)},
$isk:1},
cW:{"^":"b;a,b,c,d",
gn:function(){return this.d},
l:function(){var z,y,x,w
z=this.a
y=J.J(z)
x=y.gj(z)
if(this.b!==x)throw H.d(new P.B(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.C(z,w);++this.c
return!0}},
cZ:{"^":"y;a,b",
gq:function(a){var z=new H.fP(null,J.ap(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.L(this.a)},
$asy:function(a,b){return[b]},
m:{
bb:function(a,b,c,d){if(!!J.l(a).$isk)return H.h(new H.bF(a,b),[c,d])
return H.h(new H.cZ(a,b),[c,d])}}},
bF:{"^":"cZ;a,b",$isk:1},
fP:{"^":"cP;a,b,c",
l:function(){var z=this.b
if(z.l()){this.a=this.aj(z.gn())
return!0}this.a=null
return!1},
gn:function(){return this.a},
aj:function(a){return this.c.$1(a)}},
aQ:{"^":"ba;a,b",
gj:function(a){return J.L(this.a)},
C:function(a,b){return this.aj(J.ei(this.a,b))},
aj:function(a){return this.b.$1(a)},
$asba:function(a,b){return[b]},
$asy:function(a,b){return[b]},
$isk:1},
dz:{"^":"y;a,b",
gq:function(a){var z=new H.hx(J.ap(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
hx:{"^":"cP;a,b",
l:function(){for(var z=this.a;z.l();)if(this.aj(z.gn())===!0)return!0
return!1},
gn:function(){return this.a.gn()},
aj:function(a){return this.b.$1(a)}},
cJ:{"^":"b;"}}],["","",,H,{"^":"",
e_:function(a){var z=H.h(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{"^":"",
hz:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.iL()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aF(new P.hB(z),1)).observe(y,{childList:true})
return new P.hA(z,y,x)}else if(self.setImmediate!=null)return P.iM()
return P.iN()},
ku:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aF(new P.hC(a),0))},"$1","iL",2,0,3],
kv:[function(a){++init.globalState.f.b
self.setImmediate(H.aF(new P.hD(a),0))},"$1","iM",2,0,3],
kw:[function(a){P.bY(C.j,a)},"$1","iN",2,0,3],
dQ:function(a,b){var z=H.b_()
z=H.an(z,[z,z]).W(a)
if(z){b.toString
return a}else{b.toString
return a}},
iF:function(){var z,y
for(;z=$.al,z!=null;){$.aD=null
y=z.b
$.al=y
if(y==null)$.aC=null
z.a.$0()}},
kK:[function(){$.c6=!0
try{P.iF()}finally{$.aD=null
$.c6=!1
if($.al!=null)$.$get$bZ().$1(P.dY())}},"$0","dY",0,0,2],
dU:function(a){var z=new P.dA(a,null)
if($.al==null){$.aC=z
$.al=z
if(!$.c6)$.$get$bZ().$1(P.dY())}else{$.aC.b=z
$.aC=z}},
iI:function(a){var z,y,x
z=$.al
if(z==null){P.dU(a)
$.aD=$.aC
return}y=new P.dA(a,null)
x=$.aD
if(x==null){y.b=z
$.aD=y
$.al=y}else{y.b=x.b
x.b=y
$.aD=y
if(y.b==null)$.aC=y}},
e9:function(a){var z=$.n
if(C.c===z){P.bo(null,null,C.c,a)
return}z.toString
P.bo(null,null,z,z.bd(a,!0))},
iH:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.A(u)
z=t
y=H.M(u)
$.n.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.a0(x)
w=t
v=x.gV()
c.$2(w,v)}}},
iy:function(a,b,c,d){var z=a.be()
if(!!J.l(z).$isae)z.by(new P.iB(b,c,d))
else b.ai(c,d)},
iz:function(a,b){return new P.iA(a,b)},
ix:function(a,b,c){$.n.toString
a.aU(b,c)},
hs:function(a,b){var z=$.n
if(z===C.c){z.toString
return P.bY(a,b)}return P.bY(a,z.bd(b,!0))},
bY:function(a,b){var z=C.b.F(a.a,1000)
return H.hp(z<0?0:z,b)},
aZ:function(a,b,c,d,e){var z={}
z.a=d
P.iI(new P.iG(z,e))},
dR:function(a,b,c,d){var z,y
y=$.n
if(y===c)return d.$0()
$.n=c
z=y
try{y=d.$0()
return y}finally{$.n=z}},
dT:function(a,b,c,d,e){var z,y
y=$.n
if(y===c)return d.$1(e)
$.n=c
z=y
try{y=d.$1(e)
return y}finally{$.n=z}},
dS:function(a,b,c,d,e,f){var z,y
y=$.n
if(y===c)return d.$2(e,f)
$.n=c
z=y
try{y=d.$2(e,f)
return y}finally{$.n=z}},
bo:function(a,b,c,d){var z=C.c!==c
if(z)d=c.bd(d,!(!z||!1))
P.dU(d)},
hB:{"^":"e:1;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
hA:{"^":"e:9;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
hC:{"^":"e:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
hD:{"^":"e:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
ae:{"^":"b;"},
dF:{"^":"b;b7:a<,b,c,d,e",
gdE:function(){return this.b.b},
gcc:function(){return(this.c&1)!==0},
gdZ:function(){return(this.c&2)!==0},
ge_:function(){return this.c===6},
gcb:function(){return this.c===8},
gdt:function(){return this.d},
gdD:function(){return this.d}},
ai:{"^":"b;al:a@,b,dz:c<",
gdq:function(){return this.a===2},
gb4:function(){return this.a>=4},
cs:function(a,b){var z,y
z=$.n
if(z!==C.c){z.toString
if(b!=null)b=P.dQ(b,z)}y=H.h(new P.ai(0,z,null),[null])
this.aV(new P.dF(null,y,b==null?1:3,a,b))
return y},
es:function(a){return this.cs(a,null)},
by:function(a){var z,y
z=$.n
y=new P.ai(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.aV(new P.dF(null,y,8,a,null))
return y},
aV:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gb4()){y.aV(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bo(null,null,z,new P.hT(this,a))}},
bW:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gb7()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gb4()){v.bW(a)
return}this.a=v.a
this.c=v.c}z.a=this.aB(a)
y=this.b
y.toString
P.bo(null,null,y,new P.hY(z,this))}},
aA:function(){var z=this.c
this.c=null
return this.aB(z)},
aB:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gb7()
z.a=y}return y},
b_:function(a){var z
if(!!J.l(a).$isae)P.dG(a,this)
else{z=this.aA()
this.a=4
this.c=a
P.aj(this,z)}},
df:function(a){var z=this.aA()
this.a=4
this.c=a
P.aj(this,z)},
ai:[function(a,b){var z=this.aA()
this.a=8
this.c=new P.aI(a,b)
P.aj(this,z)},function(a){return this.ai(a,null)},"eE","$2","$1","gb0",2,2,10,0],
$isae:1,
m:{
hU:function(a,b){var z,y,x,w
b.sal(1)
try{a.cs(new P.hV(b),new P.hW(b))}catch(x){w=H.A(x)
z=w
y=H.M(x)
P.e9(new P.hX(b,z,y))}},
dG:function(a,b){var z,y,x
for(;a.gdq();)a=a.c
z=a.gb4()
y=b.c
if(z){b.c=null
x=b.aB(y)
b.a=a.a
b.c=a.c
P.aj(b,x)}else{b.a=2
b.c=a
a.bW(y)}},
aj:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=J.a0(v)
x=v.gV()
z.toString
P.aZ(null,null,z,y,x)}return}for(;b.gb7()!=null;b=u){u=b.a
b.a=null
P.aj(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gcc()||b.gcb()){s=b.gdE()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=J.a0(v)
r=v.gV()
y.toString
P.aZ(null,null,y,x,r)
return}q=$.n
if(q==null?s!=null:q!==s)$.n=s
else q=null
if(b.gcb())new P.i0(z,x,w,b,s).$0()
else if(y){if(b.gcc())new P.i_(x,w,b,t,s).$0()}else if(b.gdZ())new P.hZ(z,x,b,s).$0()
if(q!=null)$.n=q
y=x.b
r=J.l(y)
if(!!r.$isae){p=b.b
if(!!r.$isai)if(y.a>=4){o=p.c
p.c=null
b=p.aB(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.dG(y,p)
else P.hU(y,p)
return}}p=b.b
b=p.aA()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
hT:{"^":"e:0;a,b",
$0:function(){P.aj(this.a,this.b)}},
hY:{"^":"e:0;a,b",
$0:function(){P.aj(this.b,this.a.a)}},
hV:{"^":"e:1;a",
$1:function(a){this.a.df(a)}},
hW:{"^":"e:11;a",
$2:function(a,b){this.a.ai(a,b)},
$1:function(a){return this.$2(a,null)}},
hX:{"^":"e:0;a,b,c",
$0:function(){this.a.ai(this.b,this.c)}},
i_:{"^":"e:2;a,b,c,d,e",
$0:function(){var z,y,x,w
try{x=this.a
x.b=this.e.bs(this.c.gdt(),this.d)
x.a=!1}catch(w){x=H.A(w)
z=x
y=H.M(w)
x=this.a
x.b=new P.aI(z,y)
x.a=!0}}},
hZ:{"^":"e:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.c
y=!0
r=this.c
if(r.ge_()){x=r.d
try{y=this.d.bs(x,J.a0(z))}catch(q){r=H.A(q)
w=r
v=H.M(q)
r=J.a0(z)
p=w
o=(r==null?p==null:r===p)?z:new P.aI(w,v)
r=this.b
r.b=o
r.a=!0
return}}u=r.e
if(y===!0&&u!=null)try{r=u
p=H.b_()
p=H.an(p,[p,p]).W(r)
n=this.d
m=this.b
if(p)m.b=n.ep(u,J.a0(z),z.gV())
else m.b=n.bs(u,J.a0(z))
m.a=!1}catch(q){r=H.A(q)
t=r
s=H.M(q)
r=J.a0(z)
p=t
o=(r==null?p==null:r===p)?z:new P.aI(t,s)
r=this.b
r.b=o
r.a=!0}}},
i0:{"^":"e:2;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u
z=null
try{z=this.e.cp(this.d.gdD())}catch(w){v=H.A(w)
y=v
x=H.M(w)
if(this.c){v=J.a0(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.aI(y,x)
u.a=!0
return}if(!!J.l(z).$isae){if(z instanceof P.ai&&z.gal()>=4){if(z.gal()===8){v=this.b
v.b=z.gdz()
v.a=!0}return}v=this.b
v.b=z.es(new P.i1(this.a.a))
v.a=!1}}},
i1:{"^":"e:1;a",
$1:function(a){return this.a}},
dA:{"^":"b;a,b"},
a9:{"^":"b;",
a1:function(a,b){return H.h(new P.ib(b,this),[H.E(this,"a9",0),null])},
E:function(a,b){var z,y
z={}
y=H.h(new P.ai(0,$.n,null),[null])
z.a=null
z.a=this.ac(new P.hh(z,this,b,y),!0,new P.hi(y),y.gb0())
return y},
gj:function(a){var z,y
z={}
y=H.h(new P.ai(0,$.n,null),[P.o])
z.a=0
this.ac(new P.hj(z),!0,new P.hk(z,y),y.gb0())
return y},
bu:function(a){var z,y
z=H.h([],[H.E(this,"a9",0)])
y=H.h(new P.ai(0,$.n,null),[[P.i,H.E(this,"a9",0)]])
this.ac(new P.hl(this,z),!0,new P.hm(z,y),y.gb0())
return y}},
hh:{"^":"e;a,b,c,d",
$1:function(a){P.iH(new P.hf(this.c,a),new P.hg(),P.iz(this.a.a,this.d))},
$signature:function(){return H.cb(function(a){return{func:1,args:[a]}},this.b,"a9")}},
hf:{"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
hg:{"^":"e:1;",
$1:function(a){}},
hi:{"^":"e:0;a",
$0:function(){this.a.b_(null)}},
hj:{"^":"e:1;a",
$1:function(a){++this.a.a}},
hk:{"^":"e:0;a,b",
$0:function(){this.b.b_(this.a.a)}},
hl:{"^":"e;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.cb(function(a){return{func:1,args:[a]}},this.a,"a9")}},
hm:{"^":"e:0;a,b",
$0:function(){this.b.b_(this.a)}},
he:{"^":"b;"},
kB:{"^":"b;"},
hG:{"^":"b;al:e@",
bo:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.c6()
if((z&4)===0&&(this.e&32)===0)this.bN(this.gbS())},
cm:function(a){return this.bo(a,null)},
co:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gG(z)}else z=!1
if(z)this.r.aL(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bN(this.gbU())}}}},
be:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aY()
return this.f},
aY:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.c6()
if((this.e&32)===0)this.r=null
this.f=this.bR()},
aX:["cY",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bZ(a)
else this.aW(new P.hJ(a,null))}],
aU:["cZ",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.c0(a,b)
else this.aW(new P.hL(a,b,null))}],
dd:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.c_()
else this.aW(C.B)},
bT:[function(){},"$0","gbS",0,0,2],
bV:[function(){},"$0","gbU",0,0,2],
bR:function(){return},
aW:function(a){var z,y
z=this.r
if(z==null){z=new P.ip(null,null,0)
this.r=z}z.v(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aL(this)}},
bZ:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bt(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aZ((z&4)!==0)},
c0:function(a,b){var z,y
z=this.e
y=new P.hI(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aY()
z=this.f
if(!!J.l(z).$isae)z.by(y)
else y.$0()}else{y.$0()
this.aZ((z&4)!==0)}},
c_:function(){var z,y
z=new P.hH(this)
this.aY()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isae)y.by(z)
else z.$0()},
bN:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aZ((z&4)!==0)},
aZ:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gG(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gG(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bT()
else this.bV()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aL(this)},
d5:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dQ(b,z)
this.c=c}},
hI:{"^":"e:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.b_()
x=H.an(x,[x,x]).W(y)
w=z.d
v=this.b
u=z.b
if(x)w.eq(u,v,this.c)
else w.bt(u,v)
z.e=(z.e&4294967263)>>>0}},
hH:{"^":"e:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cq(z.c)
z.e=(z.e&4294967263)>>>0}},
dC:{"^":"b;M:a@"},
hJ:{"^":"dC;b,a",
bp:function(a){a.bZ(this.b)}},
hL:{"^":"dC;an:b>,V:c<,a",
bp:function(a){a.c0(this.b,this.c)}},
hK:{"^":"b;",
bp:function(a){a.c_()},
gM:function(){return},
sM:function(a){throw H.d(new P.az("No events after a done."))}},
id:{"^":"b;al:a@",
aL:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.e9(new P.ie(this,a))
this.a=1},
c6:function(){if(this.a===1)this.a=3}},
ie:{"^":"e:0;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gM()
z.b=w
if(w==null)z.c=null
x.bp(this.b)}},
ip:{"^":"id;b,c,a",
gG:function(a){return this.c==null},
v:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sM(b)
this.c=b}}},
iB:{"^":"e:0;a,b,c",
$0:function(){return this.a.ai(this.b,this.c)}},
iA:{"^":"e:12;a,b",
$2:function(a,b){return P.iy(this.a,this.b,a,b)}},
c_:{"^":"a9;",
ac:function(a,b,c,d){return this.dh(a,d,c,!0===b)},
ci:function(a,b,c){return this.ac(a,null,b,c)},
dh:function(a,b,c,d){return P.hS(this,a,b,c,d,H.E(this,"c_",0),H.E(this,"c_",1))},
bO:function(a,b){b.aX(a)},
$asa9:function(a,b){return[b]}},
dE:{"^":"hG;x,y,a,b,c,d,e,f,r",
aX:function(a){if((this.e&2)!==0)return
this.cY(a)},
aU:function(a,b){if((this.e&2)!==0)return
this.cZ(a,b)},
bT:[function(){var z=this.y
if(z==null)return
z.cm(0)},"$0","gbS",0,0,2],
bV:[function(){var z=this.y
if(z==null)return
z.co()},"$0","gbU",0,0,2],
bR:function(){var z=this.y
if(z!=null){this.y=null
return z.be()}return},
eF:[function(a){this.x.bO(a,this)},"$1","gdk",2,0,function(){return H.cb(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"dE")}],
eH:[function(a,b){this.aU(a,b)},"$2","gdm",4,0,13],
eG:[function(){this.dd()},"$0","gdl",0,0,2],
d6:function(a,b,c,d,e,f,g){var z,y
z=this.gdk()
y=this.gdm()
this.y=this.x.a.ci(z,this.gdl(),y)},
m:{
hS:function(a,b,c,d,e,f,g){var z=$.n
z=H.h(new P.dE(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.d5(b,c,d,e)
z.d6(a,b,c,d,e,f,g)
return z}}},
ib:{"^":"c_;b,a",
bO:function(a,b){var z,y,x,w,v
z=null
try{z=this.dC(a)}catch(w){v=H.A(w)
y=v
x=H.M(w)
P.ix(b,y,x)
return}b.aX(z)},
dC:function(a){return this.b.$1(a)}},
aI:{"^":"b;an:a>,V:b<",
k:function(a){return H.c(this.a)},
$isF:1},
iw:{"^":"b;"},
iG:{"^":"e:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.d6()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.d(z)
x=H.d(z)
x.stack=J.U(y)
throw x}},
ig:{"^":"iw;",
cq:function(a){var z,y,x,w
try{if(C.c===$.n){x=a.$0()
return x}x=P.dR(null,null,this,a)
return x}catch(w){x=H.A(w)
z=x
y=H.M(w)
return P.aZ(null,null,this,z,y)}},
bt:function(a,b){var z,y,x,w
try{if(C.c===$.n){x=a.$1(b)
return x}x=P.dT(null,null,this,a,b)
return x}catch(w){x=H.A(w)
z=x
y=H.M(w)
return P.aZ(null,null,this,z,y)}},
eq:function(a,b,c){var z,y,x,w
try{if(C.c===$.n){x=a.$2(b,c)
return x}x=P.dS(null,null,this,a,b,c)
return x}catch(w){x=H.A(w)
z=x
y=H.M(w)
return P.aZ(null,null,this,z,y)}},
bd:function(a,b){if(b)return new P.ih(this,a)
else return new P.ii(this,a)},
dJ:function(a,b){return new P.ij(this,a)},
h:function(a,b){return},
cp:function(a){if($.n===C.c)return a.$0()
return P.dR(null,null,this,a)},
bs:function(a,b){if($.n===C.c)return a.$1(b)
return P.dT(null,null,this,a,b)},
ep:function(a,b,c){if($.n===C.c)return a.$2(b,c)
return P.dS(null,null,this,a,b,c)}},
ih:{"^":"e:0;a,b",
$0:function(){return this.a.cq(this.b)}},
ii:{"^":"e:0;a,b",
$0:function(){return this.a.cp(this.b)}},
ij:{"^":"e:1;a,b",
$1:function(a){return this.a.bt(this.b,a)}}}],["","",,P,{"^":"",
V:function(a,b){return H.h(new H.a6(0,null,null,null,null,null,0),[a,b])},
a2:function(){return H.h(new H.a6(0,null,null,null,null,null,0),[null,null])},
ax:function(a){return H.iP(a,H.h(new H.a6(0,null,null,null,null,null,0),[null,null]))},
fv:function(a,b,c){var z,y
if(P.c7(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aE()
y.push(a)
try{P.iD(a,z)}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=P.dg(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
b7:function(a,b,c){var z,y,x
if(P.c7(a))return b+"..."+c
z=new P.ag(b)
y=$.$get$aE()
y.push(a)
try{x=z
x.a=P.dg(x.ga6(),a,", ")}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=z
y.a=y.ga6()+c
y=z.ga6()
return y.charCodeAt(0)==0?y:y},
c7:function(a){var z,y
for(z=0;y=$.$get$aE(),z<y.length;++z)if(a===y[z])return!0
return!1},
iD:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gq(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.l())return
w=H.c(z.gn())
b.push(w)
y+=w.length+2;++x}if(!z.l()){if(x<=5)return
if(0>=b.length)return H.a(b,-1)
v=b.pop()
if(0>=b.length)return H.a(b,-1)
u=b.pop()}else{t=z.gn();++x
if(!z.l()){if(x<=4){b.push(H.c(t))
return}v=H.c(t)
if(0>=b.length)return H.a(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gn();++x
for(;z.l();t=s,s=r){r=z.gn();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.c(t)
v=H.c(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
H:function(a,b,c,d){return H.h(new P.i4(0,null,null,null,null,null,0),[d])},
cT:function(a,b){var z,y,x
z=P.H(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.K)(a),++x)z.v(0,a[x])
return z},
fQ:function(a){var z,y,x
z={}
if(P.c7(a))return"{...}"
y=new P.ag("")
try{$.$get$aE().push(a)
x=y
x.a=x.ga6()+"{"
z.a=!0
J.ej(a,new P.fR(z,y))
z=y
z.a=z.ga6()+"}"}finally{z=$.$get$aE()
if(0>=z.length)return H.a(z,-1)
z.pop()}z=y.ga6()
return z.charCodeAt(0)==0?z:z},
dK:{"^":"a6;a,b,c,d,e,f,r",
aq:function(a){return H.ja(a)&0x3ffffff},
ar:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gcd()
if(x==null?b==null:x===b)return y}return-1},
m:{
aB:function(a,b){return H.h(new P.dK(0,null,null,null,null,null,0),[a,b])}}},
i4:{"^":"i2;a,b,c,d,e,f,r",
gq:function(a){var z=new P.aA(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
t:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.dg(b)},
dg:function(a){var z=this.d
if(z==null)return!1
return this.az(z[this.ax(a)],a)>=0},
bj:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.t(0,a)?a:null
else return this.dr(a)},
dr:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.ax(a)]
x=this.az(y,a)
if(x<0)return
return J.aH(y,x).gbL()},
E:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.d(new P.B(this))
z=z.b}},
v:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.bG(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.bG(x,b)}else return this.T(b)},
T:function(a){var z,y,x
z=this.d
if(z==null){z=P.i6()
this.d=z}y=this.ax(a)
x=z[y]
if(x==null)z[y]=[this.b6(a)]
else{if(this.az(x,a)>=0)return!1
x.push(this.b6(a))}return!0},
O:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bX(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bX(this.c,b)
else return this.dv(b)},
dv:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.ax(a)]
x=this.az(y,a)
if(x<0)return!1
this.c2(y.splice(x,1)[0])
return!0},
ab:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bG:function(a,b){if(a[b]!=null)return!1
a[b]=this.b6(b)
return!0},
bX:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.c2(z)
delete a[b]
return!0},
b6:function(a){var z,y
z=new P.i5(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
c2:function(a){var z,y
z=a.gdu()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
ax:function(a){return J.R(a)&0x3ffffff},
az:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.u(a[y].gbL(),b))return y
return-1},
$isk:1,
m:{
i6:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
i5:{"^":"b;bL:a<,b,du:c<"},
aA:{"^":"b;a,b,c,d",
gn:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
i2:{"^":"h6;"},
cU:{"^":"fX;"},
fX:{"^":"b+af;",$isi:1,$asi:null,$isk:1},
af:{"^":"b;",
gq:function(a){return new H.cW(a,this.gj(a),0,null)},
C:function(a,b){return this.h(a,b)},
E:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gj(a))throw H.d(new P.B(a))}},
av:function(a,b){return H.h(new H.dz(a,b),[H.E(a,"af",0)])},
a1:function(a,b){return H.h(new H.aQ(a,b),[null,null])},
k:function(a){return P.b7(a,"[","]")},
$isi:1,
$asi:null,
$isk:1},
fR:{"^":"e:4;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.c(a)
z.a=y+": "
z.a+=H.c(b)}},
fK:{"^":"y;a,b,c,d",
gq:function(a){return new P.i7(this,this.c,this.d,this.b,null)},
E:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.a(x,y)
b.$1(x[y])
if(z!==this.d)H.r(new P.B(this))}},
gG:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
ab:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.a(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.b7(this,"{","}")},
cn:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.d(H.b8());++this.d
y=this.a
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
T:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.a(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bM();++this.d},
bM:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.h(z,[H.a_(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.aw(y,0,w,z,x)
C.a.aw(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
d2:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.h(z,[b])},
$isk:1,
m:{
bO:function(a,b){var z=H.h(new P.fK(null,0,0,0),[b])
z.d2(a,b)
return z}}},
i7:{"^":"b;a,b,c,d,e",
gn:function(){return this.e},
l:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.r(new P.B(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.a(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
h7:{"^":"b;",
u:function(a,b){var z
for(z=J.ap(b);z.l();)this.v(0,z.gn())},
a1:function(a,b){return H.h(new H.bF(this,b),[H.a_(this,0),null])},
k:function(a){return P.b7(this,"{","}")},
E:function(a,b){var z
for(z=new P.aA(this,this.r,null,null),z.c=this.e;z.l();)b.$1(z.d)},
J:function(a,b){var z,y,x
z=new P.aA(this,this.r,null,null)
z.c=this.e
if(!z.l())return""
y=new P.ag("")
if(b===""){do y.a+=H.c(z.d)
while(z.l())}else{y.a=H.c(z.d)
for(;z.l();){y.a+=b
y.a+=H.c(z.d)}}x=y.a
return x.charCodeAt(0)==0?x:x},
a9:function(a,b){var z
for(z=new P.aA(this,this.r,null,null),z.c=this.e;z.l();)if(b.$1(z.d)===!0)return!0
return!1},
$isk:1},
h6:{"^":"h7;"}}],["","",,P,{"^":"",
cG:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.U(a)
if(typeof a==="string")return JSON.stringify(a)
return P.f_(a)},
f_:function(a){var z=J.l(a)
if(!!z.$ise)return z.k(a)
return H.bd(a)},
b5:function(a){return new P.hR(a)},
aP:function(a,b,c){var z,y
z=H.h([],[c])
for(y=J.ap(a);y.l();)z.push(y.gn())
if(b)return z
z.fixed$length=Array
return z},
bv:function(a){var z=H.c(a)
H.e7(z)},
D:function(a,b,c){return new H.G(a,H.C(a,c,!0,!1),null,null)},
c9:{"^":"b;"},
"+bool":0,
jp:{"^":"b;"},
bx:{"^":"b1;"},
"+double":0,
b4:{"^":"b;ay:a<",
af:function(a,b){return new P.b4(C.b.af(this.a,b.gay()))},
ah:function(a,b){return C.b.ah(this.a,b.gay())},
ag:function(a,b){return C.b.ag(this.a,b.gay())},
p:function(a,b){if(b==null)return!1
if(!(b instanceof P.b4))return!1
return this.a===b.a},
gA:function(a){return this.a&0x1FFFFFFF},
aF:function(a,b){return C.b.aF(this.a,b.gay())},
k:function(a){var z,y,x,w,v
z=new P.eX()
y=this.a
if(y<0)return"-"+new P.b4(-y).k(0)
x=z.$1(C.b.br(C.b.F(y,6e7),60))
w=z.$1(C.b.br(C.b.F(y,1e6),60))
v=new P.eW().$1(C.b.br(y,1e6))
return""+C.b.F(y,36e8)+":"+H.c(x)+":"+H.c(w)+"."+H.c(v)}},
eW:{"^":"e:5;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eX:{"^":"e:5;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
F:{"^":"b;",
gV:function(){return H.M(this.$thrownJsError)}},
d6:{"^":"F;",
k:function(a){return"Throw of null."}},
a1:{"^":"F;a,b,c,d",
gb2:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gb1:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.c(z)+")":""
z=this.d
x=z==null?"":": "+H.c(z)
w=this.gb2()+y+x
if(!this.a)return w
v=this.gb1()
u=P.cG(this.b)
return w+v+": "+H.c(u)},
m:{
bA:function(a){return new P.a1(!1,null,null,a)},
bB:function(a,b,c){return new P.a1(!0,a,b,c)},
eu:function(a){return new P.a1(!1,null,a,"Must not be null")}}},
da:{"^":"a1;e,f,a,b,c,d",
gb2:function(){return"RangeError"},
gb1:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.c(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.c(z)
else{if(typeof x!=="number")return x.ag()
if(typeof z!=="number")return H.O(z)
if(x>z)y=": Not in range "+z+".."+H.c(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
m:{
aR:function(a,b,c){return new P.da(null,null,!0,a,b,"Value not in range")},
S:function(a,b,c,d,e){return new P.da(b,c,!0,a,d,"Invalid value")},
h0:function(a,b,c,d,e){if(a<b||a>c)throw H.d(P.S(a,b,c,d,e))},
bV:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.S(a,0,c,"start",f))
if(a>b||b>c)throw H.d(P.S(b,a,c,"end",f))
return b}}},
fc:{"^":"a1;e,j:f>,a,b,c,d",
gb2:function(){return"RangeError"},
gb1:function(){if(J.b2(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.c(z)},
m:{
aK:function(a,b,c,d,e){var z=e!=null?e:J.L(b)
return new P.fc(b,z,!0,a,c,"Index out of range")}}},
N:{"^":"F;a",
k:function(a){return"Unsupported operation: "+this.a}},
dy:{"^":"F;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.c(z):"UnimplementedError"}},
az:{"^":"F;a",
k:function(a){return"Bad state: "+this.a}},
B:{"^":"F;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.c(P.cG(z))+"."}},
df:{"^":"b;",
k:function(a){return"Stack Overflow"},
gV:function(){return},
$isF:1},
eS:{"^":"F;a",
k:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hR:{"^":"b;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.c(z)}},
f5:{"^":"b;a,b,c",
k:function(a){var z,y
z=""!==this.a?"FormatException: "+this.a:"FormatException"
y=this.b
if(y.length>78)y=C.e.a4(y,0,75)+"..."
return z+"\n"+y}},
f1:{"^":"b;a,b",
k:function(a){return"Expando:"+H.c(this.a)},
h:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.r(P.bB(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.bT(b,"expando$values")
return y==null?null:H.bT(y,z)},
i:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.bT(b,"expando$values")
if(y==null){y=new P.b()
H.d9(b,"expando$values",y)}H.d9(y,z,c)}}},
o:{"^":"b1;"},
"+int":0,
y:{"^":"b;",
a1:function(a,b){return H.bb(this,b,H.E(this,"y",0),null)},
av:["cU",function(a,b){return H.h(new H.dz(this,b),[H.E(this,"y",0)])}],
E:function(a,b){var z
for(z=this.gq(this);z.l();)b.$1(z.gn())},
bv:function(a,b){return P.aP(this,!0,H.E(this,"y",0))},
bu:function(a){return this.bv(a,!0)},
gj:function(a){var z,y
z=this.gq(this)
for(y=0;z.l();)++y
return y},
gG:function(a){return!this.gq(this).l()},
ga3:function(a){var z,y
z=this.gq(this)
if(!z.l())throw H.d(H.b8())
y=z.gn()
if(z.l())throw H.d(H.fx())
return y},
C:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(P.eu("index"))
if(b<0)H.r(P.S(b,0,null,"index",null))
for(z=this.gq(this),y=0;z.l();){x=z.gn()
if(b===y)return x;++y}throw H.d(P.aK(b,this,"index",null,y))},
k:function(a){return P.fv(this,"(",")")}},
cP:{"^":"b;"},
i:{"^":"b;",$asi:null,$isk:1},
"+List":0,
kd:{"^":"b;",
k:function(a){return"null"}},
"+Null":0,
b1:{"^":"b;"},
"+num":0,
b:{"^":";",
p:function(a,b){return this===b},
gA:function(a){return H.a8(this)},
k:function(a){return H.bd(this)},
toString:function(){return this.k(this)}},
fS:{"^":"b;"},
db:{"^":"b;"},
ay:{"^":"b;"},
j:{"^":"b;"},
"+String":0,
ag:{"^":"b;a6:a<",
gj:function(a){return this.a.length},
k:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
m:{
dg:function(a,b,c){var z=J.ap(b)
if(!z.l())return a
if(c.length===0){do a+=H.c(z.gn())
while(z.l())}else{a+=H.c(z.gn())
for(;z.l();)a=a+c+H.c(z.gn())}return a}}}}],["","",,W,{"^":"",
eR:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.J)},
eY:function(a,b,c){var z,y
z=document.body
y=(z&&C.i).R(z,a,b,c)
y.toString
z=new W.W(y)
z=z.av(z,new W.iO())
return z.ga3(z)},
au:function(a){var z,y,x
z="element tag unavailable"
try{y=J.cm(a)
if(typeof y==="string")z=J.cm(a)}catch(x){H.A(x)}return z},
aa:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dJ:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dV:function(a){var z=$.n
if(z===C.c)return a
return z.dJ(a,!0)},
p:{"^":"a3;",$isa3:1,$ist:1,$isb:1,"%":"HTMLAppletElement|HTMLBRElement|HTMLCanvasElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLImageElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
ji:{"^":"p;bf:hostname=,ap:href},bq:port=,aH:protocol=",
k:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
jk:{"^":"p;bf:hostname=,ap:href},bq:port=,aH:protocol=",
k:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
jl:{"^":"p;ap:href}","%":"HTMLBaseElement"},
bC:{"^":"p;",$isbC:1,$isf:1,"%":"HTMLBodyElement"},
jm:{"^":"p;B:name=","%":"HTMLButtonElement"},
jo:{"^":"t;j:length=",$isf:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
eP:{"^":"fg;j:length=",
a5:function(a,b){var z,y
z=$.$get$cw()
y=z[b]
if(typeof y==="string")return y
y=W.eR(b) in a?b:P.eT()+b
z[b]=y
return y},
a7:function(a,b,c,d){a.setProperty(b,c,d)},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
fg:{"^":"f+eQ;"},
eQ:{"^":"b;",
sct:function(a,b){this.a7(a,this.a5(a,"transform"),b,"")},
sev:function(a,b){this.a7(a,this.a5(a,"transform-origin-x"),b,"")},
sew:function(a,b){this.a7(a,this.a5(a,"transform-origin-y"),b,"")},
sex:function(a,b){this.a7(a,this.a5(a,"transform-origin-z"),b,"")},
scu:function(a,b){this.a7(a,this.a5(a,"transform-style"),b,"")},
sbx:function(a,b){this.a7(a,this.a5(a,"transition"),b,"")}},
jq:{"^":"t;",$isf:1,"%":"DocumentFragment|ShadowRoot"},
jr:{"^":"f;",
k:function(a){return String(a)},
"%":"DOMException"},
eV:{"^":"f;a0:height=,bi:left=,bw:top=,a2:width=",
k:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(this.ga2(a))+" x "+H.c(this.ga0(a))},
p:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isaS)return!1
y=a.left
x=z.gbi(b)
if(y==null?x==null:y===x){y=a.top
x=z.gbw(b)
if(y==null?x==null:y===x){y=this.ga2(a)
x=z.ga2(b)
if(y==null?x==null:y===x){y=this.ga0(a)
z=z.ga0(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){var z,y,x,w
z=J.R(a.left)
y=J.R(a.top)
x=J.R(this.ga2(a))
w=J.R(this.ga0(a))
return W.dJ(W.aa(W.aa(W.aa(W.aa(0,z),y),x),w))},
$isaS:1,
$asaS:I.br,
"%":";DOMRectReadOnly"},
js:{"^":"f;j:length=","%":"DOMSettableTokenList|DOMTokenList"},
a3:{"^":"t;bC:style=,dK:clientWidth=,er:tagName=",
gc5:function(a){return new W.hM(a)},
gaa:function(a){return new W.hN(a)},
k:function(a){return a.localName},
cf:function(a,b,c){var z,y
if(!!a.insertAdjacentElement)a.insertAdjacentElement(b,c)
else switch(b.toLowerCase()){case"beforebegin":a.parentNode.insertBefore(c,a)
break
case"afterbegin":if(a.childNodes.length>0){z=a.childNodes
if(0>=z.length)return H.a(z,0)
y=z[0]}else y=null
a.insertBefore(c,y)
break
case"beforeend":a.appendChild(c)
break
case"afterend":a.parentNode.insertBefore(c,a.nextSibling)
break
default:H.r(P.bA("Invalid position "+b))}return c},
R:["aR",function(a,b,c,d){var z,y,x,w,v
if(c==null){z=$.cF
if(z==null){z=H.h([],[W.bS])
y=new W.d4(z)
z.push(W.dH(null))
z.push(W.dN())
$.cF=y
d=y}else d=z
z=$.cE
if(z==null){z=new W.dO(d)
$.cE=z
c=z}else{z.a=d
c=z}}if($.a4==null){z=document.implementation.createHTMLDocument("")
$.a4=z
$.bG=z.createRange()
z=$.a4
z.toString
x=z.createElement("base")
J.er(x,document.baseURI)
$.a4.head.appendChild(x)}z=$.a4
if(!!this.$isbC)w=z.body
else{y=a.tagName
z.toString
w=z.createElement(y)
$.a4.body.appendChild(w)}if("createContextualFragment" in window.Range.prototype&&!C.a.t(C.M,a.tagName)){$.bG.selectNodeContents(w)
v=$.bG.createContextualFragment(b)}else{w.innerHTML=b
v=$.a4.createDocumentFragment()
for(;z=w.firstChild,z!=null;)v.appendChild(z)}z=$.a4.body
if(w==null?z!=null:w!==z)J.co(w)
c.bB(v)
document.adoptNode(v)
return v},function(a,b,c){return this.R(a,b,c,null)},"dN",null,null,"geI",2,5,null,0,0],
sce:function(a,b){this.aN(a,b)},
aO:function(a,b,c,d){a.textContent=null
a.appendChild(this.R(a,b,c,d))},
aN:function(a,b){return this.aO(a,b,null,null)},
$isa3:1,
$ist:1,
$isb:1,
$isf:1,
"%":";Element"},
iO:{"^":"e:1;",
$1:function(a){return!!J.l(a).$isa3}},
jt:{"^":"p;B:name=","%":"HTMLEmbedElement"},
ju:{"^":"bH;an:error=","%":"ErrorEvent"},
bH:{"^":"f;","%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|ClipboardEvent|CloseEvent|CrossOriginConnectEvent|CustomEvent|DefaultSessionStartEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PeriodicSyncEvent|PopStateEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;Event|InputEvent"},
bI:{"^":"f;",
dc:function(a,b,c,d){return a.addEventListener(b,H.aF(c,1),!1)},
dw:function(a,b,c,d){return a.removeEventListener(b,H.aF(c,1),!1)},
"%":"CrossOriginServiceWorkerClient|MediaStream;EventTarget"},
jL:{"^":"p;B:name=","%":"HTMLFieldSetElement"},
jN:{"^":"p;j:length=,B:name=","%":"HTMLFormElement"},
jP:{"^":"fk;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.aK(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.d(new P.N("Cannot assign element of immutable List."))},
C:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.t]},
$isk:1,
$isaw:1,
$isav:1,
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
fh:{"^":"f+af;",$isi:1,
$asi:function(){return[W.t]},
$isk:1},
fk:{"^":"fh+bJ;",$isi:1,
$asi:function(){return[W.t]},
$isk:1},
jQ:{"^":"p;B:name=","%":"HTMLIFrameElement"},
jS:{"^":"p;B:name=",
bc:function(a,b){return a.accept.$1(b)},
$isa3:1,
$isf:1,
"%":"HTMLInputElement"},
bM:{"^":"hu;",
ge7:function(a){return a.keyCode},
$isbM:1,
$isb:1,
"%":"KeyboardEvent"},
jV:{"^":"p;B:name=","%":"HTMLKeygenElement"},
jW:{"^":"p;ap:href}","%":"HTMLLinkElement"},
jX:{"^":"f;",
k:function(a){return String(a)},
"%":"Location"},
jY:{"^":"p;B:name=","%":"HTMLMapElement"},
k0:{"^":"p;an:error=","%":"HTMLAudioElement|HTMLMediaElement|HTMLVideoElement"},
k1:{"^":"p;B:name=","%":"HTMLMetaElement"},
k2:{"^":"fT;",
eB:function(a,b,c){return a.send(b,c)},
aM:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
fT:{"^":"bI;","%":"MIDIInput;MIDIPort"},
kc:{"^":"f;",$isf:1,"%":"Navigator"},
W:{"^":"cU;a",
ga3:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.d(new P.az("No elements"))
if(y>1)throw H.d(new P.az("More than one element"))
return z.firstChild},
u:function(a,b){var z,y,x,w
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=0;w<x;++w)y.appendChild(z.firstChild)
return},
i:function(a,b,c){var z,y
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.a(y,b)
z.replaceChild(c,y[b])},
gq:function(a){return C.O.gq(this.a.childNodes)},
gj:function(a){return this.a.childNodes.length},
h:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
$ascU:function(){return[W.t]},
$asi:function(){return[W.t]}},
t:{"^":"bI;",
gee:function(a){return new W.W(a)},
ek:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
k:function(a){var z=a.nodeValue
return z==null?this.cT(a):z},
$ist:1,
$isb:1,
"%":"Document|HTMLDocument|XMLDocument;Node"},
fU:{"^":"fl;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.aK(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.d(new P.N("Cannot assign element of immutable List."))},
C:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.t]},
$isk:1,
$isaw:1,
$isav:1,
"%":"NodeList|RadioNodeList"},
fi:{"^":"f+af;",$isi:1,
$asi:function(){return[W.t]},
$isk:1},
fl:{"^":"fi+bJ;",$isi:1,
$asi:function(){return[W.t]},
$isk:1},
ke:{"^":"p;B:name=","%":"HTMLObjectElement"},
kf:{"^":"p;B:name=","%":"HTMLOutputElement"},
kg:{"^":"p;B:name=","%":"HTMLParamElement"},
ki:{"^":"p;j:length=,B:name=","%":"HTMLSelectElement"},
kj:{"^":"bH;an:error=","%":"SpeechRecognitionError"},
km:{"^":"p;",
R:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.aR(a,b,c,d)
z=W.eY("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
new W.W(y).u(0,J.eo(z))
return y},
"%":"HTMLTableElement"},
kn:{"^":"p;",
R:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.aR(a,b,c,d)
z=document.createDocumentFragment()
y=document
y=J.ck(y.createElement("table"),b,c,d)
y.toString
y=new W.W(y)
x=y.ga3(y)
x.toString
y=new W.W(x)
w=y.ga3(y)
z.toString
w.toString
new W.W(z).u(0,new W.W(w))
return z},
"%":"HTMLTableRowElement"},
ko:{"^":"p;",
R:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.aR(a,b,c,d)
z=document.createDocumentFragment()
y=document
y=J.ck(y.createElement("table"),b,c,d)
y.toString
y=new W.W(y)
x=y.ga3(y)
z.toString
x.toString
new W.W(z).u(0,new W.W(x))
return z},
"%":"HTMLTableSectionElement"},
dk:{"^":"p;",
aO:function(a,b,c,d){var z
a.textContent=null
z=this.R(a,b,c,d)
a.content.appendChild(z)},
aN:function(a,b){return this.aO(a,b,null,null)},
$isdk:1,
"%":"HTMLTemplateElement"},
kp:{"^":"p;B:name=","%":"HTMLTextAreaElement"},
hu:{"^":"bH;","%":"CompositionEvent|DragEvent|FocusEvent|MouseEvent|PointerEvent|SVGZoomEvent|TextEvent|TouchEvent|WheelEvent;UIEvent"},
hy:{"^":"bI;",
cC:function(a,b,c,d){a.scrollTo(b,c)
return},
cB:function(a,b,c){return this.cC(a,b,c,null)},
$isf:1,
"%":"DOMWindow|Window"},
kx:{"^":"t;B:name=","%":"Attr"},
ky:{"^":"f;a0:height=,bi:left=,bw:top=,a2:width=",
k:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(a.width)+" x "+H.c(a.height)},
p:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isaS)return!1
y=a.left
x=z.gbi(b)
if(y==null?x==null:y===x){y=a.top
x=z.gbw(b)
if(y==null?x==null:y===x){y=a.width
x=z.ga2(b)
if(y==null?x==null:y===x){y=a.height
z=z.ga0(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){var z,y,x,w
z=J.R(a.left)
y=J.R(a.top)
x=J.R(a.width)
w=J.R(a.height)
return W.dJ(W.aa(W.aa(W.aa(W.aa(0,z),y),x),w))},
$isaS:1,
$asaS:I.br,
"%":"ClientRect"},
kz:{"^":"t;",$isf:1,"%":"DocumentType"},
kA:{"^":"eV;",
ga0:function(a){return a.height},
ga2:function(a){return a.width},
"%":"DOMRect"},
kD:{"^":"p;",$isf:1,"%":"HTMLFrameSetElement"},
kG:{"^":"fm;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.aK(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.d(new P.N("Cannot assign element of immutable List."))},
C:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.t]},
$isk:1,
$isaw:1,
$isav:1,
"%":"MozNamedAttrMap|NamedNodeMap"},
fj:{"^":"f+af;",$isi:1,
$asi:function(){return[W.t]},
$isk:1},
fm:{"^":"fj+bJ;",$isi:1,
$asi:function(){return[W.t]},
$isk:1},
hF:{"^":"b;bP:a<",
E:function(a,b){var z,y,x,w,v
for(z=this.gU(),y=z.length,x=this.a,w=0;w<z.length;z.length===y||(0,H.K)(z),++w){v=z[w]
b.$2(v,x.getAttribute(v))}},
gU:function(){var z,y,x,w,v
z=this.a.attributes
y=H.h([],[P.j])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.a(z,w)
v=z[w]
if(v.namespaceURI==null)y.push(J.en(v))}return y}},
hM:{"^":"hF;a",
h:function(a,b){return this.a.getAttribute(b)},
i:function(a,b,c){this.a.setAttribute(b,c)},
gj:function(a){return this.gU().length}},
hN:{"^":"cu;bP:a<",
S:function(){var z,y,x,w,v
z=P.H(null,null,null,P.j)
for(y=this.a.className.split(" "),x=y.length,w=0;w<y.length;y.length===x||(0,H.K)(y),++w){v=J.as(y[w])
if(v.length!==0)z.v(0,v)}return z},
bz:function(a){this.a.className=a.J(0," ")},
gj:function(a){return this.a.classList.length},
t:function(a,b){return typeof b==="string"&&this.a.classList.contains(b)},
v:function(a,b){var z,y
z=this.a.classList
y=z.contains(b)
z.add(b)
return!y},
O:function(a,b){var z,y,x
z=this.a.classList
y=z.contains(b)
z.remove(b)
x=y
return x}},
hQ:{"^":"a9;a,b,c",
ac:function(a,b,c,d){var z=new W.dD(0,this.a,this.b,W.dV(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.b9()
return z},
ci:function(a,b,c){return this.ac(a,null,b,c)}},
dD:{"^":"he;a,b,c,d,e",
be:function(){if(this.b==null)return
this.c3()
this.b=null
this.d=null
return},
bo:function(a,b){if(this.b==null)return;++this.a
this.c3()},
cm:function(a){return this.bo(a,null)},
co:function(){if(this.b==null||this.a<=0)return;--this.a
this.b9()},
b9:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.ee(x,this.c,z,!1)}},
c3:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.ef(x,this.c,z,!1)}}},
c0:{"^":"b;cw:a<",
a8:function(a){return $.$get$dI().t(0,W.au(a))},
X:function(a,b,c){var z,y,x
z=W.au(a)
y=$.$get$c1()
x=y.h(0,H.c(z)+"::"+b)
if(x==null)x=y.h(0,"*::"+b)
if(x==null)return!1
return x.$4(a,b,c,this)},
d7:function(a){var z,y
z=$.$get$c1()
if(z.gG(z)){for(y=0;y<262;++y)z.i(0,C.L[y],W.iR())
for(y=0;y<12;++y)z.i(0,C.h[y],W.iS())}},
$isbS:1,
m:{
dH:function(a){var z,y
z=document
y=z.createElement("a")
z=new W.ik(y,window.location)
z=new W.c0(z)
z.d7(a)
return z},
kE:[function(a,b,c,d){return!0},"$4","iR",8,0,6],
kF:[function(a,b,c,d){var z,y,x,w,v
z=d.gcw()
y=z.a
x=J.w(y)
x.sap(y,c)
w=x.gbf(y)
z=z.b
v=z.hostname
if(w==null?v==null:w===v){w=x.gbq(y)
v=z.port
if(w==null?v==null:w===v){w=x.gaH(y)
z=z.protocol
z=w==null?z==null:w===z}else z=!1}else z=!1
if(!z)if(x.gbf(y)==="")if(x.gbq(y)==="")z=x.gaH(y)===":"||x.gaH(y)===""
else z=!1
else z=!1
else z=!0
return z},"$4","iS",8,0,6]}},
bJ:{"^":"b;",
gq:function(a){return new W.f4(a,this.gj(a),-1,null)},
$isi:1,
$asi:null,
$isk:1},
d4:{"^":"b;a",
a8:function(a){return C.a.a9(this.a,new W.fW(a))},
X:function(a,b,c){return C.a.a9(this.a,new W.fV(a,b,c))}},
fW:{"^":"e:1;a",
$1:function(a){return a.a8(this.a)}},
fV:{"^":"e:1;a,b,c",
$1:function(a){return a.X(this.a,this.b,this.c)}},
il:{"^":"b;cw:d<",
a8:function(a){return this.a.t(0,W.au(a))},
X:["d_",function(a,b,c){var z,y
z=W.au(a)
y=this.c
if(y.t(0,H.c(z)+"::"+b))return this.d.dI(c)
else if(y.t(0,"*::"+b))return this.d.dI(c)
else{y=this.b
if(y.t(0,H.c(z)+"::"+b))return!0
else if(y.t(0,"*::"+b))return!0
else if(y.t(0,H.c(z)+"::*"))return!0
else if(y.t(0,"*::*"))return!0}return!1}],
d8:function(a,b,c,d){var z,y,x
this.a.u(0,c)
z=b.av(0,new W.im())
y=b.av(0,new W.io())
this.b.u(0,z)
x=this.c
x.u(0,C.N)
x.u(0,y)}},
im:{"^":"e:1;",
$1:function(a){return!C.a.t(C.h,a)}},
io:{"^":"e:1;",
$1:function(a){return C.a.t(C.h,a)}},
it:{"^":"il;e,a,b,c,d",
X:function(a,b,c){if(this.d_(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(J.cl(a).a.getAttribute("template")==="")return this.e.t(0,b)
return!1},
m:{
dN:function(){var z,y,x,w
z=H.h(new H.aQ(C.n,new W.iu()),[null,null])
y=P.H(null,null,null,P.j)
x=P.H(null,null,null,P.j)
w=P.H(null,null,null,P.j)
w=new W.it(P.cT(C.n,P.j),y,x,w,null)
w.d8(null,z,["TEMPLATE"],null)
return w}}},
iu:{"^":"e:1;",
$1:function(a){return"TEMPLATE::"+H.c(a)}},
is:{"^":"b;",
a8:function(a){var z=J.l(a)
if(!!z.$isde)return!1
z=!!z.$ism
if(z&&W.au(a)==="foreignObject")return!1
if(z)return!0
return!1},
X:function(a,b,c){if(b==="is"||C.e.aP(b,"on"))return!1
return this.a8(a)}},
f4:{"^":"b;a,b,c,d",
l:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.aH(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gn:function(){return this.d}},
bS:{"^":"b;"},
ik:{"^":"b;a,b"},
dO:{"^":"b;a",
bB:function(a){new W.iv(this).$2(a,null)},
ak:function(a,b){if(b==null)J.co(a)
else b.removeChild(a)},
dB:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.cl(a)
x=y.gbP().getAttribute("is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w===!0?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.A(t)}v="element unprintable"
try{v=J.U(a)}catch(t){H.A(t)}try{u=W.au(a)
this.dA(a,b,z,v,u,y,x)}catch(t){if(H.A(t) instanceof P.a1)throw t
else{this.ak(a,b)
window
s="Removing corrupted element "+H.c(v)
if(typeof console!="undefined")console.warn(s)}}},
dA:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(c){this.ak(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")console.warn(z)
return}if(!this.a.a8(a)){this.ak(a,b)
window
z="Removing disallowed element <"+H.c(e)+"> from "+J.U(b)
if(typeof console!="undefined")console.warn(z)
return}if(g!=null)if(!this.a.X(a,"is",g)){this.ak(a,b)
window
z="Removing disallowed type extension <"+H.c(e)+' is="'+g+'">'
if(typeof console!="undefined")console.warn(z)
return}z=f.gU()
y=H.h(z.slice(),[H.a_(z,0)])
for(x=f.gU().length-1,z=f.a;x>=0;--x){if(x>=y.length)return H.a(y,x)
w=y[x]
if(!this.a.X(a,J.bz(w),z.getAttribute(w))){window
v="Removing disallowed attribute <"+H.c(e)+" "+w+'="'+H.c(z.getAttribute(w))+'">'
if(typeof console!="undefined")console.warn(v)
z.getAttribute(w)
z.removeAttribute(w)}}if(!!J.l(a).$isdk)this.bB(a.content)}},
iv:{"^":"e:14;a",
$2:function(a,b){var z,y,x
z=this.a
switch(a.nodeType){case 1:z.dB(a,b)
break
case 8:case 11:case 3:case 4:break
default:z.ak(a,b)}y=a.lastChild
for(;y!=null;y=x){x=y.previousSibling
this.$2(y,a)}}}}],["","",,P,{"^":""}],["","",,P,{"^":"",jh:{"^":"aJ;",$isf:1,"%":"SVGAElement"},jj:{"^":"m;",$isf:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},jv:{"^":"m;",$isf:1,"%":"SVGFEBlendElement"},jw:{"^":"m;",$isf:1,"%":"SVGFEColorMatrixElement"},jx:{"^":"m;",$isf:1,"%":"SVGFEComponentTransferElement"},jy:{"^":"m;",$isf:1,"%":"SVGFECompositeElement"},jz:{"^":"m;",$isf:1,"%":"SVGFEConvolveMatrixElement"},jA:{"^":"m;",$isf:1,"%":"SVGFEDiffuseLightingElement"},jB:{"^":"m;",$isf:1,"%":"SVGFEDisplacementMapElement"},jC:{"^":"m;",$isf:1,"%":"SVGFEFloodElement"},jD:{"^":"m;",$isf:1,"%":"SVGFEGaussianBlurElement"},jE:{"^":"m;",$isf:1,"%":"SVGFEImageElement"},jF:{"^":"m;",$isf:1,"%":"SVGFEMergeElement"},jG:{"^":"m;",$isf:1,"%":"SVGFEMorphologyElement"},jH:{"^":"m;",$isf:1,"%":"SVGFEOffsetElement"},jI:{"^":"m;",$isf:1,"%":"SVGFESpecularLightingElement"},jJ:{"^":"m;",$isf:1,"%":"SVGFETileElement"},jK:{"^":"m;",$isf:1,"%":"SVGFETurbulenceElement"},jM:{"^":"m;",$isf:1,"%":"SVGFilterElement"},aJ:{"^":"m;",$isf:1,"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},jR:{"^":"aJ;",$isf:1,"%":"SVGImageElement"},jZ:{"^":"m;",$isf:1,"%":"SVGMarkerElement"},k_:{"^":"m;",$isf:1,"%":"SVGMaskElement"},kh:{"^":"m;",$isf:1,"%":"SVGPatternElement"},de:{"^":"m;",$isde:1,$isf:1,"%":"SVGScriptElement"},hE:{"^":"cu;a",
S:function(){var z,y,x,w,v,u
z=this.a.getAttribute("class")
y=P.H(null,null,null,P.j)
if(z==null)return y
for(x=z.split(" "),w=x.length,v=0;v<x.length;x.length===w||(0,H.K)(x),++v){u=J.as(x[v])
if(u.length!==0)y.v(0,u)}return y},
bz:function(a){this.a.setAttribute("class",a.J(0," "))}},m:{"^":"a3;",
gaa:function(a){return new P.hE(a)},
sce:function(a,b){this.aN(a,b)},
R:function(a,b,c,d){var z,y,x,w,v
z=H.h([],[W.bS])
d=new W.d4(z)
z.push(W.dH(null))
z.push(W.dN())
z.push(new W.is())
c=new W.dO(d)
y='<svg version="1.1">'+b+"</svg>"
z=document.body
x=(z&&C.i).dN(z,y,c)
w=document.createDocumentFragment()
x.toString
z=new W.W(x)
v=z.ga3(z)
for(;z=v.firstChild,z!=null;)w.appendChild(z)
return w},
cf:function(a,b,c){throw H.d(new P.N("Cannot invoke insertAdjacentElement on SVG."))},
$ism:1,
$isf:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},kk:{"^":"aJ;",$isf:1,"%":"SVGSVGElement"},kl:{"^":"m;",$isf:1,"%":"SVGSymbolElement"},hn:{"^":"aJ;","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement;SVGTextContentElement"},kq:{"^":"hn;",$isf:1,"%":"SVGTextPathElement"},kr:{"^":"aJ;",$isf:1,"%":"SVGUseElement"},ks:{"^":"m;",$isf:1,"%":"SVGViewElement"},kC:{"^":"m;",$isf:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},kH:{"^":"m;",$isf:1,"%":"SVGCursorElement"},kI:{"^":"m;",$isf:1,"%":"SVGFEDropShadowElement"},kJ:{"^":"m;",$isf:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":"",jn:{"^":"b;"}}],["","",,H,{"^":"",d_:{"^":"f;",$isd_:1,"%":"ArrayBuffer"},bR:{"^":"f;",$isbR:1,"%":"DataView;ArrayBufferView;bP|d0|d2|bQ|d1|d3|a7"},bP:{"^":"bR;",
gj:function(a){return a.length},
$isaw:1,
$isav:1},bQ:{"^":"d2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.v(a,b))
return a[b]},
i:function(a,b,c){if(b>>>0!==b||b>=a.length)H.r(H.v(a,b))
a[b]=c}},d0:{"^":"bP+af;",$isi:1,
$asi:function(){return[P.bx]},
$isk:1},d2:{"^":"d0+cJ;"},a7:{"^":"d3;",
i:function(a,b,c){if(b>>>0!==b||b>=a.length)H.r(H.v(a,b))
a[b]=c},
$isi:1,
$asi:function(){return[P.o]},
$isk:1},d1:{"^":"bP+af;",$isi:1,
$asi:function(){return[P.o]},
$isk:1},d3:{"^":"d1+cJ;"},k3:{"^":"bQ;",$isi:1,
$asi:function(){return[P.bx]},
$isk:1,
"%":"Float32Array"},k4:{"^":"bQ;",$isi:1,
$asi:function(){return[P.bx]},
$isk:1,
"%":"Float64Array"},k5:{"^":"a7;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.v(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.o]},
$isk:1,
"%":"Int16Array"},k6:{"^":"a7;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.v(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.o]},
$isk:1,
"%":"Int32Array"},k7:{"^":"a7;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.v(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.o]},
$isk:1,
"%":"Int8Array"},k8:{"^":"a7;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.v(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.o]},
$isk:1,
"%":"Uint16Array"},k9:{"^":"a7;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.v(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.o]},
$isk:1,
"%":"Uint32Array"},ka:{"^":"a7;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.v(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.o]},
$isk:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},kb:{"^":"a7;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.v(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.o]},
$isk:1,
"%":";Uint8Array"}}],["","",,H,{"^":"",
e7:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,E,{"^":"",f2:{"^":"b;a,b"}}],["","",,P,{"^":"",
cC:function(){var z=$.cB
if(z==null){z=J.by(window.navigator.userAgent,"Opera",0)
$.cB=z}return z},
eT:function(){var z,y
z=$.cy
if(z!=null)return z
y=$.cz
if(y==null){y=J.by(window.navigator.userAgent,"Firefox",0)
$.cz=y}if(y===!0)z="-moz-"
else{y=$.cA
if(y==null){y=P.cC()!==!0&&J.by(window.navigator.userAgent,"Trident/",0)
$.cA=y}if(y===!0)z="-ms-"
else z=P.cC()===!0?"-o-":"-webkit-"}$.cy=z
return z},
cu:{"^":"b;",
bb:function(a){if($.$get$cv().b.test(H.q(a)))return a
throw H.d(P.bB(a,"value","Not a valid class token"))},
k:function(a){return this.S().J(0," ")},
gq:function(a){var z,y
z=this.S()
y=new P.aA(z,z.r,null,null)
y.c=z.e
return y},
E:function(a,b){this.S().E(0,b)},
a1:function(a,b){var z=this.S()
return H.h(new H.bF(z,b),[H.a_(z,0),null])},
gj:function(a){return this.S().a},
t:function(a,b){if(typeof b!=="string")return!1
this.bb(b)
return this.S().t(0,b)},
bj:function(a){return this.t(0,a)?a:null},
v:function(a,b){this.bb(b)
return this.ec(new P.eO(b))},
O:function(a,b){var z,y
this.bb(b)
z=this.S()
y=z.O(0,b)
this.bz(z)
return y},
ec:function(a){var z,y
z=this.S()
y=a.$1(z)
this.bz(z)
return y},
$isk:1},
eO:{"^":"e:1;a",
$1:function(a){return a.v(0,this.a)}}}],["","",,F,{"^":"",
kN:[function(){var z,y,x,w,v,u,t,s,r,q
z=[[1500,0,0,0,0,0],[3000,0,0,0,0,0],[4500,0,0,0,0,0],[6000,0,0,0,0,0],[7000,0,1000,90,0,0],[6000,0,2000,180,0,0],[6000,-300,1800,0,-90,90],[6000,0,1200,0,0,90],[7000,500,0,30,90,90],[7000,500,500,-30,180,-90],[7000,500,500,0,90,0],[7000,2000,500,0,90,0],[8000,1000,500,-90,90,0],[8000,1000,1500,0,0,90],[12e3,1000,500,0,90,0],[12e3,3000,500,90,90,0],[9000,5000,500,180,90,0],[6000,2500,-1000,180,90,90],[3000,1500,500,180,90,0],[1500,1000,0,90,0,0],[0,500,0,0,0,0]]
y=D.fO($.j9)
$.ch=y.length
x=document.querySelector("#render")
w=H.h([],[M.bW])
v=new M.ex(0,w,H.h([],[M.bW]),null,!1)
v.c=M.eE(x)
$.iE=v
for(x=y.length,u=0,t=0;t<y.length;y.length===x||(0,H.K)(y),++t){s=y[t]
if(u>=21)return H.a(z,u)
r=z[u]
q=v.e9(s,1,r[0],r[1],r[2],r[3],r[4],r[5])
q.e=!0
q.ef(0)
J.cn(v.c.e,"beforeEnd",q.d)
w.push(q);++u}v.cN(0)
x=H.h(new W.hQ(document,"keydown",!1),[null])
H.h(new W.dD(0,x.a,x.b,W.dV(new F.j7(v)),!1),[H.a_(x,0)]).b9()},"$0","e4",0,0,2],
ed:function(a){var z,y
if(a){z=$.ch
y=$.ao
if(z==null?y==null:z===y)$.ao=1
else{if(typeof y!=="number")return y.af()
$.ao=y+1}}else{z=$.ao
if(z===1)$.ao=$.ch
else{if(typeof z!=="number")return z.cQ()
$.ao=z-1}}document.querySelector("#count").textContent=J.U($.ao)},
j7:{"^":"e:15;a",
$1:function(a){switch(J.em(a)){case 37:this.a.ei()
F.ed(!1)
break
case 39:this.a.ed()
F.ed(!0)
break}C.R.cB(window,0,0)}}},1],["","",,U,{"^":"",
cq:function(a){if(a.d>=a.a.length)return!0
return C.a.a9(a.c,new U.eA(a))},
ez:{"^":"b;a,b,c,d,e",
gM:function(){var z,y
z=this.d
y=this.a
if(z>=y.length-1)return
return y[z+1]},
ea:function(a,b){var z,y
z=this.d
y=this.a
if(z>=y.length)return!1
return b.D(y[z])!=null},
eb:function(a){if(this.gM()==null)return!1
return a.D(this.gM())!=null}},
X:{"^":"b;",
gH:function(a){return},
gaC:function(){return!0},
aD:function(a){var z,y,x
z=this.gH(this)
y=a.a
x=a.d
if(x>=y.length)return H.a(y,x)
return z.D(y[x])!=null},
bm:function(a){var z,y,x,w,v
z=H.h([],[P.j])
for(y=a.a;a.d<y.length;){x=this.gH(this)
w=a.d
if(w>=y.length)return H.a(y,w)
v=x.D(y[w])
if(v==null)break
x=v.b
if(1>=x.length)return H.a(x,1)
z.push(x[1]);++a.d}return z}},
eA:{"^":"e:1;a",
$1:function(a){return a.aD(this.a)&&a.gaC()}},
eZ:{"^":"X;",
gH:function(a){return $.$get$aX()},
N:function(a){++a.d
return}},
h8:{"^":"X;",
aD:function(a){return a.eb($.$get$c8())},
N:function(a){var z,y,x,w
z=$.$get$c8().D(a.gM()).b
if(1>=z.length)return H.a(z,1)
y=J.u(J.aH(z[1],0),"=")?"h1":"h2"
z=a.a
x=a.d
if(x>=z.length)return H.a(z,x)
w=R.b6(z[x],a.b).aG()
a.d=++a.d+1
return new T.x(y,w,P.V(P.j,P.j),null)}},
f6:{"^":"X;",
gH:function(a){return $.$get$bm()},
N:function(a){var z,y,x,w,v,u
z=$.$get$bm()
y=a.a
x=a.d
if(x>=y.length)return H.a(y,x)
w=z.D(y[x]);++a.d
x=w.b
if(1>=x.length)return H.a(x,1)
v=J.L(x[1])
if(2>=x.length)return H.a(x,2)
u=R.b6(J.as(x[2]),a.b).aG()
return new T.x("h"+H.c(v),u,P.V(P.j,P.j),null)}},
eB:{"^":"X;",
gH:function(a){return $.$get$c4()},
N:function(a){return new T.x("blockquote",a.b.bn(this.bm(a)),P.V(P.j,P.j),null)}},
eL:{"^":"X;",
gH:function(a){return $.$get$aY()},
bm:function(a){var z,y,x,w,v,u,t
z=H.h([],[P.j])
for(y=a.a;x=a.d,w=y.length,x<w;){v=$.$get$aY()
if(x>=w)return H.a(y,x)
u=v.D(y[x])
if(u!=null){x=u.b
if(1>=x.length)return H.a(x,1)
z.push(x[1]);++a.d}else{t=a.gM()!=null?v.D(a.gM()):null
x=a.d
if(x>=y.length)return H.a(y,x)
if(J.as(y[x])===""&&t!=null){z.push("")
x=t.b
if(1>=x.length)return H.a(x,1)
z.push(x[1])
a.d=++a.d+1}else break}}return z},
N:function(a){var z,y
z=this.bm(a)
z.push("")
y=C.e.aI(C.a.J(z,"\n"),"&","&amp;")
H.q("&lt;")
y=H.z(y,"<","&lt;")
H.q("&gt;")
return new T.x("pre",[new T.x("code",[new T.T(H.z(y,">","&gt;"))],P.a2(),null)],P.V(P.j,P.j),null)}},
f3:{"^":"X;",
gH:function(a){return $.$get$bl()},
eg:function(a,b){var z,y,x,w,v,u
if(b==null)b=""
z=H.h([],[P.j])
y=++a.d
for(x=a.a;w=x.length,y<w;){v=$.$get$bl()
if(y<0||y>=w)return H.a(x,y)
u=v.D(x[y])
if(u!=null){y=u.b
if(1>=y.length)return H.a(y,1)
y=!J.et(y[1],b)}else y=!0
w=a.d
if(y){if(w>=x.length)return H.a(x,w)
z.push(x[w])
y=++a.d}else{a.d=w+1
break}}return z},
N:function(a){var z,y,x,w,v,u,t
z=$.$get$bl()
y=a.a
x=a.d
if(x>=y.length)return H.a(y,x)
x=z.D(y[x]).b
y=x.length
if(1>=y)return H.a(x,1)
w=x[1]
if(2>=y)return H.a(x,2)
v=x[2]
u=this.eg(a,w)
u.push("")
x=C.e.aI(C.a.J(u,"\n"),"&","&amp;")
H.q("&lt;")
x=H.z(x,"<","&lt;")
H.q("&gt;")
t=H.z(x,">","&gt;")
x=P.a2()
v=J.as(v)
if(v.length!==0)x.i(0,"class","language-"+H.c(C.a.gca(v.split(" "))))
return new T.x("pre",[new T.x("code",[new T.T(t)],x,null)],P.V(P.j,P.j),null)}},
f7:{"^":"X;",
gH:function(a){return $.$get$c5()},
N:function(a){++a.d
return new T.x("hr",null,P.a2(),null)}},
ey:{"^":"X;",
gH:function(a){return $.$get$dP()},
gaC:function(){return!1},
N:function(a){var z,y,x
z=H.h([],[P.j])
y=a.a
while(!0){if(!(a.d<y.length&&!a.ea(0,$.$get$aX())))break
x=a.d
if(x>=y.length)return H.a(y,x)
z.push(y[x]);++a.d}return new T.T(C.a.J(z,"\n"))}},
cV:{"^":"b;a,b"},
cX:{"^":"X;",
gaC:function(){return!0},
N:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
y=H.h([],[U.cV])
z.a=H.h([],[P.j])
x=new U.fM(z,y)
z.b=null
w=new U.fN(z,a)
for(v=a.a;a.d<v.length;){if(w.$1($.$get$aX())===!0)z.a.push("")
else if(w.$1($.$get$bp())===!0||w.$1($.$get$bn())===!0){x.$0()
u=z.a
t=z.b.b
if(1>=t.length)return H.a(t,1)
u.push(t[1])}else if(w.$1($.$get$aY())===!0){u=z.a
t=z.b.b
if(1>=t.length)return H.a(t,1)
u.push(t[1])}else if(U.cq(a))break
else{u=z.a
if(u.length>0&&J.u(C.a.gK(u),""))break
u=z.a
t=a.d
if(t>=v.length)return H.a(v,t)
u.push(v[t])}++a.d}x.$0()
this.dU(y)
s=H.h([],[T.bc])
for(z=y.length,x=a.b,r=0;r<y.length;y.length===z||(0,H.K)(y),++r){q=y[r]
w=q.b
if(q.a)s.push(new T.x("li",x.bn(w),P.V(P.j,P.j),null))
else{if(0>=w.length)return H.a(w,0)
s.push(new T.x("li",R.b6(w[0],x).aG(),P.V(P.j,P.j),null))}}return new T.x(this.gcg(),s,P.V(P.j,P.j),null)},
dU:function(a){var z,y,x,w,v,u
for(z=0;z<a.length;z=x){for(y=a[z].b.length-1,x=z+1;y>0;--y){w=$.$get$aX()
if(z>=a.length)return H.a(a,z)
v=a[z].b
if(y>=v.length)return H.a(v,y)
v=v[y]
w=w.b
if(typeof v!=="string")H.r(H.I(v))
if(!w.test(v))break
w=a.length
if(z<w-1){a[z].a=!0
if(x>=w)return H.a(a,x)
a[x].a=!0}if(z>=w)return H.a(a,z)
w=a[z].b
if(0>=w.length)return H.a(w,-1)
w.pop()}w=a.length
if(z>=w)return H.a(a,z)
v=a[z]
u=v.a||v.b.length>1
v.a=u
if(z>=w)return H.a(a,z)
if(u)continue
v.a=C.a.a9($.$get$cY(),new U.fL(a,z))}}},
fM:{"^":"e:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
if(y.length>0){this.b.push(new U.cV(!1,y))
z.a=H.h([],[P.j])}}},
fN:{"^":"e:16;a,b",
$1:function(a){var z,y,x
z=this.b
y=z.a
z=z.d
if(z>=y.length)return H.a(y,z)
x=a.D(y[z])
this.a.b=x
return x!=null}},
fL:{"^":"e:1;a,b",
$1:function(a){var z,y
z=this.a
y=this.b
if(y>=z.length)return H.a(z,y)
y=z[y].b
if(0>=y.length)return H.a(y,0)
return a.e0(y[0])}},
hw:{"^":"cX;",
gH:function(a){return $.$get$bp()},
gcg:function(){return"ul"}},
fY:{"^":"cX;",
gH:function(a){return $.$get$bn()},
gcg:function(){return"ol"}},
fZ:{"^":"X;",
gaC:function(){return!1},
aD:function(a){return!0},
N:function(a){var z,y,x
z=H.h([],[P.j])
for(y=a.a;!U.cq(a);){x=a.d
if(x>=y.length)return H.a(y,x)
z.push(y[x]);++a.d}return new T.x("p",R.b6(C.a.J(z,"\n"),a.b).aG(),P.V(P.j,P.j),null)}}}],["","",,T,{"^":"",bc:{"^":"b;"},x:{"^":"b;a,b,c5:c>,d",
bc:function(a,b){var z,y,x
if(b.eA(this)){for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.K)(z),++x)J.cj(z[x],b)
b.a.a+="</"+H.c(this.a)+">"}}},T:{"^":"b;a",
bc:function(a,b){var z=b.a
z.toString
z.a+=H.c(this.a)
return}}}],["","",,L,{"^":"",eU:{"^":"b;a,b,c,d,e,f",
eh:function(a){var z,y,x,w,v,u,t,s,r
z=new H.G("^[ ]{0,3}\\[([^\\]]+)\\]:\\s+(\\S+)\\s*(\"[^\"]+\"|'[^']+'|\\([^)]+\\)|)\\s*$",H.C("^[ ]{0,3}\\[([^\\]]+)\\]:\\s+(\\S+)\\s*(\"[^\"]+\"|'[^']+'|\\([^)]+\\)|)\\s*$",!1,!0,!1),null,null)
for(y=this.a,x=0;x<a.length;++x){w=z.D(a[x])
if(w!=null){v=w.b
u=v.length
if(1>=u)return H.a(v,1)
t=v[1]
if(2>=u)return H.a(v,2)
s=v[2]
if(3>=u)return H.a(v,3)
r=v[3]
v=J.l(r)
if(v.p(r,""))r=null
else{u=v.gj(r)
if(typeof u!=="number")return u.cQ()
r=v.a4(r,1,u-1)}t=J.bz(t)
y.i(0,t,new L.cS(t,s,r))
if(x>=a.length)return H.a(a,x)
a[x]=""}}},
bn:function(a){var z,y,x,w,v,u,t
z=[]
y=new U.ez(a,this,z,0,C.m)
C.a.u(z,this.b)
C.a.u(z,C.m)
x=H.h([],[T.bc])
for(;y.d<a.length;)for(w=z.length,v=0;v<z.length;z.length===w||(0,H.K)(z),++v){u=z[v]
if(u.aD(y)){t=u.N(y)
if(t!=null)x.push(t)
break}}return x}},cS:{"^":"b;a,b,c"}}],["","",,B,{"^":"",
e5:function(a,b,c,d,e,f,g){var z,y,x,w
z=new L.eU(P.a2(),null,null,null,g,d)
y=$.$get$cI()
z.d=y
x=P.H(null,null,null,null)
x.u(0,[])
x.u(0,y.a)
z.b=x
x=P.H(null,null,null,null)
x.u(0,[])
x.u(0,y.b)
z.c=x
w=J.aq(a,"\r\n","\n").split("\n")
z.eh(w)
return new B.f8(null,null).eo(z.bn(w))+"\n"},
f8:{"^":"b;a,b",
eo:function(a){var z,y
this.a=new P.ag("")
this.b=P.H(null,null,null,P.j)
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.K)(a),++y)J.cj(a[y],this)
return J.U(this.a)},
eA:function(a){var z,y,x,w,v
if(this.a.a.length!==0&&$.$get$cK().D(a.a)!=null)this.a.a+="\n"
this.a.a+="<"+H.c(a.a)
z=a.c
y=z.gU()
x=P.aP(y,!0,H.E(y,"y",0))
C.a.c7(x,"sort")
H.aT(x,0,x.length-1,new B.f9())
for(y=x.length,w=0;w<x.length;x.length===y||(0,H.K)(x),++w){v=x[w]
this.a.a+=" "+H.c(v)+'="'+H.c(z.h(0,v))+'"'}z=this.a
if(a.b==null){z.a+=" />"
return!1}else{z.a+=">"
return!0}}},
f9:{"^":"e:4;",
$2:function(a,b){return J.eh(a,b)}}}],["","",,R,{"^":"",fe:{"^":"b;a,b,c,d,e,f",
aG:function(){var z,y,x,w,v,u,t,s
z=this.f
z.push(new R.bX(0,0,null,H.h([],[T.bc])))
for(y=this.a,x=J.J(y),w=this.c;this.d!==x.gj(y);){u=z.length-1
while(!0){if(!(u>0)){v=!1
break}if(u>=z.length)return H.a(z,u)
if(z[u].aJ(this)){v=!0
break}--u}if(v)continue
t=w.length
s=0
while(!0){if(!(s<w.length)){v=!1
break}if(w[s].aJ(this)){v=!0
break}w.length===t||(0,H.K)(w);++s}if(v)continue;++this.d}if(0>=z.length)return H.a(z,0)
return z[0].c8(0,this,null)},
aK:function(a,b){var z,y,x,w,v
if(b<=a)return
z=J.cp(this.a,a,b)
y=C.a.gK(this.f).d
if(y.length>0&&C.a.gK(y) instanceof T.T){x=H.iZ(C.a.gK(y),"$isT")
w=y.length-1
v=H.c(x.a)+z
if(w<0||w>=y.length)return H.a(y,w)
y[w]=new T.T(v)}else y.push(new T.T(z))},
d1:function(a,b){var z,y,x,w,v,u,t,s
z=this.c
y=this.b
C.a.u(z,y.c)
if(y.c.a9(0,new R.ff(this)))z.push(new R.bg(null,new H.G("[A-Za-z0-9]+\\b",H.C("[A-Za-z0-9]+\\b",!0,!0,!1),null,null)))
else z.push(new R.bg(null,new H.G("[ \\tA-Za-z0-9]*[A-Za-z0-9]",H.C("[ \\tA-Za-z0-9]*[A-Za-z0-9]",!0,!0,!1),null,null)))
C.a.u(z,$.$get$cM())
x=R.b9()
w=H.C(x,!0,!0,!1)
v=H.C("\\[",!0,!0,!1)
u=R.b9()
t=H.C(u,!0,!0,!1)
s=H.C("!\\[",!0,!0,!1)
C.a.aE(z,"insertAll")
P.h0(1,0,z.length,"index",null)
C.a.sj(z,z.length+2)
C.a.aw(z,3,z.length,z,1)
C.a.cL(z,1,3,[new R.bN(y.e,new H.G(x,w,null,null),null,new H.G("\\[",v,null,null)),new R.cL(y.f,new H.G(u,t,null,null),null,new H.G("!\\[",s,null,null))])},
m:{
b6:function(a,b){var z=new R.fe(a,b,H.h([],[R.a5]),0,0,H.h([],[R.bX]))
z.d1(a,b)
return z}}},ff:{"^":"e:1;a",
$1:function(a){return!C.a.t(this.a.b.d.b,a)}},a5:{"^":"b;",
aJ:function(a){var z,y,x
z=this.a.as(0,a.a,a.d)
if(z!=null){a.aK(a.e,a.d)
a.e=a.d
if(this.ad(a,z)){y=z.b
if(0>=y.length)return H.a(y,0)
y=J.L(y[0])
x=a.d
if(typeof y!=="number")return H.O(y)
y=x+y
a.d=y
a.e=y}return!0}return!1}},bg:{"^":"a5;b,a",
ad:function(a,b){var z,y
z=this.b
if(z==null){z=b.b
if(0>=z.length)return H.a(z,0)
z=J.L(z[0])
y=a.d
if(typeof z!=="number")return H.O(z)
a.d=y+z
return!1}C.a.gK(a.f).d.push(new T.T(z))
return!0},
m:{
ah:function(a,b){return new R.bg(b,new H.G(a,H.C(a,!0,!0,!1),null,null))}}},f0:{"^":"a5;a",
ad:function(a,b){var z=b.b
if(0>=z.length)return H.a(z,0)
z=J.aH(z[0],1)
C.a.gK(a.f).d.push(new T.T(z))
return!0}},fd:{"^":"bg;b,a"},ew:{"^":"a5;a",
ad:function(a,b){var z,y,x
z=b.b
if(1>=z.length)return H.a(z,1)
y=z[1]
z=J.aq(y,"&","&amp;")
H.q("&lt;")
z=H.z(z,"<","&lt;")
H.q("&gt;")
z=H.z(z,">","&gt;")
x=P.a2()
x.i(0,"href",y)
C.a.gK(a.f).d.push(new T.x("a",[new T.T(z)],x,null))
return!0}},di:{"^":"a5;b,c,a",
ad:function(a,b){var z,y
z=a.d
y=b.b
if(0>=y.length)return H.a(y,0)
y=J.L(y[0])
if(typeof y!=="number")return H.O(y)
a.f.push(new R.bX(z,z+y,this,H.h([],[T.bc])))
return!0},
cl:function(a,b,c){C.a.gK(a.f).d.push(new T.x(this.c,c.d,P.V(P.j,P.j),null))
return!0},
m:{
bf:function(a,b,c){var z=b!=null?b:a
return new R.di(new H.G(z,H.C(z,!0,!0,!1),null,null),c,new H.G(a,H.C(a,!0,!0,!1),null,null))}}},bN:{"^":"di;d,b,c,a",
dO:function(a,b,c){var z=b.b
if(1>=z.length)return H.a(z,1)
if(z[1]==null)return
else return this.bJ(0,a,b,c)},
bJ:function(a,b,c,d){var z,y,x
z=this.bA(b,c,d)
if(z==null)return
y=P.V(P.j,P.j)
x=J.aq(z.b,"&","&amp;")
H.q("&lt;")
x=H.z(x,"<","&lt;")
H.q("&gt;")
y.i(0,"href",H.z(x,">","&gt;"))
x=z.c
if(x!=null){x=J.aq(x,"&","&amp;")
H.q("&lt;")
x=H.z(x,"<","&lt;")
H.q("&gt;")
y.i(0,"title",H.z(x,">","&gt;"))}return new T.x("a",d.d,y,null)},
bA:function(a,b,c){var z,y,x,w,v
z=b.b
y=z.length
if(3>=y)return H.a(z,3)
x=z[3]
if(x!=null){if(4>=y)return H.a(z,4)
w=z[4]
return new L.cS(null,J.ab(x).aP(x,"<")&&C.e.dV(x,">")?C.e.a4(x,1,x.length-1):x,w)}else{if(J.u(z[2],""))v=J.cp(a.a,c.a+1,a.d)
else{if(2>=z.length)return H.a(z,2)
v=z[2]}return a.b.a.h(0,J.bz(v))}},
cl:function(a,b,c){var z=this.dO(a,b,c)
if(z==null)return!1
C.a.gK(a.f).d.push(z)
return!0},
m:{
b9:function(){return'](?:(\\[([^\\]]*)\\]|\\((\\S*?)(?:\\s*"([^"]+?)"|)\\))|)'},
fG:function(a,b){var z=R.b9()
return new R.bN(a,new H.G(z,H.C(z,!0,!0,!1),null,null),null,new H.G(b,H.C(b,!0,!0,!1),null,null))}}},cL:{"^":"bN;d,b,c,a",
bJ:function(a,b,c,d){var z,y,x,w
z=this.bA(b,c,d)
y=P.a2()
x=J.aq(z.b,"&","&amp;")
H.q("&lt;")
x=H.z(x,"<","&lt;")
H.q("&gt;")
y.i(0,"src",H.z(x,">","&gt;"))
x=z.c
if(x!=null){x=J.aq(x,"&","&amp;")
H.q("&lt;")
x=H.z(x,"<","&lt;")
H.q("&gt;")
y.i(0,"title",H.z(x,">","&gt;"))}w=H.h(new H.aQ(d.d,new R.fb()),[null,null]).J(0," ")
if(w!=="")y.i(0,"alt",w)
return new T.x("img",null,y,null)},
m:{
fa:function(a){var z=R.b9()
return new R.cL(a,new H.G(z,H.C(z,!0,!0,!1),null,null),null,new H.G("!\\[",H.C("!\\[",!0,!0,!1),null,null))}}},fb:{"^":"e:1;",
$1:function(a){return a instanceof T.T?a.a:""}},eM:{"^":"a5;a",
aJ:function(a){var z,y,x
z=a.d
if(z>0&&J.u(J.aH(a.a,z-1),"`"))return!1
y=this.a.as(0,a.a,a.d)
if(y==null)return!1
a.aK(a.e,a.d)
a.e=a.d
this.ad(a,y)
z=y.b
if(0>=z.length)return H.a(z,0)
z=J.L(z[0])
x=a.d
if(typeof z!=="number")return H.O(z)
z=x+z
a.d=z
a.e=z
return!0},
ad:function(a,b){var z,y
z=b.b
if(2>=z.length)return H.a(z,2)
z=C.e.aI(J.as(z[2]),"&","&amp;")
H.q("&lt;")
z=H.z(z,"<","&lt;")
H.q("&gt;")
z=H.z(z,">","&gt;")
y=P.a2()
C.a.gK(a.f).d.push(new T.x("code",[new T.T(z)],y,null))
return!0}},bX:{"^":"b;cO:a<,b,c,d",
aJ:function(a){var z=this.c.b.as(0,a.a,a.d)
if(z!=null){this.c8(0,a,z)
return!0}return!1},
c8:function(a,b,c){var z,y,x,w,v,u
z=b.f
y=C.a.e1(z,this)+1
x=C.a.cR(z,y)
C.a.en(z,y,z.length)
for(y=x.length,w=this.d,v=0;v<x.length;x.length===y||(0,H.K)(x),++v){u=x[v]
b.aK(u.gcO(),u.b)
C.a.u(w,u.d)}b.aK(b.e,b.d)
b.e=b.d
if(0>=z.length)return H.a(z,-1)
z.pop()
if(z.length===0)return w
if(this.c.cl(b,c,this)){z=c.b
if(0>=z.length)return H.a(z,0)
z=J.L(z[0])
y=b.d
if(typeof z!=="number")return H.O(z)
z=y+z
b.d=z
b.e=z}else{b.e=this.a
z=c.b
if(0>=z.length)return H.a(z,0)
z=J.L(z[0])
y=b.d
if(typeof z!=="number")return H.O(z)
b.d=y+z}return}}}],["","",,D,{"^":"",
fO:function(a){var z,y,x,w,v,u,t,s
z=H.h([],[W.p])
y=a.split("@@@")
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.K)(y),++w){v=y[w]
u=B.e5(v,null,null,null,!1,null,null)
H.e7(u)
t=document
s=t.createElement("div")
J.es(s,B.e5(v,null,null,null,!1,null,null))
t=s.style
t.fontSize="3em"
z.push(s)}return z}}],["","",,M,{"^":"",ex:{"^":"h9;e,a,b,c,d",
ed:function(){var z,y,x
z=this.a
y=z.length
if(y<1)return
x=++this.e
if(x>=y){this.e=0
x=0}if(x<0||x>=y)return H.a(z,x)
this.bk(0,z[x],0.7)},
ei:function(){var z,y,x
z=this.a
y=z.length
if(y<1)return
x=--this.e
if(x<0){x=y-1
this.e=x}if(x<0||x>=y)return H.a(z,x)
this.bk(0,z[x],0.3)},
cN:function(a){var z=this.a
if(z.length<1)return
this.e=0
this.bk(0,z[0],0)}},eD:{"^":"dl;d,e,a,b,c",
cj:function(a,b,c,d,e,f,g){var z,y,x
z=this.b
z.a=b
z.b=c
z.c=d
z=this.c
z.a=e
z.b=f
z.c=g
z=this.e
y=z.clientWidth
if(typeof y!=="number")return y.aS()
y=C.b.F(y,2)
z=z.style
x=z&&C.f
x.sbx(z,H.c(a)+"s")
x.sev(z,""+C.d.w(b)+"px")
x.sew(z,""+C.d.w(c)+"px")
x.sex(z,""+C.b.w(d)+"px")
x.sct(z,"scale(1) translateX("+C.d.w(-b+y)+"px) translateY("+C.d.w(-c+0)+"px) translateZ("+C.b.w(-d)+"px) rotateZ("+-C.b.w(g)+"deg) rotateY("+-C.d.w(f)+"deg) rotateX("+-C.d.w(e)+"deg)")},
d0:function(a){var z,y,x
z=this.d
y=this.e
J.cn(z,"beforeEnd",y)
x=y.style
x.marginLeft="auto"
x.marginRight="auto"
z=z.clientHeight
if(typeof z!=="number")return z.aS()
z=""+C.b.F(z,2)+"px"
x.marginTop=z
z=y.style
z.height="100%"
z.width="100%"
z.position="relative";(z&&C.f).scu(z,"preserve-3d")
this.cj(0,0,0,0,0,0,0)},
m:{
eE:function(a){var z=document
z=new M.eD(a,z.createElement("div"),1,null,null)
z.b=new M.bi(0,0,0)
z.c=new M.bi(0,0,0)
z.d0(a)
return z}}},bW:{"^":"dl;",
ck:["cW",function(a,b){var z,y,x
if(this.e)return 0
z=this.d
y=J.w(z)
x=y.gbC(z);(x&&C.f).sbx(x,H.c(a)+"s ease-in-out")
y.gaa(z).v(0,"focused")
y.gaa(z).O(0,"unfocused")
this.e=!0}],
bl:["cX",function(a,b){var z,y,x
if(!this.e)return 0
z=this.d
y=J.w(z)
x=y.gbC(z);(x&&C.f).sbx(x,H.c(a)+"s ease-in-out")
y.gaa(z).v(0,"unfocused")
y.gaa(z).O(0,"focused")
this.e=!1}],
d3:function(a,b,c,d,e,f,g,h){var z,y
z=this.d
J.ek(z).v(0,"slide")
y=z.style
y.position="absolute";(y&&C.f).scu(y,"preserve-3d")
z=z.style;(z&&C.f).sct(z,this.gey())}},h9:{"^":"b;",
e9:function(a,b,c,d,e,f,g,h){var z=new M.hd(a,!1,b,null,null)
z.b=new M.bi(c,d,e)
z.c=new M.bi(g,f,h)
z.d3(a,b,c,d,e,f,g,h)
return z},
bk:function(a,b,c){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<z.length;z.length===y||(0,H.K)(z),++x){w=z[x]
if(b!==w)w.bl(c,this)}b.ck(c,this)}},hd:{"^":"bW;d,e,a,b,c",
ck:function(a,b){var z,y,x,w,v,u,t
this.cW(a,b)
z=b.c
y=this.d
x=J.el(y)
if(typeof x!=="number")return x.aS()
x=C.b.F(x,2)
y=y.clientHeight
if(typeof y!=="number")return y.aS()
y=C.b.F(y,2)
P.bv("centering slide... xOffset:"+x+" yOffset:"+y)
w=this.b
v=w.a
u=w.b
w=w.c
t=this.c
z.cj(a,v+x,u+y,w,t.a,t.b,t.c)},
bl:function(a,b){this.cX(a,b)},
ef:function(a){return this.bl(a,null)}},dl:{"^":"b;",
gey:function(){return"scale("+this.a+") translateX("+C.d.w(this.b.a)+"px) translateY("+C.d.w(this.b.b)+"px) translateZ("+C.b.w(this.b.c)+"px) rotateX("+C.d.w(this.c.a)+"deg) rotateY("+C.d.w(this.c.b)+"deg) rotateZ("+C.b.w(this.c.c)+"deg)"}},bi:{"^":"b;a,b,c",
gj:function(a){var z,y,x
z=this.a
y=this.b
x=this.c
return Math.sqrt(0+z*z+y*y+x*x)}}}]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cQ.prototype
return J.fz.prototype}if(typeof a=="string")return J.aN.prototype
if(a==null)return J.fA.prototype
if(typeof a=="boolean")return J.fy.prototype
if(a.constructor==Array)return J.aL.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aO.prototype
return a}if(a instanceof P.b)return a
return J.bs(a)}
J.J=function(a){if(typeof a=="string")return J.aN.prototype
if(a==null)return a
if(a.constructor==Array)return J.aL.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aO.prototype
return a}if(a instanceof P.b)return a
return J.bs(a)}
J.b0=function(a){if(a==null)return a
if(a.constructor==Array)return J.aL.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aO.prototype
return a}if(a instanceof P.b)return a
return J.bs(a)}
J.cc=function(a){if(typeof a=="number")return J.aM.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.aU.prototype
return a}
J.e0=function(a){if(typeof a=="number")return J.aM.prototype
if(typeof a=="string")return J.aN.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.aU.prototype
return a}
J.ab=function(a){if(typeof a=="string")return J.aN.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.aU.prototype
return a}
J.w=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aO.prototype
return a}if(a instanceof P.b)return a
return J.bs(a)}
J.aG=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.e0(a).af(a,b)}
J.u=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).p(a,b)}
J.Q=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.cc(a).ag(a,b)}
J.b2=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.cc(a).ah(a,b)}
J.aH=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.j5(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.J(a).h(a,b)}
J.ee=function(a,b,c,d){return J.w(a).dc(a,b,c,d)}
J.ef=function(a,b,c,d){return J.w(a).dw(a,b,c,d)}
J.cj=function(a,b){return J.w(a).bc(a,b)}
J.eg=function(a,b){return J.ab(a).dG(a,b)}
J.eh=function(a,b){return J.e0(a).aF(a,b)}
J.by=function(a,b,c){return J.J(a).dL(a,b,c)}
J.ck=function(a,b,c,d){return J.w(a).R(a,b,c,d)}
J.ei=function(a,b){return J.b0(a).C(a,b)}
J.ej=function(a,b){return J.b0(a).E(a,b)}
J.cl=function(a){return J.w(a).gc5(a)}
J.ek=function(a){return J.w(a).gaa(a)}
J.el=function(a){return J.w(a).gdK(a)}
J.a0=function(a){return J.w(a).gan(a)}
J.R=function(a){return J.l(a).gA(a)}
J.ap=function(a){return J.b0(a).gq(a)}
J.em=function(a){return J.w(a).ge7(a)}
J.L=function(a){return J.J(a).gj(a)}
J.en=function(a){return J.w(a).gB(a)}
J.eo=function(a){return J.w(a).gee(a)}
J.cm=function(a){return J.w(a).ger(a)}
J.cn=function(a,b,c){return J.w(a).cf(a,b,c)}
J.ep=function(a,b){return J.b0(a).a1(a,b)}
J.eq=function(a,b,c){return J.ab(a).as(a,b,c)}
J.co=function(a){return J.b0(a).ek(a)}
J.aq=function(a,b,c){return J.ab(a).aI(a,b,c)}
J.ar=function(a,b){return J.w(a).aM(a,b)}
J.er=function(a,b){return J.w(a).sap(a,b)}
J.es=function(a,b){return J.w(a).sce(a,b)}
J.et=function(a,b){return J.ab(a).aP(a,b)}
J.cp=function(a,b,c){return J.ab(a).a4(a,b,c)}
J.bz=function(a){return J.ab(a).eu(a)}
J.U=function(a){return J.l(a).k(a)}
J.as=function(a){return J.ab(a).ez(a)}
I.ac=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.i=W.bC.prototype
C.f=W.eP.prototype
C.C=J.f.prototype
C.a=J.aL.prototype
C.b=J.cQ.prototype
C.d=J.aM.prototype
C.e=J.aN.prototype
C.K=J.aO.prototype
C.O=W.fU.prototype
C.P=J.h_.prototype
C.Q=J.aU.prototype
C.R=W.hy.prototype
C.r=new H.cD()
C.u=new U.f3()
C.B=new P.hK()
C.c=new P.ig()
C.j=new P.b4(0)
C.D=function() {  function typeNameInChrome(o) {    var constructor = o.constructor;    if (constructor) {      var name = constructor.name;      if (name) return name;    }    var s = Object.prototype.toString.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = Object.prototype.toString.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: typeNameInChrome,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.k=function(hooks) { return hooks; }
C.E=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.F=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.G=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.H=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.l=function getTagFallback(o) {  var constructor = o.constructor;  if (typeof constructor == "function") {    var name = constructor.name;    if (typeof name == "string" &&        // constructor name does not 'stick'.  The shortest real DOM object        name.length > 2 &&        // On Firefox we often get "Object" as the constructor name, even for        name !== "Object" &&        name !== "Function.prototype") {      return name;    }  }  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.I=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.J=function(_, letter) { return letter.toUpperCase(); }
C.L=H.h(I.ac(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.j])
C.t=new U.eZ()
C.o=new U.ey()
C.z=new U.h8()
C.v=new U.f6()
C.q=new U.eL()
C.p=new U.eB()
C.w=new U.f7()
C.A=new U.hw()
C.x=new U.fY()
C.y=new U.fZ()
C.m=I.ac([C.t,C.o,C.z,C.v,C.q,C.p,C.w,C.A,C.x,C.y])
C.M=I.ac(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"])
C.N=I.ac([])
C.n=H.h(I.ac(["bind","if","ref","repeat","syntax"]),[P.j])
C.h=H.h(I.ac(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.j])
$.d7="$cachedFunction"
$.d8="$cachedInvocation"
$.Y=0
$.at=null
$.cr=null
$.ce=null
$.dW=null
$.e8=null
$.bq=null
$.bt=null
$.cf=null
$.al=null
$.aC=null
$.aD=null
$.c6=!1
$.n=C.c
$.cH=0
$.a4=null
$.bG=null
$.cF=null
$.cE=null
$.cB=null
$.cA=null
$.cz=null
$.cy=null
$.j9="# \u30d7\u30ec\u30d7\u30ed\u767a\u8868\r\n\r\n### \u60c5\u5831\u5de5\u5b66\u79d1 \u7b20\u4e95\u4fe1\u5b8f\r\n@@@\r\n## \u76ee\u6b21\r\n##### 1.\u5236\u4f5c\u7269\u7d39\u4ecb\r\n##### 2.\u81ea\u5df1\u7d39\u4ecb\r\n@@@\r\n## 1.\u5236\u4f5c\u7269\u7d39\u4ecb\r\n@@@\r\n### \u3082\u3046\u304a\u6c17\u3065\u304d\u304b\u3068\u601d\u3044\u307e\u3059\u304c\u3001\r\n@@@\r\n## \u5236\u4f5c\u7269\u306f\r\n@@@\r\n# \u3053\u308c\u3067\u3059\u3002\r\n@@@\r\n# \u5236\u4f5c\u7269\r\n## \u30b9\u30e9\u30a4\u30c9\r\n## \u30b9\u30e9\u30a4\u30c9\u30b3\u30f3\u30c8\u30ed\u30fc\u30e9\u30fc\r\n@@@\r\n## \u6280\u8853\u7684\u306a\u8a71:\u4f5c\u3063\u305f\u3082\u306e\r\n###### \u30b9\u30e9\u30a4\u30c9(\u4eca\u898b\u305b\u3066\u3044\u308b\u3053\u308c)\r\n###### \u30b9\u30e9\u30a4\u30c9\u7ba1\u7406\u30b5\u30fc\u30d0\u30fc\r\n###### \u30b9\u30e9\u30a4\u30c9\u30b3\u30f3\u30c8\u30ed\u30fc\u30e9\u30fc\u30a2\u30d7\u30ea\r\n@@@\r\n## \u30b9\u30e9\u30a4\u30c9\r\n\u3053\u306e\u30b9\u30e9\u30a4\u30c9\u81ea\u4f53\u306f\u30e9\u30a4\u30d6\u30e9\u30ea\u3092\u5229\u7528\r\n\r\n(\u50d5\u304c\u4e00\u304b\u3089\u5168\u90e8\u4f5c\u3063\u305f\u308f\u3051\u3067\u306f\u306a\u3044)\r\n@@@\r\n## \u30b9\u30e9\u30a4\u30c9\u7ba1\u7406\u30b5\u30fc\u30d0\u30fc\r\n\u30b9\u30e9\u30a4\u30c9\u3092\u52d5\u304b\u3059\u30b5\u30fc\u30d0\u30fc\r\n@@@\r\n## \u30b9\u30e9\u30a4\u30c9\u30b3\u30f3\u30c8\u30ed\u30fc\u30e9\u30fc\r\n\r\n\u30b9\u30de\u30db\u306b\u3064\u3044\u3066\u3044\u308b\u30bb\u30f3\u30b5\u306e\u5024\u3092\u307f\u3066\u30b5\u30fc\u30d0\u30fc\u306b\u8981\u6c42\u3092\u9001\u308b\u3002\r\n@@@\r\n## \u30b9\u30e9\u30a4\u30c9\u30b3\u30f3\u30c8\u30ed\u30fc\u30e9\u30fc\r\n\r\n![\u30b9\u30af\u30ea\u30fc\u30f3\u30b7\u30e7\u30c3\u30c8](image/screenshot.png)\r\n@@@\r\n## \u5168\u4f53\u56f3\r\n\r\n![\u5168\u4f53\u56f3](image/zu.png)\r\n@@@\r\n## \u8a73\u3057\u3044\u3053\u3068\u306f\r\n\r\n\u65b0\u6b53\u3068\u304b\u4f11\u61a9\u306e\u6642\u306b\u805e\u3044\u3066\u304f\u3060\u3055\u3044\u30fd(^_^)\u30ce\r\n\r\n\u30bd\u30fc\u30b9 : https://github.com/sh4869/SISlide\r\n@@@\r\n## 2.\u81ea\u5df1\u7d39\u4ecb\r\n@@@\r\n## \u7b20\u4e95\u4fe1\u5b8f\r\n#### \u51fa\u8eab\u5730:\u6771\u4eac\u90fd\u677f\u6a4b\u533a\r\n@@@\r\n## \u8da3\u5473\r\n##### \u8aad\u66f8/\u30d7\u30ed\u30b0\u30e9\u30df\u30f3\u30b0\r\n@@@\r\n## \u8aad\u66f8\r\n###### \u30b7\u30e3\u30fc\u30ed\u30c3\u30af\u30fb\u30db\u30fc\u30e0\u30ba\u30b7\u30ea\u30fc\u30ba\r\n![sherlock](image/sherlock.jpg)\r\n\r\n(Sidney Edward Paget,1980)\r\n@@@\r\n## \u30d7\u30ed\u30b0\u30e9\u30df\u30f3\u30b0\r\n###### C++,Ruby,Dart\r\n@@@\r\n## \u8208\u5473\u304c\u6709\u308b\u3053\u3068\r\n#### \u4f53\u3092\u52d5\u304b\u3059\u30b2\u30fc\u30e0\u3092\u3064\u304f\u308a\u305f\u3044\r\n@@@\r\n## \u3054\u6e05\u8074\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3057\u305f\r\n"
$.ao=1
$.ch=null
$.eN="(`+(?!`))((?:.|\\n)*?[^`])\\1(?!`)"
$.iE=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["cx","$get$cx",function(){return init.getIsolateTag("_$dart_dartClosure")},"cN","$get$cN",function(){return H.ft()},"cO","$get$cO",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.cH
$.cH=z+1
z="expando$key$"+z}return new P.f1(null,z)},"dm","$get$dm",function(){return H.Z(H.bh({
toString:function(){return"$receiver$"}}))},"dn","$get$dn",function(){return H.Z(H.bh({$method$:null,
toString:function(){return"$receiver$"}}))},"dp","$get$dp",function(){return H.Z(H.bh(null))},"dq","$get$dq",function(){return H.Z(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"du","$get$du",function(){return H.Z(H.bh(void 0))},"dv","$get$dv",function(){return H.Z(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ds","$get$ds",function(){return H.Z(H.dt(null))},"dr","$get$dr",function(){return H.Z(function(){try{null.$method$}catch(z){return z.message}}())},"dx","$get$dx",function(){return H.Z(H.dt(void 0))},"dw","$get$dw",function(){return H.Z(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bZ","$get$bZ",function(){return P.hz()},"aE","$get$aE",function(){return[]},"cw","$get$cw",function(){return{}},"dI","$get$dI",function(){return P.cT(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],null)},"c1","$get$c1",function(){return P.a2()},"cI","$get$cI",function(){return new E.f2([C.u],[new R.fd(null,P.D("<[/!?]?[A-Za-z][A-Za-z0-9-]*(?: [^>]*)?>",!0,!0))])},"cv","$get$cv",function(){return P.D("^\\S+$",!0,!1)},"aX","$get$aX",function(){return P.D("^(?:[ \\t]*)$",!0,!1)},"c8","$get$c8",function(){return P.D("^(=+|-+)$",!0,!1)},"bm","$get$bm",function(){return P.D("^(#{1,6})[ \\x09\\x0b\\x0c](.*?)#*$",!0,!1)},"c4","$get$c4",function(){return P.D("^[ ]{0,3}>[ ]?(.*)$",!0,!1)},"aY","$get$aY",function(){return P.D("^(?:    |\\t)(.*)$",!0,!1)},"bl","$get$bl",function(){return P.D("^[ ]{0,3}(`{3,}|~{3,})(.*)$",!0,!1)},"c5","$get$c5",function(){return P.D("^ {0,3}([-*_]) *\\1 *\\1(?:\\1| )*$",!0,!1)},"dP","$get$dP",function(){return P.D("^<[ ]*\\w+[ >]",!0,!1)},"bp","$get$bp",function(){return P.D("^[ ]{0,3}[*+-][ \\t]+(.*)$",!0,!1)},"bn","$get$bn",function(){return P.D("^[ ]{0,3}\\d+\\.[ \\t]+(.*)$",!0,!1)},"cY","$get$cY",function(){return[$.$get$c4(),$.$get$bm(),$.$get$c5(),$.$get$aY(),$.$get$bp(),$.$get$bn()]},"cK","$get$cK",function(){return P.D("blockquote|h1|h2|h3|h4|h5|h6|hr|p|pre",!0,!1)},"cM","$get$cM",function(){var z=P.aP(H.h([new R.ew(P.D("<((http|https|ftp)://[^>]*)>",!0,!0)),R.fG(null,"\\["),R.fa(null),new R.f0(P.D("\\\\[!\"#$%&'()*+,\\-./:;<=>?@\\[\\\\\\]^_`{|}~]",!0,!0)),R.ah(" \\* ",null),R.ah(" _ ",null),R.ah("&[#a-zA-Z0-9]*;",null),R.ah("&","&amp;"),R.ah("<","&lt;"),R.ah("\\\\\\n","<br />\n"),R.ah("  +\\n","<br />\n"),R.bf("\\*\\*",null,"strong"),R.bf("\\b__","__\\b","strong"),R.bf("\\*",null,"em"),R.bf("\\b_","_\\b","em"),new R.eM(P.D($.eN,!0,!0))],[R.a5]),!1,R.a5)
z.fixed$length=Array
z.immutable$list=Array
return z}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,args:[,]},{func:1,v:true},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[,,]},{func:1,ret:P.j,args:[P.o]},{func:1,ret:P.c9,args:[W.a3,P.j,P.j,W.c0]},{func:1,args:[,P.j]},{func:1,args:[P.j]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,],opt:[P.ay]},{func:1,args:[,],opt:[,]},{func:1,args:[,P.ay]},{func:1,v:true,args:[,P.ay]},{func:1,v:true,args:[W.t,W.t]},{func:1,args:[W.bM]},{func:1,args:[P.db]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.jf(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.ac=a.ac
Isolate.br=a.br
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.ea(F.e4(),b)},[])
else (function(b){H.ea(F.e4(),b)})([])})})()