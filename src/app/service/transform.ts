import { Injectable } from '@angular/core';

class Matrix3D {
    public DEG_TO_RAD =  0.017453292519943295;
    public window:any=Window;
    public elements:any=this.window.Float32Array ? new Float32Array(16) : [];
    constructor(n11?:any, n12?:any, n13?:any, n14?:any, n21?:any, n22?:any, n23?:any, n24?:any, n31?:any, n32?:any, n33?:any, n34?:any, n41?:any, n42?:any, n43?:any, n44?:any){
        let te=this.elements;
        te[0] = (n11 !== undefined) ? n11 : 1; te[4] = n12 || 0; te[8] = n13 || 0; te[12] = n14 || 0;
        te[1] = n21 || 0; te[5] = (n22 !== undefined) ? n22 : 1; te[9] = n23 || 0; te[13] = n24 || 0;
        te[2] = n31 || 0; te[6] = n32 || 0; te[10] = (n33 !== undefined) ? n33 : 1; te[14] = n34 || 0;
        te[3] = n41 || 0; te[7] = n42 || 0; te[11] = n43 || 0; te[15] = (n44 !== undefined) ? n44 : 1;
    }

    set(n11:any, n12:any, n13:any, n14:any, n21:any, n22:any, n23:any, n24:any, n31:any, n32:any, n33:any, n34:any, n41:any, n42:any, n43:any, n44:any){
        let te = this.elements;
        te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
        te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
        te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
        te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;
        return this;
    };
    identity(){
        this.set(1, 0, 0, 0,0, 1, 0, 0,0, 0, 1, 0,0, 0, 0, 1);
        return this;
    };
    multiplyMatrices(a:any, be:any){
        var ae = a.elements;
        var te = this.elements;
        var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
        var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
        var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
        var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

        var b11 = be[0], b12 = be[1], b13 = be[2], b14 = be[3];
        var b21 = be[4], b22 = be[5], b23 = be[6], b24 = be[7];
        var b31 = be[8], b32 = be[9], b33 = be[10], b34 = be[11];
        var b41 = be[12], b42 = be[13], b43 = be[14], b44 = be[15];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return this;
    }
    _rounded(value:number,i:number=15){
        i = Math.pow(10, i);
        // default
        return Math.round(value * i) / i;
    }
    _arrayWrap(arr:any[]) {
        return this.window.Float32Array ? new Float32Array(arr) : arr;
    }
    appendTransform(x:any, y:any, z:any, scaleX:any, scaleY:any, scaleZ:any, rotateX:any, rotateY:any, rotateZ:any, skewX:any, skewY:any, originX:any, originY:any, originZ:any){
        var rx = rotateX * this.DEG_TO_RAD;
        var cosx = this._rounded(Math.cos(rx));
        var sinx = this._rounded(Math.sin(rx));
        var ry = rotateY * this.DEG_TO_RAD;
        var cosy = this._rounded(Math.cos(ry));
        var siny = this._rounded(Math.sin(ry));
        var rz = rotateZ * this.DEG_TO_RAD;
        var cosz = this._rounded(Math.cos(rz * -1));
        var sinz = this._rounded(Math.sin(rz * -1));

        this.multiplyMatrices(this, this._arrayWrap([1, 0, 0, x,0, cosx, sinx, y,0, -sinx, cosx, z, 0, 0, 0, 1]));
        this.multiplyMatrices(this, this._arrayWrap([cosy, 0, siny, 0, 0, 1, 0, 0,-siny, 0, cosy, 0, 0, 0, 0, 1]));
        this.multiplyMatrices(this, this._arrayWrap([cosz * scaleX, sinz * scaleY, 0, 0,-sinz * scaleX, cosz * scaleY, 0, 0, 0, 0, 1 * scaleZ, 0, 0, 0, 0, 1]));

        
        if (skewX || skewY) {
            this.multiplyMatrices(this, this._arrayWrap([
                this._rounded(Math.cos(skewX * this.DEG_TO_RAD)), this._rounded(Math.sin(skewX * this.DEG_TO_RAD)), 0, 0,
                -1 * this._rounded(Math.sin(skewY * this.DEG_TO_RAD)), this._rounded(Math.cos(skewY * this.DEG_TO_RAD)), 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]));
        }
        if (originX || originY || originZ) {
            this.elements[12] -= originX * this.elements[0] + originY * this.elements[4] + originZ * this.elements[8];
            this.elements[13] -= originX * this.elements[1] + originY * this.elements[5] + originZ * this.elements[9];
            this.elements[14] -= originX * this.elements[2] + originY * this.elements[6] + originZ * this.elements[10];
        }
        return this;

    }
}


