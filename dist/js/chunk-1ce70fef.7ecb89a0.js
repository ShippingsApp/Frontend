(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1ce70fef"],{"1f5e":function(t,e,n){"use strict";var r=n("d79c"),s=n.n(r);s.a},d79c:function(t,e,n){},ffc5:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("header",{staticClass:"jumbotron"},[n("h3",[n("router-link",{staticClass:"btn",attrs:{to:"/presentDriver"}},[n("font-awesome-icon",{attrs:{icon:"chevron-left"}})],1),t._v("\n        Мои будущие поездки")],1)]),n("body",[n("table",{staticClass:"table table-hover table-sm"},[n("thead",{staticClass:"thead-dark"},[n("tr",[n("th",[t._v("Дата отправления")]),n("th",[t._v("Дата прибытия")]),n("th",[n("select",{directives:[{name:"model",rawName:"v-model",value:t.start,expression:"start"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.start=e.target.multiple?n:n[0]}}},[n("option",{attrs:{value:""}},[t._v("Город отправления")]),t._l(t.uniqStarts,(function(e){return n("option",[t._v(t._s(e))])}))],2)]),n("th",[n("select",{directives:[{name:"model",rawName:"v-model",value:t.finish,expression:"finish"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.finish=e.target.multiple?n:n[0]}}},[n("option",{attrs:{value:""}},[t._v("Город прибытия")]),t._l(t.uniqFinishes,(function(e){return n("option",[t._v(t._s(e))])}))],2)]),n("th",[t._v("Доп. время (дн)")]),n("th",[t._v("Высота (см)")]),n("th",[t._v("Ширина (см)")]),n("th",[t._v("Длина (см)")]),n("th",[t._v("Вес (кг)")]),n("th",[t._v("Комментарий")]),n("th",[n("router-link",{staticClass:"btn btn-dark btn-sm",attrs:{to:"/addRoute"}},[n("font-awesome-icon",{attrs:{icon:"plus-square"}})],1)],1)])]),n("tbody",{attrs:{id:"list_route"}},t._l(t.filteredList,(function(e){return n("tr",[n("td",[t._v(t._s(e.date_start))]),n("td",[t._v(t._s(e.date_finish))]),n("td",[t._v(t._s(e.start))]),n("td",[t._v(t._s(e.finish))]),n("td",[t._v(t._s(e.plus_time))]),n("td",[t._v(t._s(e.weight))]),n("td",[t._v(t._s(e.height))]),n("td",[t._v(t._s(e.length))]),n("td",[t._v(t._s(e.width))]),n("td",[t._v(t._s(e.comment))]),n("td",[n("router-link",{staticClass:"btn btn-sm",attrs:{to:"/editRoute/"+e.id}},[n("font-awesome-icon",{attrs:{icon:"edit"}})],1),n("router-link",{staticClass:"btn btn-sm",attrs:{to:"/deleteRoute/"+e.id}},[n("font-awesome-icon",{attrs:{icon:"trash-alt"}})],1)],1)])})),0)])])])},s=[],i=(n("6b54"),n("ac6a"),n("5df3"),n("4f7f"),n("75fc")),a=n("c552"),o={name:"list_route",data:function(){return{start:"",finish:"",routes:[]}},computed:{uniqStarts:function(){return this.routes.map((function(t){return t.start})).reduce((function(t,e){return Object(i["a"])(new Set(t.concat(e)))}),[])},uniqFinishes:function(){return this.routes.map((function(t){return t.finish})).reduce((function(t,e){return Object(i["a"])(new Set(t.concat(e)))}),[])},filteredList:function(){var t=this.start,e=this.finish;return this.routes.filter((function(n){return""==t&&""==e||n.start.indexOf(t)>-1&&n.finish.indexOf(e)>-1}))}},mounted:function(){var t=this;a["a"].getDriverBoard(3).then((function(e){t.routes=e.data}),(function(e){t.routes=e.response&&e.response.data||e.message||e.toString()}))}},u=o,c=(n("1f5e"),n("2877")),l=Object(c["a"])(u,r,s,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-1ce70fef.7ecb89a0.js.map