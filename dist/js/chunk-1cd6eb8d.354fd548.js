(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1cd6eb8d"],{"068d":function(t,e,s){t.exports=s.p+"img/11.d8cb3207.jpg"},"4ff7":function(t,e,s){t.exports=s.p+"img/perfil.127b748e.jpg"},"94aa":function(t,e,s){},c66d:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-content",[a("v-parallax",{staticStyle:{height:"500px","margin-left":"343px","margin-right":"343px","margin-top":"100px","border-radius":"10px"},attrs:{dark:"",src:s("068d")}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-img",{staticStyle:{"border-radius":"10px"},attrs:{cols:"10",src:s("4ff7"),"max-height":"170","max-width":"170"}}),a("v-col",{staticClass:"text-center",attrs:{cols:"6"}},[a("h1",{staticClass:" font-weight-medium text-left",staticStyle:{"padding-left":"10px"}},[t._v("Bienvenid@ a SchoolRoom")]),a("br"),a("p",{staticClass:"font-weight-regular text-left ",staticStyle:{"padding-left":"80px"}},[a("strong",[t._v("Codigo:")]),t._v(" "+t._s(t.currentUser.id)+" ")]),a("p",{staticClass:"font-weight-regular text-left",staticStyle:{"padding-left":"80px"}},[a("strong",[t._v("Nombres:")]),t._v(" "+t._s(t.currentUser.nombres)+" ")]),a("p",{staticClass:"font-weight-regular text-left",staticStyle:{"padding-left":"80px"}},[a("strong",[t._v("Apellidos:")]),t._v(" "+t._s(t.currentUser.apellidos)+" ")]),a("p",{staticClass:"font-weight-regular text-left",staticStyle:{"padding-left":"80px"}},[a("strong",[t._v("Correo de Usuario:")]),t._v(" "+t._s(t.currentUser.email)+" ")]),a("p",{staticClass:"text-left",staticStyle:{"padding-left":"80px"}},[a("ul",[a("li",[t._v(t._s(t.currentUser.role))])])]),a("br"),a("p",{staticClass:"text-left",staticStyle:{"padding-left":"50px"}},[a("v-btn",{staticStyle:{"border-radius":"10px"},attrs:{tile:"",outlined:"",dark:"",color:"white"},on:{click:t.ena}},[a("v-icon",{attrs:{center:""}},[t._v("mdi-folder-plus")]),t._v("Modificar Datos ")],1)],1)])],1)],1),1==this.si?[a("v-card",{staticClass:"mx-auto mt-12",attrs:{"max-width":"1000"}},[a("v-card-title",[a("h2",{staticClass:"text-center"},[t._v("Modificar Datos")])]),a("v-form",{staticClass:"mr-5 ml-5  mb-10",attrs:{name:"form"}},[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-text-field",{attrs:{name:"Codigo",rules:t.RolTexto,label:"Codigo",disabled:""},model:{value:t.id,callback:function(e){t.id=e},expression:"id"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-text-field",{attrs:{name:"email",rules:t.Rolemail,label:"Correo Electronico",disabled:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-text-field",{attrs:{name:"nombres",rules:t.RolTexto,label:"Nombres",required:""},model:{value:t.nombres,callback:function(e){t.nombres=e},expression:"nombres"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-text-field",{attrs:{name:"apellidos",rules:t.RolTexto,label:"Apellidos"},model:{value:t.apellidos,callback:function(e){t.apellidos=e},expression:"apellidos"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"4"}},[a("v-text-field",{attrs:{label:"Contraseña anterior",type:"password"},model:{value:t.lastpassword,callback:function(e){t.lastpassword=e},expression:"lastpassword"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("v-text-field",{attrs:{name:"password",rules:t.Rolpassword,label:"Nueva Contraseña",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("v-text-field",{attrs:{name:"confirmar",rules:t.RolconPassword.concat(t.RolConfirmarPassword),label:"Confirme Contraseña",type:"password"},model:{value:t.confirmar,callback:function(e){t.confirmar=e},expression:"confirmar"}})],1)],1),a("v-row",{attrs:{align:"center",justify:"center"}},[""!=t.password&&t.password===t.confirmar&&""!=t.lastpassword?a("v-btn",{staticClass:"mr-4 mb-8 mt-8",attrs:{dark:"",color:"purple",outlined:""},on:{click:t.save}},[t._v("Actualizar")]):t._e(),a("v-btn",{staticClass:"mr-4 mb-8 mt-8 ml-12",attrs:{color:"green",outlined:"",to:{name:"Home"}},on:{click:t.ena2}},[t._v("Ir a Inicio")])],1)],1)],1)]:t._e()],2)},i=[],r=s("1f57"),o={data:function(){return{si:!1,nombres:"",id:"",apellidos:"",email:"",password:"",lastpassword:"",confirmar:"",role:"",RolTexto:[function(t){return!!t||"Este campo es requerido"},function(t){return/[a-zA-Z]\d*/.test(t)||"No se permiten números"}],Rolemail:[function(t){return!!t||"Correo es requerido"},function(t){return/.+@.+\..+/.test(t)||"E-mail no valido"}],Rolpassword:[function(t){return!!t||"Contraseña es requerida"}],RolconPassword:[function(t){return!!t||"Contraseña es requerida"}]}},computed:{RolConfirmarPassword:function(){var t=this;return function(){return t.password===t.confirmar||"las contraseñas no coinciden"}},currentUser:function(){return this.$store.state.auth.user}},mounted:function(){this.currentUser||this.$router.push("/login")},methods:{validar:function(){for(var t="0123456789",e=0;e<this.nombres.length;e++)if(-1!=t.indexOf(this.nombres.charAt(e),0))return alert("No se permiten numeros");for(e=0;e<this.apellidos.length;e++)if(-1!=t.indexOf(this.apellidos.charAt(e),0))return alert("No se permiten numeros")},save:function(){var t=this,e=this.id,s={nombres:this.nombres,apellidos:this.apellidos,password:this.password,lastpassword:this.lastpassword};r["a"].update(e,s).then((function(s){e=s.data._id,console.log(s.data.usuario),alert("Usuario modificado con éxito, los cambios serán visibles en tu próximo inicio de sesion"),t.ena2(),t.initialize()})).catch((function(t){alert("No se pudo modificar"),console.log(t)}))},initialize:function(){var t=this,e=this.currentUser.id;r["a"].show(e).then((function(e){t.id=e.data.usuario[0]._id,t.nombres=e.data.usuario[0].nombres,t.apellidos=e.data.usuario[0].apellidos,t.email=e.data.usuario[0].email,t.password="",t.roles=e.data.usuario[0].roles})).catch((function(t){console.log("neles",t)}))},ena:function(){this.si=!0},ena2:function(){this.si=!1}},created:function(){this.initialize()}},n=o,l=s("2877"),c=s("6544"),d=s.n(c),u=s("8336"),p=s("b0af"),m=s("99d9"),f=s("62ad"),h=s("a75b"),v=s("4bd4"),w=s("132d"),g=s("adda"),x=(s("a9e3"),s("94aa"),s("2b0e")),b=x["a"].extend({name:"translatable",props:{height:Number},data:function(){return{elOffsetTop:0,parallax:0,parallaxDist:0,percentScrolled:0,scrollTop:0,windowHeight:0,windowBottom:0}},computed:{imgHeight:function(){return this.objHeight()}},beforeDestroy:function(){window.removeEventListener("scroll",this.translate,!1),window.removeEventListener("resize",this.translate,!1)},methods:{calcDimensions:function(){var t=this.$el.getBoundingClientRect();this.scrollTop=window.pageYOffset,this.parallaxDist=this.imgHeight-this.height,this.elOffsetTop=t.top+this.scrollTop,this.windowHeight=window.innerHeight,this.windowBottom=this.scrollTop+this.windowHeight},listeners:function(){window.addEventListener("scroll",this.translate,!1),window.addEventListener("resize",this.translate,!1)},objHeight:function(){throw new Error("Not implemented !")},translate:function(){this.calcDimensions(),this.percentScrolled=(this.windowBottom-this.elOffsetTop)/(parseInt(this.height)+this.windowHeight),this.parallax=Math.round(this.parallaxDist*this.percentScrolled)}}}),C=s("58df"),_=Object(C["a"])(b),y=_.extend().extend({name:"v-parallax",props:{alt:{type:String,default:""},height:{type:[String,Number],default:500},src:String},data:function(){return{isBooted:!1}},computed:{styles:function(){return{display:"block",opacity:this.isBooted?1:0,transform:"translate(-50%, ".concat(this.parallax,"px)")}}},mounted:function(){this.init()},methods:{init:function(){var t=this,e=this.$refs.img;e&&(e.complete?(this.translate(),this.listeners()):e.addEventListener("load",(function(){t.translate(),t.listeners()}),!1),this.isBooted=!0)},objHeight:function(){return this.$refs.img.naturalHeight}},render:function(t){var e={staticClass:"v-parallax__image",style:this.styles,attrs:{src:this.src,alt:this.alt},ref:"img"},s=t("div",{staticClass:"v-parallax__image-container"},[t("img",e)]),a=t("div",{staticClass:"v-parallax__content"},this.$slots.default);return t("div",{staticClass:"v-parallax",style:{height:"".concat(this.height,"px")},on:this.$listeners},[s,a])}}),k=s("0fd9"),S=s("8654"),R=Object(l["a"])(n,a,i,!1,null,null,null);e["default"]=R.exports;d()(R,{VBtn:u["a"],VCard:p["a"],VCardTitle:m["d"],VCol:f["a"],VContent:h["a"],VForm:v["a"],VIcon:w["a"],VImg:g["a"],VParallax:y,VRow:k["a"],VTextField:S["a"]})}}]);
//# sourceMappingURL=chunk-1cd6eb8d.354fd548.js.map