
function Mapa(width,height)
{
	this.width = width;
	this.height = height;
	this.backgroundColor = "grey";
	this.canvas = document.createElement("canvas");
	this.canvas.style.backgroundColor = this.backgroundColor;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.context = this.canvas.getContext("2d");
	document.body.insertBefore(this.canvas, document.body.childNodes[0]);

	this.clear = function()
	{
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
}
