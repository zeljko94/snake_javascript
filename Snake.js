
var direction = Object.freeze({"lijevo" : 1, "gore" : 2, "desno" : 3, "dolje" : 4});


function SnakePart(x,y)
{
	this.width = 25;
	this.height = 25;
	this.x = x;
	this.y = y;
}

function Snake()
{
	this.width = 25;
	this.height = 25;
	this.length = 2;
	this.x = 0;
	this.y = 0;
	this.facing = direction.gore;
	this.bodyParts = [];
}