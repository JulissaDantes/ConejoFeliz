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
            if(ubic.x>=236 && ubic.x<=380){
                game.sprConejo.setPosition(300,96);
            }
            if(ubic.x>=380 && ubic.x<=560){
                game.sprConejo.setPosition(480,96);
            }
            if(ubic.x>=560 && ubic.x<=719){
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

     for(var i = 0 ; i < 3 ; i++)
	   {
        this.sprBomba = new cc.Sprite(res.bomba_png);
           if(i / 2 == 0)
               {
                 this.sprBomba.setPosition( size.width / 2 +(i*100)-80,size.height / 2 + (i*36)+90);  
               }else{
                   this.sprBomba.setPosition( size.width / 2 +(i*100),size.height / 2 + (i*36)+120);
               }
        
        this.addChild(this.sprBomba, i);
        this.sprBomba.runAction(cc.sequence(cc.moveBy(1, cc.p(0, -550))));
        }
        
        
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:this.moves
        },this);
        
        


        return true;
    }
});

var SPCollisionDetector = HelloWorldLayer.extend( {

    ctor : function () {
        this._super();
        // cc.base(this);

    },

    // init physics
    initPhysics : function() {
        var staticBody = this.space.staticBody;

        // Walls
        var walls = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(winSize.width,0), 0 ),               // bottom
                new cp.SegmentShape( staticBody, cp.v(0,winSize.height), cp.v(winSize.width,winSize.height), 0),    // top
                new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0,winSize.height), 0),             // left
                new cp.SegmentShape( staticBody, cp.v(winSize.width,0), cp.v(winSize.width,winSize.height), 0)  // right
                ];
        for( var i=0; i < walls.length; i++ ) {
            var wall = walls[i];
            wall.setElasticity(1);
            wall.setFriction(1);
            this.space.addStaticShape( wall );
        }

        // Gravity:
        // testing properties
        this.space.gravity = cp.v(0,-100);
        this.space.iterations = 15;
    },

    createPhysicsSprite : function( pos, file, collision_type ) {
        var body = new cp.Body(1, cp.momentForBox(1, 48, 108) );
        body.setPos(pos);
        this.space.addBody(body);
        var shape = new cp.BoxShape( body, 48, 108);
        shape.setElasticity( 0.5 );
        shape.setFriction( 0.5 );
        shape.setCollisionType( collision_type );
        this.space.addShape( shape );

        var sprite = new cc.PhysicsSprite(file);
        sprite.setBody( body );
        return sprite;
    },

    onEnter : function () {
    
       // cc.HelloWorldLayer(this, 'onEnter');//si explota documentar esto

        this.initPhysics();
        this.scheduleUpdate();

        var sprite1 = this.createPhysicsSprite( cc.p(winSize.width/2, winSize.height-20), res.bomba_png, 1);
        var sprite2 = this.createPhysicsSprite( cc.p(winSize.width/2, 50), res.conejo_png, 2);

        this.addChild( sprite1 );
        this.addChild( sprite2 );

        this.space.addCollisionHandler( 1, 2,
            this.collisionBegin.bind(this),
            this.collisionPre.bind(this),
            this.collisionPost.bind(this),
            this.collisionSeparate.bind(this)
            );
    },


    update : function( delta ) {
        this.space.step( delta );
    },

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
