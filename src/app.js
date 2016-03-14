

var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    ctor:function () {
        this._super();
        //Obteniendo el tamaño de la pantalla
        var size = cc.winSize;

        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0);
        
        //posicionando la imagen de fondo
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        this.addChild(this.sprConejo, 1);
        
       

        return true;
    }
});

 
/*var MouseTest = EventTest.extend({
    init:function () {
        this._super();
        //posicionando la imagen del conejo
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        this.addChild(this.sprConejo);
        sprConejo.x = 0;
        sprConejo.y = 0;

       
        if( 'mouse' in cc.sys.capabilities ) 
        {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                
                onMouseMove: function(event){
                    var pos = event.getLocation(), target = event.getCurrentTarget();
                    cc.log("onMouseMove at: " + pos.x + " " + pos.y );
                    target.sprConejo.x = pos.x;
                    target.sprConejo.y = pos.y;
                    }
                },
                 this);
        } else {
            cc.log("MOUSE Not supported");
        }
    }
});*///

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
//MOVER EL CONEJO
var MouseTest = HelloWorldLayer.extend({
    init:function () {
        this._super();

        if( 'mouse' in cc.sys.capabilities ) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: function(event){
                    var pos = event.getLocation(), target = event.getCurrentTarget();
                    if(event.getButton() === cc.EventMouse.BUTTON_RIGHT)
                        cc.log("onRightMouseDown at: " + pos.x + " " + pos.y );
                    else if(event.getButton() === cc.EventMouse.BUTTON_LEFT)
                        cc.log("onLeftMouseDown at: " + pos.x + " " + pos.y );
                    target.this.sprConejo.x = pos.x;
                    target.this.sprConejo.y = pos.y;
                },
                onMouseMove: function(event){
                    var pos = event.getLocation(), target = event.getCurrentTarget();
                    cc.log("onMouseMove at: " + pos.x + " " + pos.y );
                    target.this.sprConejo.x = pos.x;
                    target.this.sprConejo.y = pos.y;
                },
                onMouseUp: function(event){
                    var pos = event.getLocation(), target = event.getCurrentTarget();
                    target.this.sprConejo.x = pos.x;
                    target.this.sprConejo.y = pos.y;
                    cc.log("onMouseUp at: " + pos.x + " " + pos.y );
                }
            }, this);
        } else {
            cc.log("MOUSE Not supported");
        }
    },
    subtitle:function () {
        return "Mouse test. Move mouse and see console";
    }
});

