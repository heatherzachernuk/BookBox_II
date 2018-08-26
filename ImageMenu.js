class ImageMenu {
	constructor(image){

	// this.takePhotoButton = document.getElementById("take-photo");
	this.coverFileButton = document.getElementById("cover-file");
	this.currentFilename = document.getElementById("current-filename");
	this.removeImageButton = document.getElementById("remove-image");
	this.file;
	this.image = image;
	
	// this.takePhotoButton.addEventListener("change", event => this.loadCover(event));
	this.coverFileButton.addEventListener("change", event => this.loadCover(event));
	this.removeImageButton.addEventListener("click", event => this.removeImage(event), false);
}

	loadCover(changeEvent){
		this.file = changeEvent.target.files[0];
		var reader = new FileReader();
		reader.addEventListener("load", event => this.onCoverFileLoaded(event));
		reader.readAsDataURL(this.file); 
	}

	onCoverFileLoaded(fileLoadEvent){
		this.image.src = fileLoadEvent.target.result;
		if(this.file.name.length < 35){
			this.currentFilename.innerHTML = this.file.name;
		}
		else {
			this.currentFilename.innerHTML = this.file.name.substring(0,33)+"...";
		}
		config.set("coverImage", true);
		this.removeImageButton.style.display = "inline";
	}

	removeImage(){
		config.set("frontStripes", true);
		config.set("coverImage", false);
		this.currentFilename.innerHTML = "current_file.jpg";
		this.removeImageButton.style.display = "none";
	}

}