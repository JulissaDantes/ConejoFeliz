var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    sprBomba:null,
    
    moves: function(location,event){
        var game = event.getCurrentTarget();
        var ubic = location.getLocation();
        cc.log("x: "+ubic.x+" y: "+ubic.y);
        //AÑADIR MAS POSICIONES PARA EL CONEJO
        if(ubic.y<=170){
            if(ubic.x>=236 && ubic.x<=350){
                game.sprConejo.setPosition(300,96);
            }
            if(ubic.x>=350 && ubic.x<=380){
                game.sprConejo.setPosition(340,96);
            }
            if(ubic.x>=380 && ubic.x<=412){
                game.sprConejo.setPosition(400,96);
            }
            if(ubic.x>=412 && ubic.x<=526){
                game.sprConejo.setPosition(460,96);
            } 
            if(ubic.x>=526 && ubic.x<=640){
                game.sprConejo.setPosition(580,96);
            }
            if(ubic.x>=640 && ubic.x<=719){
                game.sprConejo.setPosition(680,96);

            }

        }
    },
    ctor:function () {
        this._super();
        //Obteniendo el tamaño de la pantalla
        var size = cc.winSize;

        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0);
        
        //posicionando la imagen de conejos
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        cc.log(size.width / 2+" "+size.height * 0.15);
        this.addChild(this.sprConejo, 1);
        
        //posicionando bombas
/*
     for(var i = 0 ; i < 3 ; i++)
	   {
        this.sprBomba = new cc.Sprite(res.bomba_png);
           if(i / 2 == 0)
               {
                 this.sprBomba.setPosition( size.width / 2 +(i*100)-80,size.height / 2 + (i*36)+90);  
               }else{
                   this.sprBomba.setPosition( size.width / 2 +(i*100)-10,size.height / 2 + (i*36)+120);
                   
               }
        
        this.addChild(this.sprBomba, i);
           //ver si la bomba salio de la cosa

               this.sprBomba.runAction(cc.sequence(cc.moveBy(6, cc.p(-10, -550)))); 

        
        }*///Antiguo proceso de crear bombas
        
        //nuevo proceso motrenco
        var sprB1 = new cc.Sprite(res.bomba_png);
        sprB1.setPosition( 326,536);
        this.addChild(sprB1);
        sprB1.runAction(cc.sequence(cc.moveBy(6, cc.p(-10, -550))));
        var sprB2 = new cc.Sprite(res.bomba_png);
        sprB2.setPosition(477,474);
        this.addChild(sprB2);
        sprB2.runAction(cc.sequence(cc.moveBy(6, cc.p(-10, -550))));
        var sprB3 = new cc.Sprite(res.bomba_png);
        sprB3.setPosition(642,548);
        this.addChild(sprB3);
        sprB3.runAction(cc.sequence(cc.moveBy(6, cc.p(-10, -550))));
        
        var Z1 = new cc.Sprite(res.zanahoria_png);
        Z1.setPosition( 386,507);
        this.addChild(Z1);
        Z1.runAction(cc.sequence(cc.moveBy(20, cc.p(-12, -550))));
        var Z2 = new cc.Sprite(res.zanahoria_png);
        Z2.setPosition(547,504);
        this.addChild(Z2);
        Z2.runAction(cc.sequence(cc.moveBy(16, cc.p(-10, -550))));
        var Z3 = new cc.Sprite(res.zanahoria_png);
        Z3.setPosition(687,599);
        this.addChild(Z3);
        Z3.runAction(cc.sequence(cc.moveBy(6, cc.p(-10, -550))));
        
        if((sprB1.getBoundingBox() == this.sprConejo.getBoundingBox() && sprB1.y == this.sprConejo.y)||(sprB2.x == this.sprConejo.x && sprB2.y == this.sprConejo.y)||(sprB3.x == this.sprConejo.x && sprB3.y == this.sprConejo.y))
        {
            cc.log("Colision");
        }
        
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:this.moves
        },this);
        
        


        return true;
    }
});

var SPCollisionDetector = HelloWorldLayer.extend( {


    collisionBegin : function ( arbiter, space ) {

        if( ! this.messageDisplayed ) 
        {
            var label = new cc.LabelBMFont("Collision Detected", s_bitmapFontTest5_fnt);
            this.addChild( label );
            label.x = winSize.width/2;
            label.y = winSize.height/2 ;
            this.messageDisplayed = true;
        }
        cc.log('collision begin');
        var shapes = arbiter.getShapes();
        var collTypeA = shapes[0].collision_type;
        var collTypeB = shapes[1].collision_type;
        cc.log( 'Collision Type A:' + collTypeA );
        cc.log( 'Collision Type B:' + collTypeB );

        //test addPostStepCallback

        return true;
}
});




var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
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
