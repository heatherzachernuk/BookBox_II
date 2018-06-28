class ThreeD {
	constructor(){
		this.initCamera();

		this.initTextures();

		this.initScene();

		this.initRenderer();

		this.animate();
	}
	animate(){
		// requestAnimationFrame does not respect existing class scope
		// so we need to force it with an explicitly scoped anonymous function
		requestAnimationFrame( ()=>this.animate());
	  	this.frontTexture.needsUpdate = true;
	  	this.backTexture.needsUpdate = true;
	  	this.topTexture.needsUpdate = true;
	  	this.bottomTexture.needsUpdate = true;
	  	this.spineTexture.needsUpdate = true;
	  	this.edgeTexture.needsUpdate = true;
		// this.bookBox.rotation.x += 0.01;
		this.bookBox.rotation.y -= 0.01;
		this.renderer.render( this.scene, this.camera );
	}

	initCamera(){
		this.camera = new THREE.PerspectiveCamera( 35, 1, 1, 600 );
		this.camera.position.z = 425;
	  	this.camera.position.y = 150;
	 	this.camera.lookAt(new THREE.Vector3());
	}

	initTextures(){
		this.edgeTexture = new THREE.Texture(edge);
	 	this.spineTexture = new THREE.Texture(spine);
	 	this.topTexture = new THREE.Texture(topp);
	 	this.bottomTexture = new THREE.Texture(bottom);
	 	this.frontTexture = new THREE.Texture(front);
	 	this.backTexture = new THREE.Texture(back);

		// allows for non-power of two textures
	 	this.edgeTexture.minFilter = THREE.LinearFilter;
	 	this.spineTexture.minFilter = THREE.LinearFilter;
	 	this.topTexture.minFilter = THREE.LinearFilter;
	 	this.bottomTexture.minFilter = THREE.LinearFilter;
	 	this.frontTexture.minFilter = THREE.LinearFilter;
	 	this.backTexture.minFilter = THREE.LinearFilter;
	}
	initScene(){
				this.geometry = new THREE.BoxBufferGeometry( width, height, depth );

		const materials = [
		  new THREE.MeshBasicMaterial({map: this.edgeTexture}),
		  new THREE.MeshBasicMaterial({map: this.spineTexture}),
		  new THREE.MeshBasicMaterial({map: this.topTexture}),
		  new THREE.MeshBasicMaterial({map: this.bottomTexture}),
		  new THREE.MeshBasicMaterial({map: this.frontTexture}),
		  new THREE.MeshBasicMaterial({map: this.backTexture})
		];

		this.bookBox = new THREE.Mesh( this.geometry, materials );
		
		this.scene = new THREE.Scene();

		this.scene.add( this.bookBox );
	}

	initRenderer(){
		this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( upper.offsetHeight, upper.offsetHeight );
		upper.appendChild( this.renderer.domElement );
		this.renderer.domElement.style.margin = "0 auto";
	}
}