class Matrix2D{
    public DEG_TO_RAD=0.017453292519943295;
    public a:any;
    public b:any;
    public c:any;
    public d:any;
    public tx:any;
    public ty:any;
    constructor(a?:any, b?:any, c?:any, d?:any, tx?:any, ty?:any){
        this.a = a == null ? 1 : a;
        this.b = b ||0;
        this.c = c||0 ;
        this.d = d == null ? 1 : d;
        this.tx = tx ||0;
        this.ty = ty||0 ;
        return this;
    }
    identity(){
        this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        return this;
    }
    appendTransform(x:any, y:any, scaleX:any, scaleY:any, rotation:any, skewX:any, skewY:any, originX:any, originY:any){
        if (rotation % 360) {
            var r = rotation * this.DEG_TO_RAD;
            var cos = Math.cos(r);
            var sin = Math.sin(r);
        } else {
            cos = 1;
            sin = 0;
        }
        if (skewX || skewY) {
            skewX *= this.DEG_TO_RAD;
            skewY *= this.DEG_TO_RAD;
            this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
            this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
        } else {
            this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
        }
        if (originX || originY) {
            this.tx -= originX * this.a + originY * this.c;
            this.ty -= originX * this.b + originY * this.d;
        }
        return this;
    }
    append(a:any, b:any, c:any, d:any, tx:any, ty:any) {
        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;
        this.a = a * a1 + b * c1;
        this.b = a * b1 + b * d1;
        this.c = c * a1 + d * c1;
        this.d = c * b1 + d * d1;
        this.tx = tx * a1 + ty * c1 + this.tx;
        this.ty = tx * b1 + ty * d1 + this.ty;
        return this;
    }
    initialize(a:any, b:any, c:any, d:any, tx:any, ty:any) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
        return this;
    }
    setValues(a:any, b:any=0, c:any=0, d:any, tx:any=0, ty:any=0) {
        this.a = a == null ? 1 : a;
        this.b = b || 0;
        this.c = c || 0;
        this.d = d == null ? 1 : d;
        this.tx = tx || 0;
        this.ty = ty || 0;
        return this;
    }
    copy(matrix:any) {
        return this.setValues(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    }
}


@Injectable()

export class TransformService{
    
    public DEG_TO_RAD =  0.017453292519943295;

    constructor(){
       
    }
    init(obj:any, notPerspective:any){
        if(obj.___mixCSS3Transform) return;
        var observeProps = ["translateX", "translateY", "translateZ", "scaleX", "scaleY", "scaleZ", "rotateX", "rotateY", "rotateZ", "skewX", "skewY", "originX", "originY", "originZ"],
            objIsElement = this.isElement(obj);
        if (!notPerspective) {
            observeProps.push("perspective");
        }
        obj.___mixCSS3Transform = true
        this.observe(
            obj,
            observeProps,
            () =>{
                var mtx = obj.matrix3d.identity().appendTransform(obj.translateX, obj.translateY, obj.translateZ, obj.scaleX, obj.scaleY, obj.scaleZ, obj.rotateX, obj.rotateY, obj.rotateZ, obj.skewX, obj.skewY, obj.originX, obj.originY, obj.originZ);
                var transform = (notPerspective ? "" : "perspective(" + obj.perspective + "px) ") + "matrix3d(" + Array.prototype.slice.call(mtx.elements).join(",") + ")";
                if (objIsElement) {
                    obj.style.transform = obj.style.msTransform = obj.style.OTransform = obj.style.MozTransform = obj.style.webkitTransform = transform;
                } else {
                    obj.transform = transform;
                }
            });

        obj.matrix3d = new Matrix3D();
        if (!notPerspective) {
            obj.perspective = 500;
        }
        obj.scaleX = obj.scaleY = obj.scaleZ = 1;
        //由于image自带了x\y\z，所有加上translate前缀
        obj.translateX = obj.translateY = obj.translateZ = obj.rotateX = obj.rotateY = obj.rotateZ = obj.skewX = obj.skewY = obj.originX = obj.originY = obj.originZ = 0;
    }

    private observe(target:any, props:any, callback:any) {
        for (var i = 0, len = props.length; i < len; i++) {
            var prop = props[i];
            this.watch(target, prop, callback);
        }
    }

    private watch(target:any, prop:any, callback:any) {
        Object.defineProperty(target, prop, {
            get: function () {
                return this["_" + prop];
            },
            set: function (value) {
                this["_" + prop] = value;
                callback();
            }
        });
    }

    private isElement(o:any) {
        return (
            typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
        );
    }

   

    getMatrix3D(option:any) {
        var defaultOption = {
            translateX: 0,
            translateY: 0,
            translateZ: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            skewX: 0,
            skewY: 0,
            originX: 0,
            originY: 0,
            originZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1
        };
        for (var key in option) {
            if (option.hasOwnProperty(key)) {
                defaultOption[key] = option[key];
            }
        }
        return new Matrix3D().identity().appendTransform(defaultOption.translateX, defaultOption.translateY, defaultOption.translateZ, defaultOption.scaleX, defaultOption.scaleY, defaultOption.scaleZ, defaultOption.rotateX, defaultOption.rotateY, defaultOption.rotateZ, defaultOption.skewX, defaultOption.skewY, defaultOption.originX, defaultOption.originY, defaultOption.originZ).elements;

    }

    getMatrix2D (option:any){
        var defaultOption = {
            translateX: 0,
            translateY: 0,
            rotation: 0,
            skewX: 0,
            skewY: 0,
            originX: 0,
            originY: 0,
            scaleX: 1,
            scaleY: 1
        };
        for (var key in option) {
            if (option.hasOwnProperty(key)) {
                defaultOption[key] = option[key];
            }
        }
        return new Matrix2D().identity().appendTransform(defaultOption.translateX, defaultOption.translateY, defaultOption.scaleX, defaultOption.scaleY, defaultOption.rotation, defaultOption.skewX, defaultOption.skewY, defaultOption.originX, defaultOption.originY);
    }
    
}