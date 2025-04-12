"use strict";(self.webpackChunkkonfusius=self.webpackChunkkonfusius||[]).push([[493],{5493:(V,C,r)=>{r.d(C,{fg:()=>L,fS:()=>P});var m=r(6750),f=r(8136);let d;const _=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function p(){if(d)return d;if("object"!=typeof document||!document)return d=new Set(_),d;let n=document.createElement("input");return d=new Set(_.filter(c=>(n.setAttribute("type",c),n.type===c))),d}var i=r(8244),A=r(328),g=r(886),M=r(9629),S=r(5535),v=r(4652);let T=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=i.VBU({type:n,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(t,s){},styles:["textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{padding:2px 0 !important;box-sizing:content-box !important;height:auto !important;overflow:hidden !important}textarea.cdk-textarea-autosize-measuring-firefox{padding:2px 0 !important;box-sizing:content-box !important;height:0 !important}@keyframes cdk-text-field-autofill-start{/*!*/}@keyframes cdk-text-field-autofill-end{/*!*/}.cdk-text-field-autofill-monitored:-webkit-autofill{animation:cdk-text-field-autofill-start 0s 1ms}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){animation:cdk-text-field-autofill-end 0s 1ms}"],encapsulation:2,changeDetection:0})}return n})();const E={passive:!0};let k=(()=>{class n{_platform=(0,i.WQX)(f.P);_ngZone=(0,i.WQX)(i.SKi);_renderer=(0,i.WQX)(i._9s).createRenderer(null,null);_styleLoader=(0,i.WQX)(M._);_monitoredElements=new Map;constructor(){}monitor(e){if(!this._platform.isBrowser)return A.w;this._styleLoader.load(T);const t=(0,v.c)(e),s=this._monitoredElements.get(t);if(s)return s.subject;const a=new g.B,o="cdk-text-field-autofilled",l=h=>{"cdk-text-field-autofill-start"!==h.animationName||t.classList.contains(o)?"cdk-text-field-autofill-end"===h.animationName&&t.classList.contains(o)&&(t.classList.remove(o),this._ngZone.run(()=>a.next({target:h.target,isAutofilled:!1}))):(t.classList.add(o),this._ngZone.run(()=>a.next({target:h.target,isAutofilled:!0})))},N=this._ngZone.runOutsideAngular(()=>(t.classList.add("cdk-text-field-autofill-monitored"),(0,S._)(this._renderer,t,"animationstart",l,E)));return this._monitoredElements.set(t,{subject:a,unlisten:N}),a}stopMonitoring(e){const t=(0,v.c)(e),s=this._monitoredElements.get(t);s&&(s.unlisten(),s.subject.complete(),t.classList.remove("cdk-text-field-autofill-monitored"),t.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(t))}ngOnDestroy(){this._monitoredElements.forEach((e,t)=>this.stopMonitoring(t))}static \u0275fac=function(t){return new(t||n)};static \u0275prov=i.jDH({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),I=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=i.$C({type:n});static \u0275inj=i.G2t({})}return n})();var H=r(8520),u=r(3426);const w=new i.nKC("MAT_INPUT_VALUE_ACCESSOR");var y=r(6916),F=r(5845),R=r(2820),x=r(925),b=r(5155);const B=["button","checkbox","file","hidden","image","radio","range","reset","submit"],D=new i.nKC("MAT_INPUT_CONFIG");let L=(()=>{class n{_elementRef=(0,i.WQX)(i.aKT);_platform=(0,i.WQX)(f.P);ngControl=(0,i.WQX)(u.vO,{optional:!0,self:!0});_autofillMonitor=(0,i.WQX)(k);_ngZone=(0,i.WQX)(i.SKi);_formField=(0,i.WQX)(y.M,{optional:!0});_renderer=(0,i.WQX)(i.sFG);_uid=(0,i.WQX)(H._).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder;_errorStateTracker;_config=(0,i.WQX)(D,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_formFieldDescribedBy;_isServer;_isNativeSelect;_isTextarea;_isInFormField;focused=!1;stateChanges=new g.B;controlType="mat-input";autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=(0,m.he)(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(u.k0.required)??!1}set required(e){this._required=(0,m.he)(e)}_required;get type(){return this._type}set type(e){const t=this._type;this._type=e||"text",this._validateType(),!this._isTextarea&&p().has(this._type)&&(this._elementRef.nativeElement.type=this._type),this._type!==t&&this._ensureWheelDefaultBehavior()}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=(0,m.he)(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>p().has(e));constructor(){const e=(0,i.WQX)(u.cV,{optional:!0}),t=(0,i.WQX)(u.j4,{optional:!0}),s=(0,i.WQX)(F.E),a=(0,i.WQX)(w,{optional:!0,self:!0}),o=this._elementRef.nativeElement,l=o.nodeName.toLowerCase();a?(0,i.Hps)(a.value)?this._signalBasedValueAccessor=a:this._inputValueAccessor=a:this._inputValueAccessor=o,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(o,"keyup",this._iOSKeyupListener)}),this._errorStateTracker=new R._(s,this.ngControl,t,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect="select"===l,this._isTextarea="textarea"===l,this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=o.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&(0,i.QZP)(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),null!==this.ngControl.disabled&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){const t=this._elementRef.nativeElement;"number"===t.type?(t.type="text",t.setSelectionRange(0,0),t.type="number"):t.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){const e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){const e=this._getPlaceholder();if(e!==this._previousPlaceholder){const t=this._elementRef.nativeElement;this._previousPlaceholder=e,e?t.setAttribute("placeholder",e):t.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){B.indexOf(this._type)}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!(this._isNeverEmpty()||this._elementRef.nativeElement.value||this._isBadInput()||this.autofilled)}get shouldLabelFloat(){if(this._isNativeSelect){const e=this._elementRef.nativeElement,t=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&t&&t.label)}return this.focused&&!this.disabled||!this.empty}setDescribedByIds(e){const t=this._elementRef.nativeElement,s=t.getAttribute("aria-describedby");let a;if(s){const o=this._formFieldDescribedBy||e;a=e.concat(s.split(" ").filter(l=>l&&!o.includes(l)))}else a=e;this._formFieldDescribedBy=e,a.length?t.setAttribute("aria-describedby",a.join(" ")):t.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){const e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{const t=e.target;!t.value&&0===t.selectionStart&&0===t.selectionEnd&&(t.setSelectionRange(1,1),t.setSelectionRange(0,0))};_webkitBlinkWheelListener=()=>{};_ensureWheelDefaultBehavior(){this._cleanupWebkitWheel?.(),"number"===this._type&&(this._platform.BLINK||this._platform.WEBKIT)&&(this._cleanupWebkitWheel=this._renderer.listen(this._elementRef.nativeElement,"wheel",this._webkitBlinkWheelListener))}_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(t){return new(t||n)};static \u0275dir=i.FsC({type:n,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(t,s){1&t&&i.bIt("focus",function(){return s._focusChanged(!0)})("blur",function(){return s._focusChanged(!1)})("input",function(){return s._onInput()}),2&t&&(i.Mr5("id",s.id)("disabled",s.disabled&&!s.disabledInteractive)("required",s.required),i.BMQ("name",s.name||null)("readonly",s._getReadonlyAttribute())("aria-disabled",s.disabled&&s.disabledInteractive?"true":null)("aria-invalid",s.empty&&s.required?null:s.errorState)("aria-required",s.required)("id",s.id),i.AVh("mat-input-server",s._isServer)("mat-mdc-form-field-textarea-control",s._isInFormField&&s._isTextarea)("mat-mdc-form-field-input-control",s._isInFormField)("mat-mdc-input-disabled-interactive",s.disabledInteractive)("mdc-text-field__input",s._isInFormField)("mat-mdc-native-select-inline",s._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",i.L39]},exportAs:["matInput"],features:[i.Jv_([{provide:y.a,useExisting:n}]),i.OA$]})}return n})(),P=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=i.$C({type:n});static \u0275inj=i.G2t({imports:[b.M,x.M,x.M,I,b.M]})}return n})()}}]);