const __vite__fileDeps=["MagicLinkEE-DXVettXy-Dmevhvgs.js","strapi-cA7cPHO_.js","strapi-COJtagOC.css","SelectRoles-CiXoM32h-DkttLzx5.js","useAdminRoles-BlqZHo5X-3SoiGRmf.js","CreateActionEE-1i1Hn9yC-DTNruT7I.js","isNil-Bl6bF-ir.js","ListPage-D5H8f2M--Dq1w5klR.js","useLicenseLimitNotification-J4qdwz19-IIdwcms3.js","users-8N93LH7R-MOwOr-tf.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{r as g,u as z,j as e,S as R,bv as re,g as ie,k as B,i as x,aY as ne,q as K,aN as J,t as le,a3 as oe,n as W,ap as de,aT as ce,bw as ue,bx as M,by as E,bz as me,P,b as V,bf as ge,aP as I,aQ as n,T as A,F as v,I as $,a4 as pe,G as he,bi as be,aR as N,bj as xe,bk as fe,bA as je,bB as Me,M as f,J as Ee,K as Ae,Z as Se,B as T,Q as j,_ as Q,b1 as ye}from"./strapi-cA7cPHO_.js";import{g as Y}from"./users-8N93LH7R-MOwOr-tf.js";import{M as _e,S as Ce}from"./SelectRoles-CiXoM32h-DkttLzx5.js";import"./useAdminRoles-BlqZHo5X-3SoiGRmf.js";const Le=g.forwardRef((a,l)=>{const{formatMessage:p}=z();return e.jsx(R,{ref:l,startIcon:e.jsx(re,{}),size:"S",...a,children:p({id:"Settings.permissions.users.create",defaultMessage:"Invite new user"})})}),Ie=({onToggle:a})=>{const[l,p]=g.useState("create"),[k,F]=g.useState(""),{formatMessage:t}=z(),{toggleNotification:m}=W(),{_unstableFormatAPIError:w,_unstableFormatValidationErrors:S}=K(),c=M(Te,async()=>(await E(()=>import("./ModalForm-B9SUkQ1l-CamjQBT3.js"),[])).ROLE_LAYOUT,{combine(o,d){return[...o,...d]},defaultValue:[]}),D=M(G,async()=>(await E(()=>import("./ModalForm-B9SUkQ1l-CamjQBT3.js"),[])).FORM_INITIAL_VALUES,{combine(o,d){return{...o,...d}},defaultValue:G}),y=M(_e,async()=>(await E(()=>import("./MagicLinkEE-DXVettXy-Dmevhvgs.js"),__vite__mapDeps([0,1,2,3,4]))).MagicLinkEE),[h]=Me(),_=t({id:"Settings.permissions.users.create",defaultMessage:"Invite new user"}),U=async(o,{setErrors:d})=>{const r=await h({...o,roles:o.roles??[]});"data"in r?(r.data.registrationToken&&F(r.data.registrationToken),O()):(m({type:"danger",message:w(r.error)}),ye(r.error)&&r.error.name==="ValidationError"&&d(S(r.error)))},O=()=>{L?p(L):a()},{buttonSubmitLabel:C,isDisabled:b,next:L}=ve[l];return y?e.jsx(f.Root,{defaultOpen:!0,onOpenChange:a,children:e.jsxs(f.Content,{children:[e.jsx(f.Header,{children:e.jsx(Ee,{label:_,children:e.jsx(Ae,{isCurrent:!0,children:_})})}),e.jsx(Se,{method:l==="create"?"POST":"PUT",initialValues:D??{},onSubmit:U,validationSchema:Pe,children:({isSubmitting:o})=>e.jsxs(e.Fragment,{children:[e.jsx(f.Body,{children:e.jsxs(v,{direction:"column",alignItems:"stretch",gap:6,children:[l!=="create"&&e.jsx(y,{registrationToken:k}),e.jsxs(T,{children:[e.jsx(A,{variant:"beta",tag:"h2",children:t({id:"app.components.Users.ModalCreateBody.block-title.details",defaultMessage:"User details"})}),e.jsx(T,{paddingTop:4,children:e.jsx(v,{direction:"column",alignItems:"stretch",gap:1,children:e.jsx(j.Root,{gap:5,children:Re.map(d=>d.map(({size:r,...i})=>e.jsx(j.Item,{col:r,direction:"column",alignItems:"stretch",children:e.jsx(Q,{...i,disabled:b,label:t(i.label),placeholder:t(i.placeholder)})},i.name)))})})})]}),e.jsxs(T,{children:[e.jsx(A,{variant:"beta",tag:"h2",children:t({id:"global.roles",defaultMessage:"User's role"})}),e.jsx(T,{paddingTop:4,children:e.jsxs(j.Root,{gap:5,children:[e.jsx(j.Item,{col:6,xs:12,direction:"column",alignItems:"stretch",children:e.jsx(Ce,{disabled:b})}),c.map(d=>d.map(({size:r,...i})=>e.jsx(j.Item,{col:r,direction:"column",alignItems:"stretch",children:e.jsx(Q,{...i,disabled:b,label:t(i.label),placeholder:i.placeholder?t(i.placeholder):void 0,hint:i.hint?t(i.hint):void 0})},i.name)))]})})]})]})}),e.jsxs(f.Footer,{children:[e.jsx(R,{variant:"tertiary",onClick:a,type:"button",children:t({id:"app.components.Button.cancel",defaultMessage:"Cancel"})}),l==="create"?e.jsx(R,{type:"submit",loading:o,children:t(C)}):e.jsx(R,{type:"button",loading:o,onClick:a,children:t(C)})]})]})})]})}):null},G={firstname:"",lastname:"",email:"",roles:[]},Te=[],Re=[[{label:{id:"Auth.form.firstname.label",defaultMessage:"First name"},name:"firstname",placeholder:{id:"Auth.form.firstname.placeholder",defaultMessage:"e.g. Kai"},type:"string",size:6,required:!0},{label:{id:"Auth.form.lastname.label",defaultMessage:"Last name"},name:"lastname",placeholder:{id:"Auth.form.lastname.placeholder",defaultMessage:"e.g. Doe"},type:"string",size:6}],[{label:{id:"Auth.form.email.label",defaultMessage:"Email"},name:"email",placeholder:{id:"Auth.form.email.placeholder",defaultMessage:"e.g. kai.doe@strapi.io"},type:"email",size:6,required:!0}]],Pe=ie().shape({firstname:B().trim().required({id:x.required.id,defaultMessage:"This field is required"}).nullable(),lastname:B(),email:B().email(x.email).required({id:x.required.id,defaultMessage:"This field is required"}).nullable(),roles:ne().min(1,{id:x.required.id,defaultMessage:"This field is required"}).required({id:x.required.id,defaultMessage:"This field is required"})}),ve={create:{buttonSubmitLabel:{id:"app.containers.Users.ModalForm.footer.button-success",defaultMessage:"Invite user"},isDisabled:!1,next:"magic-link"},"magic-link":{buttonSubmitLabel:{id:"global.finish",defaultMessage:"Finish"},isDisabled:!0,next:null}},ke=()=>{const{_unstableFormatAPIError:a}=K(),[l,p]=g.useState(!1),k=J(s=>s.admin_app.permissions),{allowedActions:{canCreate:F,canDelete:t,canRead:m}}=le(k.settings?.users),w=oe(),{toggleNotification:S}=W(),{formatMessage:c}=z(),{search:D}=de(),[y,h]=g.useState(!1),[_,U]=g.useState([]),{data:O,isError:C,isLoading:b}=ce(ue.parse(D,{ignoreQueryPrefix:!0})),{pagination:L,users:o=[]}=O??{},d=M(Le,async()=>(await E(()=>import("./CreateActionEE-1i1Hn9yC-DTNruT7I.js"),__vite__mapDeps([5,1,2,6]))).CreateActionEE),r=Fe.map(s=>({...s,label:c(s.label)})),i=c({id:"global.users",defaultMessage:"Users"}),H=()=>{p(s=>!s)},[Z]=me(),X=async s=>{try{const u=await Z({ids:s});"error"in u&&S({type:"danger",message:a(u.error)})}catch{S({type:"danger",message:c({id:"global.error",defaultMessage:"An error occurred"})})}},ee=s=>()=>{m&&w(s.toString())},se=s=>async()=>{U([s]),h(!0)},ae=async()=>{await X(_),h(!1)};return d?C?e.jsx(P.Error,{}):e.jsxs(P.Main,{"aria-busy":b,children:[e.jsx(P.Title,{children:c({id:"Settings.PageTitle",defaultMessage:"Settings - {name}"},{name:"Users"})}),e.jsx(V.Header,{primaryAction:F&&e.jsx(d,{onClick:H}),title:i,subtitle:c({id:"Settings.permissions.users.listview.header.subtitle",defaultMessage:"All the users who have access to the Strapi admin panel"})}),e.jsx(V.Action,{startActions:e.jsxs(e.Fragment,{children:[e.jsx(ge,{label:c({id:"app.component.search.label",defaultMessage:"Search for {target}"},{target:i})}),e.jsxs(I.Root,{options:we,children:[e.jsx(I.Trigger,{}),e.jsx(I.Popover,{}),e.jsx(I.List,{})]})]})}),e.jsxs(V.Content,{children:[e.jsxs(n.Root,{rows:o,headers:r,children:[e.jsx(n.ActionBar,{}),e.jsxs(n.Content,{children:[e.jsxs(n.Head,{children:[t?e.jsx(n.HeaderCheckboxCell,{}):null,r.map(s=>e.jsx(n.HeaderCell,{...s},s.name))]}),e.jsx(n.Empty,{}),e.jsx(n.Loading,{}),e.jsx(n.Body,{children:o.map(s=>e.jsxs(n.Row,{onClick:ee(s.id),cursor:m?"pointer":"default",children:[t?e.jsx(n.CheckboxCell,{id:s.id}):null,r.map(({cellFormatter:u,name:q,...te})=>e.jsx(n.Cell,{children:typeof u=="function"?u(s,{name:q,...te}):e.jsx(A,{textColor:"neutral800",children:s[q]||"-"})},q)),m||t?e.jsx(n.Cell,{onClick:u=>u.stopPropagation(),children:e.jsxs(v,{justifyContent:"end",children:[m?e.jsx($,{tag:pe,to:s.id.toString(),label:c({id:"app.component.table.edit",defaultMessage:"Edit {target}"},{target:Y(s)}),variant:"ghost",children:e.jsx(he,{})}):null,t?e.jsx($,{onClick:se(s.id),label:c({id:"global.delete-target",defaultMessage:"Delete {target}"},{target:Y(s)}),variant:"ghost",children:e.jsx(be,{})}):null]})}):null]},s.id))})]})]}),e.jsxs(N.Root,{...L,children:[e.jsx(N.PageSize,{}),e.jsx(N.Links,{})]})]}),l&&e.jsx(Ie,{onToggle:H}),e.jsx(xe.Root,{open:y,onOpenChange:h,children:e.jsx(fe,{onConfirm:ae})})]}):null},Fe=[{name:"firstname",label:{id:"Settings.permissions.users.firstname",defaultMessage:"Firstname"},sortable:!0},{name:"lastname",label:{id:"Settings.permissions.users.lastname",defaultMessage:"Lastname"},sortable:!0},{name:"email",label:{id:"Settings.permissions.users.email",defaultMessage:"Email"},sortable:!0},{name:"roles",label:{id:"Settings.permissions.users.roles",defaultMessage:"Roles"},sortable:!1,cellFormatter({roles:a}){return e.jsx(A,{textColor:"neutral800",children:a.map(l=>l.name).join(`,
`)})}},{name:"username",label:{id:"Settings.permissions.users.username",defaultMessage:"Username"},sortable:!0},{name:"isActive",label:{id:"Settings.permissions.users.user-status",defaultMessage:"User status"},sortable:!1,cellFormatter({isActive:a}){return e.jsx(v,{children:e.jsx(je,{size:"S",borderWidth:0,background:"transparent",color:"neutral800",variant:a?"success":"danger",children:e.jsx(A,{children:a?"Active":"Inactive"})})})}}],we=[{name:"firstname",label:"Firstname",type:"string"},{name:"lastname",label:"Lastname",type:"string"},{name:"email",label:"Email",type:"email"},{name:"username",label:"Username",type:"string"},{name:"isActive",label:"Active user",type:"boolean"}],De=()=>{const a=M(ke,async()=>(await E(()=>import("./ListPage-D5H8f2M--Dq1w5klR.js"),__vite__mapDeps([7,1,2,8,6,9,3,4]))).UserListPageEE);return a?e.jsx(a,{}):null},Ve=()=>{const a=J(l=>l.admin_app.permissions.settings?.users.read);return e.jsx(P.Protect,{permissions:a,children:e.jsx(De,{})})};export{De as ListPage,ke as ListPageCE,Ve as ProtectedListPage};