class ColorMenu {
	constructor(changeListener){
		this.changeListener = changeListener;
		this.backgroundColorButton = document.getElementById("background");
		this.detailColorButton = document.getElementById("set-color-box");
		this.setColorBox = document.getElementById("set-color-box");
		this.colorMode = "background";

		this.paletteButton = document.getElementById("palette-button");
		this.coverButton = document.getElementById("cover-color-button");
		this.colorSourceBox = document.getElementById("color-source-box");
		this.palettePicker = document.getElementById("palette-picker");
		this.imagePicker = document.getElementById("image-picker");

		this.stripesOn = document.getElementById("stripes-on");
		this.stripesOff = document.getElementById("stripes-off");
		this.stripesBox = document.getElementById("stripes-box"); 

		this.setColorBox.addEventListener("click", event=>this.setColorToggle(event), false);
		this.coverButton.addEventListener("click", event=>this.colorSourceToggle(event), false);
		this.paletteButton.addEventListener("click", event=>this.colorSourceToggle(event), false);
		this.palettePicker.addEventListener("click", event=>this.hidePalette(event), false);
		this.imagePicker.addEventListener("click", event=>this.hideImagePicker(event), false);

		this.stripesOn.addEventListener("click", event=>this.stripesToggle(event), false);
		this.stripesOff.addEventListener("click", event=>this.stripesToggle(event), false);
	}

	setColorToggle(){
		if(this.colorMode === "background"){
			this.backgroundColorButton.style.backgroundColor = "#56A3A6";
			this.detailColorButton.style.backgroundColor = "#BCF8EC";
			this.colorMode = "detail";
		}
		else if(this.colorMode === "detail") {
			this.backgroundColorButton.style.backgroundColor = "#BCF8EC";
			this.detailColorButton.style.backgroundColor = "#56A3A6";
			this.colorMode = "background";
		}
	}

	colorSourceToggle(event){
		if(event.target.id == "palette-button"){
			this.paletteButton.style.backgroundColor = "#BCF8EC";
			this.colorSourceBox.style.backgroundColor = "#56A3A6";
			this.showPalette();
		}
		if(event.target.id == "cover-color-button") {
			if(config.coverImage == true){
				this.paletteButton.style.backgroundColor = "#56A3A6";
				this.colorSourceBox.style.backgroundColor = "#BCF8EC";
				this.showImage();
			}		
		}
	}

	stripesToggle(event){
		if(event.target.id == "stripes-on"){
			this.stripesOn.style.backgroundColor = "#BCF8EC";
			this.stripesBox.style.backgroundColor = "#56A3A6";
			config.set("stripes", true);
		}
		if(event.target.id != "stripes-on"){
			this.stripesOn.style.backgroundColor = "#56A3A6";
			this.stripesBox.style.backgroundColor = "#BCF8EC";
			config.set("stripes", false);
		}
	}

	showPalette(){
		this.palettePicker.style.display = "block";
		this.palettePicker.style.top = this.setColorBox.getBoundingClientRect().top + "px";
		this.palettePicker.style.left = this.setColorBox.getBoundingClientRect().left + "px";
		this.drawPalette();
		this.palettePicker.addEventListener("mousemove", event=>this.pickPaletteColor(event));
	}

	showImage(){
		this.imagePicker.style.display = "block";
		this.imagePicker.style.top = this.setColorBox.getBoundingClientRect().top + "px";
		this.imagePicker.style.left = this.setColorBox.getBoundingClientRect().left + "px";
		var imageCtx = this.imagePicker.getContext("2d");

		imageCtx.drawImage(image, 0, 0, 200, (image.height/image.width)*200);
		this.imagePicker.addEventListener("mousemove", event=> this.pickImageColor(event));
	}

	hidePalette(){
		this.palettePicker.style.display = "none";
	}

	hideImagePicker(){
		this.imagePicker.style.display = "none";
	}

	drawPalette(){
	  var ctx = this.palettePicker.getContext("2d");           
	  var rainbowGradient = ctx.createLinearGradient( 0, 200, 200, 200);
	  rainbowGradient.addColorStop(0, '#ff0000');
	  rainbowGradient.addColorStop(1/8, '#ff8000');
	  rainbowGradient.addColorStop(2/8, '#ffff00');
	  rainbowGradient.addColorStop(3/8, '#00ff00');
	  rainbowGradient.addColorStop(4/8, ' #0066ff');
	  rainbowGradient.addColorStop(5/8, '#6600ff');
	  rainbowGradient.addColorStop(6/8, '#ff00ff');
	  rainbowGradient.addColorStop(7/8, '#ff0000');
	  rainbowGradient.addColorStop(1, '#000000');
	  ctx.fillStyle = rainbowGradient;
	  ctx.fillRect(0, 0, 200, 200);
	  
	  var whiteGradient = ctx.createLinearGradient(200, 200, 200, 0);
	  whiteGradient.addColorStop(0, 'hsla(0, 0%, 100%, 0)');
	  whiteGradient.addColorStop(1, 'hsla(0, 0%, 100%, 0.95)');
	  ctx.fillStyle = whiteGradient;
	  ctx.fillRect(0, 0, 200, 200);
	  
	  var blackGradient = ctx.createLinearGradient(200, 200, 200, 0);
	  blackGradient.addColorStop(0, 'hsla(0, 0%, 0%, 1)');
	  blackGradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
	  ctx.fillStyle = blackGradient;
	  ctx.fillRect(0, 0, 200, 200);
	}

	pickPaletteColor(color){
		this.palettePicker.style.cursor = "crosshair";
		var paletteCtx = this.palettePicker.getContext("2d");
		var offsetX = this.palettePicker.getBoundingClientRect().left;
	  	var offsetY = this.palettePicker.getBoundingClientRect().top;
		var colorValue = paletteCtx.getImageData(color.clientX - offsetX, color.clientY - offsetY, 1, 1).data;
		var rgba = 'rgba(' + colorValue[0] + ', ' + colorValue[1] + ', ' + colorValue[2] + ', ' + (colorValue[3] / 255) + ')';
		// console.log(rgba);
		this.updateColors(rgba);
	}

	updateColors(rgba) {
		if(this.colorMode=="background") {
			config.set("backgroundColor", rgba);
		} else {
			config.set("detailColor", rgba);
		}
	}

	pickImageColor(color){
		this.imagePicker.style.cursor = "crosshair";
		var imageCtx = this.imagePicker.getContext("2d");
		var offsetX = this.imagePicker.getBoundingClientRect().left;
	  	var offsetY = this.imagePicker.getBoundingClientRect().top;
		var colorValue = imageCtx.getImageData(color.clientX - offsetX, color.clientY - offsetY, 1, 1).data;
		var rgba = 'rgba(' + colorValue[0] + ', ' + colorValue[1] + ', ' + colorValue[2] + ', ' + (colorValue[3] / 255) + ')';
		
		this.updateColors(rgba);
	}


}