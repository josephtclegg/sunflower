AFRAME.registerComponent('sunfield', {
  schema: {
    width: {type: 'number'},
    height: {type: 'number'},
  },

  init: function () {
    const el = this.el;
    const dat = this.data;
    const h = this.el.getAttribute('height');
    const w = this.el.getAttribute('width');
    var flwrs = [];

    if(!h){
      h = dat.height;
    }
    if(!w){
      w = dat.width;
    }

    loader.load(
      'models/sunf1.gltf',

      function(gltf){
	const scene = gltf.scene;
	const mesh = scene.children[3];
	for(var i = 0; i < h*w; i++){
	  const flnm = 'flower'+i;
	  mesh.position.set(i/w, (i%w)/w, 0);
	  el.setObject3D(flnm, mesh);
	}
      }
    );    
  }
});
