AFRAME.registerComponent('sunfield', {
  schema: {
    width: {type: 'number'},
    height: {type: 'number'},
  },

  init: function () {
    const el = this.el;
    const dat = this.data;
    var h = this.el.getAttribute('height');
    var w = this.el.getAttribute('width');
    const loader = new THREE.GLTFLoader();
    var flwrs = [];

    if(!h){
      h = dat.height;
    }
    if(!w){
      w = dat.width;
    }
    if(!h){
      h = 0;
    }
    if(!w){
      w = 0;
    }
    h = parseInt(h);
    w = parseInt(w);

    loader.load(
      'client/models/sunf1.gltf',

      function(gltf){
        for(var i = 0; i < (w+1); i++){
	  for(var j = 0; j < (h+1); j++){
            const scene = gltf.scene.clone();
            const flnm = 'flower'+i+j;
	    var woff = Math.random()/2;
	    var hoff = Math.random()/2;
	    if(Math.random() < 0.5){
	      woff = woff*-1;
	    }
	    if(Math.random() < 0.5){
	      hoff = hoff*-1;
	    }
            scene.position.set(i-(w/2)-woff, j-(h/2)-woff, 0);
	    scene.rotation.set(Math.PI/2, 0, 0);
	    el.object3D.add(scene);
	  }
        }
      }
    );    
  }
});
