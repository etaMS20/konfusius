"use strict";(self.webpackChunkkonfusius=self.webpackChunkkonfusius||[]).push([[11],{27649:(F,C,d)=>{d.d(C,{$:()=>l});var t=d(98961),f=d(98244),a=d(88720);let l=(()=>{var v;class g{constructor(){(0,t.A)(this,"sanitizer",(0,f.WQX)(a.up))}transform(p){return p&&p.length?this.sanitizer.bypassSecurityTrustHtml(p):""}}return v=g,(0,t.A)(g,"\u0275fac",function(p){return new(p||v)}),(0,t.A)(g,"\u0275pipe",f.EJ8({name:"safeHtml",type:v,pure:!0})),g})()},36888:(F,C,d)=>{d.d(C,{M:()=>it,b:()=>tt,c:()=>et,e:()=>Z,j:()=>x,m:()=>M,n:()=>_t});var t=d(98961),f=d(98615),a=d(98244),l=d(52100),v=d(9250),g=d(75324),_=d(88026),p=d(78136),D=d(73809),m=d(886),A=d(26841),w=d(13100),I=d(49410),B=d(46180),P=d(89869),E=d(88520),W=d(56487);function at(n,o){}class b{constructor(){(0,t.A)(this,"viewContainerRef",void 0),(0,t.A)(this,"injector",void 0),(0,t.A)(this,"id",void 0),(0,t.A)(this,"role","dialog"),(0,t.A)(this,"panelClass",""),(0,t.A)(this,"hasBackdrop",!0),(0,t.A)(this,"backdropClass",""),(0,t.A)(this,"disableClose",!1),(0,t.A)(this,"width",""),(0,t.A)(this,"height",""),(0,t.A)(this,"minWidth",void 0),(0,t.A)(this,"minHeight",void 0),(0,t.A)(this,"maxWidth",void 0),(0,t.A)(this,"maxHeight",void 0),(0,t.A)(this,"positionStrategy",void 0),(0,t.A)(this,"data",null),(0,t.A)(this,"direction",void 0),(0,t.A)(this,"ariaDescribedBy",null),(0,t.A)(this,"ariaLabelledBy",null),(0,t.A)(this,"ariaLabel",null),(0,t.A)(this,"ariaModal",!1),(0,t.A)(this,"autoFocus","first-tabbable"),(0,t.A)(this,"restoreFocus",!0),(0,t.A)(this,"scrollStrategy",void 0),(0,t.A)(this,"closeOnNavigation",!0),(0,t.A)(this,"closeOnDestroy",!0),(0,t.A)(this,"closeOnOverlayDetachments",!0),(0,t.A)(this,"componentFactoryResolver",void 0),(0,t.A)(this,"providers",void 0),(0,t.A)(this,"container",void 0),(0,t.A)(this,"templateContext",void 0)}}let Q=(()=>{var n;class o extends l.B{constructor(){super(),(0,t.A)(this,"_elementRef",(0,a.WQX)(a.aKT)),(0,t.A)(this,"_focusTrapFactory",(0,a.WQX)(v.b)),(0,t.A)(this,"_config",void 0),(0,t.A)(this,"_interactivityChecker",(0,a.WQX)(v.I)),(0,t.A)(this,"_ngZone",(0,a.WQX)(a.SKi)),(0,t.A)(this,"_overlayRef",(0,a.WQX)(g.O)),(0,t.A)(this,"_focusMonitor",(0,a.WQX)(_.d)),(0,t.A)(this,"_renderer",(0,a.WQX)(a.sFG)),(0,t.A)(this,"_platform",(0,a.WQX)(p.P)),(0,t.A)(this,"_document",(0,a.WQX)(f.D,{optional:!0})),(0,t.A)(this,"_portalOutlet",void 0),(0,t.A)(this,"_focusTrap",null),(0,t.A)(this,"_elementFocusedBeforeDialogWasOpened",null),(0,t.A)(this,"_closeInteractionType",null),(0,t.A)(this,"_ariaLabelledByQueue",[]),(0,t.A)(this,"_changeDetectorRef",(0,a.WQX)(a.gRc)),(0,t.A)(this,"_injector",(0,a.WQX)(a.zZn)),(0,t.A)(this,"_isDestroyed",!1),(0,t.A)(this,"attachDomPortal",e=>{this._portalOutlet.hasAttached();const i=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),i}),this._config=(0,a.WQX)(b,{optional:!0})||new b,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){const i=this._ariaLabelledByQueue.indexOf(e);i>-1&&(this._ariaLabelledByQueue.splice(i,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._handleBackdropClicks(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();const i=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),i}attachTemplatePortal(e){this._portalOutlet.hasAttached();const i=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),i}_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,i){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{const r=()=>{c(),u(),e.removeAttribute("tabindex")},c=this._renderer.listen(e,"blur",r),u=this._renderer.listen(e,"mousedown",r)})),e.focus(i)}_focusByCssSelector(e,i){let r=this._elementRef.nativeElement.querySelector(e);r&&this._forceFocus(r,i)}_trapFocus(){this._isDestroyed||(0,a.mal)(()=>{const e=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||e.focus();break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement()||this._focusDialogContainer();break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this._config.autoFocus)}},{injector:this._injector})}_restoreFocus(){const e=this._config.restoreFocus;let i=null;if("string"==typeof e?i=this._document.querySelector(e):"boolean"==typeof e?i=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(i=e),this._config.restoreFocus&&i&&"function"==typeof i.focus){const r=(0,D.b)(),c=this._elementRef.nativeElement;(!r||r===this._document.body||r===c||c.contains(r))&&(this._focusMonitor?(this._focusMonitor.focusVia(i,this._closeInteractionType),this._closeInteractionType=null):i.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(){this._elementRef.nativeElement.focus&&this._elementRef.nativeElement.focus()}_containsFocus(){const e=this._elementRef.nativeElement,i=(0,D.b)();return e===i||e.contains(i)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=(0,D.b)()))}_handleBackdropClicks(){this._overlayRef.backdropClick().subscribe(()=>{this._config.disableClose&&this._recaptureFocus()})}}return n=o,(0,t.A)(o,"\u0275fac",function(e){return new(e||n)}),(0,t.A)(o,"\u0275cmp",a.VBU({type:n,selectors:[["cdk-dialog-container"]],viewQuery:function(e,i){if(1&e&&a.GBs(l.C,7),2&e){let r;a.mGM(r=a.lsd())&&(i._portalOutlet=r.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(e,i){2&e&&a.BMQ("id",i._config.id||null)("role",i._config.role)("aria-modal",i._config.ariaModal)("aria-labelledby",i._config.ariaLabel?null:i._ariaLabelledByQueue[0])("aria-label",i._config.ariaLabel)("aria-describedby",i._config.ariaDescribedBy||null)},features:[a.Vt3],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(e,i){1&e&&a.DNE(0,at,0,0,"ng-template",0)},dependencies:[l.C],styles:[".cdk-dialog-container{display:block;width:100%;height:100%;min-height:inherit;max-height:inherit}"],encapsulation:2})),o})();class R{constructor(o,s){(0,t.A)(this,"overlayRef",void 0),(0,t.A)(this,"config",void 0),(0,t.A)(this,"componentInstance",void 0),(0,t.A)(this,"componentRef",void 0),(0,t.A)(this,"containerInstance",void 0),(0,t.A)(this,"disableClose",void 0),(0,t.A)(this,"closed",new m.B),(0,t.A)(this,"backdropClick",void 0),(0,t.A)(this,"keydownEvents",void 0),(0,t.A)(this,"outsidePointerEvents",void 0),(0,t.A)(this,"id",void 0),(0,t.A)(this,"_detachSubscription",void 0),this.overlayRef=o,this.config=s,this.disableClose=s.disableClose,this.backdropClick=o.backdropClick(),this.keydownEvents=o.keydownEvents(),this.outsidePointerEvents=o.outsidePointerEvents(),this.id=s.id,this.keydownEvents.subscribe(e=>{e.keyCode===I.e&&!this.disableClose&&!(0,B.h)(e)&&(e.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{this.disableClose||this.close(void 0,{focusOrigin:"mouse"})}),this._detachSubscription=o.detachments().subscribe(()=>{!1!==s.closeOnOverlayDetachments&&this.close()})}close(o,s){if(this.containerInstance){const e=this.closed;this.containerInstance._closeInteractionType=s?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),e.next(o),e.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(o="",s=""){return this.overlayRef.updateSize({width:o,height:s}),this}addPanelClass(o){return this.overlayRef.addPanelClass(o),this}removePanelClass(o){return this.overlayRef.removePanelClass(o),this}}const j=new a.nKC("DialogScrollStrategy",{providedIn:"root",factory:()=>{const n=(0,a.WQX)(g.a);return()=>n.scrollStrategies.block()}}),nt=new a.nKC("DialogData"),st=new a.nKC("DefaultDialogConfig");let X=(()=>{var n;class o{get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}constructor(){(0,t.A)(this,"_overlay",(0,a.WQX)(g.a)),(0,t.A)(this,"_injector",(0,a.WQX)(a.zZn)),(0,t.A)(this,"_defaultOptions",(0,a.WQX)(st,{optional:!0})),(0,t.A)(this,"_parentDialog",(0,a.WQX)(o,{optional:!0,skipSelf:!0})),(0,t.A)(this,"_overlayContainer",(0,a.WQX)(g.b)),(0,t.A)(this,"_idGenerator",(0,a.WQX)(E._)),(0,t.A)(this,"_openDialogsAtThisLevel",[]),(0,t.A)(this,"_afterAllClosedAtThisLevel",new m.B),(0,t.A)(this,"_afterOpenedAtThisLevel",new m.B),(0,t.A)(this,"_ariaHiddenElements",new Map),(0,t.A)(this,"_scrollStrategy",(0,a.WQX)(j)),(0,t.A)(this,"afterAllClosed",(0,A.v)(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe((0,P.Z)(void 0))))}open(e,i){(i={...this._defaultOptions||new b,...i}).id=i.id||this._idGenerator.getId("cdk-dialog-"),i.id&&this.getDialogById(i.id);const c=this._getOverlayConfig(i),u=this._overlay.create(c),h=new R(u,i),y=this._attachContainer(u,h,i);return h.containerInstance=y,this._attachDialogContent(e,h,y,i),this.openDialogs.length||this._hideNonDialogContentFromAssistiveTechnology(),this.openDialogs.push(h),h.closed.subscribe(()=>this._removeOpenDialog(h,!0)),this.afterOpened.next(h),h}closeAll(){k(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){k(this._openDialogsAtThisLevel,e=>{!1===e.config.closeOnDestroy&&this._removeOpenDialog(e,!1)}),k(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){const i=new g.c({positionStrategy:e.positionStrategy||this._overlay.position().global().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation});return e.backdropClass&&(i.backdropClass=e.backdropClass),i}_attachContainer(e,i,r){const c=r.injector||r.viewContainerRef?.injector,u=[{provide:b,useValue:r},{provide:R,useValue:i},{provide:g.O,useValue:e}];let h;r.container?"function"==typeof r.container?h=r.container:(h=r.container.type,u.push(...r.container.providers(r))):h=Q;const y=new l.a(h,r.viewContainerRef,a.zZn.create({parent:c||this._injector,providers:u}));return e.attach(y).instance}_attachDialogContent(e,i,r,c){if(e instanceof a.C4Q){const u=this._createInjector(c,i,r,void 0);let h={$implicit:c.data,dialogRef:i};c.templateContext&&(h={...h,..."function"==typeof c.templateContext?c.templateContext():c.templateContext}),r.attachTemplatePortal(new l.T(e,null,h,u))}else{const u=this._createInjector(c,i,r,this._injector),h=r.attachComponentPortal(new l.a(e,c.viewContainerRef,u));i.componentRef=h,i.componentInstance=h.instance}}_createInjector(e,i,r,c){const u=e.injector||e.viewContainerRef?.injector,h=[{provide:nt,useValue:e.data},{provide:R,useValue:i}];return e.providers&&("function"==typeof e.providers?h.push(...e.providers(i,e,r)):h.push(...e.providers)),e.direction&&(!u||!u.get(W.D,null,{optional:!0}))&&h.push({provide:W.D,useValue:{value:e.direction,change:(0,w.of)()}}),a.zZn.create({parent:u||c,providers:h})}_removeOpenDialog(e,i){const r=this.openDialogs.indexOf(e);r>-1&&(this.openDialogs.splice(r,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((c,u)=>{c?u.setAttribute("aria-hidden",c):u.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),i&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(){const e=this._overlayContainer.getContainerElement();if(e.parentElement){const i=e.parentElement.children;for(let r=i.length-1;r>-1;r--){const c=i[r];c!==e&&"SCRIPT"!==c.nodeName&&"STYLE"!==c.nodeName&&!c.hasAttribute("aria-live")&&(this._ariaHiddenElements.set(c,c.getAttribute("aria-hidden")),c.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){const e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}}return n=o,(0,t.A)(o,"\u0275fac",function(e){return new(e||n)}),(0,t.A)(o,"\u0275prov",a.jDH({token:n,factory:n.\u0275fac,providedIn:"root"})),o})();function k(n,o){let s=n.length;for(;s--;)o(n[s])}let lt=(()=>{var n;class o{}return n=o,(0,t.A)(o,"\u0275fac",function(e){return new(e||n)}),(0,t.A)(o,"\u0275mod",a.$C({type:n})),(0,t.A)(o,"\u0275inj",a.G2t({providers:[X],imports:[g.d,l.P,v.A,l.P]})),o})();var V=d(24652),dt=d(70961),T=d(83807),L=d(59038),ct=d(33900),G=d(37536);function ht(n,o){}class H{constructor(){(0,t.A)(this,"viewContainerRef",void 0),(0,t.A)(this,"injector",void 0),(0,t.A)(this,"id",void 0),(0,t.A)(this,"role","dialog"),(0,t.A)(this,"panelClass",""),(0,t.A)(this,"hasBackdrop",!0),(0,t.A)(this,"backdropClass",""),(0,t.A)(this,"disableClose",!1),(0,t.A)(this,"width",""),(0,t.A)(this,"height",""),(0,t.A)(this,"minWidth",void 0),(0,t.A)(this,"minHeight",void 0),(0,t.A)(this,"maxWidth",void 0),(0,t.A)(this,"maxHeight",void 0),(0,t.A)(this,"position",void 0),(0,t.A)(this,"data",null),(0,t.A)(this,"direction",void 0),(0,t.A)(this,"ariaDescribedBy",null),(0,t.A)(this,"ariaLabelledBy",null),(0,t.A)(this,"ariaLabel",null),(0,t.A)(this,"ariaModal",!1),(0,t.A)(this,"autoFocus","first-tabbable"),(0,t.A)(this,"restoreFocus",!0),(0,t.A)(this,"delayFocusTrap",!0),(0,t.A)(this,"scrollStrategy",void 0),(0,t.A)(this,"closeOnNavigation",!0),(0,t.A)(this,"componentFactoryResolver",void 0),(0,t.A)(this,"enterAnimationDuration",void 0),(0,t.A)(this,"exitAnimationDuration",void 0)}}const S="mdc-dialog--open",N="mdc-dialog--opening",z="mdc-dialog--closing";let K=(()=>{var n;class o extends Q{constructor(...e){super(...e),(0,t.A)(this,"_animationMode",(0,a.WQX)(a.bc$,{optional:!0})),(0,t.A)(this,"_animationStateChanged",new a.bkB),(0,t.A)(this,"_animationsEnabled","NoopAnimations"!==this._animationMode),(0,t.A)(this,"_actionSectionCount",0),(0,t.A)(this,"_hostElement",this._elementRef.nativeElement),(0,t.A)(this,"_enterAnimationDuration",this._animationsEnabled?Y(this._config.enterAnimationDuration)??150:0),(0,t.A)(this,"_exitAnimationDuration",this._animationsEnabled?Y(this._config.exitAnimationDuration)??75:0),(0,t.A)(this,"_animationTimer",null),(0,t.A)(this,"_finishDialogOpen",()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)}),(0,t.A)(this,"_finishDialogClose",()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration})})}_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(U,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(N,S)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(S),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(S),this._animationsEnabled?(this._hostElement.style.setProperty(U,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(z)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck()}_clearAnimationClasses(){this._hostElement.classList.remove(N,z)}_waitForAnimationToComplete(e,i){null!==this._animationTimer&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(i,e)}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{"function"==typeof requestAnimationFrame?requestAnimationFrame(e):e()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:e})}ngOnDestroy(){super.ngOnDestroy(),null!==this._animationTimer&&clearTimeout(this._animationTimer)}attachComponentPortal(e){const i=super.attachComponentPortal(e);return i.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),i}}return n=o,(0,t.A)(o,"\u0275fac",(()=>{let s;return function(i){return(s||(s=a.xGo(n)))(i||n)}})()),(0,t.A)(o,"\u0275cmp",a.VBU({type:n,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(e,i){2&e&&(a.Mr5("id",i._config.id),a.BMQ("aria-modal",i._config.ariaModal)("role",i._config.role)("aria-labelledby",i._config.ariaLabel?null:i._ariaLabelledByQueue[0])("aria-label",i._config.ariaLabel)("aria-describedby",i._config.ariaDescribedBy||null),a.AVh("_mat-animation-noopable",!i._animationsEnabled)("mat-mdc-dialog-container-with-actions",i._actionSectionCount>0))},features:[a.Vt3],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(e,i){1&e&&(a.j41(0,"div",0)(1,"div",1),a.DNE(2,ht,0,0,"ng-template",2),a.k0s()())},dependencies:[l.C],styles:['.mat-mdc-dialog-container{width:100%;height:100%;display:block;box-sizing:border-box;max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit;outline:0}.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-max-width, 560px);min-width:var(--mat-dialog-container-min-width, 280px)}@media(max-width: 599px){.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-small-max-width, calc(100vw - 32px))}}.mat-mdc-dialog-inner-container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;opacity:0;transition:opacity linear var(--mat-dialog-transition-duration, 0ms);max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mdc-dialog--closing .mat-mdc-dialog-inner-container{transition:opacity 75ms linear;transform:none}.mdc-dialog--open .mat-mdc-dialog-inner-container{opacity:1}._mat-animation-noopable .mat-mdc-dialog-inner-container{transition:none}.mat-mdc-dialog-surface{display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;width:100%;height:100%;position:relative;overflow-y:auto;outline:0;transform:scale(0.8);transition:transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit;box-shadow:var(--mat-dialog-container-elevation-shadow, none);border-radius:var(--mdc-dialog-container-shape, var(--mat-sys-corner-extra-large, 4px));background-color:var(--mdc-dialog-container-color, var(--mat-sys-surface, white))}[dir=rtl] .mat-mdc-dialog-surface{text-align:right}.mdc-dialog--open .mat-mdc-dialog-surface,.mdc-dialog--closing .mat-mdc-dialog-surface{transform:none}._mat-animation-noopable .mat-mdc-dialog-surface{transition:none}.mat-mdc-dialog-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mat-mdc-dialog-title{display:block;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:var(--mat-dialog-headline-padding, 6px 24px 13px)}.mat-mdc-dialog-title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}[dir=rtl] .mat-mdc-dialog-title{text-align:right}.mat-mdc-dialog-container .mat-mdc-dialog-title{color:var(--mdc-dialog-subhead-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));font-family:var(--mdc-dialog-subhead-font, var(--mat-sys-headline-small-font, inherit));line-height:var(--mdc-dialog-subhead-line-height, var(--mat-sys-headline-small-line-height, 1.5rem));font-size:var(--mdc-dialog-subhead-size, var(--mat-sys-headline-small-size, 1rem));font-weight:var(--mdc-dialog-subhead-weight, var(--mat-sys-headline-small-weight, 400));letter-spacing:var(--mdc-dialog-subhead-tracking, var(--mat-sys-headline-small-tracking, 0.03125em))}.mat-mdc-dialog-content{display:block;flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;max-height:65vh}.mat-mdc-dialog-content>:first-child{margin-top:0}.mat-mdc-dialog-content>:last-child{margin-bottom:0}.mat-mdc-dialog-container .mat-mdc-dialog-content{color:var(--mdc-dialog-supporting-text-color, var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));font-family:var(--mdc-dialog-supporting-text-font, var(--mat-sys-body-medium-font, inherit));line-height:var(--mdc-dialog-supporting-text-line-height, var(--mat-sys-body-medium-line-height, 1.5rem));font-size:var(--mdc-dialog-supporting-text-size, var(--mat-sys-body-medium-size, 1rem));font-weight:var(--mdc-dialog-supporting-text-weight, var(--mat-sys-body-medium-weight, 400));letter-spacing:var(--mdc-dialog-supporting-text-tracking, var(--mat-sys-body-medium-tracking, 0.03125em))}.mat-mdc-dialog-container .mat-mdc-dialog-content{padding:var(--mat-dialog-content-padding, 20px 24px)}.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content{padding:var(--mat-dialog-with-actions-content-padding, 20px 24px 0)}.mat-mdc-dialog-container .mat-mdc-dialog-title+.mat-mdc-dialog-content{padding-top:0}.mat-mdc-dialog-actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid rgba(0,0,0,0);padding:var(--mat-dialog-actions-padding, 16px 24px);justify-content:var(--mat-dialog-actions-alignment, flex-end)}@media(forced-colors: active){.mat-mdc-dialog-actions{border-top-color:CanvasText}}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start,.mat-mdc-dialog-actions[align=start]{justify-content:start}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center,.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end,.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}.mat-mdc-dialog-component-host{display:contents}'],encapsulation:2})),o})();const U="--mat-dialog-transition-duration";function Y(n){return null==n?null:"number"==typeof n?n:n.endsWith("ms")?(0,V.a)(n.substring(0,n.length-2)):n.endsWith("s")?1e3*(0,V.a)(n.substring(0,n.length-1)):"0"===n?0:null}var O=function(n){return n[n.OPEN=0]="OPEN",n[n.CLOSING=1]="CLOSING",n[n.CLOSED=2]="CLOSED",n}(O||{});class M{constructor(o,s,e){(0,t.A)(this,"_ref",void 0),(0,t.A)(this,"_containerInstance",void 0),(0,t.A)(this,"componentInstance",void 0),(0,t.A)(this,"componentRef",void 0),(0,t.A)(this,"disableClose",void 0),(0,t.A)(this,"id",void 0),(0,t.A)(this,"_afterOpened",new m.B),(0,t.A)(this,"_beforeClosed",new m.B),(0,t.A)(this,"_result",void 0),(0,t.A)(this,"_closeFallbackTimeout",void 0),(0,t.A)(this,"_state",O.OPEN),(0,t.A)(this,"_closeInteractionType",void 0),this._ref=o,this._containerInstance=e,this.disableClose=s.disableClose,this.id=o.id,o.addPanelClass("mat-mdc-dialog-panel"),e._animationStateChanged.pipe((0,T.p)(i=>"opened"===i.state),(0,L.s)(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),e._animationStateChanged.pipe((0,T.p)(i=>"closed"===i.state),(0,L.s)(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),o.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),(0,dt.h)(this.backdropClick(),this.keydownEvents().pipe((0,T.p)(i=>i.keyCode===I.e&&!this.disableClose&&!(0,B.h)(i)))).subscribe(i=>{this.disableClose||(i.preventDefault(),function $(n,o,s){return n._closeInteractionType=o,n.close(s)}(this,"keydown"===i.type?"keyboard":"mouse"))})}close(o){this._result=o,this._containerInstance._animationStateChanged.pipe((0,T.p)(s=>"closing"===s.state),(0,L.s)(1)).subscribe(s=>{this._beforeClosed.next(o),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),s.totalTime+100)}),this._state=O.CLOSING,this._containerInstance._startExitAnimation()}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(o){let s=this._ref.config.positionStrategy;return o&&(o.left||o.right)?o.left?s.left(o.left):s.right(o.right):s.centerHorizontally(),o&&(o.top||o.bottom)?o.top?s.top(o.top):s.bottom(o.bottom):s.centerVertically(),this._ref.updatePosition(),this}updateSize(o="",s=""){return this._ref.updateSize(o,s),this}addPanelClass(o){return this._ref.addPanelClass(o),this}removePanelClass(o){return this._ref.removePanelClass(o),this}getState(){return this._state}_finishDialogClose(){this._state=O.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}}const Z=new a.nKC("MatMdcDialogData"),gt=new a.nKC("mat-mdc-dialog-default-options"),J=new a.nKC("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{const n=(0,a.WQX)(g.a);return()=>n.scrollStrategies.block()}});let x=(()=>{var n;class o{get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){const e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}constructor(){(0,t.A)(this,"_overlay",(0,a.WQX)(g.a)),(0,t.A)(this,"_defaultOptions",(0,a.WQX)(gt,{optional:!0})),(0,t.A)(this,"_scrollStrategy",(0,a.WQX)(J)),(0,t.A)(this,"_parentDialog",(0,a.WQX)(o,{optional:!0,skipSelf:!0})),(0,t.A)(this,"_idGenerator",(0,a.WQX)(E._)),(0,t.A)(this,"_dialog",(0,a.WQX)(X)),(0,t.A)(this,"_openDialogsAtThisLevel",[]),(0,t.A)(this,"_afterAllClosedAtThisLevel",new m.B),(0,t.A)(this,"_afterOpenedAtThisLevel",new m.B),(0,t.A)(this,"dialogConfigClass",H),(0,t.A)(this,"_dialogRefConstructor",void 0),(0,t.A)(this,"_dialogContainerType",void 0),(0,t.A)(this,"_dialogDataToken",void 0),(0,t.A)(this,"afterAllClosed",(0,A.v)(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe((0,P.Z)(void 0)))),this._dialogRefConstructor=M,this._dialogContainerType=K,this._dialogDataToken=Z}open(e,i){let r;(i={...this._defaultOptions||new H,...i}).id=i.id||this._idGenerator.getId("mat-mdc-dialog-"),i.scrollStrategy=i.scrollStrategy||this._scrollStrategy();const c=this._dialog.open(e,{...i,positionStrategy:this._overlay.position().global().centerHorizontally().centerVertically(),disableClose:!0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:i},{provide:b,useValue:i}]},templateContext:()=>({dialogRef:r}),providers:(u,h,y)=>(r=new this._dialogRefConstructor(u,i,y),r.updatePosition(i?.position),[{provide:this._dialogContainerType,useValue:y},{provide:this._dialogDataToken,useValue:h.data},{provide:this._dialogRefConstructor,useValue:r}])});return r.componentRef=c.componentRef,r.componentInstance=c.componentInstance,this.openDialogs.push(r),this.afterOpened.next(r),r.afterClosed().subscribe(()=>{const u=this.openDialogs.indexOf(r);u>-1&&(this.openDialogs.splice(u,1),this.openDialogs.length||this._getAfterAllClosed().next())}),r}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(e){let i=e.length;for(;i--;)e[i].close()}}return n=o,(0,t.A)(o,"\u0275fac",function(e){return new(e||n)}),(0,t.A)(o,"\u0275prov",a.jDH({token:n,factory:n.\u0275fac,providedIn:"root"})),o})(),q=(()=>{var n;class o{constructor(){(0,t.A)(this,"_dialogRef",(0,a.WQX)(M,{optional:!0})),(0,t.A)(this,"_elementRef",(0,a.WQX)(a.aKT)),(0,t.A)(this,"_dialog",(0,a.WQX)(x))}ngOnInit(){this._dialogRef||(this._dialogRef=function ot(n,o){let s=n.nativeElement.parentElement;for(;s&&!s.classList.contains("mat-mdc-dialog-container");)s=s.parentElement;return s?o.find(e=>e.id===s.id):null}(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._onAdd()})}ngOnDestroy(){this._dialogRef?._containerInstance&&Promise.resolve().then(()=>{this._onRemove()})}}return n=o,(0,t.A)(o,"\u0275fac",function(e){return new(e||n)}),(0,t.A)(o,"\u0275dir",a.FsC({type:n})),o})(),tt=(()=>{var n;class o extends q{constructor(...e){super(...e),(0,t.A)(this,"id",(0,a.WQX)(E._).getId("mat-mdc-dialog-title-"))}_onAdd(){this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id)}_onRemove(){this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id)}}return n=o,(0,t.A)(o,"\u0275fac",(()=>{let s;return function(i){return(s||(s=a.xGo(n)))(i||n)}})()),(0,t.A)(o,"\u0275dir",a.FsC({type:n,selectors:[["","mat-dialog-title",""],["","matDialogTitle",""]],hostAttrs:[1,"mat-mdc-dialog-title","mdc-dialog__title"],hostVars:1,hostBindings:function(e,i){2&e&&a.Mr5("id",i.id)},inputs:{id:"id"},exportAs:["matDialogTitle"],features:[a.Vt3]})),o})(),et=(()=>{var n;class o{}return n=o,(0,t.A)(o,"\u0275fac",function(e){return new(e||n)}),(0,t.A)(o,"\u0275dir",a.FsC({type:n,selectors:[["","mat-dialog-content",""],["mat-dialog-content"],["","matDialogContent",""]],hostAttrs:[1,"mat-mdc-dialog-content","mdc-dialog__content"],features:[a.nM4([ct.b])]})),o})(),it=(()=>{var n;class o extends q{constructor(...e){super(...e),(0,t.A)(this,"align",void 0)}_onAdd(){this._dialogRef._containerInstance?._updateActionSectionCount?.(1)}_onRemove(){this._dialogRef._containerInstance?._updateActionSectionCount?.(-1)}}return n=o,(0,t.A)(o,"\u0275fac",(()=>{let s;return function(i){return(s||(s=a.xGo(n)))(i||n)}})()),(0,t.A)(o,"\u0275dir",a.FsC({type:n,selectors:[["","mat-dialog-actions",""],["mat-dialog-actions"],["","matDialogActions",""]],hostAttrs:[1,"mat-mdc-dialog-actions","mdc-dialog__actions"],hostVars:6,hostBindings:function(e,i){2&e&&a.AVh("mat-mdc-dialog-actions-align-start","start"===i.align)("mat-mdc-dialog-actions-align-center","center"===i.align)("mat-mdc-dialog-actions-align-end","end"===i.align)},inputs:{align:"align"},features:[a.Vt3]})),o})();let _t=(()=>{var n;class o{}return n=o,(0,t.A)(o,"\u0275fac",function(e){return new(e||n)}),(0,t.A)(o,"\u0275mod",a.$C({type:n})),(0,t.A)(o,"\u0275inj",a.G2t({providers:[x],imports:[lt,g.d,l.P,G.M,G.M]})),o})()},75011:(F,C,d)=>{d.d(C,{I:()=>g});var t=d(98961),f=d(36888),a=d(27649),l=d(98244);let v=(()=>{var _;class p{constructor(m,A){(0,t.A)(this,"dialogRef",void 0),(0,t.A)(this,"errData",void 0),this.dialogRef=m,this.errData=A}close(){this.dialogRef.close()}}return _=p,(0,t.A)(p,"\u0275fac",function(m){return new(m||_)(l.rXU(f.m),l.rXU(f.e))}),(0,t.A)(p,"\u0275cmp",l.VBU({type:_,selectors:[["error-dialog"]],decls:9,vars:5,consts:[["mat-dialog-title",""],[3,"innerHTML"],["mat-button","",3,"click"]],template:function(m,A){1&m&&(l.j41(0,"h2",0),l.EFF(1,"Error"),l.k0s(),l.nrm(2,"mat-dialog-content",1),l.nI1(3,"safeHtml"),l.j41(4,"mat-dialog-content"),l.EFF(5),l.k0s(),l.j41(6,"mat-dialog-actions")(7,"button",2),l.bIt("click",function(){return A.close()}),l.EFF(8,"Close"),l.k0s()()),2&m&&(l.R7$(2),l.Y8G("innerHTML",l.bMT(3,3,A.errData.message),l.npT),l.R7$(3),l.Lme("",A.errData.data.status,": ",A.errData.code,""))},dependencies:[f.n,f.b,f.M,f.c,a.$],styles:["mat-dialog-content[_ngcontent-%COMP%]{color:red;font-weight:700}"]})),p})(),g=(()=>{var _;class p{constructor(m){(0,t.A)(this,"dialog",void 0),this.dialog=m}handleError(m){this.openDialog(m.error)}openDialog(m){return this.dialog.open(v,{data:m,width:"400px"}).afterClosed()}}return _=p,(0,t.A)(p,"\u0275fac",function(m){return new(m||_)(l.KVO(f.j))}),(0,t.A)(p,"\u0275prov",l.jDH({token:_,factory:_.\u0275fac,providedIn:"root"})),p})()}}]);