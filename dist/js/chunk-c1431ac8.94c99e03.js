(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c1431ac8"],{"94aa":function(t,e,s){},c66d:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-content",[s("v-parallax",{attrs:{dark:"",src:"https://media.gettyimages.com/videos/soft-background-4k-video-id1190067375?s=640x640"}},[s("v-row",{attrs:{align:"center",justify:"center"}},[s("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[s("h1",{staticClass:"display-1 font-weight-thin mb-4"},[t._v("Bienvenid@ a SchoolRoom")]),s("p",[s("strong",[t._v("Codigo:")]),t._v(" "+t._s(t.currentUser.id)+" ")]),s("p",[s("strong",[t._v("Nombres:")]),t._v(" "+t._s(t.currentUser.nombres)+" ")]),s("p",[s("strong",[t._v("Apellidos:")]),t._v(" "+t._s(t.currentUser.apellidos)+" ")]),s("p",[s("strong",[t._v("Correo de Usuario:")]),t._v(" "+t._s(t.currentUser.email)+" ")]),s("ul",[s("li",[t._v(t._s(t.currentUser.role))])]),s("v-btn",{attrs:{tile:"",outlined:"",dark:"",color:"white"},on:{click:t.ena}},[s("v-icon",{attrs:{left:""}},[t._v("mdi-folder-plus")]),t._v("Modificar Datos ")],1)],1)],1)],1),1==this.si?[s("v-card",{staticClass:"mx-auto mt-1",attrs:{"max-width":"1000"}},[s("v-card-title",[s("h2",{staticClass:"text-center"},[t._v("Modificar Datos")])]),s("v-form",{staticClass:"mr-5 ml-5  mb-10",attrs:{name:"form"}},[s("v-row",[s("v-col",{attrs:{cols:"12",sm:"6"}},[s("v-text-field",{attrs:{name:"Codigo",rules:t.RolTexto,label:"Codigo",disabled:""},model:{value:t.id,callback:function(e){t.id=e},expression:"id"}})],1),s("v-col",{attrs:{cols:"12",sm:"6"}},[s("v-text-field",{attrs:{name:"email",rules:t.Rolemail,label:"Correo Electronico",disabled:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1)],1),s("v-row",[s("v-col",{attrs:{cols:"12",sm:"6"}},[s("v-text-field",{attrs:{name:"nombres",rules:t.RolTexto,label:"Nombres",required:""},model:{value:t.nombres,callback:function(e){t.nombres=e},expression:"nombres"}})],1),s("v-col",{attrs:{cols:"12",sm:"6"}},[s("v-text-field",{attrs:{name:"apellidos",rules:t.RolTexto,label:"Apellidos"},model:{value:t.apellidos,callback:function(e){t.apellidos=e},expression:"apellidos"}})],1)],1),s("v-row",[s("v-col",{attrs:{cols:"12",sm:"4"}},[s("v-text-field",{attrs:{label:"Contraseña anterior",type:"password"},model:{value:t.lastpassword,callback:function(e){t.lastpassword=e},expression:"lastpassword"}})],1),s("v-col",{attrs:{cols:"12",sm:"4"}},[s("v-text-field",{attrs:{name:"password",rules:t.Rolpassword,label:"Nueva Contraseña",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),s("v-col",{attrs:{cols:"12",sm:"4"}},[s("v-text-field",{attrs:{name:"confirmar",rules:t.RolconPassword.concat(t.RolConfirmarPassword),label:"Confirme Contraseña",type:"password"},model:{value:t.confirmar,callback:function(e){t.confirmar=e},expression:"confirmar"}})],1)],1),s("v-row",{attrs:{align:"center",justify:"center"}},[""!=t.password&&t.password===t.confirmar&&""!=t.lastpassword?s("v-btn",{staticClass:"mr-4 mb-8 mt-8",attrs:{dark:"",color:"purple",outlined:""},on:{click:t.save}},[t._v("Actualizar")]):t._e(),s("v-btn",{staticClass:"mr-4 mb-8 mt-8 ml-12",attrs:{color:"green",outlined:"",to:{name:"Home"}},on:{click:t.ena2}},[t._v("Ir a Inicio")])],1)],1)],1)]:t._e()],2)},o=[],i=s("1f57"),r={data:function(){return{si:!1,nombres:"",id:"",apellidos:"",email:"",password:"",lastpassword:"",confirmar:"",role:"",RolTexto:[function(t){return!!t||"Este campo es requerido"},function(t){return/[a-zA-Z]\d*/.test(t)||"No se permiten números"}],Rolemail:[function(t){return!!t||"Correo es requerido"},function(t){return/.+@.+\..+/.test(t)||"E-mail no valido"}],Rolpassword:[function(t){return!!t||"Contraseña es requerida"}],RolconPassword:[function(t){return!!t||"Contraseña es requerida"}]}},computed:{RolConfirmarPassword:function(){var t=this;return function(){return t.password===t.confirmar||"las contraseñas no coinciden"}},currentUser:function(){return this.$store.state.auth.user}},mounted:function(){this.currentUser||this.$router.push("/login")},methods:{validar:function(){for(var t="0123456789",e=0;e<this.nombres.length;e++)if(-1!=t.indexOf(this.nombres.charAt(e),0))return alert("No se permiten numeros");for(e=0;e<this.apellidos.length;e++)if(-1!=t.indexOf(this.apellidos.charAt(e),0))return alert("No se permiten numeros")},save:function(){var t=this,e=this.id,s={nombres:this.nombres,apellidos:this.apellidos,password:this.password,lastpassword:this.lastpassword};i["a"].update(e,s).then((function(s){e=s.data._id,console.log(s.data.usuario),alert("Usuario modificado con éxito, los cambios serán visibles en tu próximo inicio de sesion"),t.ena2(),t.initialize()})).catch((function(t){alert("No se pudo modificar"),console.log(t)}))},initialize:function(){var t=this,e=this.currentUser.id;i["a"].show(e).then((function(e){t.id=e.data.usuario[0]._id,t.nombres=e.data.usuario[0].nombres,t.apellidos=e.data.usuario[0].apellidos,t.email=e.data.usuario[0].email,t.password="",t.roles=e.data.usuario[0].roles})).catch((function(t){console.log("neles",t)}))},ena:function(){this.si=!0},ena2:function(){this.si=!1}},created:function(){this.initialize()}},n=r,l=s("2877"),c=s("6544"),d=s.n(c),u=s("8336"),m=s("b0af"),h=s("99d9"),p=s("62ad"),f=s("a75b"),v=s("4bd4"),w=s("132d"),b=(s("a9e3"),s("94aa"),s("2b0e")),g=b["a"].extend({name:"translatable",props:{height:Number},data:function(){return{elOffsetTop:0,parallax:0,parallaxDist:0,percentScrolled:0,scrollTop:0,windowHeight:0,windowBottom:0}},computed:{imgHeight:function(){return this.objHeight()}},beforeDestroy:function(){window.removeEventListener("scroll",this.translate,!1),window.removeEventListener("resize",this.translate,!1)},methods:{calcDimensions:function(){var t=this.$el.getBoundingClientRect();this.scrollTop=window.pageYOffset,this.parallaxDist=this.imgHeight-this.height,this.elOffsetTop=t.top+this.scrollTop,this.windowHeight=window.innerHeight,this.windowBottom=this.scrollTop+this.windowHeight},listeners:function(){window.addEventListener("scroll",this.translate,!1),window.addEventListener("resize",this.translate,!1)},objHeight:function(){throw new Error("Not implemented !")},translate:function(){this.calcDimensions(),this.percentScrolled=(this.windowBottom-this.elOffsetTop)/(parseInt(this.height)+this.windowHeight),this.parallax=Math.round(this.parallaxDist*this.percentScrolled)}}}),x=s("58df"),_=Object(x["a"])(g),C=_.extend().extend({name:"v-parallax",props:{alt:{type:String,default:""},height:{type:[String,Number],default:500},src:String},data:function(){return{isBooted:!1}},computed:{styles:function(){return{display:"block",opacity:this.isBooted?1:0,transform:"translate(-50%, ".concat(this.parallax,"px)")}}},mounted:function(){this.init()},methods:{init:function(){var t=this,e=this.$refs.img;e&&(e.complete?(this.translate(),this.listeners()):e.addEventListener("load",(function(){t.translate(),t.listeners()}),!1),this.isBooted=!0)},objHeight:function(){return this.$refs.img.naturalHeight}},render:function(t){var e={staticClass:"v-parallax__image",style:this.styles,attrs:{src:this.src,alt:this.alt},ref:"img"},s=t("div",{staticClass:"v-parallax__image-container"},[t("img",e)]),a=t("div",{staticClass:"v-parallax__content"},this.$slots.default);return t("div",{staticClass:"v-parallax",style:{height:"".concat(this.height,"px")},on:this.$listeners},[s,a])}}),k=s("0fd9"),y=s("8654"),R=Object(l["a"])(n,a,o,!1,null,null,null);e["default"]=R.exports;d()(R,{VBtn:u["a"],VCard:m["a"],VCardTitle:h["d"],VCol:p["a"],VContent:f["a"],VForm:v["a"],VIcon:w["a"],VParallax:C,VRow:k["a"],VTextField:y["a"]})}}]);
//# sourceMappingURL=chunk-c1431ac8.94c99e03.js.map